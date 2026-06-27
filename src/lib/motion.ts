import { Variants, Transition } from 'framer-motion';

export const easeOutExpo: Transition = {
  duration: 0.8,
  ease: [0.19, 1, 0.22, 1],
};

export const easeOutCubic: Transition = {
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
};

export const springGentle: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
};

export const springBouncy: Transition = {
  type: 'spring',
  stiffness: 300,
  damping: 15,
};

export const fadeSlideUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.19, 1, 0.22, 1] },
  },
};

export const fadeSlideUpStagger: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.19, 1, 0.22, 1],
      delay: i * 0.1,
    },
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
  visible: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.19, 1, 0.22, 1] },
  },
};

export const clipReveal: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 1.2, ease: [0.19, 1, 0.22, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const card3DTilt = (mouseX: number, mouseY: number, centerX: number, centerY: number) => ({
  rotateX: ((mouseY - centerY) / centerY) * -6,
  rotateY: ((mouseX - centerX) / centerX) * 6,
  scale: 1.02,
  z: 20,
});
