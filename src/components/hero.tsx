'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Button } from './ui/button';
import { MagneticButton } from './ui/magnetic-button';
import { LiveChart } from './ui/live-chart';
import { useModal } from '@/src/components/modal-context';
import {
  Play,
  TrendingUp,
  Shield,
  Activity,
  ArrowUpRight,
  ArrowDown,
  Wallet,
  Zap,
} from 'lucide-react';

function useLivePrice() {
  const [price, setPrice] = useState(24582.30);
  const [change, setChange] = useState({ value: 1.2, up: true });

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.47) * 30;
      setPrice(prev => {
        const next = parseFloat((prev + delta).toFixed(2));
        setChange({
          value: parseFloat(((next / 24582.30 - 1) * 100).toFixed(2)),
          up: delta >= 0,
        });
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return { price, change };
}

export function Hero() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const mockupRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const { price, change } = useLivePrice();
  const { openModal, setAuthMode } = useModal();

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-24 md:pt-[120px]"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-accent/8 via-transparent to-background pointer-events-none" />

      <div className="absolute top-1/4 left-10 w-48 md:w-96 h-48 md:h-96 bg-accent/15 rounded-full blur-[80px] md:blur-[200px] animate-float-slow pointer-events-none" />
      <div className="absolute bottom-1/3 right-20 w-64 md:w-[500px] h-64 md:h-[500px] bg-accent/10 rounded-full blur-[100px] md:blur-[250px] animate-float pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-accent/5 rounded-full blur-[120px] md:blur-[300px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          <div ref={ref} className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/25 mb-8 shadow-lg shadow-accent/5"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-sm text-accent font-medium">Algo Trading Platform</span>
              <span className="w-1 h-1 rounded-full bg-accent/30" />
              <span className="text-xs text-muted">10K+ Active Traders</span>
            </motion.div>

            <motion.h1
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={isInView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight leading-[0.92]"
            >
              Trade{' '}
              <span className="gradient-text">Smarter</span>
              <br />
              <span className="text-white">Automate</span>{' '}
              <span className="gradient-text">Faster</span>
              <span className="text-white">.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1], delay: 0.2 }}
              className="mt-6 text-lg md:text-xl text-muted leading-relaxed max-w-xl text-balance"
            >
              Build, test and automate trading strategies from a single platform.
              Execute with institutional-grade infrastructure.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4"
            >
              <MagneticButton onClick={() => { setAuthMode('signup'); openModal('auth'); }}>
                <div className="bg-accent text-background font-medium rounded-xl px-8 py-4 text-base inline-flex items-center gap-2 hover:bg-accent-dark shadow-lg shadow-accent/30 transition-colors">
                  Start Free Trial
                  <ArrowUpRight size={20} />
                </div>
              </MagneticButton>
              <MagneticButton onClick={() => openModal('demo')}>
                <div className="bg-white/5 text-white font-medium rounded-xl px-8 py-4 text-base inline-flex items-center gap-2 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg shadow-black/20">
                  <Play size={20} />
                  Watch Demo
                </div>
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                { icon: Shield, label: 'Data Security', value: 'AES-256' },
                { icon: Activity, label: 'Uptime', value: '99.9%' },
                { icon: TrendingUp, label: 'Active Traders', value: '10K+' },
                { icon: Wallet, label: 'AUM', value: '₹500Cr+' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-3 p-3 rounded-xl bg-card/60 border border-white/[0.06] backdrop-blur-sm card-depth hover:border-accent/20 transition-all duration-300">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-1 ring-accent/20 flex-shrink-0">
                    <item.icon size={16} className="text-accent" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{item.value}</div>
                    <div className="text-[10px] text-muted">{item.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="mt-6 flex flex-wrap gap-2"
            >
              {[
                { label: 'Momentum', value: '+32.4%', color: 'text-accent' },
                { label: 'Mean Reversion', value: '+24.8%', color: 'text-blue-400' },
                { label: 'Breakout', value: '+45.2%', color: 'text-yellow-400' },
                { label: 'Options Alpha', value: '+28.6%', color: 'text-purple-400' },
                { label: 'Scalping', value: '+38.1%', color: 'text-orange-400' },
                { label: 'Arbitrage', value: '+18.3%', color: 'text-red-400' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/50 border border-white/[0.05] card-depth text-[11px] hover:border-accent/20 transition-all duration-200">
                  <span className="text-muted">{s.label}</span>
                  <span className={`font-semibold ${s.color}`}>{s.value}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <div ref={mockupRef} className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 100, rotateY: 10, scale: 0.9 }}
              animate={isInView ? { opacity: 1, x: 0, rotateY: 0, scale: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
              className="relative"
            >
              <div className="absolute -inset-8 bg-gradient-to-r from-accent/20 via-accent-2/10 to-transparent rounded-3xl blur-3xl" />
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/10 via-transparent to-accent-2/10 rounded-3xl blur-2xl" />
              <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-accent/20 to-transparent rounded-3xl blur-[100px]" />

              <div className="relative bg-gradient-to-b from-surface to-card border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl shadow-accent/20 card-depth-lg">
                <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] bg-card/80">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500/70" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                      <div className="w-3 h-3 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-xs text-muted font-medium">Trade Metrix Terminal</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 px-2 py-0.5 text-[10px] rounded bg-accent/10 text-accent border border-accent/20 shadow-sm shadow-accent/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      LIVE
                    </span>
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted font-mono">NIFTY 50</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-accent/10 text-accent border border-accent/20">NSE</span>
                      </div>
                      <div className="flex items-baseline gap-2 mt-1">
                        <motion.span
                          key={price}
                          initial={{ opacity: 0.3 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="text-2xl font-bold text-white font-mono tabular-nums"
                        >
                          {price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </motion.span>
                        <span className={`text-sm font-medium flex items-center ${change.up ? 'text-green-400' : 'text-red-400'}`}>
                          {change.up ? <ArrowUpRight size={14} /> : <ArrowDown size={14} />}
                          {' '}{change.value}%
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted">
                      <Zap size={12} className="text-accent" />
                      <span>Real-time</span>
                    </div>
                  </div>

                  <div className="h-52 rounded-xl overflow-hidden ring-1 ring-white/[0.04]">
                    <LiveChart compact height={220} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="mt-16 md:mt-20 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] rounded-2xl overflow-hidden card-depth"
        >
          {[
            { value: '78%', label: 'of trades executed by algos in India', sub: 'Industry Report 2024' },
            { value: '₹12Cr+', label: 'average daily algo volume on Trade Metrix', sub: 'Platform Data' },
            { value: '15ms', label: 'average strategy execution latency', sub: 'End-to-End' },
            { value: '92%', label: 'of users report improved consistency', sub: 'User Survey 2024' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 + i * 0.1 }}
              className="bg-card/60 p-5 md:p-6 text-center hover:bg-card/80 transition-colors"
            >
              <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-muted mt-1 leading-relaxed">{stat.label}</div>
              <div className="text-[10px] text-muted/50 mt-1">{stat.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
