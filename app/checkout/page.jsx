'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', pincode: '' });
  const [upiId, setUpiId] = useState('');
  const [placing, setPlacing] = useState(false);
  const [success, setSuccess] = useState(false);

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (cart.length === 0) return toast.error('Your bag is empty');
    if (!upiId.includes('@')) return toast.error('Please enter a valid UPI ID (e.g. name@upi)');

    setPlacing(true);
    // Demo-only: simulates a payment gateway response. No real transaction occurs.
    setTimeout(() => {
      setPlacing(false);
      setSuccess(true);
      clearCart();
      toast.success('Payment successful (demo mode)');
    }, 1800);
  }

  if (success) {
    return (
      <section className="max-w-2xl mx-auto px-5 sm:px-6 py-24 text-center">
        <div className="glass rounded-2xl p-10">
          <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
            <span className="text-gold text-3xl">✓</span>
          </div>
          <h1 className="font-display text-3xl text-bone mb-3">Payment Successful</h1>
          <p className="text-bone/60 mb-2">This is a demo transaction — no real payment was processed.</p>
          <p className="text-bone/40 text-sm mb-8">UPI ID used: {upiId}</p>
          <button onClick={() => router.push('/')} className="btn-gold rounded-full px-8 py-3 font-semibold text-sm">
            Continue Shopping
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-6 py-16">
      <h1 className="font-display text-4xl text-bone mb-3">Secure Checkout</h1>
      <p className="text-bone/40 text-sm mb-10">Demo mode — no real payment gateway is connected. Any UPI ID will simulate a successful payment.</p>

      <div className="grid lg:grid-cols-2 gap-8">
        <form onSubmit={handlePlaceOrder} className="glass rounded-2xl p-7 space-y-4">
          <h3 className="font-display text-xl text-gold mb-2">Shipping Address</h3>
          <input required placeholder="Full Name" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })}
            className="w-full bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
          <input required placeholder="Phone Number" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })}
            className="w-full bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
          <input required placeholder="Address Line" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })}
            className="w-full bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
          <div className="grid grid-cols-2 gap-4">
            <input required placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
            <input required placeholder="Pincode" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })}
              className="bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60" />
          </div>

          <h3 className="font-display text-xl text-gold mb-2 pt-4 border-t border-white/10">UPI Payment (Demo)</h3>
          <input
            required
            placeholder="yourname@upi (e.g. demo@okhdfc)"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full bg-black/30 border border-gold/20 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gold/60"
          />

          <button type="submit" disabled={placing} className="w-full btn-gold rounded-full py-3.5 font-semibold text-sm mt-4 disabled:opacity-60">
            {placing ? 'Verifying payment...' : `Pay ₹${total} via UPI`}
          </button>
        </form>

        <div className="glass rounded-2xl p-7 h-fit">
          <h3 className="font-display text-xl text-gold mb-4">Order Summary</h3>
          <div className="space-y-4 max-h-80 overflow-y-auto">
            {cart.map((item) => (
              <div key={`${item.id}_${item.size}`} className="flex gap-3">
                <div className="relative w-14 h-16 rounded overflow-hidden shrink-0">
                  <Image src={item.img} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="text-bone">{item.name}</p>
                  <p className="text-bone/40 text-xs">Size {item.size} × {item.qty}</p>
                </div>
                <p className="text-gold text-sm">₹{item.price * item.qty}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 mt-5 pt-5 space-y-2 text-sm">
            <div className="flex justify-between text-bone/70"><span>Subtotal</span><span>₹{subtotal}</span></div>
            <div className="flex justify-between text-bone/70"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span></div>
            <div className="flex justify-between font-display text-lg text-bone"><span>Total</span><span className="text-gold">₹{total}</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}
