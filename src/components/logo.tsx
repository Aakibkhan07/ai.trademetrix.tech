'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const particles = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: Math.cos((i / 12) * Math.PI * 2) * 32,
  y: Math.sin((i / 12) * Math.PI * 2) * 18,
  r: 1.5 + Math.random() * 1.5,
  delay: Math.random() * 2,
}));

const tJump = {
  duration: 4.5,
  repeat: Infinity,
  ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
  times: [0, 0.28, 0.44, 0.56, 0.72, 1],
};

export function Logo({ className = 'h-8 w-auto' }: { className?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [mouseInside, setMouseInside] = useState(false);

  const rotateX = useSpring(0, { stiffness: 150, damping: 15 });
  const rotateY = useSpring(0, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      rotateX.set(-dy * 12);
      rotateY.set(dx * 12);
    };

    const handleEnter = () => setMouseInside(true);
    const handleLeave = () => {
      setMouseInside(false);
      rotateX.set(0);
      rotateY.set(0);
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseenter', handleEnter);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseenter', handleEnter);
      el.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <motion.a
      ref={ref}
      href="/"
      className={`flex items-center gap-2.5 group relative ${className}`}
      style={{ perspective: 600 }}
    >
      <motion.div
        className="relative shrink-0"
        style={{ rotateX, rotateY }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="68"
          height="44"
          viewBox="0 0 68 44"
          fill="none"
        >
          {/* Ambient glow */}
          <motion.ellipse
            cx="34" cy="22" rx="22" ry="13"
            fill="#EF4444" opacity="0"
            variants={{
              rest: { opacity: 0, scale: 0.85 },
              hover: { opacity: 0.08, scale: 1.05 },
            }}
            transition={{ duration: 0.5 }}
          />
          <motion.ellipse
            cx="34" cy="22" rx="28" ry="18"
            fill="none" stroke="#EF4444" strokeWidth="0.5" opacity="0"
            variants={{
              rest: { opacity: 0, scale: 0.8 },
              hover: { opacity: 0.15, scale: 1.15 },
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          />

          {/* Expanding ring on hover */}
          {mouseInside && (
            <motion.ellipse
              cx="34" cy="22" rx="15" ry="9"
              fill="none" stroke="#EF4444" strokeWidth="1"
              initial={{ opacity: 0.4, scale: 0.8 }}
              animate={{ opacity: 0, scale: 1.8 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeOut' }}
            />
          )}

          {/* Orbiting particles */}
          {mouseInside && particles.map((p) => (
            <motion.circle
              key={p.id}
              cx={34} cy={22}
              r={p.r}
              fill="#EF4444" opacity="0"
              animate={{
                opacity: [0, 0.6, 0],
                x: [p.x * 0.3, p.x, p.x * 0.3],
                y: [p.y * 0.3, p.y, p.y * 0.3],
              }}
              transition={{
                duration: 2,
                delay: p.delay,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* M — stays in center */}
          <motion.line x1="26" y1="8" x2="26" y2="36" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <motion.line x1="26" y1="8" x2="32" y2="36" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <motion.line x1="38" y1="8" x2="32" y2="36" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <motion.line x1="38" y1="8" x2="38" y2="36" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* Left T — arc + spin + stretch over to right */}
          <g transform="translate(11, 22)">
            <motion.g
              animate={{
                x: [0, 0, 42, 42, 0, 0],
                y: [0, 0, -22, -22, 0, 0],
                rotate: [0, 0, 360, 360, 0, 0],
                scaleY: [1, 0.7, 1.5, 1.5, 0.7, 1],
                scaleX: [1, 1.15, 0.8, 0.8, 1.15, 1],
              }}
              transition={tJump}
            >
              <line x1="-7" y1="-14" x2="7" y2="-14" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          </g>

          {/* Right T — arc + spin + stretch over to left */}
          <g transform="translate(53, 22)">
            <motion.g
              animate={{
                x: [0, 0, -42, -42, 0, 0],
                y: [0, 0, -22, -22, 0, 0],
                rotate: [0, 0, -360, -360, 0, 0],
                scaleY: [1, 0.7, 1.5, 1.5, 0.7, 1],
                scaleX: [1, 1.15, 0.8, 0.8, 1.15, 1],
              }}
              transition={tJump}
            >
              <line x1="-7" y1="-14" x2="7" y2="-14" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
              <line x1="0" y1="-14" x2="0" y2="14" stroke="#EF4444" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.g>
          </g>
        </svg>
      </motion.div>

      <motion.div
        className="flex items-center"
        animate={mouseInside ? { y: -1 } : { y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      >
        <span className="text-base font-bold text-[#EF4444] tracking-[-0.3px]">Trade</span>
        <span className="text-base font-bold text-white tracking-[-0.3px]">Metrix</span>
        <span className="text-base font-bold text-[#EF4444] tracking-[-0.3px]">Tech</span>
      </motion.div>
    </motion.a>
  );
}
