'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, updateDoc, orderBy, query } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';

const STATUSES = ['placed', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')));
    setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function updateStatus(id, status) {
    await updateDoc(doc(db, 'orders', id), { status });
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    toast.success('Order status updated — customer will see this on their tracking page');
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-bone mb-8">Manage Orders</h1>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-bone/40 border-b border-white/10">
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-8 text-center text-bone/50">Loading...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-bone/50">No orders yet.</td></tr>
              ) : (
                orders.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 text-bone/80 align-top">
                    <td className="py-2.5 px-4 font-mono text-xs">{o.id.slice(0, 8)}</td>
                    <td className="py-2.5 px-4">{o.customerName || o.customerEmail || '—'}</td>
                    <td className="py-2.5 px-4">{o.items?.length || 0} item(s)</td>
                    <td className="py-2.5 px-4 text-gold">₹{o.total}</td>
                    <td className="py-2.5 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${o.paymentStatus === 'paid' ? 'border-green-400/40 text-green-400' : 'border-yellow-400/40 text-yellow-400'}`}>
                        {o.paymentStatus || 'pending'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <select
                        value={o.status || 'placed'}
                        onChange={(e) => updateStatus(o.id, e.target.value)}
                        className="bg-black/30 border border-gold/20 rounded-lg px-2 py-1.5 text-xs outline-none"
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
