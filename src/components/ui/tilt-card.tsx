'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  perspective?: number;
}

export function TiltCard({ children, className, scale = 1.02, perspective = 1000 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [glow, setGlow] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMouse = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = (e.clientX - centerX) / (rect.width / 2);
      const mouseY = (e.clientY - centerY) / (rect.height / 2);

      setTilt({ x: -mouseY * 8, y: mouseX * 8 });
      setGlow({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };

    const handleLeave = () => {
      setTilt({ x: 0, y: 0 });
      setGlow({ x: 50, y: 50 });
    };

    el.addEventListener('mousemove', handleMouse);
    el.addEventListener('mouseleave', handleLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouse);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: tilt.x !== 0 || tilt.y !== 0 ? scale : 1,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ perspective }}
      className={cn('tilt-card relative', className)}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(129, 140, 248, 0.08), transparent 50%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
