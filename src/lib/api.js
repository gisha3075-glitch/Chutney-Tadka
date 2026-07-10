const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    throw new Error(data?.error || 'Something went wrong');
  }

  return data;
}

export const api = {
  getRestaurants(filters = {}) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== false && value !== '') {
        params.set(key, String(value));
      }
    });
    const query = params.toString();
    return request(`/restaurants${query ? `?${query}` : ''}`);
  },

  getRestaurant(id) {
    return request(`/restaurants/${id}`);
  },

  login(credentials) {
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },

  signup(profile) {
    return request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(profile),
    });
  },

  validatePromo(code) {
    return request('/promos/validate', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  },

  createOrder(order) {
    return request('/orders', {
      method: 'POST',
      body: JSON.stringify(order),
    });
  },

  getOrder(orderId) {
    return request(`/orders/${orderId}`);
  },
};
