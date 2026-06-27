'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Section, SectionHeader } from './ui/section';
import { Activity, Radio, ShieldCheck, Zap, ArrowRight, Database, Brain, GitPullRequest, LineChart, Webhook, RefreshCw, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

const layers = [
  {
    id: 'ws',
    title: '1. Broker WebSocket',
    icon: Radio,
    color: '#22C55E',
    items: ['Live tick stream (Zerodha/Angel/ICICI)', 'Touchline quotes (LTP, LTQ, Volume)', 'Order confirmation feed', '15+ years historical (REST)'],
    desc: 'Your broker maintains the connection to NSE/BSE. Our engine opens a WebSocket to the broker — not directly to the exchange. Every tick (price, volume, OI) arrives in real-time. Order confirmations also come through this same socket.',
    flow: 'Broker → WebSocket → Software',
  },
  {
    id: 'indicators',
    title: '2. Indicator Engine',
    icon: Activity,
    color: '#EF4444',
    items: ['Updates on every tick', 'SMA, RSI, MACD, Bollinger, VWAP', 'Multi-timeframe (1m, 5m, 1D)', 'Order book & market depth'],
    desc: 'Each incoming tick updates all active indicators. SMAs recalculate, RSI re-indexes, Bollinger Bands re-draw. The engine maintains indicator state across timeframes — a tick updates the 1-minute bar AND the daily bar simultaneously.',
    flow: 'Tick → Update Indicators',
  },
  {
    id: 'strategy',
    title: '3. Strategy Logic',
    icon: Brain,
    color: '#EF4444',
    items: ['Your Python / visual rules', 'Entry & exit conditions', 'Position sizing (fixed/%/Kelly)', 'SL/TP bracket logic'],
    desc: 'After indicators update, the strategy checks its conditions against current state: Is there an open position? Has SMA crossed? Is RSI above 70? If entry conditions are met, it generates a signal with quantity, stop-loss, and target. If exit conditions are met, it generates an exit.',
    flow: 'Conditions → Signal',
  },
  {
    id: 'risk',
    title: '4. Risk Validator',
    icon: ShieldCheck,
    color: '#22C55E',
    items: ['Pre-trade exposure check', 'Max position size limit', 'Daily drawdown limit', 'Concurrent trade cap'],
    desc: 'Every signal passes through the risk gate BEFORE reaching the broker. Does this trade exceed max positions? Is daily loss limit hit? Is the strategy paused? If any check fails, the signal is rejected with a reason logged. The kill switch is a separate thread — it can halt ALL trading independent of the strategy.',
    flow: 'Signal → Risk Gate → Pass/Fail',
  },
  {
    id: 'execution',
    title: '5. Order Placement',
    icon: Zap,
    color: '#EF4444',
    items: ['Placed via broker REST API', 'MARKET / LIMIT / SL-M / SL-L', 'Bracket orders (SL + TP)', 'Auto-retry on rejection'],
    desc: 'Approved signals become orders. The engine calls the broker\'s REST API to place them. If the broker rejects (insufficient margin, symbol not traded, market closed), the engine logs the rejection and optionally retries with adjusted parameters. Partial fills are tracked individually.',
    flow: 'Risk OK → Broker API → Exchange',
  },
  {
    id: 'monitor',
    title: '6. Position Monitor',
    icon: LineChart,
    color: '#EF4444',
    items: ['Real-time P&L per position', 'Aggregate exposure tracking', 'Trade log with timestamps', 'Alerts (Telegram/Email/Webhook)'],
    desc: 'After the order fills, the position is tracked tick-by-tick. P&L updates in real-time. The monitor checks trailing stop-losses, alerts on drawdown, and logs every trade to the database. This data feeds back into the strategy for adaptive systems.',
    flow: 'Fill → Track → Alert → Iterate',
  },
];

function LayerCard({ layer, index, isInView }: { layer: typeof layers[0]; index: number; isInView: boolean }) {
  const Icon = layer.icon;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.19, 1, 0.22, 1] }}
    >
      <motion.div
        className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-b from-card/80 to-card/40 backdrop-blur-sm p-5 h-full cursor-default group"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{
              backgroundColor: `${layer.color}15`,
              borderColor: `${layer.color}30`,
              borderWidth: 1,
            }}
          >
            <Icon size={18} style={{ color: layer.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-white truncate">{layer.title}</div>
            <div className="text-[10px] font-medium truncate" style={{ color: layer.color }}>
              {layer.flow}
            </div>
          </div>
          <div className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: `${layer.color}15`, color: layer.color }}>
            Step {index + 1}
          </div>
        </div>

        <ul className="space-y-1.5 mb-3">
          {layer.items.map((item) => (
            <li key={item} className="flex items-center gap-2 text-[11px] text-muted">
              <div className="w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: layer.color }} />
              {item}
            </li>
          ))}
        </ul>

        {hovered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="h-px bg-white/[0.06] mb-2" />
            <p className="text-[10px] text-muted leading-relaxed">{layer.desc}</p>
          </motion.div>
        )}

        <div className="absolute bottom-2 right-3 text-[8px] font-mono opacity-30" style={{ color: layer.color }}>
          {hovered ? '▲' : '▼'} hover
        </div>
      </motion.div>
    </motion.div>
  );
}

function OverviewDiagram({ isInView }: { isInView: boolean }) {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { label: 'NSE/BSE', sub: 'Exchange', color: '#888' },
    { label: 'Broker', sub: 'Zerodha/Angel/etc', color: '#22C55E' },
    { label: 'WebSocket', sub: 'Live ticks', color: '#22C55E' },
    { label: 'Strategy', sub: 'Check conditions', color: '#EF4444' },
    { label: 'Risk Gate', sub: 'Validate', color: '#EF4444' },
    { label: 'Order', sub: 'Broker API → NSE', color: '#EF4444' },
  ];

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-card/30 backdrop-blur-sm p-6 md:p-8 overflow-hidden relative"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.3 }}
      style={{ perspective: '800px' }}
    >
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-6">
          <Activity size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-white">The Data Path — Exchange to Your Strategy</h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
          {steps.map((item, i) => {
            const isHighlight = i === activeStep;
            return (
              <motion.div
                key={item.label}
                className="flex items-center gap-1 md:gap-2"
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}
              >
                <motion.div
                  className="flex flex-col items-center text-center px-2 md:px-3 py-2 rounded-xl border"
                  style={{
                    borderColor: isHighlight ? `${item.color}50` : 'rgba(255,255,255,0.06)',
                    backgroundColor: isHighlight ? `${item.color}15` : 'rgba(255,255,255,0.02)',
                  }}
                  animate={isHighlight ? { scale: 1.08 } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="text-[10px] md:text-xs font-semibold text-white">{item.label}</div>
                  <div className="text-[8px] md:text-[9px] text-muted">{item.sub}</div>
                </motion.div>
                {i < steps.length - 1 && (
                  <motion.div
                    animate={isHighlight ? { x: [0, 3, 0] } : {}}
                    transition={{ duration: 0.5, repeat: isHighlight ? Infinity : 0 }}
                  >
                    <ArrowRight size={12} className="text-muted shrink-0" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div className="flex items-center justify-center gap-3 mt-5">
          <button
            onClick={() => setActiveStep((activeStep + 1) % steps.length)}
            className="px-4 py-1.5 text-[10px] font-medium bg-accent/10 border border-accent/20 text-accent rounded-lg hover:bg-accent/20 transition-colors"
          >
            Step Through Flow ›
          </button>
          <span className="text-[9px] text-muted">
            Highlighting: <span className="text-white font-medium">{steps[activeStep].label}</span> — {steps[activeStep].sub}
          </span>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[10%] w-[300px] h-[300px] rounded-full bg-accent/[0.03] blur-[100px]"
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </motion.div>
  );
}

function OrderLifecycle({ isInView }: { isInView: boolean }) {
  const [phase, setPhase] = useState(0);

  const phases = [
    { icon: Brain, label: 'Strategy says BUY', sub: 'Signal generated', color: '#EF4444' },
    { icon: ShieldCheck, label: 'Risk check passes', sub: 'Exposure OK, limits OK', color: '#22C55E' },
    { icon: Radio, label: 'Broker API called', sub: 'POST /orders', color: '#22C55E' },
    { icon: RefreshCw, label: 'Pending at exchange', sub: 'Order ID assigned', color: '#888' },
    { icon: CheckCircle2, label: 'Order filled', sub: 'Quantity matched', color: '#22C55E' },
  ];

  const current = phases[phase];

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-card/30 backdrop-blur-sm p-6 md:p-8 overflow-hidden relative mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.9 }}
    >
      <div className="flex items-center gap-2 mb-5">
        <GitPullRequest size={16} className="text-accent" />
        <h3 className="text-sm font-semibold text-white">Order Lifecycle — Signal to Fill</h3>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-5">
        {phases.map((p, i) => {
          const Icon = p.icon;
          return (
            <motion.div
              key={p.label}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl border text-xs transition-all ${
                i === phase
                  ? 'border-accent/40 bg-accent/10 shadow-[0_0_15px_rgba(239,68,68,0.1)]'
                  : i < phase
                  ? 'border-green-500/20 bg-green-500/5'
                  : 'border-white/[0.06] bg-card/40'
              }`}
              initial={{ opacity: 0, x: -10 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 1 + i * 0.1, duration: 0.4 }}
            >
              <Icon size={14} className={i === phase ? 'text-accent' : i < phase ? 'text-green-400' : 'text-muted'} />
              <div className="text-[9px] leading-tight">
                <div className={i === phase ? 'text-white font-medium' : i < phase ? 'text-green-400/70' : 'text-muted'}>{p.label}</div>
                {i === phase && <div className="text-accent/70">{p.sub}</div>}
              </div>
              {i < phases.length - 1 && (
                <ArrowRight size={10} className="text-muted/30" />
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setPhase(Math.min(phase + 1, phases.length - 1))}
          disabled={phase >= phases.length - 1}
          className="px-4 py-1.5 text-[10px] font-medium bg-accent/10 border border-accent/20 text-accent rounded-lg hover:bg-accent/20 transition-colors disabled:opacity-30"
        >
          Next Stage ›
        </button>
        <button
          onClick={() => setPhase(0)}
          className="px-3 py-1.5 text-[10px] font-medium border border-white/[0.06] text-muted rounded-lg hover:text-white transition-colors"
        >
          Reset
        </button>
        <span className="text-[9px] text-muted">
          Phase {phase + 1}/{phases.length}
        </span>
      </div>
    </motion.div>
  );
}

function TradingLoop({ isInView }: { isInView: boolean }) {
  const [step, setStep] = useState(0);

  const items = [
    { x: 300, y: 30, label: 'Wait for Tick', sub: 'WebSocket delivers price', color: '#22C55E' },
    { x: 530, y: 100, label: 'Update Indicators', sub: 'SMA, RSI recalculate', color: '#EF4444' },
    { x: 300, y: 180, label: 'Check Strategy', sub: 'Entry/Exit conditions', color: '#EF4444' },
    { x: 70, y: 100, label: 'Execute Decision', sub: 'BUY/SELL/HOLD', color: '#22C55E' },
  ];

  const current = items[step];

  return (
    <motion.div
      className="rounded-2xl border border-white/[0.06] bg-card/30 backdrop-blur-sm p-6 md:p-8 overflow-hidden relative mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="flex items-center gap-2 mb-5">
        <RefreshCw size={16} className="text-accent" />
        <h3 className="text-sm font-semibold text-white">The Tick Loop — Runs 50,000+ Times Per Day</h3>
      </div>

      <div className="relative flex justify-center">
        <svg viewBox="0 0 600 220" className="w-full max-w-2xl h-auto">
          <defs>
            <linearGradient id="loopLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF4444" stopOpacity="0" />
              <stop offset="50%" stopColor="#EF4444" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#EF4444" stopOpacity="0" />
            </linearGradient>
          </defs>

          <motion.g
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <rect x="20" y="10" width="560" height="200" rx="16" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" strokeDasharray="4 6" />

            <motion.path
              d="M 300 195 C 490 195, 570 150, 570 100 C 570 50, 490 10, 300 10 C 110 10, 30 50, 30 100 C 30 150, 110 195, 300 195 Z"
              fill="none"
              stroke="rgba(239,68,68,0.12)"
              strokeWidth="2"
              strokeDasharray="6 4"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ duration: 2, delay: 1.2, ease: 'easeInOut' }}
            />

            <motion.circle r="4" fill="#EF4444" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : {}} transition={{ delay: 1.2 }}>
              <animateMotion dur="5s" repeatCount="indefinite" path="M 300 195 C 490 195, 570 150, 570 100 C 570 50, 490 10, 300 10 C 110 10, 30 50, 30 100 C 30 150, 110 195, 300 195 Z" begin="1.5s" />
            </motion.circle>

            {items.map((item, i) => {
              const isActive = i === step;
              return (
                <g key={i}>
                  <motion.circle
                    cx={item.x} cy={item.y} r={isActive ? 22 : 18}
                    fill={isActive ? `${item.color}20` : 'rgba(255,255,255,0.03)'}
                    stroke={isActive ? item.color : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isActive ? 2.5 : 1}
                    animate={{ r: isActive ? 22 : 18 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  />
                  <motion.circle
                    cx={item.x} cy={item.y} r={isActive ? 7 : 5}
                    fill={item.color}
                    animate={{ r: isActive ? 7 : 5 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  />
                  {isActive && (
                    <motion.circle
                      cx={item.x} cy={item.y} r={28}
                      fill="none"
                      stroke={item.color}
                      strokeWidth={0.5}
                      animate={{ opacity: [0, 0.4, 0], r: [22, 35, 22] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  )}
                  <text x={item.x} y={item.y + 38} textAnchor="middle" fill="white" fontSize="11" fontFamily="Inter, system-ui, sans-serif" fontWeight="600">{item.label}</text>
                  <text x={item.x} y={item.y + 52} textAnchor="middle" fill="#888" fontSize="9" fontFamily="Inter, system-ui, sans-serif">{item.sub}</text>
                </g>
              );
            })}
          </motion.g>
        </svg>
      </div>

      <div className="flex items-center justify-center gap-3 mt-4">
        <button
          onClick={() => setStep((step + 1) % items.length)}
          className="px-4 py-1.5 text-[10px] font-medium bg-accent/10 border border-accent/20 text-accent rounded-lg hover:bg-accent/20 transition-colors"
        >
          Next Stage in Loop ›
        </button>
        <span className="text-[9px] text-muted">
          Currently: <span className="text-white font-medium">{current.label}</span>
        </span>
      </div>

      <div className="text-center mt-4">
        <p className="text-[10px] text-muted leading-relaxed max-w-xl mx-auto">
          Each tick (every price change) triggers this full cycle. With ~10 ticks per second per symbol, 
          a 10-strategy setup processes ~50,000 cycles/day. The entire loop — from tick arriving to 
          decision executed — takes 10-50ms on retail infrastructure.
        </p>
      </div>
    </motion.div>
  );
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <Section id="how-it-works">
      <SectionHeader
        title="How Algo Trading Software Actually Works"
        subtitle="From exchange tick to your broker fill — the complete data path. No magic, just architecture."
      />

      <div ref={sectionRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <OverviewDiagram isInView={isInView} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {layers.map((layer, i) => (
            <LayerCard key={layer.id} layer={layer} index={i} isInView={isInView} />
          ))}
        </div>

        <TradingLoop isInView={isInView} />

        <OrderLifecycle isInView={isInView} />

        <motion.div
          className="flex flex-wrap justify-center gap-2 pt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2, duration: 0.6 }}
        >
          {['WebSocket', 'REST API', 'Tick Data', 'Indicator', 'Signal', 'Risk Gate', 'Order Fill', 'Partial Fill', 'Rejection', 'P&L', 'Drawdown', 'Alert'].map((tag) => (
            <motion.span
              key={tag}
              className="px-2.5 py-1 text-[9px] font-medium rounded-full border border-white/[0.06] bg-card/50 text-muted hover:border-accent/20 hover:text-accent hover:bg-accent/[0.03] transition-all cursor-default"
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="text-center pt-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          <motion.a
            href="#pricing"
            className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-background text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Build Your First Algorithm
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
          </motion.a>
        </motion.div>
      </div>
    </Section>
  );
}
