'use client';

import { ModalProvider } from '@/src/components/modal-context';
import { Navbar } from '@/src/components/navbar';
import { Footer } from '@/src/components/footer';
import { PerformanceDashboard } from '@/src/components/performance-dashboard';
import { DepthDivider } from '@/src/components/ui/depth-divider';
import { CinematicReveal } from '@/src/components/ui/cinematic-wrapper';

export function PerformancePage() {
  return (
    <ModalProvider>
      <main className="min-h-screen bg-background relative">
        <div className="relative z-10">
          <Navbar />
          <div className="pt-24">
            <CinematicReveal>
              <PerformanceDashboard />
            </CinematicReveal>
          </div>
          <DepthDivider />
          <Footer />
        </div>
      </main>
    </ModalProvider>
  );
}
