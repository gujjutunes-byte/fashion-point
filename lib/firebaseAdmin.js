// Server-only Firebase Admin SDK. Never import this from a "use client" file.
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// Initialization is defensive: if admin env vars aren't set yet (e.g. fresh
// clone, before Firebase is wired up), we don't crash the whole app — callers
// fall back to seed data (see lib/getProducts.js) until credentials exist.
function getAdminApp() {
  if (getApps().length) return getApps()[0];

  const { FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY } = process.env;
  if (!FIREBASE_ADMIN_PROJECT_ID || !FIREBASE_ADMIN_CLIENT_EMAIL || !FIREBASE_ADMIN_PRIVATE_KEY) {
    return null;
  }

  try {
    const privateKey = FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n');
    return initializeApp({
      credential: cert({
        projectId: FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey,
      }),
    });
  } catch (err) {
    console.warn('Firebase Admin init failed:', err.message);
    return null;
  }
}

const adminApp = getAdminApp();
export const adminDb = adminApp ? getFirestore(adminApp) : null;
export const adminAuth = adminApp ? getAuth(adminApp) : null;

// Verifies a Firebase ID token sent from the client (Authorization: Bearer <token>)
export async function verifyIdToken(token) {
  try {
    return await adminAuth.verifyIdToken(token);
  } catch (err) {
    return null;
  }
}

export function isAdminEmail(email) {
  const list = (process.env.ADMIN_EMAILS || '').split(',').map((e) => e.trim().toLowerCase());
  return !!email && list.includes(email.toLowerCase());
}
