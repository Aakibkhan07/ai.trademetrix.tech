import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ error: 'Email required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      plan: true,
      subscribedAt: true,
      subscriptionEndsAt: true,
      trialEndsAt: true,
      trialUsed: true,
    },
  });

  if (!user || !user.plan) {
    return NextResponse.json({ active: false });
  }

  const now = new Date();
  const active = user.subscriptionEndsAt ? user.subscriptionEndsAt > now : true;

  return NextResponse.json({
    active,
    plan: user.plan,
    subscribedAt: user.subscribedAt,
    endsAt: user.subscriptionEndsAt,
    trialEndsAt: user.trialEndsAt,
    trialUsed: user.trialUsed,
    daysLeft: user.subscriptionEndsAt
      ? Math.ceil((user.subscriptionEndsAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      : null,
  });
}
