import { ArrowLeft, Check, LoaderCircle, LockKeyhole } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

const money = value => `$${value.toFixed(2)}`;

export default function Checkout() {
  const { items, total, updateQty, syncItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/pastries').then(response => syncItems(response.data)).catch(() => {});
  }, []);

  const placeOrder = async event => {
    event.preventDefault();
    if (!items.length) return;
    setSubmitting(true); setError('');
    try {
      const response = await api.post('/orders', { items: items.map(({ _id, qty }) => ({ pastry: _id, qty })), total: Number(total.toFixed(2)) });
      clearCart();
      navigate('/success', { state: { order: response.data } });
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'We could not place your order.');
      setSubmitting(false);
    }
  };

  if (!items.length) return <div className="mx-auto max-w-xl px-5 py-28 text-center"><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-butter text-2xl">✦</span><h1 className="mt-6 font-display text-5xl font-semibold">Your bag is empty.</h1><p className="mt-3 text-sm text-ink/60">Choose something lovely before checking out.</p><Link to="/" className="mt-7 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">Back to the counter</Link></div>;

  return <main className="mx-auto max-w-6xl px-5 py-12 lg:px-10 lg:py-20"><Link to="/" className="mb-10 inline-flex items-center gap-2 text-sm font-semibold text-ink/60 transition hover:text-ink"><ArrowLeft size={16} /> Back to menu</Link><div className="grid gap-12 lg:grid-cols-[1fr_390px]"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-coral">Almost yours</p><h1 className="mt-3 font-display text-6xl font-semibold leading-none">Check out<br /><em className="font-normal">the good stuff.</em></h1><div className="mt-10 divide-y divide-ink/10">{items.map(item => <div key={item._id} className="flex gap-4 py-5 first:pt-0"><img src={item.image} alt="" className="h-20 w-20 rounded-2xl object-cover" /><div className="flex-1"><div className="flex justify-between gap-4"><h2 className="font-display text-2xl font-semibold">{item.name}</h2><span className="text-sm font-semibold">{money(item.price * item.qty)}</span></div><p className="mt-1 text-sm text-ink/55">{money(item.price)} each</p><div className="mt-3 flex items-center gap-3"><button onClick={() => updateQty(item._id, item.qty - 1)} className="grid h-7 w-7 place-items-center rounded-full border border-ink/15 text-xs">−</button><span className="text-sm font-semibold">{item.qty}</span><button onClick={() => updateQty(item._id, item.qty + 1)} className="grid h-7 w-7 place-items-center rounded-full border border-ink/15 text-xs">+</button></div></div></div>)}</div></div><form onSubmit={placeOrder} className="h-fit rounded-3xl bg-white p-6 shadow-soft"><div className="flex items-center gap-2 text-sm font-semibold"><LockKeyhole size={16} className="text-coral" /> Pickup details</div><div className="mt-6 space-y-4"><label className="block text-xs font-bold uppercase tracking-wider text-ink/50">Your name<input required className="mt-2 w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-coral" placeholder="Alex Morgan" /></label><label className="block text-xs font-bold uppercase tracking-wider text-ink/50">Pickup time<select className="mt-2 w-full rounded-xl border border-ink/15 bg-cream px-4 py-3 text-sm outline-none focus:border-coral"><option>As soon as possible</option><option>In 30 minutes</option><option>In 1 hour</option></select></label></div><div className="my-6 border-t border-ink/10 pt-5"><div className="flex justify-between text-sm text-ink/60"><span>Order total</span><strong className="text-ink">{money(total)}</strong></div></div>{error && <p className="mb-4 text-xs text-coral">{error}</p>}<button disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-sm font-semibold text-white transition hover:bg-coral disabled:opacity-60">{submitting ? <><LoaderCircle size={16} className="animate-spin" /> Placing order...</> : <><Check size={16} /> Place pickup order</>}</button><p className="mt-4 text-center text-xs leading-5 text-ink/40">No payment needed today. We&apos;ll have your pastries boxed and ready.</p></form></div></main>;
}
