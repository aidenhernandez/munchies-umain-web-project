import { Header } from '../components/Header';
import { FilterSidebar } from '../components/FilterSidebar';
import { CategoryBar } from '../components/CategoryBar';
import { RestaurantList } from '../components/RestaurantList';
import { FilterSection } from '../components/FilterSection';
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

            <h2 className="font-display text-4xl mt-8 mb-6">Restaurants</h2>
            <RestaurantList
              restaurants={filteredRestaurants}
              openStatuses={openStatuses}
              layout="grid"
            />
          </div>
        </div>

        {/* Mobile layout */}
        <div className="lg:hidden">
          <div className="mb-4">
            <FilterSection
              title="Delivery Time"
              items={DELIVERY_TIMES}
              selected={selectedDeliveryTimes}
              onToggle={toggleDeliveryTime}
              layout="scroll"
            />
          </div>

          <MobileCategoryScroll
            filters={filters}
            selectedCategories={selectedCategories}
            onToggleCategory={toggleCategory}
          />

          <h2 className="font-display text-2xl mb-4">Restaurants</h2>
          <RestaurantList
            restaurants={filteredRestaurants}
            openStatuses={openStatuses}
            layout="list"
          />
        </div>
      </div>
    </div>
  );
}
