'use client';

import { useEffect, useRef } from 'react';
import { createChart, ColorType, CandlestickSeries, LineSeries } from 'lightweight-charts';

function generateCandleData(count: number) {
  let price = 24500;
  const data: any[] = [];
  const now = Math.floor(Date.now() / 1000);

  for (let i = 0; i < count; i++) {
    const change = (Math.random() - 0.48) * 100;
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + Math.random() * 50;
    const low = Math.min(open, close) - Math.random() * 50;
    price = close;

    data.push({
      time: (now - (count - i) * 300) as any,
      open,
      high,
      low,
      close,
    });
  }

  return data;
}

function generateVolumeData(count: number) {
  const data: any[] = [];
  const now = Math.floor(Date.now() / 1000);

  for (let i = 0; i < count; i++) {
    data.push({
      time: (now - (count - i) * 300) as any,
      value: Math.random() * 1000 + 500,
    });
  }

  return data;
}

export default function LiveChartInner({
  height = 400,
  compact = false,
}: {
  height?: number;
  compact?: boolean;
}) {
  const chartRef = useRef<HTMLDivElement>(null);
  const candleRef = useRef<any>(null);
  const volumeRef = useRef<any>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: 'transparent' },
        textColor: '#94A3B8',
        fontSize: 10,
      },
      grid: {
        vertLines: { color: 'rgba(255,255,255,0.03)' },
        horzLines: { color: 'rgba(255,255,255,0.03)' },
      },
      crosshair: {
        mode: 0,
        vertLine: { color: 'rgba(255,255,255,0.3)', style: 2, width: 1, labelBackgroundColor: '#EF4444' },
        horzLine: { color: 'rgba(255,255,255,0.3)', style: 2, width: 1, labelBackgroundColor: '#EF4444' },
      },
      width: chartRef.current.clientWidth,
      height: compact ? 250 : height,
      rightPriceScale: {
        borderColor: 'rgba(255,255,255,0.05)',
        scaleMargins: { top: 0.05, bottom: 0.2 },
      },
      timeScale: {
        borderColor: 'rgba(255,255,255,0.05)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candles = chart.addSeries(CandlestickSeries, {
      upColor: '#22C55E',
      downColor: '#EF4444',
      borderDownColor: '#EF4444',
      borderUpColor: '#22C55E',
      wickDownColor: '#EF4444',
      wickUpColor: '#22C55E',
    });

    const volumes = chart.addSeries(LineSeries, {
      color: 'rgba(34,197,94,0.15)',
      lineWidth: 1,
      priceFormat: { type: 'volume' } as any,
      priceScaleId: 'volume',
    });

    (chart as any).priceScale('volume').applyOptions({
      scaleMargins: { top: 0.8, bottom: 0 },
    });

    const data = generateCandleData(compact ? 50 : 200);
    const volData = generateVolumeData(compact ? 50 : 200);

    candles.setData(data);
    volumes.setData(volData);

    candleRef.current = candles;
    volumeRef.current = volumes;

    (chart as any).timeScale().fitContent();

    const handleResize = () => {
      if (chartRef.current) {
        (chart as any).applyOptions({ width: chartRef.current.clientWidth });
      }
    };

    window.addEventListener('resize', handleResize);

    const interval = setInterval(() => {
      if (!candleRef.current || !volumeRef.current) return;
      const lastCandle = candleRef.current.dataByIndex(-1) as any;
      if (!lastCandle) return;

      const change = (Math.random() - 0.48) * 30;
      const open = lastCandle.close;
      const close = open + change;
      const high = Math.max(open, close) + Math.random() * 15;
      const low = Math.min(open, close) - Math.random() * 15;

      candleRef.current.update({
        time: lastCandle.time + 300,
        open,
        high,
        low,
        close,
      });

      volumeRef.current.update({
        time: lastCandle.time + 300,
        value: Math.random() * 500 + 200,
      });
    }, 2000);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
      chart.remove();
    };
  }, [height, compact]);

  return (
    <div
      ref={chartRef}
      style={{ height: compact ? 250 : height, width: '100%' }}
    />
  );
}
