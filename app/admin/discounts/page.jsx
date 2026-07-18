'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { Plus, Trash2 } from 'lucide-react';

export default function AdminDiscountsPage() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ code: '', percent: '', active: true });

  async function load() {
    setLoading(true);
    const snap = await getDocs(collection(db, 'discounts'));
    setDiscounts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.code || !form.percent) return toast.error('Code and percent are required');
    const code = form.code.toUpperCase().trim();
    await setDoc(doc(db, 'discounts', code), { code, percent: Number(form.percent), active: form.active });
    toast.success('Discount saved');
    setForm({ code: '', percent: '', active: true });
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this discount code?')) return;
    await deleteDoc(doc(db, 'discounts', id));
    toast.success('Discount deleted');
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-bone mb-8">Manage Discounts</h1>

      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="font-display text-xl text-gold mb-4">Add Discount Code</h3>
        <form onSubmit={handleAdd} className="grid sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-xs text-bone/50">Code</label>
            <input required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })}
              placeholder="FASHION20"
              className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
          </div>
          <div>
            <label className="text-xs text-bone/50">Discount %</label>
            <input required type="number" value={form.percent} onChange={(e) => setForm({ ...form, percent: e.target.value })}
              placeholder="20"
              className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
          </div>
          <button type="submit" className="btn-gold rounded-full py-3 font-semibold text-sm flex items-center justify-center gap-2">
            <Plus size={16} /> Add Code
          </button>
        </form>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-bone/40 border-b border-white/10">
                <th className="py-3 px-4">Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="py-8 text-center text-bone/50">Loading...</td></tr>
              ) : discounts.length === 0 ? (
                <tr><td colSpan={4} className="py-8 text-center text-bone/50">No discount codes yet.</td></tr>
              ) : (
                discounts.map((d) => (
                  <tr key={d.id} className="border-b border-white/5 text-bone/80">
                    <td className="py-2.5 px-4 font-mono">{d.code}</td>
                    <td className="py-2.5 px-4 text-gold">{d.percent}%</td>
                    <td className="py-2.5 px-4">
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${d.active ? 'border-green-400/40 text-green-400' : 'border-red-400/40 text-red-400'}`}>
                        {d.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-2.5 px-4">
                      <button onClick={() => handleDelete(d.id)} className="text-red-400 hover:text-red-300">
                        <Trash2 size={15} />
                      </button>
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
