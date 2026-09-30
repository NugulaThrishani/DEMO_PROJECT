import { useEffect, useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import Hero from '../components/Hero';
import NearbyShops from '../components/NearbyShops';
import PastryCard from '../components/PastryCard';
import { useCart } from '../context/CartContext';

export default function Landing({ onCartOpen }) {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [pastries, setPastries] = useState([]);
  const [status, setStatus] = useState('loading');
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get('/pastries').then(response => { setPastries(response.data); setStatus('success'); }).catch(() => setStatus('error'));
  }, []);

  const showAdded = () => { setAdded(true); window.setTimeout(() => setAdded(false), 1800); };
  const buyNow = (pastry, qty) => {
    addItem(pastry, qty);
    navigate('/checkout');
  };

  return <><Hero /><main id="menu" className="mx-auto max-w-7xl px-5 py-16 lg:px-10 lg:py-24"><div className="mb-10 flex items-end justify-between gap-5"><div><p className="text-xs font-bold uppercase tracking-[.22em] text-coral">From the counter</p><h2 className="mt-3 font-display text-5xl font-semibold leading-none sm:text-6xl">Made for the<br /><em className="font-normal">sweet tooth.</em></h2></div><span className="hidden items-center gap-1 pb-1 text-sm text-ink/50 sm:flex">7 fresh favorites <ChevronRight size={16} /></span></div>{status === 'loading' && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{[1, 2, 3, 4, 5, 6].map(item => <div key={item} className="h-[430px] animate-pulse rounded-3xl bg-blush" />)}</div>}{status === 'error' && <div className="rounded-3xl border border-coral/30 bg-blush p-8 text-center text-sm text-ink/70">We couldn&apos;t reach the pastry counter. Make sure the API is running, then refresh.</div>}{status === 'success' && <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{pastries.map(pastry => <PastryCard key={pastry._id} pastry={pastry} onAdded={showAdded} onBuyNow={buyNow} />)}</div>}</main><NearbyShops />{added && <div className="fixed bottom-6 left-1/2 z-40 -translate-x-1/2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white shadow-soft">Added to your little bag</div>}</>;
}
