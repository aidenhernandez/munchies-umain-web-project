import { useState, useEffect, useMemo } from 'react';
import { Header } from '../components/Header';
import { FilterSidebar } from '../components/FilterSidebar';
import { CategoryBar } from '../components/CategoryBar';
import { RestaurantCard } from '../components/RestaurantCard';
import { FilterPill } from '../components/FilterPill';
import type { Restaurant, Filter, OpenStatus, PriceRange } from '../types';
import { fetchRestaurants, fetchFilters, fetchOpenStatus, fetchPriceRange, IMAGE_BASE } from '../api/client';

const DELIVERY_TIMES = [
  { label: '0-10 min', value: '0-10' },
  { label: '10-30 min', value: '10-30' },
  { label: '30-60 min', value: '30-60' },
  { label: '1 hour+', value: '60+' },
];

function toggle(value: string, current: string[]): string[] {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
}

function matchesDeliveryTime(minutes: number, bucket: string): boolean {
  if (bucket === '0-10') return minutes <= 10;
  if (bucket === '10-30') return minutes > 10 && minutes <= 30;
  if (bucket === '30-60') return minutes > 30 && minutes <= 60;
  if (bucket === '60+') return minutes > 60;
  return false;
}

export function MainPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filters, setFilters] = useState<Filter[]>([]);
  const [openStatuses, setOpenStatuses] = useState<Record<string, boolean>>({});
  const [priceRanges, setPriceRanges] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDeliveryTimes, setSelectedDeliveryTimes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
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

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter((r) => {
      if (
        selectedCategories.length > 0 &&
        !r.filter_ids.some((id) => selectedCategories.includes(id))
      ) {
        return false;
      }
      if (
        selectedDeliveryTimes.length > 0 &&
        !selectedDeliveryTimes.some((t) => matchesDeliveryTime(r.delivery_time_minutes, t))
      ) {
        return false;
      }
      if (selectedPriceRanges.length > 0) {
        const range = priceRanges[r.price_range_id];
        if (!range || !selectedPriceRanges.includes(range)) return false;
      }
      return true;
    });
  }, [restaurants, selectedCategories, selectedDeliveryTimes, selectedPriceRanges, priceRanges]);

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <p className="text-black/40 font-body text-sm">Loading restaurants...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-surface flex flex-col items-center justify-center gap-4">
        <p className="text-black/60 font-body text-sm">{error}</p>
        <button
          onClick={() => { setLoading(true); setError(null); setRetryCount(c => c + 1); }}
          className="px-5 py-2 bg-brand text-white rounded-full text-sm font-body hover:bg-brand/80 transition-colors cursor-pointer"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <Header />

      <div className="px-6 pb-10">
        {/* Desktop layout */}
        <div className="hidden lg:flex gap-8 items-start">
          <FilterSidebar
            filters={filters}
            selectedCategories={selectedCategories}
            selectedDeliveryTimes={selectedDeliveryTimes}
            selectedPriceRanges={selectedPriceRanges}
            onToggleCategory={(id) => setSelectedCategories((prev) => toggle(id, prev))}
            onToggleDeliveryTime={(v) => setSelectedDeliveryTimes((prev) => toggle(v, prev))}
            onTogglePriceRange={(v) => setSelectedPriceRanges((prev) => toggle(v, prev))}
          />

          <div className="flex-1 min-w-0">
            <CategoryBar
              filters={filters}
              selectedCategories={selectedCategories}
              onToggleCategory={(id) => setSelectedCategories((prev) => toggle(id, prev))}
            />

            <h2 className="font-display text-4xl mt-8 mb-6">Restaurant's</h2>

            {filteredRestaurants.length === 0 ? (
              <p className="text-black/40 text-sm font-body">No restaurants match your filters.</p>
            ) : (
              <div className="grid grid-cols-3 gap-6">
                {filteredRestaurants.map((r) => (
                  <RestaurantCard
                    key={r.id}
                    restaurant={r}
                    isOpen={openStatuses[r.id] ?? false}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-widest text-black/40 mb-2 font-body">
              Delivery Time
            </p>
            <div className="flex gap-2 overflow-x-auto scrollbar-none pb-1">
              {DELIVERY_TIMES.map(({ label, value }) => (
                <FilterPill
                  key={value}
                  label={label}
                  active={selectedDeliveryTimes.includes(value)}
                  onClick={() => setSelectedDeliveryTimes((prev) => toggle(value, prev))}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 mb-6">
            {filters.map((filter) => {
              const active = selectedCategories.includes(filter.id);
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategories((prev) => toggle(filter.id, prev))}
                  className={`relative flex items-start pt-4 pl-4 pr-24 h-24 rounded-2xl border min-w-fit overflow-hidden transition-colors cursor-pointer shrink-0 ${
                    active
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black/10'
                  }`}
                >
                  <span className="text-sm font-body whitespace-nowrap">{filter.name}</span>
                  <img
                    src={`${IMAGE_BASE}${filter.image_url}`}
                    alt={filter.name}
                    className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none"
                  />
                </button>
              );
            })}
          </div>

          <h2 className="font-display text-2xl mb-4">Restaurant's</h2>

          {filteredRestaurants.length === 0 ? (
            <p className="text-black/40 text-sm font-body">No restaurants match your filters.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {filteredRestaurants.map((r) => (
                <RestaurantCard
                  key={r.id}
                  restaurant={r}
                  isOpen={openStatuses[r.id] ?? false}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
