'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import for the chart to avoid SSR issues
const ChartInner = dynamic(() => import('./live-chart-inner'), { ssr: false });

interface LiveChartProps {
  height?: number;
  compact?: boolean;
  className?: string;
}

export function LiveChart({ height = 400, compact = false, className = '' }: LiveChartProps) {
  return (
    <div className={`relative ${className}`}>
      <ChartInner height={height} compact={compact} />
    </div>
  );
}
