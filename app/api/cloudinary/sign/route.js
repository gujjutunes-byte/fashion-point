import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { verifyIdToken, isAdminEmail } from '@/lib/firebaseAdmin';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  // Only signed-in admins can request an upload signature
  const authHeader = request.headers.get('authorization') || '';
  const token = authHeader.replace('Bearer ', '');
  const decoded = token ? await verifyIdToken(token) : null;

  if (!decoded || !isAdminEmail(decoded.email)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const timestamp = Math.round(Date.now() / 1000);
  const folder = 'fashion-point/products';

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder },
    process.env.CLOUDINARY_API_SECRET
  );

  return NextResponse.json({
    signature,
    timestamp,
    apiKey: process.env.CLOUDINARY_API_KEY,
    folder,
  });
}
