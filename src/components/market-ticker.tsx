'use client';

import { useEffect, useRef, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const indices = [
  { symbol: 'NIFTY 50', price: '24,582.30', change: '+1.2%', up: true },
  { symbol: 'SENSEX', price: '81,034.15', change: '+1.1%', up: true },
  { symbol: 'BANK NIFTY', price: '52,148.75', change: '-0.3%', up: false },
  { symbol: 'FIN NIFTY', price: '23,456.20', change: '+0.8%', up: true },
  { symbol: 'MIDCAP 100', price: '52,891.40', change: '+0.5%', up: true },
  { symbol: 'SME IPO', price: '186.50', change: '+4.2%', up: true },
  { symbol: 'INDIA VIX', price: '12.84', change: '-2.1%', up: false },
  { symbol: 'NIFTY IT', price: '38,429.60', change: '+0.9%', up: true },
  { symbol: 'NIFTY PHARMA', price: '19,812.35', change: '-0.7%', up: false },
  { symbol: 'NIFTY AUTO', price: '22,564.80', change: '+1.5%', up: true },
];

const strategies = [
  'Momentum Pro +32.4%',
  'Mean Reversion +24.8%',
  'Breakout Hunter +45.2%',
  'Options Alpha +28.6%',
  'Scalper X +38.1%',
];

export function MarketTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let id: number;
    let pos = 0;
    const speed = 0.5;

    const animate = () => {
      if (!paused) {
        pos -= speed;
        if (pos <= -el.scrollWidth / 2) pos = 0;
        el.style.transform = `translateX(${pos}px)`;
      }
      id = requestAnimationFrame(animate);
    };
    id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [paused]);

  const tickerItems = [
    ...indices.map((i) => ({
      type: 'index' as const,
      symbol: i.symbol,
      price: i.price,
      change: i.change,
      up: i.up,
    })),
    ...strategies.map((s) => ({
      type: 'strategy' as const,
      symbol: s.split(' ')[0],
      price: s.split(' ')[1],
      change: '',
      up: true,
    })),
  ];

  return (
    <div
      className="fixed top-[72px] md:top-20 left-0 right-0 z-40 h-10 bg-card/80 backdrop-blur-md border-b border-white/[0.06] overflow-hidden hidden md:block"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80 pointer-events-none z-10" />

      <div className="relative h-full flex items-center">
        <div className="flex items-center gap-1 h-full">
          <div className="flex items-center gap-2 px-4 h-full bg-accent/10 border-r border-accent/20 z-20">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
            </span>
            <span className="text-[10px] font-semibold text-accent uppercase tracking-wider">Live</span>
          </div>

          <div ref={scrollRef} className="flex items-center gap-6 whitespace-nowrap" style={{ willChange: 'transform' }}>
            {[...Array(3)].flatMap(() => tickerItems).map((item, i) => (
              <div key={i} className="flex items-center gap-2 px-2">
                {item.type === 'index' ? (
                  <>
                    <span className="text-[11px] font-medium text-white">{item.symbol}</span>
                    <span className="text-[11px] tabular-nums text-white/80">{item.price}</span>
                    <span className={`flex items-center gap-0.5 text-[10px] font-medium ${item.up ? 'text-accent-2' : 'text-red-400'}`}>
                      {item.up ? <TrendingUp size={8} /> : <TrendingDown size={8} />}
                      {item.change}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-[11px] font-medium text-white">{item.symbol}</span>
                    <span className="text-[11px] tabular-nums text-accent">{item.price}</span>
                    <div className="w-1 h-1 rounded-full bg-accent/40" />
                    <span className="text-[10px] text-muted">Top Strategy</span>
                  </>
                )}
                <div className="w-px h-3 bg-white/[0.08] ml-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
