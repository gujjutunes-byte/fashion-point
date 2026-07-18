import Image from 'next/image';
import { notFound } from 'next/navigation';
import { getProductById, getAllProducts } from '@/lib/getProducts';
import Stars from '@/components/Stars';
import ProductCard from '@/components/ProductCard';
import ProductActions from '@/components/ProductActions';

export async function generateMetadata({ params }) {
  const product = await getProductById(params.id);
  if (!product) return { title: 'Product Not Found | Fashion Point' };
  return {
    title: `${product.name} | Fashion Point`,
    description: `${product.name} — ₹${product.price}. Premium menswear from Fashion Point.`,
  };
}

export default async function ProductPage({ params }) {
  const product = await getProductById(params.id);
  if (!product) notFound();

  const allProducts = await getAllProducts();
  const related = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="img-zoom relative aspect-[3/4] rounded-2xl overflow-hidden glass">
          <Image src={product.img} alt={product.name} fill className="object-cover" priority />
          {product.discount > 0 && (
            <div className="ribbon absolute top-0 left-6 z-10 bg-gold text-ink text-sm font-bold px-4 pt-2 pb-4">
              -{product.discount}%
            </div>
          )}
        </div>

        <div>
          <p className="text-gold text-xs tracking-[0.35em] mb-2">{product.category?.toUpperCase()}</p>
          <h1 className="font-display text-4xl text-bone mb-3">{product.name}</h1>
          <Stars rating={product.rating} />
          <div className="flex items-center gap-3 mt-4 mb-6">
            <span className="font-display text-3xl text-gold">₹{product.price}</span>
            {product.mrp && <span className="text-bone/40 text-lg line-through">₹{product.mrp}</span>}
          </div>

          <p className="text-bone/60 mb-6">
            Crafted from premium {product.color?.toLowerCase()} fabric by {product.brand}. Tailored for a
            confident, modern silhouette — built to last and easy to style.
          </p>

          <ProductActions product={product} />

          <div className="mt-8 pt-6 border-t border-white/10 text-sm text-bone/50 space-y-1">
            <p>Brand: <span className="text-bone/80">{product.brand}</span></p>
            <p>Color: <span className="text-bone/80">{product.color}</span></p>
            <p>In stock: <span className="text-bone/80">{product.stock ?? '—'}</span></p>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <div className="mt-20">
          <h2 className="font-display text-3xl text-bone mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
