'use client';

import { Section, SectionHeader, StaggerGrid, StaggerItem } from './ui/section';
import { Card, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { TrendingUp, Shield, Zap, ArrowUpRight, Star, Users } from 'lucide-react';

const strategies = [
  {
    name: 'Momentum Pro',
    category: 'Momentum',
    risk: 'Moderate',
    riskColor: 'text-yellow-400',
    stats: { returns: '+32.4%', sharpe: '2.1', drawdown: '-8.2%', winRate: '68%' },
    subscribers: '2,847',
    rating: 4.8,
  },
  {
    name: 'Mean Reversion',
    category: 'Mean Reversion',
    risk: 'Low',
    riskColor: 'text-accent',
    stats: { returns: '+24.8%', sharpe: '1.8', drawdown: '-5.1%', winRate: '72%' },
    subscribers: '1,934',
    rating: 4.9,
  },
  {
    name: 'Breakout Hunter',
    category: 'Breakout',
    risk: 'High',
    riskColor: 'text-red-400',
    stats: { returns: '+45.2%', sharpe: '1.5', drawdown: '-15.3%', winRate: '55%' },
    subscribers: '3,211',
    rating: 4.6,
  },
  {
    name: 'Options Alpha',
    category: 'Options',
    risk: 'Moderate',
    riskColor: 'text-yellow-400',
    stats: { returns: '+28.6%', sharpe: '1.9', drawdown: '-6.8%', winRate: '65%' },
    subscribers: '1,567',
    rating: 4.7,
  },
  {
    name: 'Scalper X',
    category: 'Intraday',
    risk: 'High',
    riskColor: 'text-red-400',
    stats: { returns: '+38.1%', sharpe: '1.3', drawdown: '-12.4%', winRate: '61%' },
    subscribers: '4,023',
    rating: 4.5,
  },
  {
    name: 'Swing Trader',
    category: 'Swing',
    risk: 'Low',
    riskColor: 'text-accent',
    stats: { returns: '+20.5%', sharpe: '2.3', drawdown: '-4.2%', winRate: '76%' },
    subscribers: '2,456',
    rating: 4.9,
  },
];

export function StrategyMarketplace() {
  return (
    <Section id="strategies">
      <SectionHeader
        title="Strategy Marketplace"
        subtitle="Browse and subscribe to professionally built trading strategies. Fully transparent performance data."
      />

      <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {strategies.map((s) => (
          <StaggerItem key={s.name}>
            <Card gradientBorder pop className="flex flex-col h-full">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-1 ring-accent/20 shadow-sm shadow-accent/10">
                      <TrendingUp size={16} className="text-accent" />
                    </div>
                    <div>
                      <CardTitle className="mb-0 text-base">{s.name}</CardTitle>
                      <span className="text-xs text-muted">{s.category}</span>
                    </div>
                  </div>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full border font-medium ${s.riskColor} bg-current/5 border-current/20`}>
                  {s.risk}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 mb-4">
                {Object.entries(s.stats).map(([key, val]) => (
                  <div key={key} className="bg-background/50 rounded-lg p-2.5 border border-white/[0.04]">
                    <span className="text-[10px] text-muted uppercase tracking-wider">{key}</span>
                    <div className="text-sm font-semibold text-white mt-0.5">{val}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between text-xs text-muted mb-4">
                <div className="flex items-center gap-1.5">
                  <Star size={12} className="text-yellow-400 fill-yellow-400" />
                  <span>{s.rating}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={12} />
                  <span>{s.subscribers} subs</span>
                </div>
              </div>

              <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div>
                  <span className="text-lg font-bold text-white">₹2,499</span>
                  <span className="text-xs text-muted">/mo</span>
                </div>
                <Button variant="primary" size="sm">
                  Subscribe
                  <ArrowUpRight size={14} />
                </Button>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
