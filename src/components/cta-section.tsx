'use client';

import { motion } from 'framer-motion';
import { Section } from './ui/section';
import { Button } from './ui/button';
import { ArrowUpRight, Sparkles, Shield, BarChart3, Users } from 'lucide-react';
import { useModal } from '@/src/components/modal-context';

export function CtaSection() {
  const { openModal, setAuthMode } = useModal();
  return (
    <section className="relative py-28 md:py-36 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.03] to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(239,68,68,0.08)_0%,transparent_60%)] pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[200px] pointer-events-none" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-accent/20 to-accent/5 border border-accent/25 mb-8 shadow-lg shadow-accent/10"
        >
          <Sparkles size={14} className="text-accent" />
          <span className="text-sm text-accent font-medium">Get Started Today</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]"
        >
          Ready To Automate{' '}
          <span className="gradient-text">Your Trading</span>?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 text-lg text-muted max-w-2xl mx-auto text-balance"
        >
          Join 10,000+ traders who are already automating their strategies with Trade Metrix.
          Start your 1-day free trial. No credit card required.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button variant="primary" size="lg" className="text-base px-10 py-4 shadow-xl shadow-accent/20" onClick={() => { setAuthMode('signup'); openModal('auth'); }}>
            Start Free Trial
            <ArrowUpRight size={20} />
          </Button>
          <Button variant="secondary" size="lg" className="text-base px-10 py-4 shadow-xl shadow-black/20" onClick={() => openModal('demo')}>
            Book a Demo
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 flex items-center justify-center gap-6 text-xs text-muted"
        >
          <span className="flex items-center gap-1.5"><Shield size={12} className="text-accent" /> No credit card</span>
          <span className="flex items-center gap-1.5"><BarChart3 size={12} className="text-accent" /> Full access</span>
          <span className="flex items-center gap-1.5"><Users size={12} className="text-accent" /> Cancel anytime</span>
        </motion.div>
      </div>
    </section>
  );
}
