import { Header } from '../components/Header';
import { FilterSidebar } from '../components/FilterSidebar';
import { CategoryBar } from '../components/CategoryBar';
import { RestaurantCard } from '../components/RestaurantCard';
import { FilterPill } from '../components/FilterPill';
import { MobileCategoryScroll } from '../components/MobileCategoryScroll';
import { useRestaurantData } from '../hooks/useRestaurantData';
import { useFilterState } from '../hooks/useFilterState';
import { DELIVERY_TIMES } from '../utils/filters';

export function MainPage() {
  const { restaurants, filters, openStatuses, priceRanges, loading, error, retry } = useRestaurantData();
  const {
    selectedCategories,
    selectedDeliveryTimes,
    selectedPriceRanges,
    filteredRestaurants,
    toggleCategory,
    toggleDeliveryTime,
    togglePriceRange,
  } = useFilterState(restaurants, priceRanges);

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
          onClick={retry}
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
            onToggleCategory={toggleCategory}
            onToggleDeliveryTime={toggleDeliveryTime}
            onTogglePriceRange={togglePriceRange}
          />

          <div className="flex-1 min-w-0">
            <CategoryBar
              filters={filters}
              selectedCategories={selectedCategories}
              onToggleCategory={toggleCategory}
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
                  onClick={() => toggleDeliveryTime(value)}
                />
              ))}
            </div>
          </div>

          <MobileCategoryScroll
            filters={filters}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />

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
