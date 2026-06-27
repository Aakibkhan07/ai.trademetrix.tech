'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight, Check, Star, Minus, Plus, Loader2, CircleCheck, X } from 'lucide-react';
import { Navbar } from '@/src/components/navbar';
import { MarketTicker } from '@/src/components/market-ticker';
import { Footer } from '@/src/components/footer';
import { Section, FadeIn } from '@/src/components/ui/section';
import { Button } from '@/src/components/ui/button';
import { useModal, ModalProvider } from '@/src/components/modal-context';
import { useRazorpay } from '@/src/hooks/use-razorpay';
import { ConsentModal, hasConsented } from '@/src/components/consent-modal';
import { AuthModal } from '@/src/components/auth-modal';
import { DemoModal } from '@/src/components/demo-modal';

function GradientText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-accent to-accent-3 bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function SecLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] tracking-[2px] uppercase text-accent font-semibold mb-3">
      {children}
    </div>
  );
}

function SecTitle({ children, as = 'h2' }: { children: React.ReactNode; as?: 'h1' | 'h2' | 'h3' }) {
  const Tag = as;
  return (
    <Tag className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
      {children}
    </Tag>
  );
}

function SecSub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 text-base md:text-lg text-muted leading-relaxed max-w-2xl mx-auto">
      {children}
    </p>
  );
}

function CalcSlider({ label, value, min, max, step, id }: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  id: string;
}) {
  return (
    <div className="mb-7">
      <label htmlFor={id} className="flex justify-between items-baseline text-sm text-muted mb-2.5">
        <span>{label}</span>
        <span className="text-lg font-bold text-white" id={`${id}Val`}>
          {id === 'capital' ? `₹${value.toLocaleString('en-IN')}` : `${value}%`}
        </span>
      </label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        defaultValue={value}
        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-white/[0.08] accent-accent
          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
          [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent
          [&::-webkit-slider-thumb]:shadow-[0_0_16px_rgba(239,68,68,0.5)]
          [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:border-none
          [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-accent"
      />
    </div>
  );
}

function CheckIcon() {
  return (
    <div className="w-5 h-5 rounded-md flex-none mt-0.5 flex items-center justify-center bg-accent/10 border border-accent/20">
      <Check size={11} className="text-accent" />
    </div>
  );
}

function CrossIcon() {
  return (
    <span className="text-accent flex-none text-sm mt-0.5">&#10005;</span>
  );
}

function parsePrice(price: string): number {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
}

const tierPlans = [
  { name: 'Enterprise Core', price: '₹2,50,000' },
  { name: 'Enterprise Pro', price: '₹5,00,000' },
  { name: 'Enterprise Elite', price: '₹10,00,000' },
];

export default function EnterprisePage() {
  const [capital, setCapital] = useState(1500000);
  const [lossPct, setLossPct] = useState(8);
  const PLAN_COST = 250000;
  const hit = capital * (lossPct / 100);
  const guarded = capital * 0.02;
  const hitsToPay = Math.max(1, Math.round(PLAN_COST / hit));

  const { user, openModal, setAuthMode, pendingPayment, setPendingPayment } = useModal();
  const { initiatePayment, loading, error, success, dismissSuccess } = useRazorpay();
  const [subscription, setSubscription] = useState<{ active: boolean; plan: string } | null>(null);
  const [showConsent, setShowConsent] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<{ name: string; price: string } | null>(null);

  useEffect(() => {
    if (user && pendingPayment) {
      const payment = pendingPayment;
      setPendingPayment(null);
      const plan = { name: payment.plan, price: `₹${payment.amount.toLocaleString('en-IN')}` };
      if (!hasConsented()) {
        setPendingPlan(plan);
        setShowConsent(true);
        return;
      }
      initiatePayment({
        amount: payment.amount,
        plan: payment.plan,
        description: `${payment.plan} - Trade Metrix Enterprise`,
        email: user.email,
        name: user.name,
        onSuccess: () => {
          setSubscription({ active: true, plan: payment.plan });
        },
      });
    }
  }, [user, pendingPayment, initiatePayment]);

  const handlePayNow = (plan: { name: string; price: string }) => {
    if (!user) {
      setPendingPayment({ amount: parsePrice(plan.price), plan: plan.name });
      setAuthMode('signup');
      openModal('auth');
      return;
    }
    if (!hasConsented()) {
      setPendingPlan(plan);
      setShowConsent(true);
      return;
    }
    initiatePayment({
      amount: parsePrice(plan.price),
      plan: plan.name,
      description: `${plan.name} - Trade Metrix Enterprise`,
      email: user.email,
      name: user.name,
      onSuccess: () => {
        setSubscription({ active: true, plan: plan.name });
      },
    });
  };

  const inr = (n: number) => `₹${Math.round(n).toLocaleString('en-IN')}`;

  return (
    <ModalProvider>
      <Navbar />
      <MarketTicker />

      <DemoModal />
      <AuthModal />
      <ConsentModal
        open={showConsent}
        onAccept={() => {
          if (pendingPlan) {
            initiatePayment({
              amount: parsePrice(pendingPlan.price),
              plan: pendingPlan.name,
              description: `${pendingPlan.name} - Trade Metrix Enterprise`,
              email: user?.email || '',
              name: user?.name,
              onSuccess: () => {
                setSubscription({ active: true, plan: pendingPlan.name });
              },
            });
            setPendingPlan(null);
          }
        }}
        onClose={() => setShowConsent(false)}
      />

      <main className="relative">

        {/* HERO */}
        <section className="relative pt-44 pb-24 md:pb-32 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/[0.04] text-accent text-[11px] font-semibold tracking-[1.5px] uppercase mb-6"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_rgba(239,68,68,0.6)]" />
              For traders who've outgrown retail
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.05] mb-6"
            >
              Your capital grew.<br />
              <GradientText>Your tools didn't.</GradientText>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.25 }}
              className="text-base md:text-lg text-muted max-w-2xl mx-auto leading-relaxed mb-10"
            >
              You&apos;re running lakhs through a plan built for beginners. Every manual entry, every missed stop loss, every laptop-off moment quietly leaks money. Enterprise closes that gap — a dedicated desk that trades your plan with zero emotion, 24&times;7.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Button variant="primary" size="lg" href="#pricing">See Enterprise Tiers <ArrowUpRight size={16} /></Button>
              <Button variant="secondary" size="lg" href="#calc">Calculate Your Leak</Button>
            </motion.div>
          </div>
        </section>

        <div className="section-divider" />

        {/* HOW IT WORKS */}
        <Section id="how-it-works">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>How It Works</SecLabel>
            <SecTitle>Your dedicated desk in 3 steps.</SecTitle>
            <SecSub>No complex setup. No back-and-forth. We handle the infrastructure, you keep control of your capital.</SecSub>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-5">
            {[
              { num: '01', title: 'We build your strategy', desc: 'You share your capital, risk appetite and market preference. We build and backtest a custom strategy sized for your account — not a template.' },
              { num: '02', title: 'We provision your desk', desc: 'A dedicated Mumbai VPS is spun up, RiskGuard is configured, and your strategy is deployed. All in about a week.' },
              { num: '03', title: 'You go live with proof', desc: 'The system runs in shadow mode on live data first. You watch the trades, verify the logic, then give the go-ahead for live capital.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.1}>
                <div className="rounded-2xl border border-white/[0.06] bg-card p-7 card-depth hover-lift text-center">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-black text-lg mx-auto mb-5">
                    {step.num}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* PLATFORM */}
        <Section id="platform">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>Platform</SecLabel>
            <SecTitle>Enterprise-grade dashboard, tailored for you.</SecTitle>
            <SecSub>A real-time trading operations centre designed for serious capital — not a retail app with extra buttons.</SecSub>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-4">
            {[
              { icon: '📊', title: 'Live P&L dashboard', desc: 'Real-time position-level P&L, exposure tracking, and daily P&L curves. See exactly where your capital is at every moment.' },
              { icon: '📋', title: 'Trade log & audit trail', desc: 'Every entry, exit, and signal logged with timestamps. Full audit trail for your records — no black box.' },
              { icon: '📱', title: 'Mobile monitoring', desc: 'Monitor your desk from anywhere. Real-time alerts on Telegram and email for entries, exits, and risk events.' },
              { icon: '📈', title: 'Performance analytics', desc: 'Win rate, Sharpe ratio, max drawdown, and equity curves updated after every session. Data you can act on.' },
              { icon: '⚙️', title: 'Strategy controls', desc: 'Pause, stop, or adjust risk parameters anytime from the dashboard. You stay in full command of your capital.' },
              { icon: '🔔', title: 'Instant alerts', desc: 'Telegram and email notifications for every trade, risk breach, and daily square-off. No screen-staring required.' },
            ].map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/[0.06] bg-card p-6 card-depth hover-lift h-full group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-accent/10 border border-accent/20 mb-4 group-hover:bg-accent/15 transition-colors">
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* STRATEGIES */}
        <Section id="strategies">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>Strategies</SecLabel>
            <SecTitle>50+ strategies at your disposal.</SecTitle>
            <SecSub>Retail gives you 2–3 templated options. Enterprise unlocks 50+ custom-built strategies spanning every market condition.</SecSub>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5 items-stretch">
            <FadeIn>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center text-muted text-lg font-bold">R</div>
                  <div>
                    <h3 className="text-lg font-bold text-muted">Retail Plan</h3>
                    <p className="text-xs text-muted/60">What everyone else gets</p>
                  </div>
                </div>
                <ul className="space-y-3.5">
                  {[
                    '2–3 pre-built strategies only',
                    'Same template for all users',
                    'No customisation possible',
                    'Generic risk parameters',
                    'Designed for 1–5L capital',
                    'No multi-timeframe support',
                    'Single market segment',
                    'No walk-forward optimisation',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted items-start">
                      <CrossIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-accent/20 bg-card p-8 h-full card-depth card-border-accent">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent text-lg font-bold">E</div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Enterprise</h3>
                    <p className="text-xs text-muted">50+ strategies, fully custom</p>
                  </div>
                </div>
                <ul className="space-y-3.5">
                  {[
                    '50+ strategy library access',
                    'Custom-built for your capital',
                    'Full parameter customisation',
                    'RiskGuard per-strategy rules',
                    'Built for 10L+ capital',
                    'Multi-timeframe confluences',
                    'All segments: equity, F&O, commodities',
                    'Walk-forward & genetic optimisation',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-white items-start">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-5 border-t border-white/[0.06]">
                  <p className="text-xs text-muted leading-relaxed">
                    Your dedicated strategist selects and tunes the right approach for your capital, risk tolerance, and market view — not an algorithm matching you to a template.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </Section>

        <div className="section-divider" />

        {/* CALCULATOR */}
        <Section id="calc">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>The Real Cost</SecLabel>
            <SecTitle>What is undiscipline costing you?</SecTitle>
            <SecSub>Move the sliders. See what one bad, unmanaged trade can do to your account — versus what a system costs.</SecSub>
          </div>

          <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/[0.06] bg-card p-8 md:p-10 card-depth glow-sm">
              <CalcSlider label="Your trading capital" value={1500000} min={500000} max={10000000} step={100000} id="capital" />
              <CalcSlider label="One bad trade / day's drawdown" value={8} min={2} max={25} step={1} id="lossPct" />

              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                  <div className="text-[10px] tracking-[1.2px] uppercase text-muted mb-2">One undisciplined hit</div>
                  <div className="text-3xl font-bold text-accent tracking-tight">
                    {inr(hit)}
                  </div>
                  <div className="text-xs text-muted/70 mt-2 leading-relaxed">
                    No stop loss, one revenge entry, or a missed exit while you were away.
                  </div>
                </div>
                <div className="rounded-xl border border-accent/20 bg-accent/[0.02] p-5">
                  <div className="text-[10px] tracking-[1.2px] uppercase text-muted mb-2">Enterprise Core</div>
                  <div className="text-3xl font-bold tracking-tight">
                    <GradientText>{inr(PLAN_COST)}</GradientText>
                  </div>
                  <div className="text-xs text-muted/70 mt-2 leading-relaxed">
                    RiskGuard would have capped this at <b className="text-white">{inr(guarded)}</b> (a 2% daily limit).
                  </div>
                </div>
              </div>

              <p className="text-center mt-6 text-base md:text-lg font-semibold text-muted">
                Avoiding just <GradientText>~{hitsToPay} such {hitsToPay === 1 ? 'hit' : 'hits'} a year</GradientText> pays for the plan. RiskGuard is built to stop them every single day.
              </p>
            </div>
          </FadeIn>
        </Section>

        <div className="section-divider" />

        {/* SHIFT */}
        <Section id="shift">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>Why Now</SecLabel>
            <SecTitle>Retail got you started.<br />Enterprise gets you serious.</SecTitle>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
            <FadeIn>
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 h-full">
                <h3 className="text-lg font-bold text-muted mb-5">Staying on Retail</h3>
                <ul className="space-y-3.5">
                  {[
                    'Runs on your machine — laptop off, trade missed',
                    'Same templated strategy as everyone else',
                    'Discipline depends on your mood that day',
                    'No hard cap when a bad day spirals',
                    'You\'re capped as your capital grows',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-muted items-start">
                      <CrossIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-accent/20 bg-card p-8 h-full card-depth card-border-accent">
                <h3 className="text-lg font-bold text-white mb-5">Moving to Enterprise</h3>
                <ul className="space-y-3.5">
                  {[
                    'Dedicated VPS running 24×7 — independent of you',
                    'A strategy custom-built for your account',
                    'RiskGuard enforces discipline automatically',
                    'Daily loss cut-off stops the spiral cold',
                    'Scales with your capital, no ceiling',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-white items-start">
                      <CheckIcon /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          </div>
        </Section>

        <div className="section-divider" />

        {/* FEATURES */}
        <Section id="features">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>What You Get</SecLabel>
            <SecTitle>Everything a serious desk needs.</SecTitle>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-4">
            {[
              { icon: '⚡', title: 'Dedicated infrastructure', desc: 'A dedicated Mumbai VPS with a static IP, close to the broker servers. Runs 24×7, independent of your laptop — fully managed by us.' },
              { icon: '🤖', title: 'Automated execution', desc: 'The full strategy suite enters, manages and exits positions automatically on pre-defined rules — no manual screen time.' },
              { icon: '🧠', title: 'Custom strategy', desc: 'A strategy built and tuned for your capital and risk appetite — correct sizing for your account, not a generic template.' },
              { icon: '🛡️', title: 'RiskGuard protection', desc: 'Per-trade stop loss, daily loss cut-off, exposure caps and auto square-off — your rules enforced, with no emotion.' },
              { icon: '🔗', title: 'Broker & fund control', desc: 'Fyers + Dhan on your existing account. You keep full control of your funds — we never hold your capital.' },
              { icon: '🧪', title: 'See it before you commit', desc: 'We run your strategies on live data in paper mode first, so you watch the system work before a single rupee goes live.' },
            ].map((feat, i) => (
              <FadeIn key={feat.title} delay={i * 0.06}>
                <div className="rounded-2xl border border-white/[0.06] bg-card p-6 card-depth hover-lift h-full group">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl bg-accent/10 border border-accent/20 mb-4 group-hover:bg-accent/15 transition-colors">
                    {feat.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{feat.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{feat.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* RISKGUARD */}
        <Section id="riskguard">
          <FadeIn className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-accent/20 bg-card p-8 md:p-12 card-depth card-border-accent grid md:grid-cols-5 gap-8 md:gap-12 items-center">
              <div className="md:col-span-2">
                <SecLabel>RiskGuard</SecLabel>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  Capital protection, <GradientText>on autopilot.</GradientText>
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  At serious capital, one undisciplined trade can cost lakhs. RiskGuard takes emotion out of the equation — the system follows your rules, not your mood, every single session.
                </p>
              </div>
              <div className="md:col-span-3">
                <ul className="space-y-4">
                  {[
                    '<b>Per-trade stop loss</b> on every position.',
                    '<b>Daily maximum loss cut-off</b> — trading halts automatically once hit.',
                    '<b>Exposure & capital-at-risk caps</b> to prevent over-leverage.',
                    '<b>Automatic square-off rules</b> for clean position management.',
                  ].map((item) => (
                    <li key={item} className="flex gap-3 text-sm items-start">
                      <CheckIcon />
                      <span dangerouslySetInnerHTML={{ __html: item }} className="text-white/90" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </Section>

        <div className="section-divider" />

        {/* BROKER LOGOS */}
        <Section id="brokers">
          <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <SecLabel>Your Account. Your Control.</SecLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Trade on your existing broker.</h2>
            <p className="text-sm text-muted mb-10 max-w-lg mx-auto">We never hold your funds. Orders execute through your own broker account via approved APIs.</p>
            <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-white/[0.08] bg-card flex items-center justify-center card-depth hover-lift">
                  <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#2525E2' }}>Fyers</span>
                </div>
                <span className="text-xs text-muted">Fully supported</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-white/[0.08] bg-card flex items-center justify-center card-depth hover-lift">
                  <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#00B5E2' }}>Dhan</span>
                </div>
                <span className="text-xs text-muted">Fully supported</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl border border-white/[0.08] bg-card flex items-center justify-center card-depth hover-lift">
                  <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: '#8B5CF6' }}>Zerodha</span>
                </div>
                <span className="text-xs text-muted">Coming soon</span>
              </div>
            </div>
            <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/[0.04] text-xs text-accent font-medium">
              <Check size={12} /> Your funds never leave your account
            </div>
          </FadeIn>
        </Section>

        <div className="section-divider" />

        {/* TRUST */}
        <Section id="trust">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>Why Traders Trust Us</SecLabel>
            <SecTitle>No black box. No false promises.</SecTitle>
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-4">
            {[
              { icon: '🔒', title: 'Your money stays yours', desc: 'Funds never leave your own broker account. We route orders through approved APIs — we never hold a rupee of your capital.' },
              { icon: '👁️', title: 'Proof before you pay off', desc: 'You watch the system trade live data in shadow mode before going live. You decide when to flip the switch.' },
              { icon: '📜', title: 'Honest by design', desc: 'We\'re a technology company, not a tips service. No guaranteed-return claims — just disciplined execution and risk control.' },
            ].map((item) => (
              <FadeIn key={item.title}>
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 text-center hover-lift">
                  <div className="text-2xl mb-3">{item.icon}</div>
                  <h4 className="text-sm font-semibold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-4 mt-6">
            {[
              { stars: '★★★★★', text: 'My daily loss cap saved me ₹4L+ on a single volatile Budget Day. The system squared off before I could even react.', who: '— Siddharth N., 18L capital, Mumbai' },
              { stars: '★★★★★', text: 'I used to watch screens 10 hours a day. Now I check the dashboard once in the morning. The system does the rest.', who: '— Karthik M., Bangalore' },
              { stars: '★★★★★', text: 'The custom strategy fits my risk profile perfectly. I\'m not running someone else\'s one-size-fits-all template anymore.', who: '— Deepak A., NIFTY trader, Delhi' },
            ].map((q) => (
              <FadeIn key={q.who}>
                <div className="rounded-xl border border-white/[0.06] bg-card p-6 card-depth">
                  <div className="text-accent tracking-[2px] text-xs mb-3">{q.stars}</div>
                  <p className="text-sm text-white/90 leading-relaxed mb-4">{q.text}</p>
                  <div className="text-xs text-muted">{q.who}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* PRICING */}
        <Section id="pricing">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>Enterprise Tiers</SecLabel>
            <SecTitle>Choose your desk.</SecTitle>
            <SecSub>From a serious individual trader to a full prop desk. All prices exclusive of GST.</SecSub>
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-5">
            {/* Core */}
            <FadeIn>
              <div className="relative rounded-2xl border border-white/[0.06] bg-card p-7 card-depth flex flex-col hover-lift">
                <div className="text-lg font-bold text-white mb-1">Enterprise Core</div>
                <div className="text-xs text-muted mb-5 leading-relaxed min-h-[2.5rem]">For the serious individual trader deploying 10–20L capital.</div>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  <GradientText>₹2,50,000</GradientText>
                </div>
                <div className="text-xs text-muted mb-6">Single dedicated account</div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {[
                    { text: 'The complete setup', head: true },
                    { text: 'Dedicated Mumbai VPS, 24×7 managed' },
                    { text: 'Full automated strategy suite' },
                    { text: '1 custom strategy for your capital' },
                    { text: 'RiskGuard capital protection' },
                    { text: 'Fyers + Dhan execution' },
                    { text: 'Shadow mode before going live' },
                    { text: 'Priority support' },
                  ].map((item) => (
                    <li key={item.text} className="flex gap-2.5 text-sm items-start">
                      <CheckIcon />
                      <span className={item.head ? 'text-white font-semibold' : 'text-muted'}>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handlePayNow(tierPlans[0])}
                  disabled={loading}
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : 'Get Core'}
                </button>
              </div>
            </FadeIn>

            {/* Pro - Featured */}
            <FadeIn delay={0.1}>
              <div className="relative rounded-2xl border border-accent/20 bg-card p-7 card-depth card-border-accent flex flex-col hover-lift">
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent text-background text-[10px] font-bold tracking-wider uppercase shadow-lg shadow-accent/30 whitespace-nowrap flex items-center gap-1">
                  <Star size={11} className="fill-background" /> Most Chosen
                </div>
                <div className="text-lg font-bold text-white mb-1 mt-1">Enterprise Pro</div>
                <div className="text-xs text-muted mb-5 leading-relaxed min-h-[2.5rem]">For multi-account traders and partners deploying 25–50L capital.</div>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  <GradientText>₹5,00,000</GradientText>
                </div>
                <div className="text-xs text-muted mb-6">Multi-account · dedicated manager</div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {[
                    { text: 'Everything in Core, plus', head: true },
                    { text: '2–3 custom strategies' },
                    { text: 'Multi-account support' },
                    { text: 'Portfolio-level RiskGuard' },
                    { text: 'Dedicated account manager' },
                    { text: 'Faster priority support' },
                    { text: 'White-label option' },
                  ].map((item) => (
                    <li key={item.text} className="flex gap-2.5 text-sm items-start">
                      <CheckIcon />
                      <span className={item.head ? 'text-white font-semibold' : 'text-muted'}>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handlePayNow(tierPlans[1])}
                  disabled={loading}
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold bg-accent text-background hover:bg-accent-dark transition-all duration-200 shadow-lg shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : <><span>Get Pro</span> <ArrowUpRight size={14} className="inline" /></>}
                </button>
              </div>
            </FadeIn>

            {/* Elite */}
            <FadeIn delay={0.2}>
              <div className="relative rounded-2xl border border-white/[0.06] bg-card p-7 card-depth flex flex-col hover-lift">
                <div className="text-lg font-bold text-white mb-1">Enterprise Elite</div>
                <div className="text-xs text-muted mb-5 leading-relaxed min-h-[2.5rem]">For prop desks, HNIs and family offices, 50L+ capital.</div>
                <div className="text-3xl md:text-4xl font-bold mb-1">
                  <GradientText>₹10,00,000</GradientText>
                </div>
                <div className="text-xs text-muted mb-6">Desk-level · full SLA</div>
                <ul className="space-y-2.5 flex-1 mb-7">
                  {[
                    { text: 'Everything in Pro, plus', head: true },
                    { text: 'Unlimited trader seats' },
                    { text: 'Fully isolated infrastructure' },
                    { text: 'Custom development retainer' },
                    { text: '99.9% uptime SLA' },
                    { text: '24×7 support, 1h critical response' },
                    { text: 'Custom analytics & reporting' },
                  ].map((item) => (
                    <li key={item.text} className="flex gap-2.5 text-sm items-start">
                      <CheckIcon />
                      <span className={item.head ? 'text-white font-semibold' : 'text-muted'}>{item.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => handlePayNow(tierPlans[2])}
                  disabled={loading}
                  className="block w-full text-center py-3 rounded-xl text-sm font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : <><span>Buy Now</span> <ArrowUpRight size={14} className="inline" /></>}
                </button>
                <a
                  href="https://wa.me/917415660385"
                  className="block w-full text-center mt-2 py-2 rounded-xl text-xs font-medium text-muted border border-white/[0.06] hover:text-white transition-colors"
                >
                  or talk to us on WhatsApp
                </a>
              </div>
            </FadeIn>
          </div>

          {error && (
            <div className="max-w-lg mx-auto mt-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
              {error}
            </div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-lg mx-auto mt-6 px-5 py-4 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <div className="flex items-start gap-3">
                <CircleCheck size={20} className="text-green-400 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white">Payment Successful!</p>
                  <p className="text-xs text-muted mt-0.5">
                    Your {success.plan} subscription is now active. We'll reach out within 24 hours to set up your desk.
                  </p>
                </div>
                <button onClick={dismissSuccess} className="text-muted hover:text-white transition-colors">
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-center gap-3 mt-6 flex-wrap">
            <span className="text-xs px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-muted">Pay via Razorpay</span>
            <span className="text-xs px-4 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02] text-muted">or Bank Transfer</span>
          </div>
          <p className="text-center text-xs text-muted/60 mt-3">All Enterprise subscriptions are non-refundable.</p>
        </Section>

        <div className="section-divider" />

        {/* LOYALTY */}
        <Section id="loyalty">
          <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/[0.06] bg-card p-8 card-depth" style={{ borderLeft: '3px solid var(--color-accent)' }}>
              <h3 className="text-xl font-bold text-white mb-6">Already a <GradientText>Trade Metrix client?</GradientText></h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">Subscription credit</h4>
                  <p className="text-xs text-muted leading-relaxed">We adjust the remaining value of your current plan toward your Enterprise upgrade.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">Priority onboarding</h4>
                  <p className="text-xs text-muted leading-relaxed">You skip the queue — your desk is provisioned ahead of new clients.</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white mb-1.5">Price locked</h4>
                  <p className="text-xs text-muted leading-relaxed">Lock today's tier pricing before Enterprise rates are revised upward.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </Section>

        <div className="section-divider" />

        {/* FAQ */}
        <Section id="faq">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>Straight Answers</SecLabel>
            <SecTitle>The questions you're actually asking.</SecTitle>
          </div>

          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
            {[
              {
                q: 'Why is this so much more than the retail plan?',
                a: 'Because it\'s a different product. Retail is shared, templated software on your own machine. Enterprise is a dedicated server running 24×7, a strategy built for your account, and a hard risk layer protecting your capital. At your capital level, the cost of not having that is far higher than the fee — as the calculator above shows.',
              },
              {
                q: 'Is my money safe? Do you hold my funds?',
                a: 'No, we never hold your capital. Your funds stay in your own broker account at all times. We only route orders through your broker\'s official approved APIs. You retain full control and can disconnect whenever you choose.',
              },
              {
                q: 'What if it doesn\'t suit my style?',
                a: 'That\'s exactly why we start in shadow mode — the system runs on live market data with paper execution first, so you see how it behaves before going live. Your custom strategy is also tuned to your risk appetite, not a one-size-fits-all template.',
              },
              {
                q: 'Do you guarantee profits?',
                a: 'No, and anyone who does is not being honest with you. We guarantee disciplined, automated execution and strong risk control. The market risk and all trading decisions remain yours. That honesty is the point.',
              },
              {
                q: 'Can I pay in parts?',
                a: 'The plan is paid upfront, via Razorpay or bank transfer. For larger tiers, staged billing can be discussed during onboarding — talk to us and we\'ll work it out.',
              },
            ].map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} defaultOpen={i === 0} />
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* STEPS */}
        <Section id="start">
          <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24 px-4 sm:px-6 lg:px-8">
            <SecLabel>Getting Started</SecLabel>
            <SecTitle>Live in 2–3 weeks.</SecTitle>
          </div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-5 gap-4">
            {[
              { num: 1, title: 'Confirm', desc: 'Reach out and confirm you\'d like to proceed.' },
              { num: 2, title: 'Payment', desc: 'Pay securely via Razorpay link or bank transfer.' },
              { num: 3, title: 'Details', desc: 'Share your broker, capital and preferred risk level.' },
              { num: 4, title: 'Setup', desc: 'We provision your VPS, configure RiskGuard and deploy strategies.' },
              { num: 5, title: 'Go live', desc: 'Short shadow-mode run on live data, then switch to live.' },
            ].map((step, i) => (
              <FadeIn key={step.num} delay={i * 0.08}>
                <div className="rounded-xl border border-white/[0.06] bg-card p-5 card-depth hover-lift text-center md:text-left">
                  <div className="w-8 h-8 rounded-lg bg-accent text-background text-xs font-black flex items-center justify-center mb-3 mx-auto md:mx-0">
                    {step.num}
                  </div>
                  <h4 className="text-sm font-semibold text-white mb-1">{step.title}</h4>
                  <p className="text-xs text-muted leading-relaxed">{step.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* TRANSPARENCY */}
        <Section id="transparency">
          <FadeIn className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-xl border border-white/[0.06] bg-card p-7 card-depth" style={{ borderLeft: '3px solid var(--color-accent)' }}>
              <h4 className="text-sm font-semibold text-white mb-3">How we operate — fully transparent</h4>
              <p className="text-sm text-muted leading-relaxed">
                Trade Metrix Technologies is a software and technology company. We provide execution and risk-management technology that runs through your own registered broker&apos;s approved APIs. We do not provide investment advice, trading tips, or any guarantee of returns. All trading decisions and market risk remain entirely with you.
              </p>
            </div>
          </FadeIn>
        </Section>

        <div className="section-divider" />

        {/* SOCIAL PROOF */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/[0.06] bg-card p-8 md:p-10 card-depth">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                {[
                  { value: '₹50Cr+', label: 'AUM Managed' },
                  { value: '25+', label: 'Active Enterprise Desks' },
                  { value: '0', label: 'Security Incidents' },
                  { value: '99.9%', label: 'Platform Uptime' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-black text-white tracking-tight">{stat.value}</div>
                    <div className="text-xs text-muted mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* SECURITY & COMPLIANCE */}
        <section className="py-16 md:py-20">
          <div className="text-center max-w-3xl mx-auto mb-12 px-4 sm:px-6 lg:px-8">
            <SecLabel>Security & Compliance</SecLabel>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Built to institutional standards.</h2>
            <p className="text-sm text-muted max-w-lg mx-auto">Your strategies, data, and capital are protected at every layer.</p>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: '🔐', title: 'AES-256 Encryption', desc: 'Data encrypted at rest and in transit with TLS 1.3' },
              { icon: '🇮🇳', title: 'Data Localization', desc: 'All data stored on India-based servers. Compliant with IT Act 2000' },
              { icon: '🔑', title: '2FA & API Security', desc: 'Hardware-backed key vaults with multi-factor authentication' },
              { icon: '📋', title: 'Audit Trail', desc: 'Immutable 7-year logs for every trade and system event' },
            ].map((item) => (
              <div key={item.title} className="rounded-xl border border-white/[0.06] bg-card p-5 card-depth text-center">
                <div className="text-xl mb-3">{item.icon}</div>
                <h4 className="text-sm font-semibold text-white mb-1">{item.title}</h4>
                <p className="text-xs text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="section-divider" />

        {/* FINAL CTA */}
        <section className="relative py-32 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-4"
            >
              Stop leaking. <GradientText>Start trading like a pro.</GradientText>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-base text-muted max-w-lg mx-auto mb-8"
            >
              Your capital deserves infrastructure, automation and discipline — not a beginner's app. Let's set up your desk.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-4 flex-wrap"
            >
              <Button variant="primary" size="lg" href="https://wa.me/917415660385">Claim Your Slot <ArrowUpRight size={16} /></Button>
              <Button variant="secondary" size="lg" href="mailto:info@trademetrix.tech">info@trademetrix.tech</Button>
            </motion.div>
          </div>
        </section>

      </main>

      <Footer />
    </ModalProvider>
  );
}

function FAQItem({ question, answer, defaultOpen }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen || false);

  return (
    <div
      className={`rounded-xl border transition-all duration-200 cursor-pointer ${
        open ? 'border-accent/20 bg-card' : 'border-white/[0.06] bg-white/[0.02]'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span className="text-sm font-semibold text-white pr-4">{question}</span>
        <span className={`text-accent text-lg flex-none transition-transform duration-200 ${open ? 'rotate-45' : ''}`}>
          <Plus size={18} />
        </span>
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-sm text-muted leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}
