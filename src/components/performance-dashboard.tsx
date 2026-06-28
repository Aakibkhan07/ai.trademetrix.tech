'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Section, SectionHeader } from './ui/section';
import { AnimatedCounter } from './ui/animated-counter';
import { TrendingUp, TrendingDown, PieChart, Activity, Target, Zap, DollarSign, Percent } from 'lucide-react';

const metrics = [
  { label: 'Total P&L', value: 245890, prefix: '₹', formatted: '₹2,45,890', change: '+15.3%', icon: TrendingUp, positive: true },
  { label: 'Win Rate', value: 71.2, suffix: '%', decimals: 1, formatted: '71.2%', change: '+3.1%', icon: Target, positive: true },
  { label: 'Sharpe Ratio', value: 2.14, decimals: 2, formatted: '2.14', change: '+0.3', icon: Activity, positive: true },
  { label: 'Max Drawdown', value: 8.4, suffix: '%', decimals: 1, formatted: '-8.4%', change: '-2.1%', icon: TrendingDown, positive: false },
  { label: 'Avg Return/Trade', value: 1245, prefix: '₹', formatted: '₹1,245', change: '+5.8%', icon: PieChart, positive: true },
  { label: 'Total Trades', value: 847, formatted: '847', change: '+12.4%', icon: Zap, positive: true },
];

const tradeDistribution = [
  { label: 'NIFTY', value: 35, color: 'bg-accent' },
  { label: 'BANK NIFTY', value: 28, color: 'bg-blue-500' },
  { label: 'FIN NIFTY', value: 20, color: 'bg-yellow-500' },
  { label: 'OTHERS', value: 17, color: 'bg-purple-500' },
];

export function PerformanceDashboard() {
  const ref = useRef(null);
  const chartRef = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const chartInView = useInView(chartRef, { once: true, margin: '-50px' });

  return (
    <Section id="performance" className="bg-surface/30">
      <SectionHeader
        title="Past Performance"
        subtitle="Historical performance metrics across all your strategies. Verified and backtested."
      />

      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="group bg-card border border-white/[0.06] rounded-xl p-4 hover:border-accent/20 transition-all duration-300 hover:shadow-lg hover:shadow-accent/5"
            >
              <metric.icon size={14} className="text-muted mb-2 group-hover:text-accent transition-colors" />
              <span className="text-xs text-muted block mb-1">{metric.label}</span>
              <div className="flex items-baseline gap-1">
                <span className="text-lg font-bold text-white tabular-nums">
                  {metric.prefix}
                  <AnimatedCounter
                    end={metric.value}
                    decimals={metric.decimals || 0}
                    suffix={metric.suffix || ''}
                  />
                </span>
                <span className={`text-xs font-medium ${metric.positive ? 'text-accent-2' : 'text-red-400'}`}>
                  {metric.change}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-6 grid md:grid-cols-3 gap-6">
          <motion.div
            ref={chartRef}
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="md:col-span-2 bg-card border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-colors duration-300"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Equity Curve</h3>
              <div className="flex gap-1 bg-background rounded-lg p-1">
                {['1W', '1M', '3M', '6M', '1Y', 'ALL'].map((p) => (
                  <button
                    key={p}
                    className={`px-3 py-1 text-xs rounded-md transition-all ${
                      p === '1Y' ? 'bg-accent text-background font-medium' : 'text-muted hover:text-white'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-48 md:h-64 rounded-xl bg-gradient-to-b from-accent/[0.03] to-transparent border border-white/[0.04] overflow-hidden relative">
              <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="equityGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#EF4444" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={chartInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
                  d="M0 180 Q30 175 60 170 Q90 160 120 150 Q150 140 180 130 Q210 110 240 115 Q270 95 300 100 Q330 75 360 80 Q390 55 420 60 Q450 40 480 50 Q510 30 540 35 Q570 15 600 20"
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={chartInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
                  d="M0 180 Q30 175 60 170 Q90 160 120 150 Q150 140 180 130 Q210 110 240 115 Q270 95 300 100 Q330 75 360 80 Q390 55 420 60 Q450 40 480 50 Q510 30 540 35 Q570 15 600 20 L600 200 L0 200 Z"
                  fill="url(#equityGrad)"
                />
                {[0, 100, 200, 300, 400, 500].map((x) => (
                  <motion.line
                    key={x}
                    initial={{ opacity: 0 }}
                    animate={chartInView ? { opacity: 1 } : {}}
                    transition={{ delay: 1.5 }}
                    x1={x}
                    y1="0"
                    x2={x}
                    y2="200"
                    stroke="rgba(0,229,168,0.05)"
                    strokeWidth="1"
                    strokeDasharray="3,3"
                  />
                ))}
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-card border border-white/[0.06] rounded-2xl p-6 md:p-8 hover:border-accent/20 transition-colors duration-300"
          >
            <h3 className="text-lg font-semibold text-white mb-6">Trade Distribution</h3>
            <div className="space-y-4">
              {tradeDistribution.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted">{item.label}</span>
                    <span className="text-white font-medium">{item.value}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={chartInView ? { width: `${item.value}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + tradeDistribution.indexOf(item) * 0.15, ease: 'easeOut' }}
                      className={`h-full rounded-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-white/[0.06]">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-xs text-muted">Best Trade</span>
                  <div className="text-sm font-semibold text-accent mt-0.5">+₹12,450</div>
                </div>
                <div>
                  <span className="text-xs text-muted">Worst Trade</span>
                  <div className="text-sm font-semibold text-red-400 mt-0.5">-₹3,200</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
