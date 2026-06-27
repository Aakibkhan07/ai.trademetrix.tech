import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Analytics } from '@/src/components/analytics';
import { CookieBanner } from '@/src/components/cookie-banner';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Trade Metrix — Modern Algo Trading Platform for Indian Traders',
    template: '%s — Trade Metrix',
  },
  description:
    'Build, test and automate trading strategies with Trade Metrix. The modern algorithmic trading operating system for Indian traders. Connect multiple brokers, backtest strategies, and deploy with one click.',
  keywords: [
    'algo trading',
    'algorithmic trading',
    'automated trading',
    'trading platform',
    'Indian stock market',
    'strategy builder',
    'backtesting',
    'Zerodha API',
    'trading bot',
    'NSE',
    'BSE',
  ],
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'Trade Metrix — Modern Algo Trading Platform',
    description:
      'Build, test and automate trading strategies from a single platform. The modern algorithmic trading OS for Indian traders.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Trade Metrix',
    url: 'https://app.trademetrix.tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trade Metrix — Modern Algo Trading Platform',
    description:
      'Build, test and automate trading strategies from a single platform.',
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'finance',
  applicationName: 'Trade Metrix',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'SoftwareApplication',
              name: 'Trade Metrix',
              applicationCategory: 'FinanceApplication',
              operatingSystem: 'Web',
              description:
                'Modern algorithmic trading operating system for Indian traders. Build, test and automate trading strategies.',
              offers: {
                '@type': 'AggregateOffer',
                priceCurrency: 'INR',
                offerCount: '3',
              },
              featureList:
                'Strategy Builder, Backtesting, Risk Controls, Multi-Broker Support, Execution Engine, Trade Analytics',
            }),
          }}
        />
      </head>
      <body className="antialiased">
        <div className="relative z-[100] bg-accent/5 border-b border-accent/10 px-4 py-2 text-center">
          <p className="text-[10px] sm:text-[11px] text-muted leading-relaxed">
            <span className="font-semibold text-accent">⚠ Disclaimer:</span> Trade Metrix Tech is a software platform — NOT a SEBI-registered advisor or research analyst. We do NOT provide stock tips, buy/sell calls, or investment advice. Past backtest results do not guarantee future performance. Trade at your own risk.
          </p>
        </div>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
