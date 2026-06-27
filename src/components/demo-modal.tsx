'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, TrendingUp, Activity, Zap, BarChart3, Play, Pause,
  ArrowUpRight, ArrowDown, Settings, GitBranch, LineChart,
  Shield, ChevronRight, Check, AlertTriangle, RefreshCw,
} from 'lucide-react';
import { useModal } from '@/src/components/modal-context';

const steps = [
  {
    title: '1. Build Your Strategy',
    subtitle: 'Visual strategy builder with Python scripting',
    badge: 'Strategy Builder',
    icon: GitBranch,
    panel: 'builder',
    overlay: 'Define entry/exit rules using technical indicators. Set position sizing, stop-losses, and take-profit targets. No coding required — or use Python for advanced logic.',
  },
  {
    title: '2. Backtest & Optimize',
    subtitle: 'Tick-level backtest across 15+ years of data',
    badge: 'Backtesting',
    icon: LineChart,
    panel: 'backtest',
    overlay: 'Run historical simulations with realistic slippage and brokerage. Genetic algorithm optimizer finds optimal parameters. Results in seconds, not hours.',
  },
  {
    title: '3. Deploy Live',
    subtitle: 'One-click deployment with 5ms execution',
    badge: 'Live Trading',
    icon: Zap,
    panel: 'deploy',
    overlay: 'Deploy to production with one click. Smart order routing across 10+ brokers. Average 5ms execution with automatic failover.',
  },
  {
    title: '4. Monitor & Optimize',
    subtitle: 'Real-time P&L, drawdown tracking, risk alerts',
    badge: 'Monitoring',
    icon: Shield,
    panel: 'monitor',
    overlay: 'Watch your strategies execute in real-time. Automatic drawdown limits. Get alerts via Telegram, email, or webhook. Iterate and improve continuously.',
  },
];

function useLivePrice() {
  const [price, setPrice] = useState(24582.30);
  useEffect(() => {
    const interval = setInterval(() => {
      setPrice(p => parseFloat((p + (Math.random() - 0.47) * 20).toFixed(2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return price;
}

const strategyCode = `# Momentum Strategy
def on_bar(data):
    sma_20 = sma(data.close, 20)
    sma_50 = sma(data.close, 50)
    
    if crossover(sma_20, sma_50):
        entry('LONG', size=0.1, sl=0.5, tp=1.2)
    elif crossunder(sma_20, sma_50):
        entry('SHORT', size=0.1, sl=0.5, tp=1.2)`;

const backtestResults = {
  returns: '+32.4%',
  sharpe: '2.14',
  maxDD: '-8.4%',
  winRate: '71.2%',
  trades: '1,247',
  profitFactor: '2.38',
};

const equityCurve = Array.from({ length: 30 }, (_, i) => ({
  x: i,
  y: 100000 + Math.sin(i * 0.5) * 15000 + i * 2000 + Math.random() * 5000,
}));

const recentTrades = [
  { time: '09:32', symbol: 'NIFTY', side: 'LONG', qty: 75, entry: 24510, exit: 24582, pnl: '+₹5,400' },
  { time: '09:47', symbol: 'BANKNIFTY', side: 'SHORT', qty: 40, entry: 52140, exit: 52080, pnl: '+₹2,400' },
  { time: '10:15', symbol: 'NIFTY', side: 'LONG', qty: 50, entry: 24590, exit: 24560, pnl: '-₹1,500' },
  { time: '10:38', symbol: 'RELIANCE', side: 'LONG', qty: 100, entry: 2850, exit: 2875, pnl: '+₹2,500' },
  { time: '11:05', symbol: 'NIFTY', side: 'SHORT', qty: 60, entry: 24620, exit: 24550, pnl: '+₹4,200' },
];

function PanelBuilder() {
  const allIndicators = ['SMA (20)', 'SMA (50)', 'RSI (14)', 'MACD', 'Bollinger', 'VWAP', 'ATR (14)'];
  const [selected, setSelected] = useState<string[]>(['SMA (20)', 'SMA (50)']);
  const toggle = (ind: string) => {
    setSelected(prev => prev.includes(ind) ? prev.filter(i => i !== ind) : [...prev, ind]);
  };
  const codeLines: Record<string, string[]> = {
    'SMA (20)': ["sma_20 = sma(data.close, 20)"],
    'SMA (50)': ["sma_50 = sma(data.close, 50)"],
    'RSI (14)': ["rsi_14 = rsi(data.close, 14)", "rsi_above = rsi_14 > 70", "rsi_below = rsi_14 < 30"],
    'MACD': ["macd_line = macd(data.close)", "signal_line = signal(data.close)", "macd_hist = macd_line - signal_line"],
    'Bollinger': ["bb_upper, bb_mid, bb_lower = bollinger(data.close, 20)"],
    'VWAP': ["vwap_line = vwap(data.high, data.low, data.close, data.volume)"],
    'ATR (14)': ["atr_14 = atr(data.high, data.low, data.close, 14)"],
  };
  const generated = selected.flatMap(ind => codeLines[ind] || []).join('\n    ');
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06] bg-card/30 text-xs text-muted">
        <Settings size={12} />
        <span>strategy_momentum_v3.py — Unsaved changes</span>
      </div>
      <div className="flex-1 flex">
        <div className="w-48 border-r border-white/[0.06] p-3 space-y-1 overflow-y-auto">
          <div className="text-[10px] text-muted font-medium mb-2 uppercase tracking-wider">Indicators</div>
          {allIndicators.map((ind, i) => (
            <motion.div
              key={ind}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => toggle(ind)}
              className={`px-2.5 py-1.5 rounded-lg text-xs cursor-pointer border transition-all ${
                selected.includes(ind)
                  ? 'bg-accent/10 border-accent/30 text-accent'
                  : 'bg-card/40 border-white/[0.06] text-muted hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between">
                <span>{ind}</span>
                {selected.includes(ind) && <Check size={10} className="text-accent shrink-0" />}
              </div>
            </motion.div>
          ))}
          <div className="text-[10px] text-muted font-medium mt-4 mb-2 uppercase tracking-wider">Order</div>
          {['Entry Logic', 'Exit Logic', 'Stop-Loss', 'Take Profit'].map((o, i) => (
            <div key={o} className="px-2.5 py-1.5 rounded-lg text-xs bg-card/50 border border-white/[0.06] text-muted">
              {o}
            </div>
          ))}
        </div>
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="bg-background/60 rounded-lg border border-white/[0.06] p-3 font-mono text-[11px] leading-relaxed text-muted whitespace-pre">
            <span className="text-green-400"># Momentum Crossover Strategy</span>
            {'\n'}<span className="text-accent">def</span> <span className="text-white">on_bar</span>(data):
            {generated ? '\n    ' + generated : ''}
            {'\n'}
            {'\n'}    <span className="text-accent">if</span> crossover(sma_20, sma_50):
            {'\n'}        <span className="text-accent">entry</span>(<span className="text-green-400">'LONG'</span>, size=<span className="text-green-400">0.1</span>, sl=<span className="text-green-400">0.5%</span>, tp=<span className="text-green-400">1.2%</span>)
            {'\n'}    <span className="text-accent">elif</span> crossunder(sma_20, sma_50):
            {'\n'}        <span className="text-accent">entry</span>(<span className="text-green-400">'SHORT'</span>, size=<span className="text-green-400">0.1</span>, sl=<span className="text-green-400">0.5%</span>, tp=<span className="text-green-400">1.2%</span>)
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-1 text-[10px] text-green-400"><Check size={10} /> Syntax OK</span>
            <span className="text-[10px] text-muted">|</span>
            <span className="flex items-center gap-1 text-[10px] text-muted"><RefreshCw size={10} /> Last checked 2s ago</span>
            <span className="text-[10px] text-muted">|</span>
            <span className="flex items-center gap-1 text-[10px] text-muted">{selected.length} indicators active</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MiniChart({ data }: { data: { x: number; y: number }[] }) {
  const min = Math.min(...data.map(d => d.y));
  const max = Math.max(...data.map(d => d.y));
  const range = max - min || 1;
  const w = 400;
  const h = 120;
  const points = data.map((d, i) => {
    const px = (i / (data.length - 1)) * w;
    const py = h - ((d.y - min) / range) * h;
    return `${px},${py}`;
  }).join(' ');

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-full">
      <defs>
        <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#22C55E" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#22C55E" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke="#22C55E" strokeWidth="1.5" />
      <polygon points={`0,${h} ${points} ${w},${h}`} fill="url(#grad)" />
    </svg>
  );
}

function PanelBacktest() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-card/30 text-xs">
        <div className="flex items-center gap-2 text-muted">
          <LineChart size={12} />
          <span>Backtest Results — Momentum v3</span>
        </div>
        <span className="text-green-400 text-[10px] flex items-center gap-1"><Check size={10} /> Completed in 4.2s</span>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 p-3">
          <div className="h-full rounded-lg bg-background/40 border border-white/[0.06] p-3">
            <div className="text-[10px] text-muted mb-1">Equity Curve (₹)</div>
            <div className="h-28">
              <MiniChart data={equityCurve} />
            </div>
            <div className="mt-2 flex items-center justify-between text-[10px] text-muted">
              <span>Jan 2024</span>
              <span>Current: ₹1,62,340</span>
              <span>Dec 2024</span>
            </div>
          </div>
        </div>
        <div className="w-44 border-l border-white/[0.06] p-3 space-y-2.5">
          {Object.entries(backtestResults).map(([key, val]) => (
            <div key={key}>
              <div className="text-[9px] text-muted uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
              <div className={`text-sm font-bold ${
                val.startsWith('+') ? 'text-green-400' : val.startsWith('-') ? 'text-red-400' : 'text-white'
              }`}>{val}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PanelDeploy() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-card/30 text-xs">
        <div className="flex items-center gap-2 text-muted">
          <Zap size={12} />
          <span>Deployment — Live Strategies</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[10px] text-green-400"><span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Connected</span>
          <span className="text-[10px] text-muted">Zerodha</span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-2">
        {[
          { name: 'Momentum v3', status: 'Active', pnl: '+₹12,450', trades: 47, winRate: '74%' },
          { name: 'Mean Reversion', status: 'Active', pnl: '+₹8,320', trades: 38, winRate: '68%' },
          { name: 'Options Scalper', status: 'Paused', pnl: '-₹2,150', trades: 12, winRate: '42%' },
          { name: 'Breakout Pro', status: 'Active', pnl: '+₹15,670', trades: 53, winRate: '79%' },
        ].map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-card/40 border border-white/[0.04] hover:border-accent/20 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${s.status === 'Active' ? 'bg-green-400' : 'bg-yellow-400'}`} />
              <div>
                <div className="text-xs font-medium text-white">{s.name}</div>
                <div className="text-[10px] text-muted">{s.trades} trades · {s.winRate} win</div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-xs font-semibold ${s.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>{s.pnl}</div>
              <div className={`text-[9px] ${s.status === 'Active' ? 'text-green-400/70' : 'text-yellow-400/70'}`}>{s.status}</div>
            </div>
          </motion.div>
        ))}
        <div className="mt-3 pt-3 border-t border-white/[0.06]">
          <button className="w-full py-2 rounded-lg bg-accent text-background text-xs font-medium hover:bg-accent-dark transition-colors inline-flex items-center justify-center gap-1">
            <Zap size={12} /> Deploy New Strategy
          </button>
        </div>
      </div>
    </div>
  );
}

function PanelMonitor() {
  const price = useLivePrice();
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/[0.06] bg-card/30 text-xs">
        <div className="flex items-center gap-2 text-muted">
          <Shield size={12} />
          <span>Monitor — Risk Dashboard</span>
        </div>
        <span className="flex items-center gap-1 text-[10px] text-green-400"><Activity size={10} /> All limits normal</span>
      </div>
      <div className="flex-1 flex">
        <div className="flex-1 p-3 overflow-y-auto">
          <div className="grid grid-cols-3 gap-2 mb-3">
            {[
              { label: 'Total Exposure', val: '₹2.4Cr', max: '₹5.0Cr', pct: 48 },
              { label: 'Daily P&L', val: '+₹18,420', up: true },
              { label: 'Drawdown', val: '-3.2%', max: '-8.0%', warn: false },
            ].map((s, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-card/40 border border-white/[0.04]">
                <div className="text-[9px] text-muted">{s.label}</div>
                <div className={`text-sm font-bold mt-0.5 ${'up' in s ? s.up ? 'text-green-400' : 'text-red-400' : 'text-white'}`}>{s.val}</div>
                {'pct' in s && (
                  <div className="mt-1 h-1 rounded-full bg-white/[0.06] overflow-hidden">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${s.pct}%` }} />
                  </div>
                )}
                {'warn' in s && (
                  <div className={`text-[9px] mt-0.5 ${s.warn ? 'text-red-400' : 'text-green-400'}`}>Limit: {s.max}</div>
                )}
              </div>
            ))}
          </div>
          <div className="text-[10px] text-muted font-medium mb-2">Recent Trades</div>
          <div className="space-y-1">
            <div className="grid grid-cols-6 text-[9px] text-muted px-2 py-1">
              <span>Time</span><span>Symbol</span><span>Side</span><span>Qty</span><span>P&L</span><span></span>
            </div>
            {recentTrades.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                className="grid grid-cols-6 text-[10px] px-2 py-1.5 rounded-lg bg-card/20 hover:bg-card/40 transition-colors font-mono"
              >
                <span className="text-muted">{t.time}</span>
                <span className="text-white">{t.symbol}</span>
                <span className={t.side === 'LONG' ? 'text-green-400' : 'text-red-400'}>{t.side}</span>
                <span className="text-muted">{t.qty}</span>
                <span className={t.pnl.startsWith('+') ? 'text-green-400' : 'text-red-400'}>{t.pnl}</span>
                <span className="flex justify-end">
                  {t.pnl.startsWith('+') ? <ArrowUpRight size={10} className="text-green-400" /> : <ArrowDown size={10} className="text-red-400" />}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="w-40 border-l border-white/[0.06] p-3 space-y-2">
          <div className="text-[9px] text-muted uppercase tracking-wider">Alerts</div>
          {[
            { msg: 'Drawdown approaching limit', sev: 'warn' },
            { msg: 'Broker status: OK', sev: 'ok' },
            { msg: 'New trade signal: NIFTY', sev: 'info' },
          ].map((a, i) => (
            <div key={i} className={`px-2 py-1.5 rounded-lg text-[9px] border ${
              a.sev === 'warn' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-400' :
              a.sev === 'ok' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
              'bg-accent/10 border-accent/20 text-accent'
            }`}>
              <div className="flex items-start gap-1">
                <AlertTriangle size={8} className="mt-0.5 shrink-0" />
                <span>{a.msg}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DemoModal() {
  const { activeModal, closeModal, openModal, setAuthMode } = useModal();
  const isOpen = activeModal === 'demo';
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0); setProgress(0); setIsPlaying(true);
      return;
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    const stepDuration = 6000;
    intervalRef.current = setInterval(() => {
      setProgress(prev => {
        const next = prev + (50 / stepDuration) * 100;
        if (next >= 100) {
          setCurrentStep(p => (p + 1) % steps.length);
          return 0;
        }
        return next;
      });
    }, 50);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isOpen, isPlaying]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeModal]);

  const step = steps[currentStep];
  const Icon = step.icon;

  const renderPanel = () => {
    switch (step.panel) {
      case 'builder': return <PanelBuilder />;
      case 'backtest': return <PanelBacktest />;
      case 'deploy': return <PanelDeploy />;
      case 'monitor': return <PanelMonitor />;
      default: return <PanelBuilder />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-2 md:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={closeModal} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-6xl h-[85vh] md:h-[80vh] bg-gradient-to-b from-surface to-card border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-accent/25 flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-label="Algo platform demo"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06] bg-card/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="text-xs font-semibold text-white">Trade Metrix Algo Engine</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">Live Demo</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="hidden sm:flex items-center gap-1.5 text-[10px] text-muted">
                  <Activity size={10} className="text-green-400" />
                  Engine running
                </span>
                <button
                  onClick={closeModal}
                  className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted hover:text-white transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col md:flex-row min-h-0">
              <div className="flex-1 min-h-0 md:border-r border-white/[0.06] bg-background/40 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step.panel}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    className="absolute inset-0"
                  >
                    {renderPanel()}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="w-full md:w-80 lg:w-96 flex flex-col border-t md:border-t-0 border-white/[0.06] bg-card/30">
                <div className="p-5 md:p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center">
                      <Icon size={13} className="text-accent" />
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-medium">
                      {step.badge}
                    </span>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="text-lg md:text-xl font-bold text-white leading-tight mb-1.5">
                        {step.title}
                      </h3>
                      <p className="text-[11px] text-muted mb-3">{step.subtitle}</p>
                      <p className="text-xs text-muted leading-relaxed">{step.overlay}</p>
                    </motion.div>
                  </AnimatePresence>

                  <div className="mt-auto pt-4">
                    <div className="flex items-center gap-1 mb-2">
                      {steps.map((_, i) => (
                        <div
                          key={i}
                          className="flex-1 h-0.5 rounded-full transition-all duration-300"
                          style={{
                            background: i === currentStep
                              ? `linear-gradient(90deg, #EF4444 ${progress}%, rgba(255,255,255,0.08) ${progress}%)`
                              : i < currentStep ? '#EF4444' : 'rgba(255,255,255,0.08)',
                          }}
                        />
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[10px] text-muted">
                        {currentStep + 1} / {steps.length}
                      </div>
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="flex items-center gap-1 text-[10px] text-muted hover:text-white transition-colors"
                      >
                        {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                        {isPlaying ? 'Pause' : 'Resume'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="px-5 md:px-6 py-3 border-t border-white/[0.06] bg-card/40">
                  <button
                    onClick={() => { closeModal(); setAuthMode('signup'); openModal('auth'); }}
                    className="w-full py-2 text-xs font-medium bg-accent text-background rounded-lg hover:bg-accent-dark transition-colors inline-flex items-center justify-center gap-1 shadow-lg shadow-accent/20"
                  >
                    Start Free Trial
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
