import type { Filter } from '../types';
import { buildImageUrl } from '../utils/formatters';

interface MobileCategoryScrollProps {
  filters: Filter[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
}

export function MobileCategoryScroll({ filters, selectedCategories, onToggleCategory }: MobileCategoryScrollProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 mb-6">
      {filters.map((filter) => {
        const active = selectedCategories.includes(filter.id);
        return (
          <button
            key={filter.id}
            onClick={() => onToggleCategory(filter.id)}
            className={`relative flex items-start pt-4 pl-4 pr-24 h-24 rounded-2xl border min-w-fit overflow-hidden transition-colors cursor-pointer shrink-0 ${
              active
                ? 'bg-black text-white border-black'
                : 'bg-white text-black border-black/10'
            }`}
          >
            <span className="text-sm font-body whitespace-nowrap">{filter.name}</span>
            <img
              src={buildImageUrl(filter.image_url)}
              alt={filter.name}
              className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none"
            />
          </button>
        );
      })}
    </div>
  );
}
