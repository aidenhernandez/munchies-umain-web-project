import type { Filter } from '../types';
import { IMAGE_BASE } from '../api/client';

interface CategoryBarProps {
  filters: Filter[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
}

export function CategoryBar({ filters, selectedCategories, onToggleCategory }: CategoryBarProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
      {filters.map((filter) => {
        const active = selectedCategories.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => onToggleCategory(filter.id)}
            className={`relative flex items-start pt-4 pl-4 pr-28 h-28 rounded-2xl border min-w-fit transition-colors cursor-pointer overflow-hidden ${
              active
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black/10 hover:border-black/30'
            }`}
          >
            <span className="text-sm whitespace-nowrap">{filter.name}</span>
            <img
              src={`${IMAGE_BASE}${filter.image_url}`}
              alt={filter.name}
              className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none"
            />
          </button>
        );
      })}
    </div>
  );
}
