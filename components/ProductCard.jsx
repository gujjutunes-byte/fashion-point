'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, ShoppingCart, Zap } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Stars from './Stars';

export default function ProductCard({ product }) {
  const [size, setSize] = useState(product.sizes?.[0] || '');

  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();

  const wished = isWishlisted(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, size);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    addToCart(product, size, true);
    router.push('/checkout');
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    toggleWishlist(product);
  };

  return (
    <div className="group relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-b from-zinc-900 to-black shadow-xl hover:shadow-yellow-500/20 transition-all duration-500 hover:-translate-y-2">

      {product.discount > 0 && (
        <div className="absolute left-4 top-4 z-20 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
          -{product.discount}% OFF
        </div>
      )}

      <button
        onClick={handleWishlist}
        className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 backdrop-blur text-white hover:text-yellow-400"
      >
        <Heart
          size={18}
          className={wished ? 'fill-yellow-400 text-yellow-400' : ''}
        />
      </button>

      <Link
        href={`/product/${product.id}`}
        className="relative block aspect-[3/4] overflow-hidden"
      >
        <Image
          src={product.img}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
            </Link>

      <div className="p-5">

        <p className="mb-2 text-xs uppercase tracking-[0.3em] text-yellow-500">
          {product.category}
        </p>

        <Link href={`/product/${product.id}`}>
          <h3 className="text-xl font-bold text-white transition hover:text-yellow-400">
            {product.name}
          </h3>
        </Link>

        <div className="mt-2">
          <Stars rating={product.rating} />
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className="text-3xl font-bold text-yellow-400">
            ₹{product.price}
          </span>

          {product.mrp && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.mrp}
            </span>
          )}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.preventDefault();
                setSize(s);
              }}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                size === s
                  ? 'border-yellow-500 bg-yellow-500 text-black'
                  : 'border-gray-600 text-gray-300 hover:border-yellow-500'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="mt-6 flex gap-3">

          <button
            onClick={handleAddToCart}
            className="flex-1 flex items-center justify-center gap-2 rounded-full border border-yellow-500 py-3 text-sm font-semibold text-yellow-400 transition hover:bg-yellow-500 hover:text-black"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-yellow-500 py-3 text-sm font-bold text-black transition hover:scale-105"
          >
            <Zap size={18} />
            Buy Now
          </button>

        </div>
      </div>
          </div>
  );
}
