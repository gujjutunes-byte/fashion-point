'use client';

import { useState } from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();
  const [address, setAddress] = useState({ name: '', phone: '', line1: '', city: '', pincode: '' });
  const [placing, setPlacing] = useState(false);

  const shipping = subtotal >= 2999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  async function handlePlaceOrder(e) {
    e.preventDefault();
    if (cart.length === 0) return toast.error('Your bag is empty');
    if (!user) return toast.error('Please sign in to place an order');
    setPlacing(true);

    try {
      const orderRes = await fetch('/api/razorpay/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total }),
      });
      const razorpayOrder = await orderRes.json();
      if (!orderRes.ok) throw new Error(razorpayOrder.error || 'Could not start payment');

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        name: 'Fashion Point',
        description: 'Order payment',
        order_id: razorpayOrder.id,
        prefill: { name: address.name, contact: address.phone, email: user.email },
        theme: { color: '#c9a04a' },
        handler: async (response) => {
          const verifyRes = await fetch('/api/razorpay/verify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...response,
              order: {
                userId: user.uid,
                customerName: address.name,
                customerEmail: user.email,
                items: cart,
                total,
                address,
              },
            }),
          });
          const result = await verifyRes.json();
          if (verifyRes.ok) {
            clearCart();
            toast.success('Order placed successfully!');
            router.push('/account/orders');
          } else {
            toast.error(result.error || 'Payment verification failed');
          }
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setPlacing(false);
    }
  }

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <section className="max-w-5xl mx-auto px-5 sm:px-6 py-16">
        <h1 className="font-display text-4xl text-bone mb-10">Secure Checkout</h1>

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

            <button type="submit" disabled={placing} className="w-full btn-gold rounded-full py-3.5 font-semibold text-sm mt-4 disabled:opacity-60">
              {placing ? 'Processing...' : `Pay ₹${total} with Razorpay`}
            </button>
            {!user && <p className="text-xs text-red-400 text-center">You need to sign in before placing an order.</p>}
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
    </>
  );
}
