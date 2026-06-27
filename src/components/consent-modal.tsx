'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ShieldAlert } from 'lucide-react';

const CONSENT_KEY = 'tm_enterprise_consent';

export function hasConsented(): boolean {
  if (typeof window === 'undefined') return false;
  const ts = localStorage.getItem(CONSENT_KEY);
  if (!ts) return false;
  return Date.now() - parseInt(ts) < 30 * 24 * 60 * 60 * 1000;
}

export function clearConsent() {
  if (typeof window !== 'undefined') localStorage.removeItem(CONSENT_KEY);
}

interface ConsentModalProps {
  open: boolean;
  onAccept: () => void;
  onClose: () => void;
}

export function ConsentModal({ open, onAccept, onClose }: ConsentModalProps) {
  const [checks, setChecks] = useState<Record<string, boolean>>({
    risk: false,
    refund: false,
    noGuarantee: false,
    soleResponsibility: false,
  });
  const allChecked = Object.values(checks).every(Boolean);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else { document.body.style.overflow = ''; setChecks({ risk: false, refund: false, noGuarantee: false, soleResponsibility: false }); }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const toggle = (key: string) => setChecks(prev => ({ ...prev, [key]: !prev[key] }));

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, Date.now().toString());
    onAccept();
    onClose();
  };

  const items = [
    { key: 'risk', label: 'I understand that Trade Metrix Technologies is a software platform — NOT a SEBI-registered advisor or research analyst. We do NOT provide stock tips, buy/sell calls, or investment advice.' },
    { key: 'refund', label: 'I acknowledge that ALL Enterprise subscriptions are non-refundable. No refunds will be issued for any reason, including market losses, strategy underperformance, or change of mind.' },
    { key: 'noGuarantee', label: 'I understand that past backtest results and historical performance do not guarantee future returns. Trading and investment in securities carry significant market risk.' },
    { key: 'soleResponsibility', label: 'I accept that all trading decisions, market risk, and financial consequences remain entirely my own. Trade Metrix provides execution technology only.' },
  ];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-lg bg-gradient-to-b from-surface to-card border border-accent/20 rounded-2xl overflow-hidden shadow-2xl shadow-accent/20"
            role="dialog"
            aria-modal="true"
            aria-label="Risk acknowledgment"
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] bg-accent/[0.03]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <ShieldAlert size={16} className="text-accent" />
                </div>
                <div>
                  <span className="text-sm font-bold text-white">Risk Acknowledgment Required</span>
                  <p className="text-[10px] text-muted">Please read and accept before proceeding</p>
                </div>
              </div>
              <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted hover:text-white transition-all">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-muted leading-relaxed bg-accent/[0.04] p-3 rounded-xl border border-accent/10">
                By proceeding with an Enterprise subscription, you acknowledge the following terms. Please read each carefully and confirm.
              </p>

              {items.map(item => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => toggle(item.key)}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    checks[item.key]
                      ? 'border-accent/30 bg-accent/[0.04]'
                      : 'border-white/[0.06] bg-white/[0.02] hover:border-white/20'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-none mt-0.5 transition-all ${
                    checks[item.key]
                      ? 'bg-accent border-accent'
                      : 'border-white/20 bg-transparent'
                  }`}>
                    {checks[item.key] && <Check size={12} className="text-background" strokeWidth={3} />}
                  </div>
                  <span className="text-xs text-white/90 leading-relaxed">{item.label}</span>
                </button>
              ))}

              <button
                onClick={handleAccept}
                disabled={!allChecked}
                className="w-full py-3 text-sm font-bold bg-accent text-background rounded-xl hover:bg-accent-dark transition-all shadow-lg shadow-accent/20 disabled:opacity-30 disabled:cursor-not-allowed disabled:shadow-none"
              >
                {allChecked ? 'I Accept & Proceed to Payment' : `Accept all ${items.length} items to continue`}
              </button>

              <p className="text-[10px] text-center text-muted/50">
                This consent is recorded and stored for compliance purposes.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
