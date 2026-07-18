require('dotenv').config({ path: '.env.local' });
const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');
const { CATEGORIES, PRODUCTS } = require('../data/products');

const privateKey = (process.env.FIREBASE_ADMIN_PRIVATE_KEY || '').replace(/\\n/g, '\n');

initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
    clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey,
  }),
});

const db = getFirestore();

async function seed() {
  console.log('Seeding categories...');
  for (const cat of CATEGORIES) {
    await db.collection('categories').doc(cat.id).set(cat);
  }

  console.log('Seeding products...');
  for (const product of PRODUCTS) {
    await db.collection('products').doc(product.id).set({
      ...product,
      createdAt: new Date().toISOString(),
    });
  }

  console.log(`Done. Seeded ${CATEGORIES.length} categories and ${PRODUCTS.length} products.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
