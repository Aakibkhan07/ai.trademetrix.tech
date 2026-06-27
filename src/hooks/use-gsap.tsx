'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(ref: React.RefObject<HTMLElement | null>, options: {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  scrub?: boolean | number;
  markers?: boolean;
  start?: string;
  end?: string;
} = {}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      options.from || { opacity: 0, y: 60 },
      {
        ...options.to,
        scrollTrigger: {
          trigger: el,
          start: options.start || 'top 85%',
          end: options.end || 'top 20%',
          scrub: options.scrub ?? false,
          markers: options.markers,
        },
      }
    );

    return () => {
      tween.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ref, options]);
}

export function useGsapTimeline(ref: React.RefObject<HTMLElement | null>, config: {
  triggers?: { start?: string; end?: string; scrub?: boolean | number };
  animations: gsap.TweenVars[];
}) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: config.triggers?.start || 'top 85%',
        end: config.triggers?.end || 'top 20%',
        scrub: config.triggers?.scrub ?? true,
      },
    });

    config.animations.forEach((anim) => {
      tl.to(el, anim);
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [ref, config]);
}

export function ParallaxSection({ children, speed = 0.5, className = '' }: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.to(el, {
      y: () => el.offsetHeight * speed * 0.3,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [speed]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
