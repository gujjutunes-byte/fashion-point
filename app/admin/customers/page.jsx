'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, 'customers'));
      setCustomers(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl text-bone mb-8">Customers</h1>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-bone/40 border-b border-white/10">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Customer ID</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={3} className="py-8 text-center text-bone/50">Loading...</td></tr>
              ) : customers.length === 0 ? (
                <tr><td colSpan={3} className="py-8 text-center text-bone/50">No customers yet.</td></tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.id} className="border-b border-white/5 text-bone/80">
                    <td className="py-2.5 px-4">{c.name || '—'}</td>
                    <td className="py-2.5 px-4">{c.email}</td>
                    <td className="py-2.5 px-4 font-mono text-xs">{c.id.slice(0, 10)}</td>
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
