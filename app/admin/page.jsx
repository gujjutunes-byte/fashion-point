'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { DollarSign, ShoppingBag, Users, Package } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ revenue: 0, orders: 0, customers: 0, products: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [ordersSnap, customersSnap, productsSnap, recentSnap] = await Promise.all([
        getDocs(collection(db, 'orders')),
        getDocs(collection(db, 'customers')),
        getDocs(collection(db, 'products')),
        getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc'), limit(5))),
      ]);

      const revenue = ordersSnap.docs.reduce((sum, d) => sum + (d.data().total || 0), 0);

      setStats({
        revenue,
        orders: ordersSnap.size,
        customers: customersSnap.size,
        products: productsSnap.size,
      });
      setRecentOrders(recentSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    load().catch(() => setLoading(false));
  }, []);

  const cards = [
    { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: DollarSign },
    { label: 'Orders', value: stats.orders, icon: ShoppingBag },
    { label: 'Customers', value: stats.customers, icon: Users },
    { label: 'Products', value: stats.products, icon: Package },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl text-bone mb-8">Sales Dashboard</h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="glass rounded-2xl p-5">
            <Icon className="text-gold mb-3" size={22} />
            <p className="font-display text-2xl text-bone">{loading ? '—' : value}</p>
            <p className="text-xs tracking-widest text-bone/50 mt-1">{label.toUpperCase()}</p>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <h2 className="font-display text-xl text-gold mb-4">Recent Orders</h2>
        {loading ? (
          <p className="text-bone/50 text-sm">Loading...</p>
        ) : recentOrders.length === 0 ? (
          <p className="text-bone/50 text-sm">No orders yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-bone/40 border-b border-white/10">
                  <th className="py-2 pr-4">Order ID</th>
                  <th className="py-2 pr-4">Customer</th>
                  <th className="py-2 pr-4">Total</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className="border-b border-white/5 text-bone/80">
                    <td className="py-2.5 pr-4 font-mono text-xs">{o.id.slice(0, 8)}</td>
                    <td className="py-2.5 pr-4">{o.customerName || o.customerEmail || '—'}</td>
                    <td className="py-2.5 pr-4 text-gold">₹{o.total}</td>
                    <td className="py-2.5 pr-4">
                      <span className="text-xs px-2 py-0.5 rounded-full border border-gold/30">{o.status || 'placed'}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
