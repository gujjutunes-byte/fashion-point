import { Suspense } from 'react';
import { getAllProducts, getAllCategories } from '@/lib/getProducts';
import ShopClient from '@/components/ShopClient';

export const metadata = {
  title: 'Shop All | Fashion Point',
  description: 'Browse the full Fashion Point catalog — shirts, jeans, jackets, ethnic wear and more.',
};

export default async function ShopPage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-5 sm:px-6">
      <div className="mb-10">
        <span className="text-gold text-xs tracking-[0.35em]">THE FULL EDIT</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-2 text-bone">Shop All</h1>
      </div>
      <Suspense fallback={<p className="text-bone/50">Loading products...</p>}>
        <ShopClient products={products} categories={categories} />
      </Suspense>
    </section>
  );
}
