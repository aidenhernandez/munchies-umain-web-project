import type { Filter } from '../types';
import { DELIVERY_TIMES, PRICE_RANGES } from '../utils/filters';
import { FilterSection } from './FilterSection';

interface FilterSidebarProps {
  filters: Filter[];
  selectedCategories: string[];
  selectedDeliveryTimes: string[];
  selectedPriceRanges: string[];
  onToggleCategory: (id: string) => void;
  onToggleDeliveryTime: (value: string) => void;
  onTogglePriceRange: (value: string) => void;
}

export function FilterSidebar({
  filters,
  selectedCategories,
  selectedDeliveryTimes,
  selectedPriceRanges,
  onToggleCategory,
  onToggleDeliveryTime,
  onTogglePriceRange,
}: FilterSidebarProps) {
  return (
    <aside className="bg-white rounded-2xl border border-black/10 p-6 w-56 shrink-0 self-start flex flex-col gap-6">
      <h2 className="font-display text-2xl">Filter</h2>

      <FilterSection
        title="Food Category"
        items={filters.map((f) => ({ label: f.name, value: f.id }))}
        selected={selectedCategories}
        onToggle={onToggleCategory}
        layout="column"
      />

      <FilterSection
        title="Delivery Time"
        items={DELIVERY_TIMES}
        selected={selectedDeliveryTimes}
        onToggle={onToggleDeliveryTime}
        layout="grid"
      />

      <FilterSection
        title="Price Range"
        items={PRICE_RANGES.map((r) => ({ label: r, value: r }))}
        selected={selectedPriceRanges}
        onToggle={onTogglePriceRange}
        layout="wrap"
      />
    </aside>
  );
}
