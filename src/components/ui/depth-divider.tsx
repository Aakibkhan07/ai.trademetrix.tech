'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/src/lib/utils';

export function DepthDivider({ className }: { className?: string }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className={cn('relative h-24 md:h-32 overflow-hidden', className)}>
      <motion.div
        className="absolute top-1/2 left-[10%] right-[10%] h-px origin-center"
        style={{ scaleX, opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent-2/10 to-transparent blur-[2px]" />
      </motion.div>

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ opacity: useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]) }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_10px_rgba(239,68,68,0.5)]" />
      </motion.div>
    </div>
  );
}

export function SectionOrbBackground({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 pointer-events-none overflow-hidden', className)}>
      <motion.div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-[0.04]"
        style={{
          background: 'radial-gradient(circle, #EF4444, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          y: [0, -40, 0, 30, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full opacity-[0.03]"
        style={{
          background: 'radial-gradient(circle, #FFFFFF, transparent 70%)',
          filter: 'blur(60px)',
        }}
        animate={{
          y: [0, 30, 0, -20, 0],
          scale: [1, 0.9, 1.1, 0.95, 1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </div>
  );
}
