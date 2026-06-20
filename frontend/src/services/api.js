const API_URL = import.meta.env.VITE_API_URL;

async function request(url, options = {}) {
  const res = await fetch(url, options);

  let data = {};
  try {
    data = await res.json();
  } catch (error) {
    throw new Error(`Server returned invalid response (${res.status})`);
  }

  if (!res.ok) {
    throw new Error(data.message || `Request failed with status ${res.status}`);
  }

  return data;
}

export async function fetchProducts() {
  return request(`${API_URL}/products`);
}

export async function createProduct(data) {
  return request(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function fetchSummary() {
  return request(`${API_URL}/reports/summary`);
}

export async function fetchSales() {
  return request(`${API_URL}/sales`);
}

export async function fetchPurchases() {
  return request(`${API_URL}/purchases`);
}

export async function fetchLowStock() {
  return request(`${API_URL}/reports/low-stock`);
}

export async function fetchMovements() {
  return request(`${API_URL}/reports/movements`);
}

export async function createSale(data) {
  return request(`${API_URL}/sales`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function createPurchase(data) {
  return request(`${API_URL}/purchases`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}
