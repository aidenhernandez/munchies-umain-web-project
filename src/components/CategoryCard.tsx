import type { Filter } from '../types';
import { buildImageUrl } from '../utils/formatters';
import { toggleClass } from '../utils/styles';

interface CategoryCardProps {
  filter: Filter;
  active: boolean;
  onToggle: (id: string) => void;
  compact?: boolean;
}

export function CategoryCard({ filter, active, onToggle, compact = false }: CategoryCardProps) {
  const size = compact ? 'h-24 pr-24' : 'h-28 pr-28';
  return (
    <button
      onClick={() => onToggle(filter.id)}
      className={`relative flex items-start pt-4 pl-4 rounded-2xl border min-w-fit transition-colors cursor-pointer overflow-hidden shrink-0 ${size} ${toggleClass(active)}`}
    >
      <span className="text-sm whitespace-nowrap">{filter.name}</span>
      <img
        src={buildImageUrl(filter.image_url)}
        alt={filter.name}
        className="absolute right-0 top-0 h-full w-auto object-contain pointer-events-none"
      />
    </button>
  );
}
