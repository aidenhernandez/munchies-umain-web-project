import { ArrowRight } from 'lucide-react';
import type { Restaurant } from '../types';
import { IMAGE_BASE } from '../api/client';

function formatDeliveryTime(minutes: number): string {
  if (minutes >= 60) return '1 hour+';
  return `${minutes} min`;
}

interface RestaurantCardProps {
  restaurant: Restaurant;
  isOpen: boolean;
}

export function RestaurantCard({ restaurant, isOpen }: RestaurantCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-black/10 px-4 pt-4 pb-4 flex flex-col h-70 overflow-hidden">
      <img
        src={`${IMAGE_BASE}${restaurant.image_url}`}
        alt={restaurant.name}
        className={`absolute right-0 -top-8 -mr-8 h-40 w-auto object-contain z-10 pointer-events-none ${!isOpen ? 'opacity-40' : ''}`}
      />
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-black/10 text-xs">
            <span className={`w-2 h-2 rounded-full shrink-0 ${isOpen ? 'bg-brand' : 'bg-black'}`} />
            {isOpen ? 'Open' : 'Closed'}
          </span>
          {isOpen && (
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-white border border-black/10 text-xs">
              {formatDeliveryTime(restaurant.delivery_time_minutes)}
            </span>
          )}
        </div>

        <div className="flex-1 flex items-center justify-center">
          {!isOpen && (
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg border border-black/10 text-xs bg-white">
              Opens tomorrow at 12 pm
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className={`font-display text-2xl leading-tight ${isOpen ? 'text-black' : 'text-black/30'}`}>
            {restaurant.name}
          </span>
          <button
            disabled={!isOpen}
            className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${
              isOpen ? 'bg-brand hover:bg-brand/80 cursor-pointer' : 'bg-brand/30 cursor-default'
            }`}
          >
            <ArrowRight className="text-white w-4 h-4" />
          </button>
        </div>
      </div>
  );
}

