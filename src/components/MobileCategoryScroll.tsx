import type { Filter } from '../types';
import { CategoryCard } from './CategoryCard';

interface MobileCategoryScrollProps {
  filters: Filter[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
}

export function MobileCategoryScroll({ filters, selectedCategories, onToggleCategory }: MobileCategoryScrollProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2 mb-6">
      {filters.map((filter) => (
        <CategoryCard
          key={filter.id}
          filter={filter}
          active={selectedCategories.includes(filter.id)}
          onToggle={onToggleCategory}
          compact
        />
      ))}
    </div>
  );
}
