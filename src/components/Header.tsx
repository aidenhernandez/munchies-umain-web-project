import logo from '../assets/logo.png';

interface HeaderProps {
  inverted?: boolean;
}

export function Header({ inverted = false }: HeaderProps) {
  return (
    <header className="p-6">
      <img
        src={logo}
        alt="Munchies"
        className={`h-7 w-auto ${inverted ? 'brightness-0 invert' : ''}`}
      />
    </header>
  );
}
