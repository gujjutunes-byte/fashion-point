'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from './ProductCard';

export default function ShopClient({ products, categories }) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialSearch = searchParams.get('q') || '';

  const [activeCategories, setActiveCategories] = useState(initialCategory ? [initialCategory] : []);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeColors, setActiveColors] = useState([]);
  const [activeBrands, setActiveBrands] = useState([]);
  const [maxPrice, setMaxPrice] = useState(9000);
  const [search, setSearch] = useState(initialSearch);

  const allSizes = useMemo(() => [...new Set(products.flatMap((p) => p.sizes))], [products]);
  const allColors = useMemo(() => [...new Set(products.map((p) => p.color))], [products]);
  const allBrands = useMemo(() => [...new Set(products.map((p) => p.brand))], [products]);

  function toggle(list, setList, value) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = products.filter((p) => {
    if (activeCategories.length && !activeCategories.includes(p.category)) return false;
    if (activeSizes.length && !p.sizes.some((s) => activeSizes.includes(s))) return false;
    if (activeColors.length && !activeColors.includes(p.color)) return false;
    if (activeBrands.length && !activeBrands.includes(p.brand)) return false;
    if (p.price > maxPrice) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  function resetFilters() {
    setActiveCategories([]);
    setActiveSizes([]);
    setActiveColors([]);
    setActiveBrands([]);
    setMaxPrice(9000);
    setSearch('');
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <aside className="lg:w-64 shrink-0">
        <div className="glass rounded-2xl p-6 lg:sticky lg:top-28">
          <h3 className="font-display text-xl text-gold mb-5">Filters</h3>

          <div className="mb-6">
            <p className="text-sm tracking-widest text-bone/70 mb-3">SEARCH</p>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm text-bone outline-none focus:border-gold/60"
            />
          </div>

          <div className="mb-6">
            <p className="text-sm tracking-widest text-bone/70 mb-3">CATEGORY</p>
            <div className="flex flex-col gap-2 text-sm text-bone/70">
              {categories.map((c) => (
                <label key={c.id} className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
                  <input
                    type="checkbox"
                    checked={activeCategories.includes(c.id)}
                    onChange={() => toggle(activeCategories, setActiveCategories, c.id)}
                    className="accent-[#c9a04a] w-4 h-4"
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm tracking-widest text-bone/70 mb-3">SIZE</p>
            <div className="flex flex-wrap gap-2">
              {allSizes.map((s) => (
                <button
                  key={s}
                  onClick={() => toggle(activeSizes, setActiveSizes, s)}
                  className={`text-xs rounded-full px-3 py-1.5 border transition ${
                    activeSizes.includes(s) ? 'bg-gold text-ink border-gold' : 'border-gold/30 text-bone/60'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm tracking-widest text-bone/70 mb-3">COLOR</p>
            <div className="flex flex-wrap gap-2">
              {allColors.map((c) => (
                <button
                  key={c}
                  onClick={() => toggle(activeColors, setActiveColors, c)}
                  className={`text-xs rounded-full px-3 py-1.5 border transition ${
                    activeColors.includes(c) ? 'bg-gold text-ink border-gold' : 'border-gold/30 text-bone/60'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <p className="text-sm tracking-widest text-bone/70 mb-3">BRAND</p>
            <div className="flex flex-col gap-2 text-sm text-bone/70">
              {allBrands.map((b) => (
                <label key={b} className="flex items-center gap-2 cursor-pointer hover:text-gold transition">
                  <input
                    type="checkbox"
                    checked={activeBrands.includes(b)}
                    onChange={() => toggle(activeBrands, setActiveBrands, b)}
                    className="accent-[#c9a04a] w-4 h-4"
                  />
                  {b}
                </label>
              ))}
            </div>
          </div>

          <div className="mb-2">
            <p className="text-sm tracking-widest text-bone/70 mb-3">
              MAX PRICE: <span className="text-gold">₹{maxPrice}</span>
            </p>
            <input
              type="range"
              min={500}
              max={9000}
              step={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#c9a04a]"
            />
          </div>

          <button
            onClick={resetFilters}
            className="mt-4 w-full text-xs tracking-widest text-gold border border-gold/40 rounded-full py-2.5 hover:bg-gold/10 transition"
          >
            CLEAR FILTERS
          </button>
        </div>
      </aside>

      <div className="flex-1">
        <p className="text-bone/50 text-sm mb-4">{filtered.length} products</p>
        {filtered.length === 0 ? (
          <p className="text-center text-bone/50 py-16 font-display text-2xl">No products match your filters.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
