import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Navbar from './components/Navbar';
import Checkout from './pages/Checkout';
import Landing from './pages/Landing';
import OrderSuccess from './pages/OrderSuccess';

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return <div className="min-h-screen bg-cream text-ink"><Navbar onCartOpen={() => setCartOpen(true)} /><Routes><Route path="/" element={<Landing onCartOpen={() => setCartOpen(true)} />} /><Route path="/checkout" element={<Checkout />} /><Route path="/success" element={<OrderSuccess />} /></Routes><CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} /><footer className="border-t border-ink/10 px-5 py-8 text-center text-xs text-ink/45">Petal & Crumb · baked with care, shared with joy</footer></div>;
}
