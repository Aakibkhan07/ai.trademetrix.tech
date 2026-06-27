import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { rateLimit } from '@/src/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed } = rateLimit(`newsletter:${ip}`, 3, 60000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 });
  }

  try {
    const { email } = await request.json();
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const normalized = email.toLowerCase().trim();

    const existing = await prisma.subscriber.findUnique({ where: { email: normalized } });
    if (existing) {
      return NextResponse.json({ success: true, message: 'Already subscribed' });
    }

    await prisma.subscriber.create({ data: { email: normalized } });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
