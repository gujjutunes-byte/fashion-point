'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'shirts', label: 'Shirts' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'jeans', label: 'Jeans' },
];

export default function BestSellersClient({ products }) {
  const [tab, setTab] = useState('all');
  const filtered = tab === 'all' ? products : products.filter((p) => p.category === tab);

  return (
    <>
      <div className="flex gap-2 mb-8">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 rounded-full text-xs tracking-widest border transition ${
              tab === t.id ? 'bg-gold text-ink border-gold' : 'border-gold/30 text-bone/70'
            }`}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
}
