export default function SebiDisclaimer() {
  return (
    <article className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <div className="text-xs text-muted mb-4">June 15, 2026 · 4 min read</div>
        <h1 className="text-3xl font-bold text-white mb-6">Why We&apos;re Not SEBI Registered — And Why That&apos;s Fine</h1>

        <div className="prose prose-invert prose-sm max-w-none text-muted space-y-4">
          <p>If you&apos;ve been exploring algo trading platforms in India, you&apos;ve likely noticed that some platforms advertise SEBI registration. Here&apos;s the truth: SEBI registration is required for entities giving <em>investment advice</em>. We don&apos;t.</p>

          <h2 className="text-white text-lg font-semibold">What We Are</h2>
          <p>Trade Metrix is a <strong>software platform</strong>. We provide the tools to build, backtest, and deploy algorithmic strategies. Think of us as a code editor + execution engine — not a portfolio manager.</p>

          <h2 className="text-white text-lg font-semibold">What SEBI Registration Means</h2>
          <p>SEBI-registered entities (RIA, PMS, etc.) are legally allowed to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide personalized investment advice</li>
            <li>Manage portfolios on behalf of clients</li>
            <li>Give stock tips and recommendations</li>
          </ul>
          <p>We do none of these things. Our platform is a toolbox — you build your own strategies, you make your own decisions.</p>

          <h2 className="text-white text-lg font-semibold">The Advantage</h2>
          <p>Because we&apos;re not a registered advisor, we don&apos;t need to audit or restrict your strategies. You have full freedom to implement any logic, trade any instrument, and use any risk profile you choose. No compliance gatekeeping.</p>

          <h2 className="text-white text-lg font-semibold">The Responsibility</h2>
          <p>This freedom comes with responsibility. You are solely accountable for your trading decisions. Our software executes what you build — nothing more, nothing less. Always test thoroughly, start small, and never risk capital you can&apos;t afford to lose.</p>
        </div>
      </div>
    </article>
  );
}
