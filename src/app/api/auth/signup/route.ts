import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/src/lib/prisma';
import { rateLimit } from '@/src/lib/rate-limit';

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const { allowed } = rateLimit(`signup:${ip}`, 5, 60000);
  if (!allowed) {
    return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { email, password, broker } = body;

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email is required' }, { status: 400 });
    }
    if (!password || password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const existing = await prisma.user.findUnique({ where: { email: normalizedEmail } });
    if (existing) {
      return NextResponse.json({ error: 'An account with this email already exists' }, { status: 409 });
    }

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: await bcrypt.hash(password, 12),
        broker: broker?.trim() || null,
      },
      select: { id: true, email: true, broker: true },
    });

    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Trade Metrix Tech <welcome@app.trademetrix.tech>',
        to: normalizedEmail,
        subject: 'Welcome to Trade Metrix — Your 1-Day Trial Starts Now',
        html: `
          <div style="font-family: Inter, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 24px;">
            <div style="width: 40px; height: 40px; background: #EF4444; border-radius: 10px; display: flex; align-items: center; justify-content: center; margin-bottom: 24px;">
              <span style="color: #0A0A0A; font-weight: 800; font-size: 20px;">T</span>
            </div>
            <h1 style="color: #fff; font-size: 24px; font-weight: 700; margin: 0 0 8px;">Welcome to Trade Metrix</h1>
            <p style="color: #888; font-size: 14px; line-height: 1.6; margin: 0 0 24px;">
              Your 1-day free trial has started. Build, backtest, and deploy your first algorithm.
            </p>
            <a href="https://app.trademetrix.tech/dashboard"
               style="display: inline-block; background: #EF4444; color: #0A0A0A; padding: 12px 32px; border-radius: 12px; font-size: 14px; font-weight: 600; text-decoration: none;">
              Go to Dashboard
            </a>
            <hr style="border: none; border-top: 1px solid #222; margin: 32px 0;" />
            <p style="color: #555; font-size: 12px; margin: 0;">
              Trade Metrix — Modern Algo Trading Platform<br/>
              <span style="color: #444;">Not SEBI registered. Software platform only.</span>
            </p>
          </div>
        `,
      });
    } catch {
      // Email failure is non-blocking
      console.warn('Welcome email failed to send');
    }

    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, broker: user.broker },
    });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
