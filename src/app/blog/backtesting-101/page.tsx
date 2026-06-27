export default function Backtesting101() {
  return (
    <article className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-xs text-muted mb-4">June 18, 2026 · 6 min read</div>
        <h1 className="text-3xl font-bold text-white mb-6">Backtesting 101: How to Validate Your Trading Strategy</h1>

        <div className="prose prose-invert prose-sm max-w-none text-muted space-y-4">
          <p>Backtesting is the process of simulating a trading strategy on historical data to evaluate its performance before risking real capital. It&apos;s the single most important step in algorithmic trading.</p>

          <h2 className="text-white text-lg font-semibold">Why Backtest?</h2>
          <p>A properly conducted backtest tells you:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Expected return and risk profile</li>
            <li>Maximum drawdown you might experience</li>
            <li>Win rate and profit factor</li>
            <li>How the strategy behaves in different market conditions</li>
          </ul>

          <h2 className="text-white text-lg font-semibold">Key Metrics</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Sharpe Ratio</strong> — risk-adjusted return (target &gt; 1.5)</li>
            <li><strong>Maximum Drawdown</strong> — worst peak-to-trough loss</li>
            <li><strong>Win Rate</strong> — percentage of profitable trades</li>
            <li><strong>Profit Factor</strong> — gross profit / gross loss (target &gt; 1.5)</li>
            <li><strong>Calmar Ratio</strong> — return / max drawdown</li>
          </ul>

          <h2 className="text-white text-lg font-semibold">Avoid These Mistakes</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Look-ahead bias: using future data in your signals</li>
            <li>In-sample overfitting: too many optimizations on the same data</li>
            <li>Ignoring transaction costs and slippage</li>
            <li>Testing on a single market regime (e.g., only bull markets)</li>
          </ul>

          <p>Trademetrix handles all of these automatically — our backtest engine accounts for slippage, brokerage, and supports walk-forward analysis.</p>
        </div>
      </div>
    </article>
  );
}
