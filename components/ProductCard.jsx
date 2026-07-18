'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import Stars from './Stars';

export default function ProductCard({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const wished = isWishlisted(product.id);

  function handleAddToCart(e) {
    e.preventDefault();
    addToCart(product, size);
  }

  function handleBuyNow(e) {
    e.preventDefault();
    addToCart(product, size, true);
    router.push('/checkout');
  }

  function handleWishlist(e) {
    e.preventDefault();
    toggleWishlist(product);
  }

  return (
    <div className="card-hover glass rounded-2xl overflow-hidden group relative">
      {product.discount > 0 && (
        <div className="ribbon absolute top-0 left-4 z-10 bg-gold text-ink text-[11px] font-bold px-3 pt-1 pb-2.5">
          -{product.discount}%
        </div>
      )}
      <button
        onClick={handleWishlist}
        aria-label="Toggle wishlist"
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-ink/60 flex items-center justify-center text-bone hover:text-gold transition"
      >
        <Heart size={16} className={wished ? 'fill-gold text-gold' : ''} />
      </button>

      <Link href={`/product/${product.id}`} className="block img-zoom aspect-[3/4] bg-slate relative">
        <Image
          src={product.img}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover"
        />
      </Link>

      <div className="p-4">
        <p className="text-[11px] tracking-widest text-gold/70">{product.category?.toUpperCase()}</p>
        <Link href={`/product/${product.id}`}>
          <h4 className="font-display text-lg text-bone leading-snug mt-0.5 mb-1 hover:text-gold transition">
            {product.name}
          </h4>
        </Link>
        <div className="mb-2">
          <Stars rating={product.rating} />
        </div>
        <div className="flex items-center gap-2 mb-3">
          <span className="font-display text-xl text-gold">₹{product.price}</span>
          {product.mrp && <span className="text-bone/40 text-sm line-through">₹{product.mrp}</span>}
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.preventDefault();
                setSize(s);
              }}
              className={`text-[10px] rounded px-1.5 py-0.5 border transition ${
                size === s ? 'bg-gold text-ink border-gold' : 'border-gold/30 text-bone/60'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button onClick={handleAddToCart} className="flex-1 btn-outline rounded-full text-xs font-semibold py-2.5 tracking-wide">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="flex-1 btn-gold rounded-full text-xs font-semibold py-2.5 tracking-wide">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
