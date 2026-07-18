'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Heart } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function ProductActions({ product }) {
  const [size, setSize] = useState(product.sizes[0]);
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const router = useRouter();
  const wished = isWishlisted(product.id);

  return (
    <div>
      <p className="text-xs tracking-widest text-bone/50 mb-2">SELECT SIZE</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {product.sizes.map((s) => (
          <button
            key={s}
            onClick={() => setSize(s)}
            className={`text-sm rounded-lg px-4 py-2 border transition ${
              size === s ? 'bg-gold text-ink border-gold' : 'border-gold/30 text-bone/70'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => addToCart(product, size)}
          className="flex-1 btn-outline rounded-full py-3.5 font-semibold text-sm tracking-wide"
        >
          Add to Cart
        </button>
        <button
          onClick={() => {
            addToCart(product, size, true);
            router.push('/checkout');
          }}
          className="flex-1 btn-gold rounded-full py-3.5 font-semibold text-sm tracking-wide"
        >
          Buy Now
        </button>
        <button
          onClick={() => toggleWishlist(product)}
          aria-label="Toggle wishlist"
          className="w-12 h-12 shrink-0 rounded-full border border-gold/30 flex items-center justify-center hover:border-gold transition"
        >
          <Heart size={18} className={wished ? 'fill-gold text-gold' : 'text-bone/70'} />
        </button>
      </div>
    </div>
  );
}
