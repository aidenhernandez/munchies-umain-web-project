export const IMAGE_BASE = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';
const API_BASE = `${IMAGE_BASE}/api`;

async function fetchFromAPI(endpoint: string) {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json();
}

export const fetchRestaurants = () => fetchFromAPI('/restaurants');
export const fetchFilters = () => fetchFromAPI('/filter');
export const fetchOpenStatus = (id: string) => fetchFromAPI(`/open/${id}`);
export const fetchPriceRange = (id: string) => fetchFromAPI(`/price-range/${id}`);
