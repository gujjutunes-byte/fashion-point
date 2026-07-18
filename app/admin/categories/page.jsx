'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { collection, getDocs, doc, setDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadProductImage } from '@/lib/cloudinary';
import toast from 'react-hot-toast';
import { Plus, Trash2, Upload } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ id: '', name: '', img: '' });
  const [uploading, setUploading] = useState(false);

  async function load() {
    setLoading(true);
    const snap = await getDocs(collection(db, 'categories'));
    setCategories(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadProductImage(file);
      setForm((f) => ({ ...f, img: result.secure_url }));
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!form.id || !form.name) return toast.error('ID and name are required');
    await setDoc(doc(db, 'categories', form.id), { name: form.name, img: form.img });
    toast.success('Category saved');
    setForm({ id: '', name: '', img: '' });
    load();
  }

  async function handleDelete(id) {
    if (!confirm('Delete this category?')) return;
    await deleteDoc(doc(db, 'categories', id));
    toast.success('Category deleted');
    load();
  }

  return (
    <div>
      <h1 className="font-display text-3xl text-bone mb-8">Manage Categories</h1>

      <div className="glass rounded-2xl p-6 mb-8">
        <h3 className="font-display text-xl text-gold mb-4">Add / Update Category</h3>
        <form onSubmit={handleAdd} className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-bone/50">Category ID (slug, e.g. "shirts")</label>
            <input required value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
              className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
          </div>
          <div>
            <label className="text-xs text-bone/50">Display Name</label>
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
          </div>
          <div className="sm:col-span-2">
            <label className="text-xs text-bone/50">Image</label>
            <label className="flex items-center justify-center gap-2 border border-dashed border-gold/40 rounded-lg py-3 mt-1 text-sm text-bone/60 cursor-pointer hover:border-gold/70">
              <Upload size={15} />
              {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={uploading} />
            </label>
          </div>
          <button type="submit" className="sm:col-span-2 btn-gold rounded-full py-3 font-semibold text-sm flex items-center justify-center gap-2">
            <Plus size={16} /> Save Category
          </button>
        </form>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {loading ? (
          <p className="text-bone/50 text-sm">Loading...</p>
        ) : (
          categories.map((c) => (
            <div key={c.id} className="glass rounded-xl overflow-hidden">
              <div className="relative aspect-video">
                {c.img && <Image src={c.img} alt={c.name} fill className="object-cover" />}
              </div>
              <div className="p-3 flex items-center justify-between">
                <p className="text-sm text-bone">{c.name}</p>
                <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300">
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
