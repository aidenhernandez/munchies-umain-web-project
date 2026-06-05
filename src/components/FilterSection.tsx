import { FilterPill } from './FilterPill';

interface FilterSectionProps {
  title: string;
  items: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  layout?: 'column' | 'grid' | 'wrap';
}

const layoutClass = {
  column: 'flex flex-col gap-2 items-start',
  grid: 'grid grid-cols-2 gap-2',
  wrap: 'flex gap-2 flex-wrap',
};

export function FilterSection({ title, items, selected, onToggle, layout = 'column' }: FilterSectionProps) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-black/40 mb-3 font-body">
        {title}
      </p>
      <div className={layoutClass[layout]}>
        {items.map(({ label, value }) => (
          <FilterPill
            key={value}
            label={label}
            active={selected.includes(value)}
            onClick={() => onToggle(value)}
          />
        ))}
      </div>
    </div>
  );
}
