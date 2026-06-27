'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader, FadeIn } from './ui/section';
import { ChevronDown, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const faqs = [
  {
    q: 'What is Trade Metrix and how is it different from other platforms?',
    a: 'Trade Metrix is a full-stack algorithmic trading operating system for Indian markets. Unlike other platforms that offer only basic automation, we provide institutional-grade infrastructure: sub-5ms execution, multi-broker aggregation, AI-powered strategy optimization, genetic algorithm backtesting, and real-time risk management. Everything from strategy creation to live deployment happens in one place.',
  },
  {
    q: 'How does the 1-day free trial work?',
    a: 'Sign up with your email — no credit card required. You get full access to all features for 24 hours: live charting, strategy builder, backtesting engine, paper trading with real market data, and all 6 pre-built strategies. The clock starts ticking from the moment you sign up. Cancel anytime, no questions asked.',
  },
  {
    q: 'What is the actual execution latency?',
    a: 'Our average order placement time is under 5 milliseconds from our AWS Mumbai servers. End-to-end latency (including broker processing) typically ranges from 10-50ms depending on your broker. We use smart order routing to select the fastest execution path. For comparison, manual trading typically takes 500-2000ms.',
  },
  {
    q: 'How are my API keys and data secured?',
    a: 'API keys are encrypted with AES-256 and stored in an HSM-backed vault. We never store your broker passwords — only API tokens with strictly scoped permissions. All data in transit uses TLS 1.3. We undergo SOC 2 Type II audits annually. Your data never leaves India (AWS Mumbai regions).',
  },
  {
    q: 'Can I run my own custom strategies?',
    a: 'Absolutely. You can either use our visual drag-and-drop builder (no code required), write Python scripts, or use the 6 professionally built strategies from our marketplace. The strategy builder supports indicators, conditions, position sizing rules, and multi-timeframe analysis. You can also import strategies via our API.',
  },
  {
    q: 'What happens if my internet connection drops?',
    a: 'Your strategies continue running on our cloud servers uninterrupted. We do not require your local machine to be online for execution. However, we recommend keeping monitoring active on your end for alerts. All strategies have built-in fail-safes: if a broker connection drops, positions are automatically hedged or closed per your risk rules.',
  },
  {
    q: 'Which brokers are supported and what permissions are needed?',
    a: 'We support Zerodha, Angel One, ICICI Direct, HDFC Securities, Kotak Securities, IIFL, Upstox, 5paisa, and Shoonya (10+ total). You only need to generate read-only and trading API tokens from your broker dashboard. We never get access to fund transfer or withdrawal capabilities.',
  },
  {
    q: 'What is the minimum capital I need to start?',
    a: 'There is no minimum from Trade Metrix. However, broker and exchange regulations may apply. For meaningful strategy deployment, we recommend at least ₹50,000 for equity and ₹1,00,000 for options strategies. Our paper trading mode lets you test with virtual capital before going live.',
  },
  {
    q: 'How do your strategies perform in different market conditions?',
    a: 'Each strategy has specific market conditions where it excels. Momentum Pro (+32.4%) thrives in trending markets, Mean Reversion (+24.8%) shines in range-bound markets, and Scalper X (+38.1%) needs high liquidity. See our Strategy Deep Dive section for detailed methodology, drawdown analysis, and ideal market conditions for each strategy.',
  },
  {
    q: 'Is there a setup fee or hidden charges?',
    a: 'Zero setup fees. Zero hidden charges. Your subscription covers the platform, all strategies, backtesting, analytics, and support. Brokerage and exchange fees are separate and charged directly by your broker. We do not take a percentage of your profits or charge per-trade fees.',
  },
  {
    q: 'Can I switch between plans?',
    a: 'Yes, you can upgrade or downgrade anytime. Upgrades take effect immediately. Downgrades apply at the end of your current billing cycle. All plans include the same core platform — the difference is in the number of concurrent strategies and advanced features.',
  },
  {
    q: 'What kind of backtesting data do you provide?',
    a: '15+ years of historical NSE/BSE data including cash, futures, and options. Data includes tick-level, 1-minute, and daily resolutions. Our backtesting engine supports slippage modeling, commission calculation, and multi-asset portfolio testing. Pro plans include genetic algorithm optimization and walk-forward analysis.',
  },
  {
    q: 'How does the risk management system work?',
    a: 'Multi-layered risk controls: (1) Pre-trade checks (position limits, capital adequacy, circuit breaker status), (2) Real-time monitoring (max drawdown, daily loss limits, exposure tracking), (3) Automated actions (kill switch, position liquidation, hedge activation). You can configure all parameters per strategy.',
  },
  {
    q: 'Do you provide tax reports or P&L statements?',
    a: 'Yes, the platform generates detailed P&L reports, trade journals, and tax summaries compatible with Indian tax filing requirements. Reports can be exported as CSV/PDF. We also provide broker-wise trade reconciliation for audit purposes.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <Section id="faq">
      <SectionHeader
        title="Everything You Need to Know"
        subtitle="Detailed answers to the questions serious traders ask. No fluff, just facts."
      />

      <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                'rounded-2xl border transition-all duration-300 overflow-hidden card-depth',
                openIndex === i
                  ? 'border-accent/20 bg-gradient-to-r from-accent/[0.03] to-card'
                  : 'border-white/[0.06] bg-card hover:border-white/20 hover:shadow-xl hover:shadow-black/20'
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-5 md:p-6 text-left gap-4"
              >
                <span className="text-sm font-medium text-white">{faq.q}</span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center border border-white/[0.06]"
                >
                  <ChevronDown size={14} className="text-muted" />
                </motion.div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 md:px-6 pb-5 md:pb-6 text-sm text-muted leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
