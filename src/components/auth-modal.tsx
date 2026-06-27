'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, Eye, EyeOff, ArrowUpRight, Loader2, Check, Link2 } from 'lucide-react';
import { useModal } from '@/src/components/modal-context';

export function AuthModal() {
  const { activeModal, closeModal, authMode, setAuthMode, setUser, pendingPayment, setPendingPayment } = useModal();
  const isOpen = activeModal === 'auth';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [broker, setBroker] = useState('');
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeModal]);

  useEffect(() => {
    if (!isOpen) {
      setEmail('');
      setPassword('');
      setBroker('');
      setStep(0);
      setError('');
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (authMode === 'signup' && step === 0) {
      setStep(1);
      return;
    }
    if (authMode === 'signup') {
      setSubmitting(true);
      try {
        const res = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password, broker }),
        });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Signup failed');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setSubmitting(false);
        return;
      }
      setSubmitting(false);
      setStep(2);
      setTimeout(() => {
        setUser({ email, broker: broker || undefined });
        closeModal();
      }, 2000);
      return;
    }
    setUser({ email, broker: broker || undefined });
    closeModal();
  };

  const brokers = ['Zerodha', 'Angel One', 'ICICI Direct', 'Upstox', 'HDFC Securities', 'Other'];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={closeModal} />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.5, ease: [0.19, 1, 0.22, 1] }}
            className="relative w-full max-w-md bg-gradient-to-b from-surface to-card border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-accent/20"
            role="dialog"
            aria-modal="true"
            aria-label={authMode === 'login' ? 'Log in to Trade Metrix' : 'Create a Trade Metrix account'}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
              <span className="text-sm font-semibold text-white">
                {authMode === 'signup' ? (step === 0 ? 'Create Account' : step === 1 ? 'Choose Broker' : 'Connect Broker') : 'Welcome Back'}
              </span>
              <button
                onClick={closeModal}
                className="p-1.5 rounded-lg hover:bg-white/[0.06] text-muted hover:text-white transition-all"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {authMode === 'signup' && step === 0 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="step0"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-background border border-white/[0.08] rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Min. 8 characters"
                          minLength={8}
                          required
                          className="w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-white/[0.08] rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 text-sm font-medium bg-accent text-background rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 inline-flex items-center justify-center gap-1.5"
                    >
                      Continue
                      <ArrowUpRight size={16} />
                    </button>
                    <p className="text-[11px] text-center text-muted/60">
                      By signing up, you agree to our Terms and Privacy Policy
                    </p>
                  </motion.div>
                </AnimatePresence>
              )}

              {authMode === 'signup' && step === 1 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <p className="text-xs text-muted">Select your primary broker to get platform-specific defaults.</p>
                    <div className="grid grid-cols-2 gap-2">
                      {brokers.map(b => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBroker(b)}
                          className={`px-4 py-3 text-sm rounded-xl border transition-all ${
                            broker === b
                              ? 'border-accent/50 bg-accent/10 text-accent'
                              : 'border-white/[0.06] bg-background text-muted hover:border-white/20 hover:text-white'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                    {error && (
                      <p className="text-[11px] text-red-400 text-center">{error}</p>
                    )}
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setStep(0)}
                        className="flex-1 py-2.5 text-sm font-medium border border-white/[0.08] text-muted rounded-xl hover:text-white hover:border-white/20 transition-all"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 py-2.5 text-sm font-medium bg-accent text-background rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 inline-flex items-center justify-center gap-1.5 disabled:opacity-60"
                      >
                        {submitting ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : (
                          <>
                            Start 1-Day Trial
                            <ArrowUpRight size={16} />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}

              {authMode === 'signup' && step === 2 && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="py-8 space-y-4 text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center mx-auto">
                      <Link2 size={24} className="text-accent animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Connecting to {broker || 'broker'}</p>
                      <p className="text-xs text-muted mt-1">Establishing secure API connection...</p>
                    </div>
                    <div className="flex justify-center gap-1.5">
                      {[0, 1, 2].map(i => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-accent"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3 }}
                        />
                      ))}
                    </div>
                    <p className="text-[10px] text-muted/50">Redirecting to dashboard...</p>
                  </motion.div>
                </AnimatePresence>
              )}

              {authMode === 'login' && (
                <AnimatePresence mode="wait">
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1.5">Email</label>
                      <div className="relative">
                        <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type="email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          required
                          className="w-full pl-9 pr-3 py-2.5 text-sm bg-background border border-white/[0.08] rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-muted mb-1.5">Password</label>
                      <div className="relative">
                        <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="Enter your password"
                          required
                          className="w-full pl-9 pr-10 py-2.5 text-sm bg-background border border-white/[0.08] rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <button type="button" className="text-[11px] text-muted hover:text-accent transition-colors">
                        Forgot password?
                      </button>
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 text-sm font-medium bg-accent text-background rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20 inline-flex items-center justify-center gap-1.5"
                    >
                      Log In
                      <ArrowUpRight size={16} />
                    </button>
                  </motion.div>
                </AnimatePresence>
              )}

              <div className="flex items-center gap-3 pt-1">
                <div className="flex-1 h-px bg-white/[0.06]" />
                <span className="text-[10px] text-muted/50 uppercase">or</span>
                <div className="flex-1 h-px bg-white/[0.06]" />
              </div>

              <button
                type="button"
                onClick={() => {
                  setAuthMode(authMode === 'login' ? 'signup' : 'login');
                  setStep(0);
                }}
                className="w-full py-2.5 text-sm font-medium border border-white/[0.08] text-muted rounded-xl hover:text-white hover:border-white/20 transition-all"
              >
                {authMode === 'login' ? 'Create an account' : 'I already have an account'}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
