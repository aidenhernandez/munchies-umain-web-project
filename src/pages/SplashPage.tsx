import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';

export function SplashPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand flex flex-col p-6">
      <Header inverted />

      <div className="flex-1 flex flex-col justify-center gap-4">
        <h1 className="font-display font-bold text-white text-5xl leading-tight tracking-tight">
          Treat<br />yourself.
        </h1>
        <p className="text-white/80 text-sm leading-relaxed max-w-xs font-body">
          Find the best restaurants in your city and get it delivered to your place!
        </p>
      </div>

      <button
        onClick={() => navigate('/restaurants')}
        className="w-full py-4 rounded-2xl border-2 border-white text-white font-semibold text-sm tracking-wide hover:bg-white hover:text-brand transition-colors cursor-pointer"
      >
        Continue
      </button>
    </div>
  );
}
