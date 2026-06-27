export default function IntegrationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-white mb-6">Broker Integrations</h1>
        <p className="text-muted text-sm mb-12">Connect Trade Metrix Tech with your preferred broker. We support all major Indian brokers through REST API + WebSocket.</p>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { name: 'Zerodha', status: 'Live', type: 'REST + WebSocket' },
            { name: 'Angel One', status: 'Live', type: 'REST + WebSocket' },
            { name: 'ICICI Direct', status: 'Live', type: 'REST' },
            { name: 'Upstox', status: 'Live', type: 'REST + WebSocket' },
            { name: 'HDFC Securities', status: 'Live', type: 'REST' },
            { name: 'IIFL', status: 'Beta', type: 'REST' },
            { name: 'Kotak Securities', status: 'Beta', type: 'REST' },
            { name: 'Motilal Oswal', status: 'Coming Soon', type: '-' },
          ].map((b) => (
            <div key={b.name} className="flex items-center justify-between p-4 rounded-xl bg-card border border-white/[0.06]">
              <div>
                <div className="text-sm font-semibold text-white">{b.name}</div>
                <div className="text-[10px] text-muted">{b.type}</div>
              </div>
              <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                b.status === 'Live' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                b.status === 'Beta' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                'bg-white/[0.06] text-muted'
              }`}>{b.status}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
