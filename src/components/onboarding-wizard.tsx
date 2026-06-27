'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Build Your Strategy',
    desc: 'Use the visual builder or write Python code to create your trading algorithm. Combine indicators, set entry/exit rules, and define risk parameters.',
    highlight: 'Strategy Builder',
  },
  {
    title: 'Backtest & Validate',
    desc: 'Run historical simulations across years of market data. Analyze Sharpe ratio, max drawdown, win rate, and walk-forward performance.',
    highlight: 'Backtesting Engine',
  },
  {
    title: 'Deploy & Monitor',
    desc: 'Connect your broker, deploy with one click, and monitor live performance. Real-time P&L, risk alerts, and trade logs at your fingertips.',
    highlight: 'Live Dashboard',
  },
];

export function OnboardingWizard() {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    setDismissed(localStorage.getItem('onboarded') === 'true');
  }, []);

  if (dismissed) return null;

  const done = () => {
    localStorage.setItem('onboarded', 'true');
    setDismissed(true);
  };

  const s = steps[step];

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={done} />
      <motion.div
        key={step}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: [0.19, 1, 0.22, 1] }}
        className="relative w-full max-w-sm bg-gradient-to-b from-surface to-card border border-white/[0.08] rounded-2xl p-6 shadow-2xl"
      >
        <button onClick={done} className="absolute top-3 right-3 p-1 rounded-lg hover:bg-white/[0.06] text-muted">
          <X size={16} />
        </button>

        <div className="flex gap-1.5 mb-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-accent' : 'bg-white/[0.08]'}`}
            />
          ))}
        </div>

        <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-4">
          <Check size={18} className="text-accent" />
        </div>

        <h2 className="text-lg font-bold text-white mb-2">{s.title}</h2>
        <p className="text-xs text-muted leading-relaxed mb-6">{s.desc}</p>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted">Step {step + 1} of {steps.length}</span>
          <button
            onClick={step < steps.length - 1 ? () => setStep(step + 1) : done}
            className="px-4 py-2 text-xs font-medium bg-accent text-background rounded-xl hover:bg-accent-dark transition-colors inline-flex items-center gap-1.5"
          >
            {step < steps.length - 1 ? 'Next' : 'Get Started'}
            <ArrowRight size={14} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
