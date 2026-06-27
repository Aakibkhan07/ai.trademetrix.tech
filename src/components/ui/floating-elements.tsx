'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, Zap, BarChart3, Shield } from 'lucide-react';

const badgeData = [
  { icon: TrendingUp, label: '+32.4% APR', color: 'text-accent-2', side: 'left' as const, top: '15%' },
  { icon: Zap, label: '5ms Execution', color: 'text-accent', side: 'right' as const, top: '37%' },
  { icon: BarChart3, label: '99.9% Uptime', color: 'text-accent-2', side: 'left' as const, top: '59%' },
  { icon: Shield, label: 'AES-256', color: 'text-accent', side: 'right' as const, top: '81%' },
];

export function FloatingBadges() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <div ref={ref} className="absolute inset-0 pointer-events-none overflow-hidden">
      {badgeData.map((badge, i) => {
        const x = useTransform(scrollYProgress, [0, 0.5, 1],
          badge.side === 'left' ? [-120, 0, -60] : [120, 0, 60]
        );
        const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

        return (
          <motion.div
            key={badge.label}
            style={{ x, opacity, top: badge.top, [badge.side]: '5%' }}
            className="absolute flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card/80 border border-white/[0.06] shadow-lg backdrop-blur-sm"
          >
            <badge.icon size={12} className={badge.color} />
            <span className="text-[10px] font-semibold text-white whitespace-nowrap">{badge.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

interface FloatingOrbProps {
  className?: string;
  size?: number;
  color?: string;
  speed?: number;
  delay?: number;
}

export function FloatingOrb({ className, size = 300, color = 'rgba(239,68,68,0.08)', speed = 6, delay = 0 }: FloatingOrbProps) {
  return (
    <motion.div
      className={className}
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color}, transparent 70%)`,
        filter: 'blur(80px)',
        pointerEvents: 'none',
      }}
      animate={{
        y: [0, -30, 0, 20, 0],
        x: [0, 15, -15, 10, 0],
        scale: [1, 1.05, 0.95, 1.02, 1],
      }}
      transition={{
        duration: speed,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}
