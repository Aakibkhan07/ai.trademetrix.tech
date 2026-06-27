export default function PressPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">Press</h1>
        <p className="text-muted text-sm mb-12">Press kit, media assets, and brand guidelines for Trade Metrix Tech.</p>
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-card border border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white mb-2">Brand Assets</h2>
            <p className="text-xs text-muted mb-3">Download our logo, brand guidelines, and product screenshots for media use.</p>
            <div className="flex gap-2">
              <span className="text-[10px] px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent cursor-default">Logo SVG</span>
              <span className="text-[10px] px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent cursor-default">Brand Guidelines</span>
              <span className="text-[10px] px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent cursor-default">Screenshots</span>
            </div>
          </div>
          <div className="p-5 rounded-xl bg-card border border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white mb-2">Media Coverage</h2>
            <p className="text-xs text-muted">For press inquiries, contact <span className="text-accent">press@trademetrix.tech</span></p>
          </div>
          <div className="p-5 rounded-xl bg-card border border-white/[0.06]">
            <h2 className="text-sm font-semibold text-white mb-2">Fact Sheet</h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div><span className="text-muted">Founded:</span> <span className="text-white">2025</span></div>
              <div><span className="text-muted">HQ:</span> <span className="text-white">Mumbai, India</span></div>
              <div><span className="text-muted">Product:</span> <span className="text-white">Algo Trading Platform</span></div>
              <div><span className="text-muted">Team:</span> <span className="text-white">12 members</span></div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
