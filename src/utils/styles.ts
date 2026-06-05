export function toggleClass(active: boolean): string {
  return active
    ? 'bg-black text-white border-black'
    : 'bg-white text-black border-black/10 hover:border-black/30';
}
