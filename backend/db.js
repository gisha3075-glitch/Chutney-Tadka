import mysql from 'mysql2/promise';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

const config = {
  // Railway's MySQL service exposes MYSQLHOST, MYSQLPORT, MYSQLUSER,
  // MYSQLPASSWORD, and MYSQLDATABASE. DB_* aliases keep local development
  // and other hosts supported.
  host: process.env.DB_HOST || process.env.DB_SERVER || process.env.MYSQLHOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || process.env.MYSQLPORT || 3306),
  user: process.env.DB_USER || process.env.MYSQLUSER || 'root',
  password: process.env.DB_PASSWORD || process.env.MYSQLPASSWORD || process.env.MYSQL_ROOT_PASSWORD || '0125',
  database: process.env.DB_NAME || process.env.MYSQLDATABASE || 'Chutney-Tadka',
  waitForConnections: true,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT || 10),
  namedPlaceholders: true,
};

let pool;
let fallbackDb = null;

async function loadFallbackDb() {
  await mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await readFile(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    const initial = {
      users: [
        {
          id: 'user-demo',
          name: 'Demo User',
          email: 'demo@khaopio.test',
          password: 'password',
          createdAt: new Date().toISOString(),
        },
      ],
      orders: [],
    };
    await writeFile(DB_FILE, JSON.stringify(initial, null, 2));
    return initial;
  }
}

async function saveFallbackDb(nextDb) {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DB_FILE, JSON.stringify(nextDb, null, 2));
}

export async function getDb() {
  if (pool) return pool;

  try {
    const { database, ...serverConfig } = config;
    const databaseName = database.replaceAll('`', '``');
    const bootstrap = await mysql.createConnection(serverConfig);
    await bootstrap.query(`CREATE DATABASE IF NOT EXISTS \`${databaseName}\``);
    await bootstrap.end();

    pool = mysql.createPool(config);
    await pool.query('SELECT 1');
    return pool;
  } catch (error) {
    if (!fallbackDb) {
      fallbackDb = await loadFallbackDb();
    }
    console.warn(`[db] MySQL connection failed for ${config.host}:${config.port}/${config.database}; using fallback JSON store. ${error.message}`);
    return null;
  }
}

export async function closeDb() {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

export async function getFallbackDb() {
  if (!fallbackDb) {
    fallbackDb = await loadFallbackDb();
  }
  return fallbackDb;
}

export async function saveFallbackDbState(nextDb) {
  fallbackDb = nextDb;
  await saveFallbackDb(nextDb);
}
