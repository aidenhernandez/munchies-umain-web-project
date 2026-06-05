import type { Restaurant, Filter, OpenStatus, PriceRange } from '../types';

export const IMAGE_BASE = 'https://work-test-web-2024-eze6j4scpq-lz.a.run.app';
const API_BASE = `${IMAGE_BASE}/api`;

async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`);
  if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
  return res.json() as Promise<T>;
}

export const fetchRestaurants = () => fetchFromAPI<{ restaurants: Restaurant[] }>('/restaurants');
export const fetchFilters = () => fetchFromAPI<{ filters: Filter[] }>('/filter');
export const fetchOpenStatus = (id: string) => fetchFromAPI<OpenStatus>(`/open/${id}`);
export const fetchPriceRange = (id: string) => fetchFromAPI<PriceRange>(`/price-range/${id}`);
