export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-white mb-6">About Trade Metrix Tech</h1>
        <div className="space-y-6 text-sm text-muted leading-relaxed">
          <p>Trade Metrix Tech is an algorithmic trading platform built for Indian retail traders, proprietary desks, and algo developers. We handle the infrastructure — broker connectivity, tick processing, order execution, and risk management — so you can focus on building strategies.</p>
          <p>The platform processes market data through broker WebSocket feeds, runs your strategy logic, and places orders back through broker REST APIs — all with average latency under 50ms.</p>
          <p>Founded in 2025, we are a small team of engineers and traders who believe automated trading should be accessible, transparent, and reliable.</p>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          {[
            { value: '₹120Cr+', label: 'Traded Volume' },
            { value: '1,200+', label: 'Active Traders' },
            { value: '99.8%', label: 'Platform Uptime' },
          ].map((s) => (
            <div key={s.label} className="p-5 rounded-xl bg-card border border-white/[0.06] text-center">
              <div className="text-xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-muted mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
