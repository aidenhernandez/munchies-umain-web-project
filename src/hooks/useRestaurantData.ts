import { useState, useEffect } from 'react';
import type { Restaurant, Filter, OpenStatus, PriceRange } from '../types';
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

export function useRestaurantData(): RestaurantData {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [openStatuses, setOpenStatuses] = useState<Record<string, boolean>>({});
  const [priceRanges, setPriceRanges] = useState<Record<string, string>>({});
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
        setRestaurants(rList);
        setFilters(fList);

        const uniquePriceIds = [...new Set(rList.map((r: Restaurant) => r.price_range_id))] as string[];

        const [openSettled, priceSettled] = await Promise.all([
          Promise.allSettled(rList.map((r: Restaurant) => fetchOpenStatus(r.id))),
          Promise.allSettled(uniquePriceIds.map((id) => fetchPriceRange(id))),
        ]);

        if (!active) return;

        const openMap: Record<string, boolean> = {};
        openSettled.forEach((result, i) => {
          openMap[rList[i].id] = result.status === 'fulfilled' ? (result.value as OpenStatus).is_open : false;
        });

        const priceMap: Record<string, string> = {};
        priceSettled.forEach((result, i) => {
          if (result.status === 'fulfilled') {
            priceMap[uniquePriceIds[i]] = (result.value as PriceRange).range;
          }
        });

        setOpenStatuses(openMap);
        setPriceRanges(priceMap);
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

  return { restaurants, filters, openStatuses, priceRanges, loading, error, retry };
}
