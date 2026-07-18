import CategoryGrid from '@/components/CategoryGrid';
import { getAllCategories } from '@/lib/getProducts';

export const metadata = { title: 'Categories | Fashion Point' };

export default async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <section className="py-16 sm:py-20 max-w-7xl mx-auto px-5 sm:px-6">
      <div className="mb-12">
        <span className="text-gold text-xs tracking-[0.35em]">SHOP BY</span>
        <h1 className="font-display text-4xl sm:text-5xl mt-2 text-bone">All Categories</h1>
      </div>
      <CategoryGrid categories={categories} />
    </section>
  );
}
