'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const STATUS_STEPS = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered'];

export default function OrderTrackingPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (!loading && !user) router.replace('/login?redirect=/account/orders');
  }, [user, loading, router]);

  useEffect(() => {
    async function load() {
      if (!user) return;
      const q = query(collection(db, 'orders'), where('userId', '==', user.uid), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setFetching(false);
    }
    if (user) load();
  }, [user]);

  if (loading || !user) return <div className="min-h-[50vh]" />;

  return (
    <section className="max-w-4xl mx-auto px-5 sm:px-6 py-16">
      <h1 className="font-display text-4xl text-bone mb-10">Your Orders</h1>

      {fetching ? (
        <p className="text-bone/50">Loading orders...</p>
      ) : orders.length === 0 ? (
        <div className="glass rounded-2xl p-10 text-center">
          <p className="text-bone/60">You haven&apos;t placed any orders yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((o) => {
            const stepIndex = o.status === 'cancelled' ? -1 : STATUS_STEPS.indexOf(o.status || 'placed');
            return (
              <div key={o.id} className="glass rounded-2xl p-6">
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <p className="font-display text-lg text-bone">Order #{o.id.slice(0, 8)}</p>
                    <p className="text-bone/40 text-xs">{o.items?.length || 0} item(s) · ₹{o.total}</p>
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full border border-gold/40 text-gold capitalize">
                    {(o.status || 'placed').replace(/_/g, ' ')}
                  </span>
                </div>

                {o.status !== 'cancelled' && (
                  <div className="flex items-center">
                    {STATUS_STEPS.map((step, i) => (
                      <div key={step} className="flex items-center flex-1 last:flex-none">
                        <div className={`w-3 h-3 rounded-full shrink-0 ${i <= stepIndex ? 'bg-gold' : 'bg-white/10'}`} />
                        {i < STATUS_STEPS.length - 1 && (
                          <div className={`h-px flex-1 mx-1 ${i < stepIndex ? 'bg-gold' : 'bg-white/10'}`} />
                        )}
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex justify-between text-[10px] tracking-widest text-bone/40 mt-2">
                  <span>PLACED</span><span>SHIPPED</span><span>DELIVERED</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
