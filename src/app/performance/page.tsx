import { PerformancePage } from './performance-client';

export const metadata = {
  title: 'Past Performance',
  description: 'Real-time performance metrics for all your trading strategies. Equity curve, trade distribution, and key metrics at a glance.',
};

export default function Performance() {
  return <PerformancePage />;
}
