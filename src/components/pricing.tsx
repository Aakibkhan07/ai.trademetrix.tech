'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeader, FadeIn } from './ui/section';
import { Button } from './ui/button';
import { Check, ArrowUpRight, X, Star, Loader2, CircleCheck, ExternalLink } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useModal } from '@/src/components/modal-context';
import { useRazorpay } from '@/src/hooks/use-razorpay';

function parsePrice(price: string): number {
  return parseInt(price.replace(/[₹,]/g, ''), 10);
}

interface Subscription {
  active: boolean;
  plan: string;
  daysLeft: number | null;
  endsAt: string | null;
}

const plans = [
  {
    name: 'Monthly',
    price: '₹15,500',
    period: '/mo',
    tagline: 'Flexible, try risk-free',
    save: null,
    features: [
      '2 Active Strategies',
      'Auto Execution',
      'Option Chain Scanner',
      'Risk Management',
      'Email Support',
      '1 Broker Integration',
    ],
    missing: ['Backtesting Engine', 'Strategy Builder'],
    cta: 'Subscribe',
    trial: '1-day free trial · No card required',
    popular: false,
  },
  {
    name: 'Quarterly',
    price: '₹35,500',
    period: '/qtr',
    tagline: 'Save ₹10,999 vs monthly',
    save: '₹10,999',
    features: [
      '4 Active Strategies',
      'Auto Execution',
      'Option Chain Scanner',
      'Risk Management',
      'Priority Email Support',
      '3 Broker Integrations',
      'Backtesting (2-year)',
      'Trailing Stop-Loss',
    ],
    missing: [],
    cta: 'Subscribe',
    trial: '1-day free trial · No card required',
    popular: false,
  },
  {
    name: 'Half-Yearly',
    price: '₹69,500',
    period: '/6mo',
    tagline: 'Save ₹23,500',
    save: '₹23,500',
    features: [
      '8 Active Strategies',
      'Auto Execution',
      'Advanced Option Scanner',
      'Advanced Risk Mgmt',
      '24/7 WhatsApp Support',
      'All 7 Broker Integrations',
      'Backtesting (5-year)',
      'Strategy Builder Beta',
    ],
    missing: [],
    cta: 'Subscribe',
    trial: '1-day free trial · No card required',
    popular: true,
  },
  {
    name: 'Yearly',
    price: '₹1,25,000',
    period: '/yr',
    tagline: 'Save ₹61,000',
    save: '₹61,000',
    features: [
      '15 Active Strategies',
      'Full Platform Access',
      'Dedicated Manager',
      '24/7 Priority Support',
      'All Broker Integrations',
      'Backtesting (5-year)',
      'Strategy Builder Full',
      'Custom Strategy Dev',
    ],
    missing: [],
    cta: 'Subscribe',
    trial: null,
    popular: false,
  },
];

export function Pricing() {
  const { user, openModal, setAuthMode, pendingPayment, setPendingPayment } = useModal();
  const { initiatePayment, loading, error, success, dismissSuccess } = useRazorpay();
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    if (user?.email) {
      fetch(`/api/user/subscription?email=${encodeURIComponent(user.email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.active) setSubscription(data);
        })
        .catch(() => {});
    }
  }, [user?.email]);

  useEffect(() => {
    if (user && pendingPayment) {
      const payment = pendingPayment;
      setPendingPayment(null);
      initiatePayment({
        amount: payment.amount,
        plan: payment.plan,
        description: `${payment.plan} Plan - Trade Metrix Tech`,
        email: user.email,
        name: user.name,
        onSuccess: () => {
          setSubscription({
            active: true,
            plan: payment.plan,
            daysLeft: null,
            endsAt: null,
          });
        },
      });
    }
  }, [user, pendingPayment]);

  const handlePayNow = (plan: typeof plans[0]) => {
    if (!user) {
      setPendingPayment({ amount: parsePrice(plan.price), plan: plan.name });
      setAuthMode('signup');
      openModal('auth');
      return;
    }
    initiatePayment({
      amount: parsePrice(plan.price),
      plan: plan.name,
      description: `${plan.name} Plan - Trade Metrix Tech`,
      email: user.email,
      name: user.name,
      onSuccess: () => {
        setSubscription({
          active: true,
          plan: plan.name,
          daysLeft: null,
          endsAt: null,
        });
      },
    });
  };

  return (
    <Section id="pricing">
      <SectionHeader
        title="Simple, Transparent Pricing"
        subtitle="No hidden fees. No surprises. Cancel anytime. Pick the plan that fits your trading style."
      />

      {error && (
        <div className="max-w-lg mx-auto mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-center">
          {error}
        </div>
      )}

      {success && (
        <motion.div
          className="max-w-lg mx-auto mb-6 px-5 py-4 rounded-xl bg-green-500/10 border border-green-500/20"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-start gap-3">
            <CircleCheck size={20} className="text-green-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">Payment Successful!</p>
              <p className="text-xs text-muted mt-0.5">
                Your {success.plan} plan is now active. Start building your strategies.
              </p>
            </div>
            <button
              onClick={dismissSuccess}
              className="text-muted hover:text-white transition-colors"
            >
              <X size={16} />
            </button>
          </div>
          <a
            href="/dashboard"
            className="inline-flex items-center gap-1.5 mt-3 text-xs font-medium text-accent hover:text-accent-dark transition-colors"
          >
            Go to Dashboard <ExternalLink size={12} />
          </a>
        </motion.div>
      )}

      {subscription && (
        <motion.div
          className="max-w-lg mx-auto mb-6 px-5 py-3 rounded-xl bg-accent/5 border border-accent/20 text-center"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-xs text-muted">
            You are currently on the <span className="text-white font-semibold">{subscription.plan}</span> plan.
            {subscription.daysLeft !== null && (
              <> · {subscription.daysLeft} days remaining</>
            )}
          </p>
        </motion.div>
      )}

      <FadeIn className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {plans.map((plan, index) => {
          const isOwnedPlan = subscription?.active && subscription?.plan === plan.name;

          return (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              whileHover={isOwnedPlan ? {} : { y: -8 }}
              className={cn(
                'relative rounded-2xl border p-6 transition-all duration-300 flex flex-col card-depth',
                plan.popular
                  ? 'border-accent/30 bg-gradient-to-b from-accent/[0.04] to-card shadow-2xl shadow-accent/10 ring-1 ring-accent/20'
                  : 'border-white/[0.06] bg-card hover:border-white/20 hover:shadow-xl hover:shadow-black/30',
                isOwnedPlan && 'border-green-500/30 bg-gradient-to-b from-green-500/[0.04] to-card ring-1 ring-green-500/20'
              )}
            >
              {plan.popular && !isOwnedPlan && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-accent to-accent-dark text-background text-[11px] font-semibold shadow-lg shadow-accent/30 whitespace-nowrap flex items-center gap-1">
                  <Star size={12} className="fill-background" />
                  Most Popular
                </div>
              )}

              {isOwnedPlan && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[11px] font-semibold shadow-lg shadow-green-500/30 whitespace-nowrap flex items-center gap-1">
                  <Check size={12} />
                  Current Plan
                </div>
              )}

              <div className="mb-5">
                <h3 className="text-base font-semibold text-white">{plan.name}</h3>
                <p className="text-xs text-muted mt-0.5">{plan.tagline}</p>
              </div>

              <div className="mb-5">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl md:text-4xl font-bold text-white tracking-tight">{plan.price}</span>
                  <span className="text-xs text-muted">{plan.period}</span>
                </div>
                {plan.save && (
                  <span className="inline-block mt-1.5 text-[11px] px-2 py-0.5 rounded bg-accent/10 text-accent border border-accent/20 font-medium shadow-sm shadow-accent/5">
                    Save {plan.save}
                  </span>
                )}
              </div>

              <Button
                variant={isOwnedPlan ? 'secondary' : plan.popular ? 'primary' : 'secondary'}
                size="sm"
                className="w-full mb-4"
                disabled={loading || isOwnedPlan}
                onClick={() => handlePayNow(plan)}
              >
                {loading ? (
                  <><Loader2 size={14} className="animate-spin" /> Processing...</>
                ) : isOwnedPlan ? (
                  <>Active <Check size={14} /></>
                ) : (
                  <>{plan.cta} <ArrowUpRight size={14} /></>
                )}
              </Button>

              {plan.trial && !isOwnedPlan && (
                <p className="text-[11px] text-muted/70 text-center mb-5">{plan.trial}</p>
              )}
              {!plan.trial && <div className="mb-5" />}

              <ul className="space-y-3 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm">
                    <div className="w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check size={12} className="text-accent" />
                    </div>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
                {plan.missing.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-sm opacity-40">
                    <div className="w-5 h-5 rounded-full bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <X size={12} className="text-muted" />
                    </div>
                    <span className="text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </FadeIn>

      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative rounded-2xl border border-accent/20 bg-gradient-to-br from-accent/[0.03] to-card p-8 md:p-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20">Enterprise</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/[0.06] text-muted">For Institutions</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Custom Plan for Prop Desks & Institutions</h3>
              <p className="text-sm text-muted max-w-xl">
                Dedicated infrastructure, colocated servers, white-label dashboard, custom strategy development, and dedicated support team.
              </p>
              <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-xs text-muted">
                {['Unlimited Strategies', 'Sub-5ms Latency', 'Colocated Servers', 'White-Label UI', 'Custom Indicators', 'SLA Guarantee', 'Dedicated Engineer', 'Bulk Pricing'].map((f) => (
                  <span key={f} className="flex items-center gap-1.5">
                    <Check size={10} className="text-accent" /> {f}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-left md:text-right">
              <div className="text-sm text-muted mb-1">Starting at</div>
              <div className="text-2xl md:text-3xl font-bold text-white">₹5,00,000</div>
              <div className="text-xs text-muted mb-4">/year · Custom pricing available</div>
              <a
                href="mailto:info@trademetrix.tech"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-background text-sm font-semibold rounded-xl hover:bg-accent-dark transition-colors shadow-lg shadow-accent/20"
              >
                Contact Sales <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </Section>
  );
}
