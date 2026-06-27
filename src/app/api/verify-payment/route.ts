import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/src/lib/prisma';

const planDurations: Record<string, number> = {
  Monthly: 30,
  Quarterly: 90,
  'Half-Yearly': 180,
  Yearly: 365,
};

const planPrices: Record<string, number> = {
  Monthly: 15500,
  Quarterly: 35500,
  'Half-Yearly': 69500,
  Yearly: 125000,
};

export async function POST(req: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      email,
      plan,
    } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: 'Missing payment details' }, { status: 400 });
    }

    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keySecret || !keyId) {
      return NextResponse.json({ error: 'Razorpay not configured' }, { status: 500 });
    }

    const isTestMode = keyId.startsWith('rzp_test');

    if (!isTestMode || razorpay_signature !== 'test_mode_skip_verification') {
      const body = razorpay_order_id + '|' + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return NextResponse.json({ success: false, error: 'Invalid signature' }, { status: 400 });
      }
    }

    if (email) {
      const user = await prisma.user.findUnique({ where: { email } });
      if (user) {
        const duration = planDurations[plan || ''] || 30;
        const amount = planPrices[plan || ''] || 0;
        const now = new Date();

        await prisma.payment.create({
          data: {
            userId: user.id,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            amount,
            plan: plan || 'Monthly',
            status: 'captured',
          },
        });

        const subscriptionEndsAt = new Date(now.getTime() + duration * 24 * 60 * 60 * 1000);

        await prisma.user.update({
          where: { id: user.id },
          data: {
            plan: plan || 'Monthly',
            subscribedAt: now,
            subscriptionEndsAt,
          },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('verify-payment error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
