import type { Restaurant } from '../types';
import { RestaurantCard } from './RestaurantCard';

interface RestaurantListProps {
  restaurants: Restaurant[];
  openStatuses: Record<string, boolean>;
  layout: 'grid' | 'list';
}

export function RestaurantList({ restaurants, openStatuses, layout }: RestaurantListProps) {
  if (restaurants.length === 0) {
    return <p className="text-black/40 text-sm font-body">No restaurants match your filters.</p>;
  }

  const containerClass = layout === 'grid' ? 'grid grid-cols-3 gap-6' : 'flex flex-col gap-6';

  return (
    <div className={containerClass}>
      {restaurants.map((r) => (
        <RestaurantCard
          key={r.id}
          restaurant={r}
          isOpen={openStatuses[r.id] ?? false}
        />
      ))}
    </div>
  );
}
