'use client';

import { useState } from 'react';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      await setDoc(doc(db, 'newsletter_subscribers', email), {
        email,
        subscribedAt: serverTimestamp(),
      });
      toast.success('Thanks for subscribing! Check your inbox to confirm.');
      setEmail('');
    } catch (err) {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative py-20 sm:py-24 bg-gold-grad">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="font-display text-3xl sm:text-4xl text-ink mb-3">Join the Fashion Point Circle</h2>
        <p className="text-ink/70 mb-8">Get early access to new drops, private sales, and styling tips — straight to your inbox.</p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="flex-1 px-5 py-3.5 rounded-full outline-none text-ink text-sm"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-ink text-gold px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:bg-charcoal transition disabled:opacity-60"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
}
