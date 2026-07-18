'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';

export default function WishlistDrawer({ open, onClose }) {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-[60]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.4 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-charcoal border-l border-gold/20 z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gold/15">
              <h3 className="font-display text-2xl text-bone">Wishlist</h3>
              <button onClick={onClose} className="text-bone/60 hover:text-gold text-2xl leading-none">
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {wishlist.length === 0 ? (
                <p className="text-bone/40 text-center mt-12">No items saved yet.</p>
              ) : (
                wishlist.map((p) => (
                  <div key={p.id} className="flex gap-4">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0">
                      <Image src={p.img} alt={p.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-base text-bone">{p.name}</p>
                      <p className="text-gold text-sm mb-2">₹{p.price}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(p, p.sizes[0])}
                          className="text-xs btn-gold px-3 py-1.5 rounded-full"
                        >
                          Add to Cart
                        </button>
                        <button onClick={() => toggleWishlist(p)} className="text-xs text-bone/40 hover:text-red-400">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
