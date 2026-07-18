import BestSellersClient from '@/components/BestSellersClient';
import { getAllProducts } from '@/lib/getProducts';

export const metadata = { title: 'Best Sellers | Fashion Point' };

export default async function BestSellersPage() {
  const products = await getAllProducts();
  const bestSellers = products.filter((p) => p.bestSeller);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-5 sm:px-6">
      <div className="mb-8">
        <span className="text-gold text-xs tracking-[0.35em]">CUSTOMER FAVOURITES</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-2 text-bone">Best Sellers</h1>
      </div>
      <BestSellersClient products={bestSellers} />
    </section>
  );
}
