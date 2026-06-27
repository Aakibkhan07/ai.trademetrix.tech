'use client';

import { Section, SectionHeader, StaggerGrid, StaggerItem } from './ui/section';
import { Section3D } from './section-3d';
import { Card, CardIcon, CardTitle, CardDescription } from './ui/card';
import {
  Puzzle,
  FlaskConical,
  Shield,
  Link2,
  Zap,
  BarChart3,
  PieChart,
  Bell,
  BrainCircuit,
  ArrowUpRight,
} from 'lucide-react';

const features = [
  {
    icon: Puzzle,
    title: 'Strategy Builder',
    description: 'Visual drag-and-drop builder with Python scripting. Create complex strategies without writing code.',
    tag: 'No Code',
    gradient: 'from-teal-500/20 via-accent/5 to-transparent',
  },
  {
    icon: FlaskConical,
    title: 'Backtesting Engine',
    description: 'Tick-level backtesting with 15+ years of historical data. Validate strategies before going live.',
    tag: '15+ Years',
    gradient: 'from-blue-500/20 via-accent/5 to-transparent',
  },
  {
    icon: Shield,
    title: 'Risk Controls',
    description: 'Set position limits, max drawdown, and automated stop-losses. Sleep well at night.',
    tag: 'Enterprise',
    gradient: 'from-purple-500/20 via-accent/5 to-transparent',
  },
  {
    icon: Link2,
    title: 'Multi-Broker Support',
    description: 'Connect Zerodha, Angel One, ICICI Direct, and 10+ brokers via single API.',
    tag: '10+ Brokers',
    gradient: 'from-cyan-500/20 via-accent/5 to-transparent',
  },
  {
    icon: Zap,
    title: 'Execution Engine',
    description: 'Ultra-low latency execution with smart order routing. Average 5ms order placement.',
    tag: '5ms Avg',
    gradient: 'from-yellow-500/20 via-accent/5 to-transparent',
  },
  {
    icon: BarChart3,
    title: 'Trade Analytics',
    description: 'Comprehensive analytics dashboard with P&L attribution, trade journals, and reports.',
    tag: 'Real-Time',
    gradient: 'from-rose-500/20 via-accent/5 to-transparent',
  },
  {
    icon: PieChart,
    title: 'Portfolio Monitoring',
    description: 'Real-time portfolio tracking across multiple brokers and strategies in one view.',
    tag: 'Unified View',
    gradient: 'from-orange-500/20 via-accent/5 to-transparent',
  },
  {
    icon: Bell,
    title: 'Real-Time Alerts',
    description: 'Webhook, email, SMS and Telegram alerts for strategy events and risk breaches.',
    tag: 'Multi-Channel',
    gradient: 'from-indigo-500/20 via-accent/5 to-transparent',
  },
  {
    icon: BrainCircuit,
    title: 'AI Insights',
    description: 'ML-powered market regime detection and strategy optimization recommendations.',
    tag: 'AI Powered',
    gradient: 'from-teal-500/20 via-accent/5 to-transparent',
  },
];

export function Features() {
  return (
    <Section id="features">
      <SectionHeader
        title="Everything You Need to Trade"
        subtitle="Professional tools designed for Indian algo traders. From strategy creation to live execution."
      />

      <Section3D variant="cubes" />

      <StaggerGrid className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <Card gradientBorder pop className="h-full flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <CardIcon><feature.icon size={20} /></CardIcon>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-accent/10 text-accent border border-accent/20 font-medium whitespace-nowrap shadow-sm shadow-accent/5">
                  {feature.tag}
                </span>
              </div>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription className="flex-1">{feature.description}</CardDescription>
              <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center gap-1 text-xs text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Learn more <ArrowUpRight size={12} />
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
