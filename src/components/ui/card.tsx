'use client';

import { motion } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/src/lib/utils';
import { useTilt } from '@/src/hooks/use-tilt';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
  gradientBorder?: boolean;
  noPadding?: boolean;
  pop?: boolean;
}

export function Card({
  children,
  className,
  hover = true,
  glow = false,
  gradientBorder = false,
  noPadding = false,
  pop = false,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const tilt = useTilt(8);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || !hover) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePos({ x, y });
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => card.removeEventListener('mousemove', handleMouseMove);
  }, [hover]);

  return (
    <motion.div
      ref={tilt.ref}
      onMouseMove={pop ? tilt.handleMouseMove : undefined}
      onMouseLeave={pop ? tilt.handleMouseLeave : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={hover ? (pop ? { scale: 1.02 } : { y: -8, scale: 1.01 }) : {}}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn(
        'group relative rounded-2xl overflow-hidden card-depth transition-all duration-500',
        gradientBorder
          ? 'card-border-accent'
          : 'border border-white/[0.06] bg-card',
        !gradientBorder && 'bg-card',
        hover && (pop ? 'card-pop-glow' : 'hover-lift'),
        glow && 'glow-accent',
        !noPadding && 'p-6',
        className
      )}
      style={
        pop && isHovered
          ? {
              transform: `perspective(800px) rotateX(${(mousePos.y - 50) * -0.06}deg) rotateY(${(mousePos.x - 50) * 0.06}deg) translateZ(15px)`,
            }
          : {}
      }
    >
      {hover && (
        <div
          className="spotlight pointer-events-none"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(239, 68, 68, 0.12), transparent 40%)`,
          }}
        />
      )}
      <div className="relative z-10" style={pop ? { transformStyle: 'preserve-3d' } : {}}>
        {children}
      </div>
    </motion.div>
  );
}

export function CardIcon({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-accent/20 to-accent/5 text-accent mb-4 ring-1 ring-accent/20 group-hover:ring-accent/30 group-hover:from-accent/25 group-hover:to-accent/10 transition-all duration-300 shadow-sm shadow-accent/10',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h3
      className={cn(
        'text-lg font-semibold text-white group-hover:text-accent transition-colors duration-300',
        className
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-sm text-muted leading-relaxed',
        className
      )}
    >
      {children}
    </p>
  );
}
