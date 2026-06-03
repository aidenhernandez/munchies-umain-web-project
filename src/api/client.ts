export const IMAGE_BASE = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';
const API_BASE = `${IMAGE_BASE}/api`;

export async function fetchRestaurants() {
  const res = await fetch(`${API_BASE}/restaurants`);
  if (!res.ok) throw new Error('Failed to fetch restaurants');
  return res.json();
}

export async function fetchFilters() {
  const res = await fetch(`${API_BASE}/filter`);
  if (!res.ok) throw new Error('Failed to fetch filters');
  return res.json();
}

export async function fetchOpenStatus(id: string) {
  const res = await fetch(`${API_BASE}/open/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch open status for ${id}`);
  return res.json();
}

export async function fetchPriceRange(id: string) {
  const res = await fetch(`${API_BASE}/price-range/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch price range ${id}`);
  return res.json();
}
