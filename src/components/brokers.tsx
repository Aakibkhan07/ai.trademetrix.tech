'use client';

import { Section, SectionHeader, StaggerGrid, StaggerItem } from './ui/section';
import { Card, CardTitle } from './ui/card';
import { Check, Zap, Globe, Clock } from 'lucide-react';

const brokers = [
  { name: 'Zerodha', status: 'Connected', speed: '< 5ms', type: 'Full API' },
  { name: 'Angel One', status: 'Connected', speed: '< 8ms', type: 'Full API' },
  { name: 'ICICI Direct', status: 'Connected', speed: '< 10ms', type: 'Full API' },
  { name: 'HDFC Securities', status: 'Connected', speed: '< 10ms', type: 'Full API' },
  { name: 'Kotak Securities', status: 'Connected', speed: '< 8ms', type: 'Full API' },
  { name: 'IIFL', status: 'Connected', speed: '< 12ms', type: 'Full API' },
  { name: 'Motilal Oswal', status: 'Coming Soon', speed: '-', type: 'Full API' },
  { name: 'Groww', status: 'Coming Soon', speed: '-', type: 'Read Only' },
  { name: 'Upstox', status: 'Connected', speed: '< 5ms', type: 'Full API' },
  { name: '5paisa', status: 'Connected', speed: '< 8ms', type: 'Full API' },
  { name: 'Alice Blue', status: 'Coming Soon', speed: '-', type: 'Full API' },
  { name: 'Shoonya', status: 'Connected', speed: '< 6ms', type: 'Full API' },
];

export function Brokers() {
  return (
    <Section id="brokers">
      <SectionHeader
        title="Connect Your Broker in Seconds"
        subtitle="Seamless integration with all major Indian stock brokers. One API to rule them all."
      />

      <StaggerGrid className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {brokers.map((broker) => (
          <StaggerItem key={broker.name}>
            <Card hover pop className="!p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center flex-shrink-0 ring-1 ring-accent/20 shadow-sm shadow-accent/10">
                  <span className="text-accent font-bold text-sm">{broker.name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <CardTitle className="text-sm mb-0">{broker.name}</CardTitle>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted">{broker.type}</span>
                    {broker.speed !== '-' && (
                      <span className="text-[10px] text-accent flex items-center gap-0.5">
                        <Zap size={8} /> {broker.speed}
                      </span>
                    )}
                  </div>
                </div>
                <div className={`flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full whitespace-nowrap font-medium shadow-sm ${
                  broker.status === 'Connected'
                    ? 'text-accent bg-accent/10 border border-accent/20 shadow-accent/5'
                    : 'text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 shadow-yellow-400/5'
                }`}>
                  <Check size={8} />
                  {broker.status}
                </div>
              </div>
            </Card>
          </StaggerItem>
        ))}
      </StaggerGrid>
    </Section>
  );
}
