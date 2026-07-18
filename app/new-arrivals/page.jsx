import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/getProducts';

export const metadata = { title: 'New Arrivals | Fashion Point' };

export default async function NewArrivalsPage() {
  const products = await getAllProducts();
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-5 sm:px-6">
      <div className="mb-12">
        <span className="text-gold text-xs tracking-[0.35em]">JUST DROPPED</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-2 text-bone">New Arrivals</h1>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
        {newArrivals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
