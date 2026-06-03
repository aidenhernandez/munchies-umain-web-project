export const PRICE_RANGES = ['$', '$$', '$$$', '$$$$'];

export const DELIVERY_TIMES = [
  { label: '0-10 min', value: '0-10' },
  { label: '10-30 min', value: '10-30' },
  { label: '30-60 min', value: '30-60' },
  { label: '1 hour+', value: '60+' },
];

export function toggle(value: string, current: string[]): string[] {
  return current.includes(value)
    ? current.filter((v) => v !== value)
    : [...current, value];
}

export function matchesDeliveryTime(minutes: number, bucket: string): boolean {
  if (bucket === '0-10') return minutes <= 10;
  if (bucket === '10-30') return minutes > 10 && minutes <= 30;
  if (bucket === '30-60') return minutes > 30 && minutes <= 60;
  if (bucket === '60+') return minutes > 60;
  return false;
}
