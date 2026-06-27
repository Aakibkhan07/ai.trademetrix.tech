'use client';

import { useState, useEffect } from 'react';

export function CookieBanner() {
  const [accepted, setAccepted] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cookies-accepted');
    if (!stored) setAccepted(false);
  }, []);

  const accept = () => {
    localStorage.setItem('cookies-accepted', 'true');
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[300] w-[calc(100%-32px)] max-w-md">
      <div className="bg-card border border-white/[0.08] rounded-2xl shadow-2xl p-4 flex items-center gap-3">
        <p className="text-xs text-muted flex-1">
          We use essential cookies. No tracking without consent.{' '}
          <a href="/privacy" className="text-accent hover:underline">Learn more</a>.
        </p>
        <button
          onClick={accept}
          className="px-4 py-1.5 text-xs font-medium bg-accent text-background rounded-lg hover:bg-accent-dark transition-colors shrink-0"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
