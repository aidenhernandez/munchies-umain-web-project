import type { Filter } from '../types';
import { CategoryCard } from './CategoryCard';

interface CategoryBarProps {
  filters: Filter[];
  selectedCategories: string[];
  onToggleCategory: (id: string) => void;
}

export function CategoryBar({ filters, selectedCategories, onToggleCategory }: CategoryBarProps) {
  return (
    <div className="flex gap-3 overflow-x-auto scrollbar-none pb-2">
      {filters.map((filter) => (
        <CategoryCard
          key={filter.id}
          filter={filter}
          active={selectedCategories.includes(filter.id)}
          onToggle={onToggleCategory}
        />
      ))}
    </div>
  );
}
