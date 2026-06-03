import { useState, useMemo } from 'react';
import type { Restaurant } from '../types';
import { toggle, matchesDeliveryTime } from '../utils/filters';

interface FilterState {
  selectedCategories: string[];
  selectedDeliveryTimes: string[];
  selectedPriceRanges: string[];
  filteredRestaurants: Restaurant[];
  toggleCategory: (id: string) => void;
  toggleDeliveryTime: (value: string) => void;
  togglePriceRange: (value: string) => void;
}

export function useFilterState(
  restaurants: Restaurant[],
  priceRanges: Record<string, string>
): FilterState {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      if (
        selectedCategories.length > 0 &&
        !r.filter_ids.some((id) => selectedCategories.includes(id))
      ) return false;

      if (
        selectedDeliveryTimes.length > 0 &&
        !selectedDeliveryTimes.some((t) => matchesDeliveryTime(r.delivery_time_minutes, t))
      ) return false;

      if (selectedPriceRanges.length > 0) {
        const range = priceRanges[r.price_range_id];
        if (!range || !selectedPriceRanges.includes(range)) return false;
      }

      return true;
    });
  }, [restaurants, selectedCategories, selectedDeliveryTimes, selectedPriceRanges, priceRanges]);

  return {
    selectedCategories,
    selectedDeliveryTimes,
    selectedPriceRanges,
    filteredRestaurants,
    toggleCategory: (id) => setSelectedCategories((prev) => toggle(id, prev)),
    toggleDeliveryTime: (value) => setSelectedDeliveryTimes((prev) => toggle(value, prev)),
    togglePriceRange: (value) => setSelectedPriceRanges((prev) => toggle(value, prev)),
  };
}
