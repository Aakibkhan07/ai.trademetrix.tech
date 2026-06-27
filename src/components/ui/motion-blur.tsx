'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function MotionBlurTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)' }}
      animate={{ opacity: 1, filter: 'blur(0px)' }}
      exit={{ opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}
