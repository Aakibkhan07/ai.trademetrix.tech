'use client';

import { useEffect, useRef } from 'react';

interface Candle {
  x: number;
  open: number;
  high: number;
  low: number;
  close: number;
  isUp: boolean;
}

export function CandlestickBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let candles: Candle[] = [];
    let price = 500;
    let animationId: number;
    let lastFrame = 0;
    const isLowEnd = window.matchMedia('(max-width: 767px), (prefers-reduced-motion: reduce)').matches || !window.matchMedia('(min-resolution: 1.5dppx)').matches;
    const targetFps = isLowEnd ? 15 : 30;
    const frameInterval = 1000 / targetFps;

    const barWidth = 4;
    const gap = 2;
    const step = barWidth + gap;

    function resize() {
      const cvs = canvasRef.current;
      if (!cvs || !ctx) return;
      const dpr = isLowEnd ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      cvs.width = window.innerWidth * dpr;
      cvs.height = window.innerHeight * dpr;
      cvs.style.width = window.innerWidth + 'px';
      cvs.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);

      const w = window.innerWidth;
      const needed = Math.ceil(w / step) + 10;
      while (candles.length < needed) {
        const change = (Math.random() - 0.48) * 20;
        const open = price;
        const close = price + change;
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;
        price = close;

        candles.push({
          x: candles.length * step,
          open,
          high,
          low,
          close,
          isUp: close >= open,
        });
      }
    }

    resize();
    window.addEventListener('resize', resize);

    const midY = () => window.innerHeight / 2;
    const scale = () => window.innerHeight / 120;

    function draw(now: number) {
      if (!ctx) return;
      const elapsed = now - lastFrame;
      if (elapsed < frameInterval) {
        animationId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now - (elapsed % frameInterval);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const my = midY();
      const s = scale();

      ctx.clearRect(0, 0, w, h);

      for (let i = candles.length - 1; i >= 0; i--) {
        const c = candles[i];
        const cx = c.x;
        const bodyTop = Math.max(c.open, c.close);
        const bodyBottom = Math.min(c.open, c.close);
        const bodyHeight = Math.max(Math.abs(c.close - c.open) * s, 1.5);
        const bodyY = my - (bodyTop * s);
        const highY = my - (c.high * s);
        const lowY = my - (c.low * s);

        ctx.globalAlpha = 0.12;
        ctx.strokeStyle = c.isUp ? '#22C55E' : '#EF4444';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(cx, highY);
        ctx.lineTo(cx, lowY);
        ctx.stroke();

        ctx.fillStyle = c.isUp ? '#22C55E' : '#EF4444';
        ctx.fillRect(cx - barWidth / 2, bodyY, barWidth, bodyHeight);
      }

      ctx.globalAlpha = 1;

      for (let i = 0; i < candles.length; i++) {
        candles[i].x -= 0.3;
      }

      const lastX = candles.length > 0 ? candles[candles.length - 1].x : 0;
      if (lastX < w + step) {
        const prev = candles[candles.length - 1];
        const change = (Math.random() - 0.48) * 20;
        const open = prev ? prev.close : price;
        const close = open + change;
        const high = Math.max(open, close) + Math.random() * 10;
        const low = Math.min(open, close) - Math.random() * 10;
        price = close;

        candles.push({
          x: lastX + step,
          open,
          high,
          low,
          close,
          isUp: close >= open,
        });
      }

      while (candles.length > 0 && candles[0].x < -step * 2) {
        candles.shift();
      }

      animationId = requestAnimationFrame(draw);
    }

    animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.7 }}
    />
  );
}
