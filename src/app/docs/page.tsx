export default function DocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">Documentation</h1>
        <p className="text-muted text-sm mb-12">Everything you need to build and deploy algorithmic trading strategies on Trade Metrix Tech.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { title: 'Getting Started', desc: 'Set up your account, connect a broker, and deploy your first strategy in 10 minutes.', icon: '→' },
            { title: 'Strategy Builder', desc: 'Visual and Python-based strategy creation with 50+ built-in indicators.', icon: '→' },
            { title: 'Indicator Reference', desc: 'Complete list of technical indicators with formulas, parameters, and usage.', icon: '→' },
            { title: 'Backtesting Guide', desc: 'How to run historical simulations, interpret results, and optimize parameters.', icon: '→' },
            { title: 'Risk Management', desc: 'Configure drawdown limits, position sizing, exposure caps, and kill switches.', icon: '→' },
            { title: 'Broker Setup', desc: 'Step-by-step guides for connecting each supported broker to your account.', icon: '→' },
          ].map((item) => (
            <div key={item.title} className="p-5 rounded-xl bg-card border border-white/[0.06] hover:border-accent/20 transition-colors cursor-default">
              <div className="text-sm font-semibold text-white mb-1">{item.title}</div>
              <div className="text-[11px] text-muted leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
