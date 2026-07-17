// Client-safe helpers for Cloudinary image delivery + signed upload.
import { auth } from './firebase';

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/** Build an optimized Cloudinary delivery URL for a stored public_id. */
export function cldUrl(publicId, { width = 800, quality = 'auto', format = 'auto' } = {}) {
  if (!publicId) return '';
  if (publicId.startsWith('http')) return publicId; // already a full URL (e.g. seed data)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_${format},q_${quality},w_${width}/${publicId}`;
}

/**
 * Upload a File from the browser (admin panel only).
 * Fetches a signature from /api/cloudinary/sign, authenticated with the
 * current admin's Firebase ID token, then uploads directly to Cloudinary.
 */
export async function uploadProductImage(file) {
  const user = auth.currentUser;
  if (!user) throw new Error('You must be signed in as an admin to upload images');
  const idToken = await user.getIdToken();

  const sigRes = await fetch('/api/cloudinary/sign', {
    method: 'POST',
    headers: { Authorization: `Bearer ${idToken}` },
  });
  if (!sigRes.ok) throw new Error('Could not get upload signature (are you an admin?)');
  const { signature, timestamp, apiKey, folder } = await sigRes.json();

  const form = new FormData();
  form.append('file', file);
  form.append('api_key', apiKey);
  form.append('timestamp', timestamp);
  form.append('signature', signature);
  form.append('folder', folder);

  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
    method: 'POST',
    body: form,
  });
  if (!uploadRes.ok) throw new Error('Cloudinary upload failed');
  return uploadRes.json(); // includes secure_url, public_id, etc.
}
