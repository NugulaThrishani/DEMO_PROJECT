import { Minus, Plus, ShoppingBag, Star } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const money = value => `$${value.toFixed(2)}`;

export default function PastryCard({ pastry, onAdded, onBuyNow }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();

  const addToBag = () => {
    addItem(pastry, qty);
    onAdded?.();
  };

  return (
    <article className="group overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-soft transition duration-300 hover:-translate-y-1">
      <div className="relative aspect-[1.08] overflow-hidden bg-blush">
        <img src={pastry.image} alt={pastry.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" loading="lazy" />
        <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-ink/70 backdrop-blur">{pastry.category}</span>
        <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1.5 text-xs font-semibold backdrop-blur"><Star size={12} fill="currentColor" className="text-coral" /> {pastry.rating}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div><h3 className="font-display text-2xl font-semibold leading-none">{pastry.name}</h3><p className="mt-2 text-sm leading-5 text-ink/55">{pastry.description}</p></div>
          <span className="font-display text-xl font-semibold text-coral">{money(pastry.price)}</span>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-ink/10 pt-4">
          <div className="flex items-center rounded-full border border-ink/15 p-1">
            <button onClick={() => setQty(value => Math.max(1, value - 1))} className="grid h-7 w-7 place-items-center rounded-full text-ink/60 transition hover:bg-blush hover:text-ink" aria-label={`Decrease ${pastry.name} quantity`}><Minus size={14} /></button>
            <span className="w-7 text-center text-sm font-semibold">{qty}</span>
            <button onClick={() => setQty(value => value + 1)} className="grid h-7 w-7 place-items-center rounded-full text-ink/60 transition hover:bg-blush hover:text-ink" aria-label={`Increase ${pastry.name} quantity`}><Plus size={14} /></button>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={addToBag} className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-2.5 text-xs font-semibold transition hover:border-ink hover:bg-blush"><ShoppingBag size={14} /> Add to cart</button>
            <button onClick={() => onBuyNow(pastry, qty)} className="rounded-full bg-ink px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-coral">Buy now</button>
          </div>
        </div>
      </div>
    </article>
  );
}
