'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section, SectionHeader } from './ui/section';
import { Section3D } from './section-3d';
import { LiveChart } from './ui/live-chart';
import { CandlestickChart, Code2, Radar, Activity, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  {
    id: 'chart',
    label: 'Trading Chart',
    icon: CandlestickChart,
    color: '#FFFFFF',
    features: ['50+ Indicators', 'Multiple Timeframes', 'Drawing Tools', 'Real-Time Data'],
    metrics: ['2.3ms Latency', '99.99% Uptime', '15+ Exchanges'],
  },
  {
    id: 'builder',
    label: 'Strategy Builder',
    icon: Code2,
    color: '#EF4444',
    features: ['Visual Drag & Drop', 'Python Scripting', 'Strategy Templates', 'Version Control'],
    metrics: ['500+ Templates', 'Zero Code Option', 'Git Integration'],
  },
  {
    id: 'analytics',
    label: 'Analytics',
    icon: Radar,
    color: '#F59E0B',
    features: ['P&L Attribution', 'Risk Metrics', 'Trade Journal', 'Custom Reports'],
    metrics: ['Sharpe Ratio', 'Sortino Ratio', 'Win Rate Analysis'],
  },
  {
    id: 'risk',
    label: 'Risk Management',
    icon: Activity,
    color: '#EF4444',
    features: ['Position Limits', 'Auto Stop-Loss', 'Kill Switch', 'Circuit Breakers'],
    metrics: ['Real-Time Monitoring', 'Multi-Level Controls', 'Audit Trail'],
  },
];

const tabPreviews: Record<string, React.ReactNode> = {
  chart: <LiveChart height={320} />,
  builder: (
    <div className="flex flex-col gap-2 p-4 h-full justify-center">
      {[
        { label: 'Entry: MA Crossover', desc: 'Buy when 20 EMA crosses above 50 EMA' },
        { label: 'Exit: RSI Overbought', desc: 'Sell when RSI exceeds 70' },
        { label: 'Stop Loss: ATR-Based', desc: '2x ATR from entry price' },
        { label: 'Position Size: 10%', desc: 'Per trade risk: 1% of capital' },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.05] transition-all duration-200"
        >
          <div className="w-2 h-2 rounded-full bg-accent shadow-sm shadow-accent/50" />
          <div>
            <div className="text-sm text-white font-medium">{item.label}</div>
            <div className="text-xs text-muted">{item.desc}</div>
          </div>
        </motion.div>
      ))}
    </div>
  ),
  analytics: (
    <div className="p-4 space-y-3 h-full flex flex-col justify-center">
      <div className="grid grid-cols-2 gap-2">
        {[
          { label: 'Win Rate', value: '71.2%', color: 'text-accent' },
          { label: 'Profit Factor', value: '2.14', color: 'text-blue-400' },
          { label: 'Avg Trade', value: '₹1,245', color: 'text-yellow-400' },
          { label: 'Max DD', value: '-8.4%', color: 'text-red-400' },
        ].map((m) => (
          <div key={m.label} className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] card-depth">
            <div className="text-xs text-muted">{m.label}</div>
            <div className={`text-lg font-bold ${m.color} tracking-tight`}>{m.value}</div>
          </div>
        ))}
      </div>
      <div className="flex gap-1 items-end h-16 pt-2">
        {[40, 60, 45, 70, 55, 80, 65, 90, 75, 85].map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="flex-1 rounded-sm bg-gradient-to-t from-accent/60 to-accent/20"
          />
        ))}
      </div>
    </div>
  ),
  risk: (
    <div className="p-4 space-y-3 h-full flex flex-col justify-center">
      {[
        { label: 'Max Position Size', value: '25%', status: true },
        { label: 'Daily Loss Limit', value: '₹50,000', status: true },
        { label: 'Max Drawdown', value: '15%', status: true },
        { label: 'Leverage Limit', value: '5x', status: true },
      ].map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.08 }}
          className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 transition-colors"
        >
          <span className="text-sm text-muted">{item.label}</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-white font-medium">{item.value}</span>
            <span className="w-2 h-2 rounded-full bg-accent shadow-sm shadow-accent/50 animate-pulse" />
          </div>
        </motion.div>
      ))}
      <div className="p-2.5 rounded-lg bg-accent/5 border border-accent/10 text-center shadow-sm shadow-accent/5">
        <span className="text-xs text-accent font-medium">All risk limits active &bull; Real-time monitoring</span>
      </div>
    </div>
  ),
};

export function PlatformPreview() {
  const [activeTab, setActiveTab] = useState('chart');
  const activeData = tabs.find((t) => t.id === activeTab);

  useEffect(() => {
    gsap.fromTo(
      '.platform-card',
      { opacity: 0, y: 60, scale: 0.95 },
      {
        opacity: 1, y: 0, scale: 1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: '.platform-card',
          start: 'top 80%',
          end: 'top 20%',
          scrub: 1,
        },
      }
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <Section id="platform" className="bg-surface/30">
      <SectionHeader
        title="See the Platform in Action"
        subtitle="Everything you need to build, test and deploy trading strategies at scale."
      />

      <Section3D variant="geometrics" />

      <div className="platform-card max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-card to-card/80 border border-white/[0.08] rounded-3xl overflow-hidden shadow-2xl shadow-accent/5 card-depth-lg">
          <div className="flex border-b border-white/[0.06] overflow-x-auto no-scrollbar bg-card/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-6 py-4 text-sm font-medium transition-all duration-300 whitespace-nowrap border-b-2 relative ${
                  activeTab === tab.id
                    ? 'text-accent border-accent bg-accent/[0.02]'
                    : 'text-muted border-transparent hover:text-white hover:bg-white/[0.02]'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tabIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent shadow-sm shadow-accent/50"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-5 min-h-[400px]">
            <div className="lg:col-span-2 p-6 md:p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-2 h-2 rounded-full shadow-sm"
                      style={{ backgroundColor: activeData?.color, boxShadow: `0 0 8px ${activeData?.color}40` }}
                    />
                    <span className="text-xs text-muted font-mono">/{activeTab}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                    {activeData?.label}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm">
                    {activeTab === 'chart' && 'Advanced charting with 50+ indicators, multiple timeframes, and real-time data streaming.'}
                    {activeTab === 'builder' && 'Drag-and-drop strategy builder with Python scripting support. No coding required.'}
                    {activeTab === 'analytics' && 'Comprehensive analytics with Sharpe ratio, drawdown analysis, and win rate tracking.'}
                    {activeTab === 'risk' && 'Set position limits, stop-losses, and risk thresholds across all strategies.'}
                  </p>

                  <div className="mt-6 space-y-2">
                    {activeData?.features.map((f) => (
                      <div key={f} className="flex items-center gap-2.5 text-sm text-muted">
                        <div className="w-1.5 h-1.5 rounded-full bg-accent/60 shadow-sm shadow-accent/30" />
                        {f}
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeData?.metrics.map((m) => (
                      <span key={m} className="px-3 py-1 text-[11px] rounded-full bg-accent/10 text-accent border border-accent/20 font-medium shadow-sm shadow-accent/5">
                        {m}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="lg:col-span-3 p-4 md:p-6 bg-surface/50">
              <div className="h-full rounded-xl bg-gradient-to-br from-accent/[0.02] to-surface border border-white/[0.06] overflow-hidden card-depth">
                <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.04] bg-card/30">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-white/60" />
                  </div>
                  <span className="text-[10px] text-muted font-mono">tab-{activeTab}</span>
                  <ArrowUpRight size={12} className="text-muted" />
                </div>
                <div className="h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="h-full"
                    >
                      {tabPreviews[activeTab]}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
