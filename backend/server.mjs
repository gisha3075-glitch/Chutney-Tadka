import { createServer } from 'node:http';
import {
  ADDRESSES,
  DELIVERY_PARTNER,
  PROMO_CODES,
  RESTAURANTS,
  getRestaurantById,
} from '../src/data/mockData.js';
import { getDb, closeDb, getFallbackDb, saveFallbackDbState } from './db.js';

const PORT = Number(process.env.PORT || 4000);

await initDb();

function json(res, statusCode, payload) {
  res.writeHead(statusCode, {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(payload));
}

function notFound(res) {
  json(res, 404, { error: 'Not found' });
}

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    const error = new Error('Invalid JSON body');
    error.statusCode = 400;
    throw error;
  }
}

async function initDb() {
  const pool = await getDb();
  if (!pool) {
    await getFallbackDb();
    return;
  }

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Users (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(200) NOT NULL,
      email VARCHAR(200) NOT NULL UNIQUE,
      password VARCHAR(200) NOT NULL,
      createdAt DATETIME NOT NULL
    );
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS Orders (
      id VARCHAR(100) PRIMARY KEY,
      userId VARCHAR(100) NULL,
      restaurant JSON NULL,
      items JSON NOT NULL,
      address JSON NULL,
      totals JSON NULL,
      paymentMethod VARCHAR(50) NULL,
      cookingInstructions TEXT NULL,
      noCutlery BOOLEAN NOT NULL DEFAULT FALSE,
      deliveryPartner JSON NULL,
      createdAt DATETIME NOT NULL
    );
  `);

  const [demoExists] = await pool.execute(`
    SELECT id FROM Users WHERE email = ? LIMIT 1
  `, ['demo@khaopio.test']);
  if (demoExists.length === 0) {
    await pool.execute(`
      INSERT INTO Users (id, name, email, password, createdAt)
      VALUES (?, ?, ?, ?, ?)
    `, ['user-demo', 'Demo User', 'demo@khaopio.test', 'password', new Date()]);
  }
}

function mapUser(row) {
  return row ? { id: row.id, name: row.name, email: row.email, createdAt: row.createdAt } : null;
}

function parseJsonColumn(value, fallback = null) {
  if (value == null) return fallback;
  if (typeof value !== 'string') return value;
  return JSON.parse(value);
}

function mapOrder(row) {
  return row ? {
    ...row,
    restaurant: parseJsonColumn(row.restaurant),
    items: parseJsonColumn(row.items, []),
    address: parseJsonColumn(row.address),
    totals: parseJsonColumn(row.totals, {}),
    deliveryPartner: parseJsonColumn(row.deliveryPartner),
  } : null;
}

function applyRestaurantFilters(restaurants, searchParams) {
  let filtered = [...restaurants];

  const query = searchParams.get('q')?.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter((restaurant) => {
      const searchableText = [
        restaurant.name,
        ...(restaurant.cuisines || []),
        ...Object.entries(restaurant.menu || {}).flatMap(([sectionName, items]) => [
          sectionName,
          ...((Array.isArray(items) ? items : []).map((item) => item.name)),
        ]),
      ].filter(Boolean).join(' ').toLowerCase();
      return searchableText.includes(query);
    });
  }

  if (searchParams.get('pureVeg') === 'true') {
    filtered = filtered.filter((r) => r.pureVeg);
  }
  if (searchParams.has('minRating')) {
    filtered = filtered.filter((r) => r.rating >= Number(searchParams.get('minRating')));
  }
  if (searchParams.has('maxCost')) {
    filtered = filtered.filter((r) => r.costForTwo <= Number(searchParams.get('maxCost')));
  }
  if (searchParams.get('fastDelivery') === 'true') {
    filtered = filtered.filter((r) => {
      const max = Number.parseInt(r.deliveryTime.split('-')[1], 10) || 99;
      return max <= 30;
    });
  }
  if (searchParams.get('offersOnly') === 'true') {
    filtered = filtered.filter((r) => r.offer && r.offer.length > 0);
  }

  const sortBy = searchParams.get('sortBy');
  if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'costLow') {
    filtered.sort((a, b) => a.costForTwo - b.costForTwo);
  } else if (sortBy === 'costHigh') {
    filtered.sort((a, b) => b.costForTwo - a.costForTwo);
  } else if (sortBy === 'deliveryTime') {
    filtered.sort((a, b) => {
      const aMax = Number.parseInt(a.deliveryTime.split('-')[1], 10) || 99;
      const bMax = Number.parseInt(b.deliveryTime.split('-')[1], 10) || 99;
      return aMax - bMax;
    });
  }

  return filtered;
}

function createOrderStatus(order) {
  const elapsedMs = Date.now() - new Date(order.createdAt).getTime();
  const currentStep = Math.min(3, Math.floor(elapsedMs / 6000));
  const eta = currentStep === 3 ? 0 : Math.max(28 - currentStep * 8, 2);
  return { currentStep, eta };
}

async function handleRequest(req, res) {
  if (req.method === 'OPTIONS') {
    return json(res, 204, {});
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const { pathname, searchParams } = url;

  try {
    if (req.method === 'GET' && pathname === '/api/health') {
      return json(res, 200, { ok: true, service: 'khao-pio-backend' });
    }

    if (req.method === 'GET' && pathname === '/api/restaurants') {
      const restaurants = applyRestaurantFilters(RESTAURANTS, searchParams);
      return json(res, 200, { restaurants, total: restaurants.length });
    }

    const restaurantMatch = pathname.match(/^\/api\/restaurants\/([^/]+)$/);
    if (req.method === 'GET' && restaurantMatch) {
      const restaurant = getRestaurantById(decodeURIComponent(restaurantMatch[1]));
      return restaurant ? json(res, 200, { restaurant }) : notFound(res);
    }

    if (req.method === 'POST' && pathname === '/api/auth/signup') {
      const body = await readBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const name = String(body.name || body.fullName || '').trim();
      const password = String(body.password || '');

      if (!name || !email || !password) {
        return json(res, 400, { error: 'Name, email, and password are required' });
      }
      const pool = await getDb();
      if (!pool) {
        const db = await getFallbackDb();
        if (db.users.some((user) => user.email === email)) {
          return json(res, 409, { error: 'An account already exists for this email' });
        }
        const user = {
          id: `user-${Date.now()}`,
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        };
        db.users.push(user);
        await saveFallbackDbState(db);
        return json(res, 201, { user: publicUser(user) });
      }

      const [existing] = await pool.execute(`
        SELECT id FROM Users WHERE email = ? LIMIT 1
      `, [email]);
      if (existing.length > 0) {
        return json(res, 409, { error: 'An account already exists for this email' });
      }

      const user = {
        id: `user-${Date.now()}`,
        name,
        email,
        password,
        createdAt: new Date().toISOString(),
      };
      await pool.execute(`
        INSERT INTO Users (id, name, email, password, createdAt)
        VALUES (?, ?, ?, ?, ?)
      `, [user.id, user.name, user.email, user.password, new Date(user.createdAt)]);
      return json(res, 201, { user: publicUser(user) });
    }

    if (req.method === 'POST' && pathname === '/api/auth/login') {
      const body = await readBody(req);
      const email = String(body.email || '').trim().toLowerCase();
      const password = String(body.password || '');
      const pool = await getDb();
      if (!pool) {
        const db = await getFallbackDb();
        const user = db.users.find((candidate) => candidate.email === email);
        if (!user || user.password !== password) {
          return json(res, 401, { error: 'Invalid email or password' });
        }
        return json(res, 200, { user: publicUser(user) });
      }

      const [result] = await pool.execute(`
        SELECT id, name, email, password, createdAt FROM Users WHERE email = ? LIMIT 1
      `, [email]);
      const user = result[0];

      if (!user || user.password !== password) {
        return json(res, 401, { error: 'Invalid email or password' });
      }

      return json(res, 200, { user: publicUser(user) });
    }

    if (req.method === 'GET' && pathname === '/api/addresses') {
      return json(res, 200, { addresses: ADDRESSES });
    }

    if (req.method === 'POST' && pathname === '/api/promos/validate') {
      const body = await readBody(req);
      const code = String(body.code || '').trim().toUpperCase();
      const promo = PROMO_CODES[code];

      if (!promo) {
        return json(res, 404, { error: 'Invalid promo code' });
      }

      return json(res, 200, { promo: { code, ...promo } });
    }

    if (req.method === 'POST' && pathname === '/api/orders') {
      const body = await readBody(req);
      if (!Array.isArray(body.items) || body.items.length === 0) {
        return json(res, 400, { error: 'Order must contain at least one item' });
      }

      const order = {
        id: `order-${Date.now()}`,
        user: body.user || null,
        restaurant: body.restaurant || null,
        items: body.items,
        address: body.address || ADDRESSES[0],
        totals: body.totals || {},
        paymentMethod: body.paymentMethod || 'upi',
        cookingInstructions: body.cookingInstructions || '',
        noCutlery: Boolean(body.noCutlery),
        deliveryPartner: DELIVERY_PARTNER,
        createdAt: new Date().toISOString(),
      };
      const pool = await getDb();
      if (!pool) {
        const db = await getFallbackDb();
        db.orders.unshift(order);
        await saveFallbackDbState(db);
        return json(res, 201, { order: { ...order, status: createOrderStatus(order) } });
      }

      await pool.execute(`
        INSERT INTO Orders (id, userId, restaurant, items, address, totals, paymentMethod, cookingInstructions, noCutlery, deliveryPartner, createdAt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [
        order.id,
        order.user?.id || null,
        JSON.stringify(order.restaurant),
        JSON.stringify(order.items),
        JSON.stringify(order.address),
        JSON.stringify(order.totals),
        order.paymentMethod,
        order.cookingInstructions,
        order.noCutlery,
        JSON.stringify(order.deliveryPartner),
        new Date(order.createdAt),
      ]);
      return json(res, 201, { order: { ...order, status: createOrderStatus(order) } });
    }

    const orderMatch = pathname.match(/^\/api\/orders\/([^/]+)$/);
    if (req.method === 'GET' && orderMatch) {
      const pool = await getDb();
      if (!pool) {
        const db = await getFallbackDb();
        const order = db.orders.find((candidate) => candidate.id === decodeURIComponent(orderMatch[1]));
        return order ? json(res, 200, { order: { ...order, status: createOrderStatus(order) } }) : notFound(res);
      }

      const [result] = await pool.execute(`
        SELECT * FROM Orders WHERE id = ? LIMIT 1
      `, [decodeURIComponent(orderMatch[1])]);
      const order = mapOrder(result[0]);
      return order ? json(res, 200, { order: { ...order, status: createOrderStatus(order) } }) : notFound(res);
    }

    return notFound(res);
  } catch (error) {
    return json(res, error.statusCode || 500, { error: error.message || 'Server error' });
  }
}

createServer(handleRequest).listen(PORT, () => {
  console.log(`Chutney&Tadka backend running on http://localhost:${PORT}`);
});

process.on('SIGINT', async () => {
  await closeDb();
  process.exit(0);
});
