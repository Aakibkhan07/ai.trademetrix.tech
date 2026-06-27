'use client';

import dynamic from 'next/dynamic';

const TradingSceneInner = dynamic(
  () => import('@/src/components/three/trading-scene').then((mod) => mod.TradingScene),
  { ssr: false }
);

export function TradingSceneClient({ scrollY }: { scrollY: { current: number } }) {
  return <TradingSceneInner scrollY={scrollY} />;
}
