export default function ApiDocsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">API Reference</h1>
        <p className="text-muted text-sm mb-12">Programmatic access to your strategies, orders, and market data. All API endpoints are authenticated via API keys.</p>
        <div className="space-y-6">
          {[
            { method: 'GET', path: '/api/v1/strategies', desc: 'List all strategies with status, P&L, and configuration.' },
            { method: 'POST', path: '/api/v1/strategies', desc: 'Create a new strategy with indicators, entry/exit rules, and risk params.' },
            { method: 'GET', path: '/api/v1/strategies/:id', desc: 'Get detailed strategy info including live metrics and trade history.' },
            { method: 'PUT', path: '/api/v1/strategies/:id', desc: 'Update strategy configuration — indicators, rules, or risk settings.' },
            { method: 'DELETE', path: '/api/v1/strategies/:id', desc: 'Delete a strategy and stop all associated orders.' },
            { method: 'POST', path: '/api/v1/strategies/:id/deploy', desc: 'Deploy a strategy to live trading with optional paper-trade mode.' },
            { method: 'POST', path: '/api/v1/strategies/:id/stop', desc: 'Stop a running strategy and square off open positions.' },
            { method: 'GET', path: '/api/v1/orders', desc: 'List recent orders with status, fills, and timestamps.' },
          ].map((endpoint) => (
            <div key={endpoint.path} className="p-4 rounded-xl bg-card border border-white/[0.06] flex items-start gap-4">
              <span className={`text-[10px] font-bold px-2 py-1 rounded shrink-0 ${
                endpoint.method === 'GET' ? 'bg-green-500/10 text-green-400' :
                endpoint.method === 'POST' ? 'bg-blue-500/10 text-blue-400' :
                endpoint.method === 'PUT' ? 'bg-yellow-500/10 text-yellow-400' :
                'bg-red-500/10 text-red-400'
              }`}>{endpoint.method}</span>
              <div className="min-w-0">
                <code className="text-xs font-mono text-white">{endpoint.path}</code>
                <p className="text-[11px] text-muted mt-1">{endpoint.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
