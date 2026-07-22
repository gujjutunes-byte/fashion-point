import { adminDb } from './firebaseAdmin';
import { PRODUCTS as SEED_PRODUCTS, CATEGORIES as SEED_CATEGORIES } from '@/data/products';

function serialize(doc) {
  const data = { id: doc.id, ...doc.data() };
  for (const key in data) {
    const val = data[key];
    if (val && typeof val.toDate === 'function') {
      data[key] = val.toDate().toISOString();
    }
  }
  return data;
}

export async function getAllProducts() {
  if (!adminDb) return SEED_PRODUCTS;
  try {
    const snap = await adminDb.collection('products').get();
    if (snap.empty) return SEED_PRODUCTS;
    return snap.docs.map(serialize);
  } catch (err) {
    console.warn('Falling back to seed products (Firestore read failed):', err.message);
    return SEED_PRODUCTS;
  }
}

export async function getProductById(id) {
  if (adminDb) {
    try {
      const doc = await adminDb.collection('products').doc(id).get();
      if (doc.exists) return serialize(doc);
    } catch (err) {
      console.warn('Falling back to seed product lookup:', err.message);
    }
  }
  return SEED_PRODUCTS.find((p) => p.id === id) || null;
}

export async function getAllCategories() {
  if (!adminDb) return SEED_CATEGORIES;
  try {
    const snap = await adminDb.collection('categories').get();
    if (snap.empty) return SEED_CATEGORIES;
    return snap.docs.map(serialize);
  } catch (err) {
    console.warn('Falling back to seed categories:', err.message);
    return SEED_CATEGORIES;
  }
}
