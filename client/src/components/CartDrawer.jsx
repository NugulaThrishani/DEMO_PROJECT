import { ArrowRight, Minus, Plus, ShoppingBag, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const money = value => `$${value.toFixed(2)}`;

export default function CartDrawer({ open, onClose }) {
  const { items, total, updateQty, removeItem } = useCart();

  return <>
    {open && <button aria-label="Close cart" onClick={onClose} className="fixed inset-0 z-40 cursor-default bg-ink/30 backdrop-blur-sm" />}
    <aside className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${open ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex items-center justify-between border-b border-ink/10 px-6 py-5"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-coral">Your order</p><h2 className="mt-1 font-display text-3xl font-semibold">The little bag</h2></div><button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 transition hover:bg-white" aria-label="Close cart"><X size={18} /></button></div>
      <div className="flex-1 overflow-y-auto px-6 py-5">
        {items.length === 0 ? <div className="grid h-full place-items-center text-center"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-butter text-2xl">✦</span><h3 className="mt-5 font-display text-2xl font-semibold">Your bag is waiting</h3><p className="mt-2 text-sm text-ink/55">Add something lovely from the counter.</p><button onClick={onClose} className="mt-5 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">Browse pastries</button></div></div> : <div className="space-y-5">{items.map(item => <div key={item._id} className="flex gap-3"><img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><div><h3 className="font-display text-xl font-semibold leading-none">{item.name}</h3><p className="mt-1 text-sm text-ink/55">{money(item.price)}</p></div><button onClick={() => removeItem(item._id)} className="text-xs text-ink/40 hover:text-coral">Remove</button></div><div className="mt-3 flex items-center justify-between"><div className="flex items-center rounded-full border border-ink/15 p-1"><button onClick={() => updateQty(item._id, item.qty - 1)} className="grid h-6 w-6 place-items-center" aria-label="Decrease quantity"><Minus size={13} /></button><span className="w-6 text-center text-xs font-semibold">{item.qty}</span><button onClick={() => updateQty(item._id, item.qty + 1)} className="grid h-6 w-6 place-items-center" aria-label="Increase quantity"><Plus size={13} /></button></div><span className="text-sm font-semibold">{money(item.price * item.qty)}</span></div></div></div>)}</div>}
      </div>
      {items.length > 0 && <div className="border-t border-ink/10 bg-white/50 p-6"><div className="flex justify-between text-sm text-ink/60"><span>Subtotal</span><span className="font-semibold text-ink">{money(total)}</span></div><Link to="/checkout" onClick={onClose} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white transition hover:bg-coral">Continue to checkout <ArrowRight size={16} /></Link><p className="mt-3 text-center text-xs text-ink/40">Pickup is free · made fresh for you</p></div>}
    </aside>
  </>;
}
