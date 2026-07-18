'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function CartDrawer({ open, onClose }) {
  const { cart, changeQty, removeFromCart, subtotal } = useCart();

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
              <h3 className="font-display text-2xl text-bone">Your Bag</h3>
              <button onClick={onClose} className="text-bone/60 hover:text-gold text-2xl leading-none">
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {cart.length === 0 ? (
                <p className="text-bone/40 text-center mt-12">Your bag is empty.</p>
              ) : (
                cart.map((item) => (
                  <div key={`${item.id}_${item.size}`} className="flex gap-4">
                    <div className="relative w-20 h-24 rounded-lg overflow-hidden shrink-0">
                      <Image src={item.img} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <p className="font-display text-base text-bone">{item.name}</p>
                      <p className="text-bone/40 text-xs">Size: {item.size}</p>
                      <p className="text-gold text-sm mb-2">₹{item.price}</p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => changeQty(item.id, item.size, -1)}
                          className="w-6 h-6 rounded-full border border-gold/40 text-gold text-sm"
                        >
                          −
                        </button>
                        <span className="text-bone text-sm">{item.qty}</span>
                        <button
                          onClick={() => changeQty(item.id, item.size, 1)}
                          className="w-6 h-6 rounded-full border border-gold/40 text-gold text-sm"
                        >
                          +
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="ml-auto text-bone/40 hover:text-red-400 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gold/15 space-y-4">
              <div className="flex justify-between text-bone/70 text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between font-display text-xl text-bone">
                <span>Total</span>
                <span className="text-gold">₹{subtotal}</span>
              </div>
              <Link
                href="/checkout"
                onClick={onClose}
                className="w-full block text-center btn-gold rounded-full py-3.5 font-semibold text-sm tracking-wide"
              >
                Secure Checkout
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
