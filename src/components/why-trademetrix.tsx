'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader, FadeIn } from './ui/section';
import { Section3D } from './section-3d';
import { Check, X, Zap, TrendingUp, Users, Globe, Shield, BarChart3, Cpu } from 'lucide-react';

const comparisons = [
  { feature: 'Strategy Automation', us: true, manual: false, other: 'Partial' },
  { feature: 'Multi-Broker Support', us: true, manual: false, other: 'Limited' },
  { feature: 'Backtesting Engine', us: true, manual: false, other: 'Basic' },
  { feature: 'Real-Time Risk Controls', us: true, manual: false, other: true },
  { feature: 'Live Performance Analytics', us: true, manual: false, other: true },
  { feature: 'Strategy Marketplace', us: true, manual: false, other: false },
  { feature: 'AI-Powered Optimization', us: true, manual: false, other: false },
  { feature: 'Option Chain Scanner', us: true, manual: false, other: 'Paid Add-on' },
  { feature: 'Paper Trading', us: true, manual: false, other: 'Limited' },
  { feature: 'Mobile Monitoring', us: true, manual: false, other: true },
  { feature: 'Bank-Grade Encryption', us: true, manual: false, other: 'Varies' },
  { feature: 'Dedicated Support', us: true, manual: false, other: 'Chat Only' },
];

const benefits = [
  {
    icon: TrendingUp,
    title: 'Remove Emotional Trading',
    desc: 'Fear and greed cause 80% of trading losses. Our algorithms execute your strategy precisely, no matter the market conditions.',
    stat: '80%',
    statLabel: 'of losses are emotional',
  },
  {
    icon: Cpu,
    title: '24/7 Market Coverage',
    desc: 'Your strategies never sleep. They monitor, analyze, and execute across sessions without you staring at screens all day.',
    stat: '24/7',
    statLabel: 'Automated operation',
  },
  {
    icon: BarChart3,
    title: 'Data-Backed Decisions',
    desc: 'Every strategy has 15+ years of backtest data. Know your edge before risking real capital. No more gambling on gut feelings.',
    stat: '15+ Yrs',
    statLabel: 'Historical data',
  },
  {
    icon: Zap,
    title: 'Institutional Infrastructure',
    desc: 'AWS Mumbai data centers, sub-5ms execution, 99.99% uptime. The same infrastructure used by hedge funds, accessible to you.',
    stat: '< 5ms',
    statLabel: 'Execution latency',
  },
];

export function WhyTradeMetrix() {
  return (
    <Section id="why-trademetrix">
      <SectionHeader
        title="Why Trade Metrix?"
        subtitle="85% of retail traders lose money. Don&apos;t be a statistic. Here&apos;s how we level the playing field."
      />

      <Section3D variant="geometrics" />

      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-5 mb-16">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="group relative rounded-2xl border border-white/[0.06] bg-card p-6 card-depth hover:border-accent/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-1 ring-accent/20 flex-shrink-0">
                  <benefit.icon size={22} className="text-accent" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-base font-semibold text-white">{benefit.title}</h3>
                    <span className="text-lg font-bold text-accent">{benefit.stat}</span>
                  </div>
                  <p className="text-sm text-muted leading-relaxed">{benefit.desc}</p>
                  <span className="text-[10px] text-muted/50 mt-1 block">{benefit.statLabel}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/[0.06] bg-card overflow-hidden card-depth">
          <div className="p-5 md:p-6 border-b border-white/[0.06] bg-gradient-to-r from-accent/[0.02] to-transparent">
            <h3 className="text-base font-semibold text-white">Trade Metrix vs Manual vs Other Platforms</h3>
            <p className="text-xs text-muted mt-1">Honest comparison. See what you actually get.</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="text-left p-3 md:p-4 text-muted font-medium text-xs">Feature</th>
                  <th className="p-3 md:p-4 text-center text-xs font-semibold text-accent">Trade Metrix</th>
                  <th className="p-3 md:p-4 text-center text-xs font-medium text-muted">Manual Trading</th>
                  <th className="p-3 md:p-4 text-center text-xs font-medium text-muted">Other Platforms</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-white/[0.01]' : ''}>
                    <td className="p-3 md:p-4 text-sm text-white">{row.feature}</td>
                    <td className="p-3 md:p-4 text-center">
                      {row.us === true ? (
                        <Check size={16} className="text-accent mx-auto" />
                      ) : (
                        <X size={16} className="text-red-400/50 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      {row.manual === true ? (
                        <Check size={16} className="text-accent/50 mx-auto" />
                      ) : (
                        <X size={16} className="text-red-400/50 mx-auto" />
                      )}
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      {typeof row.other === 'string' ? (
                        <span className="text-xs text-muted">{row.other}</span>
                      ) : row.other === true ? (
                        <Check size={16} className="text-accent/50 mx-auto" />
                      ) : (
                        <X size={16} className="text-red-400/50 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}
