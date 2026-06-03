import { IMAGE_BASE } from '../api/client';

export function formatDeliveryTime(minutes: number): string {
  if (minutes >= 60) return '1 hour+';
  return `${minutes} min`;
}

export function buildImageUrl(path: string): string {
  return `${IMAGE_BASE}${path}`;
}
