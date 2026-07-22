import Image from "next/image";
import Link from "next/link";

import Hero from "@/components/Hero";
import CategoryGrid from "@/components/CategoryGrid";
import ProductCard from "@/components/ProductCard";
import ReviewCard from "@/components/ReviewCard";
import Newsletter from "@/components/Newsletter";
import CountdownTimer from "@/components/CountdownTimer";

import { getAllProducts, getAllCategories } from "@/lib/getProducts";
import { REVIEWS } from "@/data/products";

const INSTA_IMAGES = [
  "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=400&q=70",
  "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=70",
];

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 4);

  return (
    <>
      {/* Luxury Hero */}
      <Hero />

      {/* Premium Marquee */}
      <section className="bg-black border-y border-yellow-500/20 py-4 overflow-hidden">
        <div className="whitespace-nowrap animate-[marquee_20s_linear_infinite] text-yellow-500 text-lg font-semibold tracking-[0.3em]">
          ✦ LUXURY COLLECTION ✦ FREE SHIPPING ✦ PREMIUM QUALITY ✦ NEW ARRIVALS ✦ EXCLUSIVE SALE ✦
        </div>
      </section>

      {/* Featured Categories */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-14">

          <span className="text-yellow-500 uppercase tracking-[0.35em] text-sm">
            Explore
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            Shop By Category
          </h2>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Discover our premium collections crafted for modern fashion lovers.
          </p>

        </div>

        <CategoryGrid categories={categories} />

      </section>
            {/* Luxury Sale Banner */}
      <section className="relative py-24 my-10 overflow-hidden">

        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1800&q=80"
            alt="Luxury Sale"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">

          <span className="text-yellow-500 tracking-[0.4em] uppercase text-sm">
            Limited Time Offer
          </span>

          <h2 className="text-5xl md:text-6xl font-bold text-white mt-5">
            End Of Season
            <span className="text-yellow-500"> Sale</span>
          </h2>

          <p className="text-gray-300 mt-5 max-w-2xl mx-auto">
            Get up to <span className="text-yellow-500 font-bold">40% OFF</span>
            on premium collections.
          </p>

          <div className="mt-10">
            <CountdownTimer hoursFromNow={72} />
          </div>

          <Link
            href="/shop"
            className="inline-block mt-10 px-10 py-4 rounded-full bg-yellow-500 text-black font-bold hover:scale-105 transition"
          >
            Shop Now
          </Link>

        </div>
      </section>

      {/* New Arrivals */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="flex items-center justify-between mb-12">

          <div>
            <span className="text-yellow-500 tracking-[0.3em] uppercase text-sm">
              Just Dropped
            </span>

            <h2 className="text-5xl font-bold text-white mt-3">
              New Arrivals
            </h2>
          </div>

          <Link
            href="/new-arrivals"
            className="text-yellow-500 hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>

      {/* Trending Products */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="flex items-center justify-between mb-12">

          <div>
            <span className="text-yellow-500 tracking-[0.3em] uppercase text-sm">
              Best Sellers
            </span>

            <h2 className="text-5xl font-bold text-white mt-3">
              Trending Products
            </h2>
          </div>

          <Link
            href="/best-sellers"
            className="text-yellow-500 hover:underline"
          >
            View All →
          </Link>

        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>

      </section>
            {/* Luxury Testimonials */}
      <section className="bg-zinc-950 py-24 border-y border-yellow-500/20">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <span className="text-yellow-500 uppercase tracking-[0.35em] text-sm">
              Testimonials
            </span>

            <h2 className="text-5xl font-bold text-white mt-4">
              What Our Customers Say
            </h2>

            <p className="text-gray-400 mt-4">
              Trusted by thousands of happy customers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {REVIEWS.map((review, index) => (
              <ReviewCard
                key={index}
                review={review}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Instagram Gallery */}
      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="text-center mb-14">

          <span className="text-yellow-500 uppercase tracking-[0.35em] text-sm">
            Follow Us
          </span>

          <h2 className="text-5xl font-bold text-white mt-4">
            @fashionpoint
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {INSTA_IMAGES.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl group"
            >
              <Image
                src={img}
                alt="Instagram"
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/20 group-hover:bg-yellow-500/20 transition" />
            </div>
          ))}
        </div>

      </section>

      {/* Newsletter */}
      <Newsletter />

    </>
  );
}
