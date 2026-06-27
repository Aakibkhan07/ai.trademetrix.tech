'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader, StaggerGrid, StaggerItem } from './ui/section';
import { Section3D } from './section-3d';
import { Star, Quote, TrendingUp, Shield, Users, BarChart3 } from 'lucide-react';

const testimonials = [
  {
    name: 'Siddharth Nair',
    role: 'Retail Algo Trader, Mumbai',
    content: 'I\'ve been using Trade Metrix Tech for about 4 months now. Had some hiccups with broker connectivity initially but their support team sorted it out. The strategy builder is decent — I ported my old Amibroker AFL to their Python editor in a weekend. Backtest results are matching my manual trades within 2-3% which is acceptable.',
    metrics: 'Mixed',
    metricLabel: 'First 3 months',
    avatar: 'SN',
    rating: 4,
  },
  {
    name: 'Karthik M',
    role: 'Proprietary Trader, Bangalore',
    content: 'We evaluated Trade Metrix Tech alongside Streak and AlgoTest for our prop desk. Latency is genuinely good — our tick data gets processed around 10ms which works for our swing strategies. The walk-forward analysis is something none of the others offer. We\'ve deployed 3 strategies live. Still early but the infrastructure is solid.',
    metrics: '3 Strategies',
    metricLabel: 'Deployed Live',
    avatar: 'KM',
    rating: 4,
  },
  {
    name: 'Deepak Agarwal',
    role: 'Part-Time Investor, Delhi',
    content: 'Honest review: I\'m not a coder. I tried Trade Metrix Tech for the visual builder and it works for simple strategies. The learning curve exists though — had to watch their YouTube videos a few times. My NIFTY momentum strategy has been running for 2 months, up about 4% after costs. Would like better mobile support.',
    metrics: '+4.2%',
    metricLabel: 'Net Return (2 months)',
    avatar: 'DA',
    rating: 3,
  },
  {
    name: 'Neha Iyer',
    role: 'Freelance Algo Developer, Hyderabad',
    content: 'I build strategies for clients and Trade Metrix Tech lets me white-label them. The API is clean, documentation is okay (could be more detailed). The sandbox environment is useful for testing before going live. Main complaint: no webhook support for external signals yet. They said it\'s coming.',
    metrics: '6 Clients',
    metricLabel: 'Onboarded via API',
    avatar: 'NI',
    rating: 4,
  },
  {
    name: 'Rohit Ghosh',
    role: 'Risk Analyst, Kolkata',
    content: 'What finally made me pick Trade Metrix Tech over alternatives was the risk controls. Pre-trade exposure checks, configurable kill switches, and real-time drawdown limits. I paper-traded for 3 weeks before going live. The platform held up well. Would like to see basket order support added.',
    metrics: '₹0',
    metricLabel: 'Unexpected Losses',
    avatar: 'RG',
    rating: 5,
  },
  {
    name: 'Meera Krishnan',
    role: 'Options Trader, Pune',
    content: 'Signed up for the trial, ended up staying. Trade Metrix Tech handles multi-leg option strategies better than I expected. The Greeks calculator and IV rank indicators are useful. One thing — the pricing is steep for what it is. I\'m on the quarterly plan and hoping they add futures trading support soon.',
    metrics: 'Quarterly Plan',
    metricLabel: 'Since March 2026',
    avatar: 'MK',
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <Section id="testimonials">
      <SectionHeader
        title="Hear from Traders Using Trade Metrix Tech"
        subtitle="Real feedback from retail traders, prop desks, and algo developers across India."
      />

      <Section3D variant="cubes" />

      <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {testimonials.map((t) => (
          <StaggerItem key={t.name}>
            <div className="group relative rounded-2xl border border-white/[0.06] bg-card p-6 card-depth hover:border-accent/20 transition-all duration-300 h-full flex flex-col">
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={12}
                    className={i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/[0.08]'}
                  />
                ))}
              </div>

              <Quote size={16} className="text-accent/30 mb-2 flex-shrink-0" />

              <p className="text-sm text-muted leading-relaxed mb-4 flex-1">&ldquo;{t.content}&rdquo;</p>

              <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center ring-1 ring-accent/20 text-xs font-semibold text-accent">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{t.name}</div>
                    <div className="text-[10px] text-muted">{t.role}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-accent">{t.metrics}</div>
                  <div className="text-[8px] text-muted uppercase tracking-wider">{t.metricLabel}</div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGrid>

      <div className="mt-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-white/[0.06] bg-card overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-white/[0.06]">
            {[
              { icon: TrendingUp, value: '1,200+', label: 'Active Traders' },
              { icon: BarChart3, value: '₹120Cr+', label: 'Traded Volume' },
              { icon: Users, value: '94%', label: 'Would Recommend' },
              { icon: Shield, value: '99.8%', label: 'Platform Uptime' },
            ].map((stat) => (
              <div key={stat.label} className="p-5 md:p-6 text-center hover:bg-white/[0.02] transition-colors">
                <stat.icon size={18} className="text-accent mx-auto mb-2" />
                <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-muted mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
