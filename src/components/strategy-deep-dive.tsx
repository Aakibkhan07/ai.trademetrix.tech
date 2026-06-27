'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader, StaggerGrid, StaggerItem } from './ui/section';
import { TrendingUp, TrendingDown, Activity, Target, BarChart3, Clock, Zap, Shield } from 'lucide-react';

const strategies = [
  {
    name: 'Momentum Pro',
    tagline: 'Ride the trend with machine learning',
    strategy: 'Detects breakouts using volume-weighted price action + ML regime classifier. Enters on confirmation with adaptive position sizing.',
    color: '#FFFFFF',
    stats: { returns: '+32.4%', sharpe: 2.1, drawdown: '-8.2%', winRate: '68%', avgTrade: '₹1,240', tradesDay: '3-5' },
    conditions: 'Performs best in trending markets with high volume. Avoid during range-bound/low volatility.',
    benchmark: 'NIFTY 50 Benchmark: +12.8%',
  },
  {
    name: 'Mean Reversion',
    tagline: 'Statistical arbitrage on over-extended moves',
    strategy: 'Z-score based mean reversion with Bollinger Band confluence. Entry at 2.5 standard deviations with volume confirmation.',
    color: '#EF4444',
    stats: { returns: '+24.8%', sharpe: 1.8, drawdown: '-5.1%', winRate: '72%', avgTrade: '₹860', tradesDay: '5-8' },
    conditions: 'Best in range-bound markets with mean-reverting behavior. Avoid during strong trend days.',
    benchmark: 'NIFTY 50 Benchmark: +12.8%',
  },
  {
    name: 'Breakout Hunter',
    tagline: 'High momentum breakout capture system',
    strategy: 'Multi-timeframe consolidation detection → volume surge confirmation → aggressive entry with dynamic stop placement.',
    color: '#F59E0B',
    stats: { returns: '+45.2%', sharpe: 1.5, drawdown: '-15.3%', winRate: '55%', avgTrade: '₹2,840', tradesDay: '1-3' },
    conditions: 'Best on high-impact news days and market open. Higher risk/reward but lower win rate.',
    benchmark: 'NIFTY 50 Benchmark: +12.8%',
  },
  {
    name: 'Options Alpha',
    tagline: 'Theta decay capture + volatility arbitrage',
    strategy: 'Sells out-of-the-money options strangles with dynamic delta hedging. IV rank and term structure analysis for entry.',
    color: '#A78BFA',
    stats: { returns: '+28.6%', sharpe: 1.9, drawdown: '-6.8%', winRate: '65%', avgTrade: '₹1,560', tradesDay: '2-4' },
    conditions: 'Requires options market access. Best in normal to high IV environments. Avoid during earnings/events.',
    benchmark: 'NIFTY 50 Benchmark: +12.8%',
  },
  {
    name: 'Scalper X',
    tagline: 'Ultra-low latency tape reading system',
    strategy: 'Order flow imbalance + tape reading + micro-structure pattern recognition. Sub-100ms entry execution.',
    color: '#EF4444',
    stats: { returns: '+38.1%', sharpe: 1.3, drawdown: '-12.4%', winRate: '61%', avgTrade: '₹420', tradesDay: '15-30' },
    conditions: 'High-frequency intraday. Requires low-latency broker. Best in liquid stocks during peak hours.',
    benchmark: 'NIFTY 50 Benchmark: +12.8%',
  },
  {
    name: 'Swing Trader',
    tagline: 'Multi-day position management with AI',
    strategy: 'Combines fundamental filters + technical entry. Holds positions 2-7 days. Uses ATR-based trailing stop and pyramiding.',
    color: '#34D399',
    stats: { returns: '+20.5%', sharpe: 2.3, drawdown: '-4.2%', winRate: '76%', avgTrade: '₹3,100', tradesDay: '0.5-1' },
    conditions: 'Lowest stress strategy. Best in strong directional markets. Requires patience for position build-up.',
    benchmark: 'NIFTY 50 Benchmark: +12.8%',
  },
];

export function StrategyDeepDive() {
  return (
    <Section id="strategy-details" className="bg-surface/30">
      <SectionHeader
        title="Strategy Performance & Methodology"
        subtitle="Every strategy comes with full transparency. Backtest results, live performance, and detailed methodology."
      />

      <StaggerGrid className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        {strategies.map((s) => (
          <StaggerItem key={s.name}>
            <motion.div
              whileHover={{ y: -2 }}
              className="group relative rounded-2xl border border-white/[0.06] bg-card p-5 md:p-6 card-depth hover:border-accent/20 transition-all duration-300 card-pop-glow"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
                e.currentTarget.style.transform = `perspective(800px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) translateZ(10px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
              }}
            >
              <div className="grid md:grid-cols-5 gap-5 md:gap-6">
                <div className="md:col-span-2">
                  <div className="flex items-start gap-3 mb-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: s.color + '20', borderColor: s.color + '30' }}
                    >
                      <Activity size={16} style={{ color: s.color }} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-white">{s.name}</h3>
                      <p className="text-xs text-muted">{s.tagline}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{s.strategy}</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-muted/60">
                    <Clock size={10} />
                    <span>{s.conditions}</span>
                  </div>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {[
                    { label: 'Returns', value: s.stats.returns, color: s.stats.returns.startsWith('+') ? 'text-accent-2' : 'text-red-400' },
                    { label: 'Max DD', value: s.stats.drawdown, color: 'text-red-400' },
                    { label: 'Win Rate', value: s.stats.winRate, color: 'text-accent-2' },
                    { label: 'Avg Trade', value: s.stats.avgTrade, color: 'text-white' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-background/50 rounded-lg p-2 text-center border border-white/[0.04]">
                      <div className={`text-[10px] font-semibold ${stat.color}`}>{stat.value}</div>
                      <div className="text-[8px] text-muted uppercase tracking-wider mt-0.5">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="md:col-span-1 flex items-center">
                  <div className="w-full bg-background/50 rounded-lg p-3 border border-white/[0.04] text-center">
                    <span className="text-[9px] text-muted block">Trades/Day</span>
                    <span className="text-sm font-bold text-white">{s.stats.tradesDay}</span>
                    <div className="mt-2 pt-2 border-t border-white/[0.04]">
                      <span className="text-[8px] text-muted/60">{s.benchmark}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
