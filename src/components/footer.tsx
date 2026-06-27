'use client';

import { useState } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { Logo } from '@/src/components/logo';

const footerLinks = {
  Product: [
    { label: 'Features', href: '/#features' },
    { label: 'Pricing', href: '/#pricing' },
    { label: 'Strategies', href: '/#strategies' },
    { label: 'Integrations', href: '/integrations' },
  ],
  Learn: [
    { label: 'Blog', href: '/blog' },
    { label: 'Compare', href: '/compare' },
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api-docs' },
  ],
  Company: [
    { label: 'About', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: 'mailto:info@trademetrix.tech' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = ['Twitter', 'LinkedIn', 'GitHub', 'YouTube'];

export function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      if (res.ok) setStatus('success');
      else setStatus('error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-background">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-2">
            <Logo className="mb-4" />
            <p className="text-sm text-muted leading-relaxed max-w-xs mb-6">
              The modern algorithmic trading operating system for Indian traders.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-xs">
              <label className="text-[11px] text-muted font-medium mb-1.5 block">Subscribe to updates</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-3 py-2 text-xs bg-background border border-white/[0.08] rounded-xl text-white placeholder:text-muted/50 focus:outline-none focus:border-accent/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || status === 'success'}
                  className="px-3 py-2 text-xs font-medium bg-accent text-background rounded-xl hover:bg-accent-dark transition-colors disabled:opacity-50"
                >
                  {status === 'loading' ? <Loader2 size={12} className="animate-spin" /> :
                   status === 'success' ? '✓' : '→'}
                </button>
              </div>
              {status === 'success' && <p className="text-[10px] text-green-400 mt-1">Subscribed!</p>}
              {status === 'error' && <p className="text-[10px] text-red-400 mt-1">Failed. Try again.</p>}
            </form>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-muted hover:text-white transition-colors duration-200 inline-flex items-center gap-1 group/link"
                      >
                        {link.label}
                        <ArrowUpRight size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity -translate-y-0.5" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} Trade Metrix Tech. All rights reserved.
          </p>
          <p className="text-[11px] text-muted/50 text-center md:text-right max-w-md">
            Trade Metrix Tech is a software platform for algorithmic trading. We are NOT SEBI registered. We do NOT provide stock tips, buy/sell recommendations, or investment advisory. Nothing on this site constitutes financial or investment advice. Trade at your own risk.
          </p>
        </div>
      </div>
    </footer>
  );
}
