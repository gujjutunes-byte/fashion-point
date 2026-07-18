import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { adminDb } from '@/lib/firebaseAdmin';

export async function POST(request) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order, // { userId, customerName, customerEmail, items, total, address }
    } = await request.json();

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    if (!adminDb) {
      return NextResponse.json(
        { error: 'Firestore is not configured on the server yet' },
        { status: 500 }
      );
    }

    const docRef = await adminDb.collection('orders').add({
      ...order,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      paymentStatus: 'paid',
      status: 'placed',
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, orderId: docRef.id });
  } catch (err) {
    console.error('Payment verification failed:', err);
    return NextResponse.json({ error: 'Server error verifying payment' }, { status: 500 });
  }
}
