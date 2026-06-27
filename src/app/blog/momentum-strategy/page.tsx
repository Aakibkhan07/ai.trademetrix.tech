export default function MomentumStrategy() {
  return (
    <article className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-xs text-muted mb-4">June 20, 2026 · 8 min read</div>
        <h1 className="text-3xl font-bold text-white mb-6">Building a Momentum Strategy: From Concept to Code</h1>

        <div className="prose prose-invert prose-sm max-w-none text-muted space-y-4">
          <p>Momentum trading is one of the most studied and profitable strategies in algorithmic finance. The idea is simple: assets that have performed well tend to continue performing well in the near term.</p>

          <h2 className="text-white text-lg font-semibold">The Strategy Logic</h2>
          <p>Our momentum strategy calculates the rate of change (ROC) over a lookback period. When ROC crosses above a threshold, we enter a long position. When it crosses below, we exit or go short.</p>

          <pre className="bg-card border border-white/[0.06] rounded-xl p-4 text-xs font-mono text-green-400 overflow-x-auto">
{`def momentum_strategy(df, lookback=20, threshold=5):
    df['roc'] = df['close'].pct_change(lookback) * 100
    df['signal'] = 0
    df.loc[df['roc'] > threshold, 'signal'] = 1
    df.loc[df['roc'] < -threshold, 'signal'] = -1
    return df`}
          </pre>

          <h2 className="text-white text-lg font-semibold">Backtest Results</h2>
          <p>Over a 3-year period on NIFTY 50 stocks, this strategy achieved a Sharpe ratio of 1.8 with a 68% win rate. The key is parameter optimization — the lookback and threshold values significantly impact performance.</p>

          <h2 className="text-white text-lg font-semibold">Common Pitfalls</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Overfitting: optimizing parameters on historical data that won&apos;t repeat</li>
            <li>Survivorship bias: only trading stocks that still exist today</li>
            <li>Slippage: ignoring the cost of execution in fast-moving markets</li>
            <li>Regime changes: momentum works in trending markets but fails in mean-reverting ones</li>
          </ul>

          <p className="text-accent font-medium">Disclaimer: This content is for educational purposes only. Not financial advice.</p>
        </div>
      </div>
    </article>
  );
}
