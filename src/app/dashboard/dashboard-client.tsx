'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp, Activity, Zap, BarChart3, ArrowUpRight, ArrowDown,
  Settings, GitBranch, LineChart, Shield,
} from 'lucide-react';
import { useModal } from '@/src/components/modal-context';
import { OnboardingWizard } from '@/src/components/onboarding-wizard';

const strategies = [
  { name: 'Momentum v3', status: 'Active', pnl: '+₹12,450', winRate: '74%', trades: 47, exposure: '32%' },
  { name: 'Mean Reversion', status: 'Active', pnl: '+₹8,320', winRate: '68%', trades: 38, exposure: '24%' },
  { name: 'Options Scalper', status: 'Paused', pnl: '-₹2,150', winRate: '42%', trades: 12, exposure: '18%' },
  { name: 'Breakout Pro', status: 'Active', pnl: '+₹15,670', winRate: '79%', trades: 53, exposure: '26%' },
];

const recentTrades = [
  { time: '09:32', symbol: 'NIFTY', side: 'LONG', qty: 75, pnl: '+₹5,400' },
  { time: '09:47', symbol: 'BANKNIFTY', side: 'SHORT', qty: 40, pnl: '+₹2,400' },
  { time: '10:15', symbol: 'NIFTY', side: 'LONG', qty: 50, pnl: '-₹1,500' },
  { time: '10:38', symbol: 'RELIANCE', side: 'LONG', qty: 100, pnl: '+₹2,500' },
  { time: '11:05', symbol: 'NIFTY', side: 'SHORT', qty: 60, pnl: '+₹4,200' },
];

export function DashboardPage() {
  const { user } = useModal();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const h = new Date().getHours();
    if (h < 12) setGreeting('Good morning');
    else if (h < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <OnboardingWizard />
      <header className="border-b border-white/[0.06] bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <a href="/">
              <img src="/logo.svg" alt="Trade Metrix" className="h-8 w-auto" />
            </a>
            <span className="px-2 py-0.5 text-[10px] rounded-full bg-accent/10 text-accent border border-accent/20">Dashboard</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted">
            <span>{greeting}, {user?.email?.split('@')[0] || 'Trader'}</span>
            <div className="w-7 h-7 rounded-full bg-accent/20 flex items-center justify-center text-accent text-xs font-semibold">
              {(user?.email?.[0] || 'T').toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total P&L', value: '+₹34,290', up: true, icon: TrendingUp },
            { label: 'Win Rate', value: '71.2%', up: true, icon: Activity },
            { label: 'Active Strategies', value: '4', up: null, icon: GitBranch },
            { label: 'Total Exposure', value: '₹2.4Cr', up: null, icon: BarChart3 },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 rounded-xl bg-card border border-white/[0.06] card-depth"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] text-muted">{s.label}</span>
                <s.icon size={14} className="text-accent" />
              </div>
              <div className={`text-xl font-bold ${s.up === true ? 'text-green-400' : s.up === false ? 'text-red-400' : 'text-white'}`}>{s.value}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl bg-card border border-white/[0.06] card-depth"
          >
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Live Strategies</span>
              <span className="flex items-center gap-1 text-[10px] text-green-400">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> 3 Active
              </span>
            </div>
            <div className="p-4 space-y-2">
              {strategies.map((s, i) => (
                <motion.div
                  key={s.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'}`} />
                    <div>
                      <div className="text-xs font-medium text-white">{s.name}</div>
                      <div className="text-[10px] text-muted">{s.trades} trades · {s.winRate} win · {s.exposure} exp</div>
                    </div>
                  </div>
                  <div className={`text-xs font-semibold ${s.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{s.pnl}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-xl bg-card border border-white/[0.06] card-depth"
          >
            <div className="px-5 py-3 border-b border-white/[0.06] flex items-center justify-between">
              <span className="text-sm font-semibold text-white">Recent Trades</span>
              <span className="text-[10px] text-muted">Today</span>
            </div>
            <div className="p-4 space-y-1">
              <div className="grid grid-cols-5 text-[9px] text-muted px-2 py-1 border-b border-white/[0.04]">
                <span>Time</span><span>Symbol</span><span>Side</span><span>Qty</span><span>P&L</span>
              </div>
              {recentTrades.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="grid grid-cols-5 text-[10px] px-2 py-1.5 rounded-lg hover:bg-white/[0.03] transition-colors font-mono"
                >
                  <span className="text-muted">{t.time}</span>
                  <span className="text-white">{t.symbol}</span>
                  <span className={t.side === 'LONG' ? 'text-green-400' : 'text-red-400'}>{t.side}</span>
                  <span className="text-muted">{t.qty}</span>
                  <span className={t.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{t.pnl}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 rounded-xl bg-card border border-white/[0.06] card-depth p-5"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-white">Quick Actions</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: GitBranch, label: 'New Strategy', color: 'text-accent' },
              { icon: LineChart, label: 'Backtest', color: 'text-green-400' },
              { icon: Zap, label: 'Deploy', color: 'text-accent' },
              { icon: Shield, label: 'Risk Settings', color: 'text-muted' },
            ].map((a) => (
              <button
                key={a.label}
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 hover:bg-accent/5 transition-all text-xs font-medium text-muted hover:text-white"
              >
                <a.icon size={14} className={a.color} />
                {a.label}
              </button>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
