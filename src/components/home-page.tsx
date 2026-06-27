'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ModalProvider } from '@/src/components/modal-context';
import { DemoModal } from '@/src/components/demo-modal';
import { AuthModal } from '@/src/components/auth-modal';
import { ErrorBoundary } from '@/src/components/error-boundary';
import { ScrollProgress } from '@/src/components/ui/scroll-progress';
import { DepthDivider } from '@/src/components/ui/depth-divider';
import { CinematicReveal } from '@/src/components/ui/cinematic-wrapper';
import { Navbar } from '@/src/components/navbar';
import { MarketTicker } from '@/src/components/market-ticker';
import { Hero } from '@/src/components/hero';
import { WhyTradeMetrix } from '@/src/components/why-trademetrix';
import { PlatformPreview } from '@/src/components/platform-preview';
import { Features } from '@/src/components/features';
import { StrategyDeepDive } from '@/src/components/strategy-deep-dive';
import { TechnicalSpecs } from '@/src/components/technical-specs';
import { HowItWorks } from '@/src/components/how-it-works';
import { Testimonials } from '@/src/components/testimonials';
import { StrategyMarketplace } from '@/src/components/strategy-marketplace';
import { PerformanceDashboard } from '@/src/components/performance-dashboard';
import { Brokers } from '@/src/components/brokers';
import { Security } from '@/src/components/security';
import { Pricing } from '@/src/components/pricing';
import { FAQ } from '@/src/components/faq';
import { CtaSection } from '@/src/components/cta-section';
import { Footer } from '@/src/components/footer';

const TradingSceneClient = dynamic(
  () => import('@/src/components/three/trading-scene-client').then((mod) => mod.TradingSceneClient),
  { ssr: false }
);

const CandlestickBackgroundClient = dynamic(
  () => import('@/src/components/candlestick-background-client').then((mod) => mod.CandlestickBackgroundClient),
  { ssr: false }
);

export function HomePage() {
  const scrollY = useRef(0);
  const [deferred, setDeferred] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const mq = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);

    const timer = setTimeout(() => setDeferred(true), 1500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      mq.removeEventListener('change', handler);
      clearTimeout(timer);
    };
  }, []);

  return (
    <ModalProvider>
      <main className="min-h-screen bg-background relative">
        <ScrollProgress />
        {deferred && <CandlestickBackgroundClient />}
        {deferred && isDesktop && <TradingSceneClient scrollY={scrollY} />}
        <DemoModal />
        <AuthModal />
        <div className="relative z-10">
          <ErrorBoundary>
            <Navbar />
            <MarketTicker />
            <Hero />
            <DepthDivider />
            <CinematicReveal><WhyTradeMetrix /></CinematicReveal>
            <DepthDivider />
            <CinematicReveal><PlatformPreview /></CinematicReveal>
            <DepthDivider />
            <Features />
            <DepthDivider />
            <CinematicReveal><StrategyDeepDive /></CinematicReveal>
            <DepthDivider />
            <CinematicReveal><TechnicalSpecs /></CinematicReveal>
            <DepthDivider />
            <HowItWorks />
            <DepthDivider />
            <CinematicReveal><Testimonials /></CinematicReveal>
            <DepthDivider />
            <CinematicReveal><StrategyMarketplace /></CinematicReveal>
            <DepthDivider />
            <CinematicReveal><PerformanceDashboard /></CinematicReveal>
            <DepthDivider />
            <Brokers />
            <DepthDivider />
            <CinematicReveal><Security /></CinematicReveal>
            <DepthDivider />
            <Pricing />
            <DepthDivider />
            <FAQ />
            <DepthDivider />
            <CtaSection />
            <Footer />
          </ErrorBoundary>
        </div>
      </main>
    </ModalProvider>
  );
}
