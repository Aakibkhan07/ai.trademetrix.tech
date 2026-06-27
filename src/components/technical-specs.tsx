'use client';

import { motion } from 'framer-motion';
import { Section, SectionHeader, FadeIn } from './ui/section';
import { Zap, Server, Globe, Gauge, Clock, Wifi, ShieldCheck, Database, Cpu, Network } from 'lucide-react';

const specs = [
  {
    category: 'Execution',
    icon: Zap,
    color: '#EF4444',
    items: [
      { label: 'Avg Order Placement', value: '< 5ms' },
      { label: 'Smart Order Routing', value: 'Enabled' },
      { label: 'Partial Fill Handling', value: 'Automated' },
      { label: 'Order Types', value: 'MKT/LMT/SL-M/SL-L' },
      { label: 'Max Orders/sec', value: '500' },
    ],
  },
  {
    category: 'Infrastructure',
    icon: Server,
    color: '#EF4444',
    items: [
      { label: 'Cloud Provider', value: 'AWS Mumbai' },
      { label: 'Uptime SLA', value: '99.99%' },
      { label: 'Auto-Scaling', value: 'Multi-Region' },
      { label: 'Disaster Recovery', value: 'Real-Time Failover' },
      { label: 'Data Centers', value: '3 Availability Zones' },
    ],
  },
  {
    category: 'Connectivity',
    icon: Network,
    color: '#F59E0B',
    items: [
      { label: 'Broker APIs', value: 'REST + WebSocket' },
      { label: 'Exchange Feeds', value: 'NSE/BSE/MCX' },
      { label: 'Data Latency', value: '< 50ms tick-to-chart' },
      { label: 'API Rate Limit', value: '100 req/sec' },
      { label: 'WebSocket', value: 'Full-Depth Stream' },
    ],
  },
  {
    category: 'Security',
    icon: ShieldCheck,
    color: '#A78BFA',
    items: [
      { label: 'Encryption', value: 'AES-256 at rest' },
      { label: 'Data in Transit', value: 'TLS 1.3' },
      { label: 'API Key Storage', value: 'HSM-backed vault' },
      { label: '2FA', value: 'TOTP/Security Key' },
      { label: 'Audit Logs', value: 'Immutable, 7-year' },
    ],
  },
  {
    category: 'Backtesting',
    icon: Database,
    color: '#34D399',
    items: [
      { label: 'Historical Data', value: '15+ Years' },
      { label: 'Tick Data', value: 'NSE/BSE Full Tick' },
      { label: 'Max Backtest Period', value: '5 Years (Pro)' },
      { label: 'Optimization Engine', value: 'Genetic Algorithm' },
      { label: 'Walk-Forward', value: 'Automated' },
    ],
  },
];

export function TechnicalSpecs() {
  return (
    <Section id="specs">
      <SectionHeader
        title="Technical Specifications"
        subtitle="Built for performance. From sub-millisecond execution to bank-grade security."
      />

      <FadeIn className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {specs.map((spec) => (
            <div
              key={spec.category}
              className="rounded-2xl border border-white/[0.06] bg-card p-5 card-depth hover:border-white/15 transition-all duration-300"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: spec.color + '15' }}
                >
                  <spec.icon size={15} style={{ color: spec.color }} />
                </div>
                <span className="text-sm font-semibold text-white">{spec.category}</span>
              </div>

              <ul className="space-y-2.5">
                {spec.items.map((item) => (
                  <li key={item.label} className="flex items-center justify-between text-[11px]">
                    <span className="text-muted">{item.label}</span>
                    <span className="text-white/90 font-medium text-right ml-2">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </FadeIn>
    </Section>
  );
}
