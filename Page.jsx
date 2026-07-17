import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import Newsletter from '@/components/Newsletter';
import CountdownTimer from '@/components/CountdownTimer';
import { getAllProducts, getAllCategories } from '@/lib/getProducts';
import { REVIEWS } from '@/data/products';

const INSTA_IMAGES = [
  'https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=70',
  'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=70',
];

export default async function HomePage() {
  const [products, categories] = await Promise.all([getAllProducts(), getAllCategories()]);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <>
      <Hero />

      <div className="bg-charcoal border-y border-gold/15 py-3 overflow-hidden">
        <div className="flex whitespace-nowrap w-max font-display text-xl tracking-wide text-gold/80 animate-[marquee_22s_linear_infinite]">
          <span className="mx-8">
            STYLE THAT DEFINES YOU ✦ PREMIUM FABRICS ✦ FREE SHIPPING ✦ SEASONAL SALE UP TO 40% OFF ✦ NEW ARRIVALS WEEKLY ✦
          </span>
          <span className="mx-8">
            STYLE THAT DEFINES YOU ✦ PREMIUM FABRICS ✦ FREE SHIPPING ✦ SEASONAL SALE UP TO 40% OFF ✦ NEW ARRIVALS WEEKLY ✦
          </span>
        </div>
      </div>

      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-xs tracking-[0.35em]">SHOP BY</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-2 text-bone">Featured Categories</h2>
          </div>
          <Link href="/categories" className="hidden sm:block text-gold text-sm border-b border-gold/50 hover:border-gold pb-0.5">
            View All →
          </Link>
        </div>
        <CategoryGrid categories={categories} />
      </section>

      <section className="relative py-16 sm:py-24 my-4">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=70"
            alt="Seasonal sale"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/80" />
        </div>
        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="text-gold text-xs tracking-[0.4em]">LIMITED TIME</span>
          <h2 className="font-display text-4xl sm:text-6xl mt-3 text-bone">
            End of Season <span className="gold-text italic">Sale</span>
          </h2>
          <p className="text-bone/70 mt-3">Up to 40% off on select styles. Offer ends in:</p>
          <CountdownTimer hoursFromNow={72} />
          <Link href="/shop" className="btn-gold inline-block mt-9 px-9 py-3.5 rounded-full font-semibold text-sm tracking-wide">
            Shop the Sale
          </Link>
        </div>
      </section>

      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-xs tracking-[0.35em]">JUST DROPPED</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-2 text-bone">New Arrivals</h2>
          </div>
          <Link href="/new-arrivals" className="hidden sm:block text-gold text-sm border-b border-gold/50 hover:border-gold pb-0.5">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-gold text-xs tracking-[0.35em]">CUSTOMER FAVOURITES</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-2 text-bone">Trending Products</h2>
          </div>
          <Link href="/best-sellers" className="hidden sm:block text-gold text-sm border-b border-gold/50 hover:border-gold pb-0.5">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-6">
          {bestSellers.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-charcoal/60 border-y border-gold/10">
        <div className="max-w-7xl mx-auto px-5 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-gold text-xs tracking-[0.35em]">TESTIMONIALS</span>
            <h2 className="font-display text-4xl sm:text-5xl mt-2 text-bone">What Our Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r, i) => (
              <ReviewCard key={i} review={r} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 max-w-7xl mx-auto px-5 sm:px-6">
        <div className="text-center mb-12">
          <span className="text-gold text-xs tracking-[0.35em]">FOLLOW ALONG</span>
          <h2 className="font-display text-4xl sm:text-5xl mt-2 text-bone">
            @fashionpoint <span className="gold-text">on Instagram</span>
          </h2>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 sm:gap-3">
          {INSTA_IMAGES.map((src, i) => (
            <div key={i} className="img-zoom aspect-square rounded-xl overflow-hidden relative">
              <Image src={src} alt="Instagram post" fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <Newsletter />
    </>
  );
}
