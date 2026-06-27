'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/src/lib/utils';

interface TextRevealProps {
  children: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: 'words' | 'chars';
  once?: boolean;
}

export function TextReveal({
  children,
  as: Tag = 'p',
  className,
  delay = 0,
  stagger = 0.04,
  mode = 'words',
  once = true,
}: TextRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  if (mode === 'chars') {
    const chars = children.split('').map((char, i) => ({ char, i }));
    return (
      <Tag ref={ref} className={cn('inline', className)}>
        {chars.map(({ char, i }) => (
          <span key={i} className="inline-block overflow-hidden">
            <motion.span
              className="inline-block"
              initial={{ y: '100%', rotateX: -90 }}
              animate={isInView ? { y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.7,
                ease: [0.19, 1, 0.22, 1],
                delay: delay + i * stagger,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          </span>
        ))}
      </Tag>
    );
  }

  const words = children.split(' ').map((word, i) => ({ word, i }));

  return (
    <Tag ref={ref} className={cn('inline', className)}>
      {words.map(({ word, i }) => (
        <span key={i} className="inline-block overflow-hidden pb-1">
          <motion.span
            className="inline-block"
            initial={{ y: '120%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.8,
              ease: [0.19, 1, 0.22, 1],
              delay: delay + i * stagger,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  );
}

interface ClipRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function ClipReveal({
  children,
  className,
  delay = 0,
  once = true,
}: ClipRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-80px' });

  return (
    <div ref={ref} className={cn('overflow-hidden', className)}>
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1], delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}
