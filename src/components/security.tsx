'use client';

import { Section, SectionHeader, StaggerGrid, StaggerItem } from './ui/section';
import { Card, CardIcon, CardTitle, CardDescription } from './ui/card';
import { Lock, Server, SlidersHorizontal, Database, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Lock,
    title: 'Bank-Grade Encryption',
    description: 'All data encrypted with AES-256. TLS 1.3 for all communications. SOC 2 Type II certified infrastructure.',
    badges: ['AES-256', 'TLS 1.3', 'SOC 2'],
  },
  {
    icon: Server,
    title: 'AWS Infrastructure',
    description: 'Multi-region deployment on AWS. Auto-scaling with 99.99% uptime SLA and real-time failover across zones.',
    badges: ['99.99% SLA', 'Multi-Region', 'Auto-Scale'],
  },
  {
    icon: SlidersHorizontal,
    title: 'Smart Risk Controls',
    description: 'Pre-trade risk checks, position limits, kill switches, and circuit breakers at every level of execution.',
    badges: ['Real-Time', 'Multi-Level', 'Automated'],
  },
  {
    icon: Database,
    title: 'Data Protection',
    description: 'Your data never leaves India. GDPR compliant. Regular third-party security audits and penetration testing.',
    badges: ['Data Localization', 'GDPR', 'Audited'],
  },
];

export function Security() {
  return (
    <Section id="security" className="bg-surface/30">
      <SectionHeader
        title="Built for Security"
        subtitle="Your capital and data are protected with institutional-grade security infrastructure."
      />

      <StaggerGrid className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {features.map((feature) => (
          <StaggerItem key={feature.title}>
            <Card gradientBorder pop className="h-full">
              <CardIcon><feature.icon size={20} /></CardIcon>
              <CardTitle>{feature.title}</CardTitle>
              <CardDescription>{feature.description}</CardDescription>
              <div className="flex flex-wrap gap-2 mt-4">
                {feature.badges.map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1 text-[10px] px-2 py-1 rounded-md bg-accent/10 text-accent border border-accent/20 shadow-sm shadow-accent/5">
                    <CheckCircle size={8} />
                    {badge}
                  </span>
                ))}
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
