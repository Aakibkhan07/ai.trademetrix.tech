export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">Careers</h1>
        <p className="text-muted text-sm mb-12">Build the future of algorithmic trading in India. We are hiring for remote-first roles.</p>
        <div className="space-y-3">
          {[
            { title: 'Senior Backend Engineer', type: 'Full-time', loc: 'Remote (India)', dept: 'Engineering' },
            { title: 'Frontend Engineer (Next.js)', type: 'Full-time', loc: 'Remote (India)', dept: 'Engineering' },
            { title: 'Algorithmic Trading Strategist', type: 'Full-time', loc: 'Mumbai / Remote', dept: 'Product' },
            { title: 'DevOps / Infrastructure Engineer', type: 'Full-time', loc: 'Remote (India)', dept: 'Engineering' },
            { title: 'Technical Support Engineer', type: 'Full-time', loc: 'Mumbai', dept: 'Support' },
            { title: 'Sales Executive (B2B)', type: 'Full-time', loc: 'Mumbai', dept: 'Sales' },
          ].map((job) => (
            <div key={job.title} className="p-5 rounded-xl bg-card border border-white/[0.06] hover:border-accent/20 transition-colors flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold text-white">{job.title}</div>
                <div className="flex items-center gap-3 mt-1 text-[11px] text-muted">
                  <span>{job.type}</span>
                  <span className="w-1 h-1 rounded-full bg-white/[0.12]" />
                  <span>{job.loc}</span>
                  <span className="w-1 h-1 rounded-full bg-white/[0.12]" />
                  <span className="text-accent">{job.dept}</span>
                </div>
              </div>
              <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent hover:bg-accent/20 transition-colors whitespace-nowrap">Apply →</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
