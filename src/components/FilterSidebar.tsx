import type { Filter } from '../types';
import { FilterPill } from './FilterPill';

const DELIVERY_TIMES = [
  { label: '0-10 min', value: '0-10' },
  { label: '10-30 min', value: '10-30' },
  { label: '30-60 min', value: '30-60' },
  { label: '1 hour+', value: '60+' },
];

const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'];

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
    <aside className="bg-white rounded-2xl border border-black/10 p-6 w-56 shrink-0 self-start">
      <h2 className="font-display text-2xl mb-6">Filter</h2>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-black/40 mb-3 font-body">
          Food Category
        </p>
        <div className="flex flex-col gap-2 items-start">
          {filters.map((filter) => (
            <FilterPill
              key={filter.id}
              label={filter.name}
              active={selectedCategories.includes(filter.id)}
              onClick={() => onToggleCategory(filter.id)}
            />
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="text-xs uppercase tracking-widest text-black/40 mb-3 font-body">
          Delivery Time
        </p>
        <div className="grid grid-cols-2 gap-2">
          {DELIVERY_TIMES.map(({ label, value }) => (
            <FilterPill
              key={value}
              label={label}
              active={selectedDeliveryTimes.includes(value)}
              onClick={() => onToggleDeliveryTime(value)}
            />
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs uppercase tracking-widest text-black/40 mb-3 font-body">
          Price Range
        </p>
        <div className="flex gap-2 flex-wrap">
          {PRICE_RANGES.map((range) => (
            <FilterPill
              key={range}
              label={range}
              active={selectedPriceRanges.includes(range)}
              onClick={() => onTogglePriceRange(range)}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}
