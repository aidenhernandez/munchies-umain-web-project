import { useState, useEffect } from 'react';
import type { Restaurant, Filter } from '../types';
import { fetchRestaurants, fetchFilters, fetchOpenStatus, fetchPriceRange } from '../api/client';

interface RestaurantData {
  restaurants: Restaurant[];
  filters: Filter[];
  openStatuses: Record<string, boolean>;
  priceRanges: Record<string, string>;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

interface DataState {
  restaurants: Restaurant[];
  filters: Filter[];
  openStatuses: Record<string, boolean>;
  priceRanges: Record<string, string>;
}

const initialData: DataState = {
  restaurants: [],
  filters: [],
  openStatuses: {},
  priceRanges: {},
};

export function useRestaurantData(): RestaurantData {
  const [data, setData] = useState<DataState>(initialData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function fetchData() {
      try {
        const [{ restaurants: rList }, { filters: fList }] = await Promise.all([
          fetchRestaurants(),
          fetchFilters(),
        ]);

        if (!active) return;

        const uniquePriceIds = [...new Set(rList.map((r) => r.price_range_id))];

        const [openSettled, priceSettled] = await Promise.all([
          Promise.allSettled(rList.map((r) => fetchOpenStatus(r.id))),
          Promise.allSettled(uniquePriceIds.map((id) => fetchPriceRange(id))),
        ]);

        if (!active) return;

        const openStatuses: Record<string, boolean> = {};
        openSettled.forEach((result, i) => {
          openStatuses[rList[i].id] = result.status === 'fulfilled' ? result.value.is_open : false;
        });

        const priceRanges: Record<string, string> = {};
        priceSettled.forEach((result, i) => {
          if (result.status === 'fulfilled') {
            priceRanges[uniquePriceIds[i]] = result.value.range;
          }
        });

        setData({ restaurants: rList, filters: fList, openStatuses, priceRanges });
      } catch {
        if (active) setError('Failed to load restaurants. Please try again.');
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchData();

    return () => { active = false; };
  }, [retryCount]);

  const retry = () => {
    setLoading(true);
    setError(null);
    setRetryCount((c) => c + 1);
  };

  return { ...data, loading, error, retry };
}
