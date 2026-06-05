import { toggleClass } from '../utils/styles';

interface FilterPillProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

export function FilterPill({ label, active, onClick }: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-sm transition-colors whitespace-nowrap cursor-pointer ${toggleClass(active)}`}
    >
      {label}
    </button>
  );
}
