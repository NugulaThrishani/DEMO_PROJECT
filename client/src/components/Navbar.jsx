import { ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar({ onCartOpen }) {
  const { totalItems } = useCart();

  return (
    <header className="relative z-30 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        <Link to="/" className="flex items-center gap-3" aria-label="Petal and Crumb home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-coral text-lg text-white">✦</span>
          <span className="font-display text-2xl font-semibold tracking-tight">petal & crumb</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-ink/70 md:flex">
          <a href="#menu" className="transition hover:text-ink">The menu</a>
          <a href="#visit" className="transition hover:text-ink">Visit us</a>
          <span className="h-1 w-1 rounded-full bg-coral" />
          <span>Made fresh today</span>
        </nav>
        <button onClick={onCartOpen} className="relative flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-sm font-semibold transition hover:border-ink hover:bg-white" aria-label="Open shopping bag">
          <ShoppingBag size={17} strokeWidth={1.8} />
          <span className="hidden sm:inline">Bag</span>
          {totalItems > 0 && <span className="grid h-5 min-w-5 place-items-center rounded-full bg-ink px-1 text-[11px] text-white">{totalItems}</span>}
        </button>
      </div>
    </header>
  );
}
