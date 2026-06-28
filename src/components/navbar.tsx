'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import { useModal } from '@/src/components/modal-context';
import { Logo } from '@/src/components/logo';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Platform', href: '#platform' },
  { label: 'Strategies', href: '#strategies' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

interface NavbarProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export function Navbar({ onOpenAuth }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ctx = typeof onOpenAuth === 'undefined' ? useModal() : null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 md:h-20">
          <Logo />

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm text-muted hover:text-white rounded-lg hover:bg-white/[0.04] transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" onClick={() => { if (onOpenAuth) onOpenAuth('login'); else { ctx?.setAuthMode('login'); ctx?.openModal('auth'); } }}>Log In</Button>
            <Button variant="primary" size="sm" onClick={() => { if (onOpenAuth) onOpenAuth('signup'); else { ctx?.setAuthMode('signup'); ctx?.openModal('auth'); } }}>Get Started</Button>
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-muted hover:text-white rounded-lg hover:bg-white/[0.04] transition-all"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-white/[0.06] bg-background/95 backdrop-blur-xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-sm text-muted hover:text-white rounded-xl hover:bg-white/[0.04] transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-6 mt-2 border-t border-white/[0.06]">
                <Button variant="ghost" size="md" className="w-full" onClick={() => { if (onOpenAuth) { onOpenAuth('login'); } else { ctx?.setAuthMode('login'); ctx?.openModal('auth'); } setMobileOpen(false); }}>Log In</Button>
                <Button variant="primary" size="md" className="w-full" onClick={() => { if (onOpenAuth) { onOpenAuth('signup'); } else { ctx?.setAuthMode('signup'); ctx?.openModal('auth'); } setMobileOpen(false); }}>Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
