import { ArrowDown, Clock3 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-blush">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-14 lg:grid-cols-[1.05fr_.95fr] lg:px-10 lg:pb-24 lg:pt-20">
        <div className="relative z-10 max-w-2xl animate-rise">
          <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.22em] text-coral"><span className="h-px w-8 bg-coral" /> Small-batch, big feeling</p>
          <h1 className="font-display text-6xl font-semibold leading-[.88] tracking-tight text-ink sm:text-8xl">A little<br /><em className="font-normal text-coral">sweetness</em><br />in your day.</h1>
          <p className="mt-7 max-w-md text-base leading-7 text-ink/65">Thoughtful pastries, baked with good butter and better intentions. Pick your favorite, we&apos;ll have it waiting.</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a href="#menu" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-coral">Shop the counter <ArrowDown size={16} /></a>
            <span className="flex items-center gap-2 text-sm text-ink/60"><Clock3 size={16} className="text-coral" /> Ready in about 15 minutes</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-[560px] animate-float">
          <div className="absolute -left-6 top-12 h-24 w-24 rounded-full border border-coral/40 sm:-left-10 sm:h-36 sm:w-36" />
          <div className="relative aspect-[.95] overflow-hidden rounded-[48%_52%_45%_55%/45%_45%_55%_55%] border-[10px] border-cream shadow-soft">
            <img src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=90" alt="Golden croissants fresh from the oven" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-3 -right-2 flex max-w-[190px] items-center gap-3 rounded-2xl bg-white p-3 shadow-soft sm:bottom-4 sm:-right-8">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-butter text-lg">✺</span>
            <span className="text-xs leading-5 text-ink/65"><strong className="block text-sm text-ink">Today&apos;s little joy</strong>pistachio cloud</span>
          </div>
        </div>
      </div>
      <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-butter/45 blur-2xl" />
    </section>
  );
}
