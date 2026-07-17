// Server Component data-fetching helpers.
// Reads from Firestore via the Admin SDK (bypasses security rules — read-only, safe on the server).
// Falls back to the local seed data if Firestore hasn't been configured/seeded yet,
// so the app is browsable immediately after `npm install` + `npm run dev` without extra setup.

import { adminDb } from './firebaseAdmin';
import { PRODUCTS as SEED_PRODUCTS, CATEGORIES as SEED_CATEGORIES } from '@/data/products';

export async function getAllProducts() {
  if (!adminDb) return SEED_PRODUCTS;
  try {
    const snap = await adminDb.collection('products').get();
    if (snap.empty) return SEED_PRODUCTS;
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('Falling back to seed products (Firestore read failed):', err.message);
    return SEED_PRODUCTS;
  }
}

export async function getProductById(id) {
  if (adminDb) {
    try {
      const doc = await adminDb.collection('products').doc(id).get();
      if (doc.exists) return { id: doc.id, ...doc.data() };
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
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (err) {
    console.warn('Falling back to seed categories:', err.message);
    return SEED_CATEGORIES;
  }
}
