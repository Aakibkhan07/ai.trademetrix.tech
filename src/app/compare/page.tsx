export const metadata = {
  title: 'Compare',
  description: 'Trade Metrix vs other algo trading platforms. See how we compare with Streak, AlgoTest, and Python.',
};

export default function ComparePage() {
  const features = [
    'Visual Strategy Builder',
    'Python Code Editor',
    'Backtesting Engine',
    'Walk-Forward Analysis',
    'Live Paper Trading',
    'Multi-Broker Support',
    'Real-Time Risk Monitoring',
    'Community Strategies',
    'Mobile App',
    'SEBI Registration',
  ];

  const rows = [
    { name: 'Visual Strategy Builder', us: true, streak: true, algotest: true, python: false },
    { name: 'Python Code Editor', us: true, streak: false, algotest: true, python: true },
    { name: 'Backtesting Engine', us: true, streak: true, algotest: true, python: true },
    { name: 'Walk-Forward Analysis', us: true, streak: false, algotest: false, python: false },
    { name: 'Live Paper Trading', us: true, streak: true, algotest: true, python: false },
    { name: 'Multi-Broker Support', us: true, streak: false, algotest: false, python: false },
    { name: 'Real-Time Risk Monitoring', us: true, streak: false, algotest: false, python: false },
    { name: 'Community Strategies', us: true, streak: true, algotest: true, python: false },
    { name: 'Mobile App', us: false, streak: true, algotest: false, python: false },
    { name: 'SEBI Registration (Advisor)', us: false, streak: true, algotest: true, python: false },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">Trade Metrix vs The Alternatives</h1>
        <p className="text-sm text-muted mb-12">Honest comparison. We win where it matters.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-3 pr-4 text-muted font-medium">Feature</th>
                <th className="text-center py-3 px-3 text-accent font-semibold">Trade Metrix</th>
                <th className="text-center py-3 px-3 text-white/60 font-medium">Streak</th>
                <th className="text-center py-3 px-3 text-white/60 font-medium">AlgoTest</th>
                <th className="text-center py-3 px-3 text-white/60 font-medium">Raw Python</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(r => (
                <tr key={r.name} className="border-b border-white/[0.04]">
                  <td className="py-3 pr-4 text-white">{r.name}</td>
                  <td className={`text-center py-3 px-3 ${r.us ? 'text-green-400' : 'text-red-400/50'}`}>{r.us ? '✓' : '✗'}</td>
                  <td className={`text-center py-3 px-3 ${r.streak ? 'text-green-400' : 'text-red-400/50'}`}>{r.streak ? '✓' : '✗'}</td>
                  <td className={`text-center py-3 px-3 ${r.algotest ? 'text-green-400' : 'text-red-400/50'}`}>{r.algotest ? '✓' : '✗'}</td>
                  <td className={`text-center py-3 px-3 ${r.python ? 'text-green-400' : 'text-red-400/50'}`}>{r.python ? '✓' : '✗'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 p-5 rounded-2xl bg-card border border-white/[0.06]">
          <h2 className="text-sm font-semibold text-white mb-2">The Trade Metrix Difference</h2>
          <ul className="space-y-2 text-xs text-muted">
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">→</span>
              <span><strong className="text-white">Code + Visual:</strong> Best of both worlds — visual blocks for quick strategies, Python for full control.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">→</span>
              <span><strong className="text-white">Walk-Forward:</strong> The industry standard for robust validation. None of the alternatives offer this out of the box.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">→</span>
              <span><strong className="text-white">Multi-Broker:</strong> Connect Zerodha, Angel, ICICI, Upstox, and more from one dashboard.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 mt-0.5">→</span>
              <span><strong className="text-white">Real-Time Risk:</strong> Live P&L, exposure limits, drawdown alerts — built in, not bolted on.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
