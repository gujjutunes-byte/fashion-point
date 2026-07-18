'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  collection, getDocs, doc, setDoc, deleteDoc, addDoc, serverTimestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { uploadProductImage } from '@/lib/cloudinary';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';

const EMPTY_FORM = {
  name: '', category: 'shirts', price: '', mrp: '', rating: 4.5,
  sizes: 'S,M,L,XL', color: '', brand: 'Fashion Point', img: '',
  isNew: true, bestSeller: false, discount: 0, stock: 10,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  async function loadProducts() {
    setLoading(true);
    const snap = await getDocs(collection(db, 'products'));
    setProducts(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function openAddModal() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setModalOpen(true);
  }

  function openEditModal(p) {
    setForm({
      ...p,
      sizes: Array.isArray(p.sizes) ? p.sizes.join(',') : p.sizes,
    });
    setEditingId(p.id);
    setModalOpen(true);
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const result = await uploadProductImage(file);
      setForm((f) => ({ ...f, img: result.secure_url }));
      toast.success('Image uploaded');
    } catch (err) {
      toast.error(err.message);
    } finally {
      setUploading(false);
    }
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      price: Number(form.price),
      mrp: Number(form.mrp) || Number(form.price),
      rating: Number(form.rating),
      discount: Number(form.discount),
      stock: Number(form.stock),
      sizes: form.sizes.split(',').map((s) => s.trim()).filter(Boolean),
    };
    try {
      if (editingId) {
        await setDoc(doc(db, 'products', editingId), payload, { merge: true });
        toast.success('Product updated');
      } else {
        await addDoc(collection(db, 'products'), { ...payload, createdAt: serverTimestamp() });
        toast.success('Product added');
      }
      setModalOpen(false);
      loadProducts();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product? This cannot be undone.')) return;
    await deleteDoc(doc(db, 'products', id));
    toast.success('Product deleted');
    loadProducts();
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-bone">Manage Products</h1>
        <button onClick={openAddModal} className="btn-gold rounded-full px-5 py-2.5 text-sm font-semibold flex items-center gap-2">
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="text-bone/40 border-b border-white/10">
                <th className="py-3 px-4">Image</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="py-8 text-center text-bone/50">Loading...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan={6} className="py-8 text-center text-bone/50">No products yet. Add your first one, or run `npm run seed`.</td></tr>
              ) : (
                products.map((p) => (
                  <tr key={p.id} className="border-b border-white/5 text-bone/80">
                    <td className="py-2.5 px-4">
                      <div className="relative w-12 h-14 rounded overflow-hidden">
                        {p.img && <Image src={p.img} alt={p.name} fill className="object-cover" />}
                      </div>
                    </td>
                    <td className="py-2.5 px-4">{p.name}</td>
                    <td className="py-2.5 px-4 capitalize">{p.category}</td>
                    <td className="py-2.5 px-4 text-gold">₹{p.price}</td>
                    <td className="py-2.5 px-4">
                      <span className={p.stock <= 5 ? 'text-red-400' : ''}>{p.stock}</span>
                    </td>
                    <td className="py-2.5 px-4">
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(p)} className="p-1.5 rounded hover:bg-white/10 text-gold">
                          <Pencil size={15} />
                        </button>
                        <button onClick={() => handleDelete(p.id)} className="p-1.5 rounded hover:bg-white/10 text-red-400">
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-[80] bg-black/70 flex items-center justify-center p-4">
          <div className="bg-charcoal border border-gold/20 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-xl text-gold">{editingId ? 'Edit Product' : 'Add Product'}</h3>
              <button onClick={() => setModalOpen(false)} className="text-bone/50 hover:text-gold">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="text-xs text-bone/50">Product Name</label>
                <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-bone/50">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60">
                    {['shirts','tshirts','jeans','trousers','hoodies','jackets','ethnic','accessories'].map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-bone/50">Brand</label>
                  <input value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-xs text-bone/50">Price (₹)</label>
                  <input required type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
                </div>
                <div>
                  <label className="text-xs text-bone/50">MRP (₹)</label>
                  <input type="number" value={form.mrp} onChange={(e) => setForm({ ...form, mrp: e.target.value })}
                    className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
                </div>
                <div>
                  <label className="text-xs text-bone/50">Discount %</label>
                  <input type="number" value={form.discount} onChange={(e) => setForm({ ...form, discount: e.target.value })}
                    className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-bone/50">Color</label>
                  <input value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                    className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
                </div>
                <div>
                  <label className="text-xs text-bone/50">Stock Quantity</label>
                  <input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })}
                    className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
                </div>
              </div>

              <div>
                <label className="text-xs text-bone/50">Sizes (comma-separated)</label>
                <input value={form.sizes} onChange={(e) => setForm({ ...form, sizes: e.target.value })}
                  placeholder="S,M,L,XL"
                  className="w-full mt-1 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-sm outline-none focus:border-gold/60" />
              </div>

              <div>
                <label className="text-xs text-bone/50">Product Image</label>
                <div className="flex items-center gap-3 mt-1">
                  {form.img && (
                    <div className="relative w-14 h-16 rounded overflow-hidden shrink-0">
                      <Image src={form.img} alt="preview" fill className="object-cover" />
                    </div>
                  )}
                  <label className="flex-1 flex items-center justify-center gap-2 border border-dashed border-gold/40 rounded-lg py-3 text-sm text-bone/60 cursor-pointer hover:border-gold/70">
                    <Upload size={15} />
                    {uploading ? 'Uploading...' : 'Upload to Cloudinary'}
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={uploading} />
                  </label>
                </div>
                <input
                  className="w-full mt-2 bg-black/30 border border-gold/20 rounded-lg px-3 py-2 text-xs outline-none focus:border-gold/60"
                  placeholder="or paste an image URL directly"
                  value={form.img}
                  onChange={(e) => setForm({ ...form, img: e.target.value })}
                />
              </div>

              <div className="flex gap-6">
                <label className="flex items-center gap-2 text-sm text-bone/70">
                  <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} className="accent-[#c9a04a]" />
                  New Arrival
                </label>
                <label className="flex items-center gap-2 text-sm text-bone/70">
                  <input type="checkbox" checked={form.bestSeller} onChange={(e) => setForm({ ...form, bestSeller: e.target.checked })} className="accent-[#c9a04a]" />
                  Best Seller
                </label>
              </div>

              <button type="submit" disabled={saving} className="w-full btn-gold rounded-full py-3 font-semibold text-sm disabled:opacity-60">
                {saving ? 'Saving...' : editingId ? 'Save Changes' : 'Add Product'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
