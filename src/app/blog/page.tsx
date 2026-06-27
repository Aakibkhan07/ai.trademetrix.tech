import Link from 'next/link';

const posts = [
  {
    slug: 'momentum-strategy',
    title: 'Building a Momentum Strategy: From Concept to Code',
    desc: 'Implement a ROC-based momentum strategy with Python. Includes backtest results and common pitfalls.',
    date: 'June 20, 2026',
    readTime: '8 min',
  },
  {
    slug: 'backtesting-101',
    title: 'Backtesting 101: How to Validate Your Trading Strategy',
    desc: 'Learn the fundamentals of backtesting — key metrics, common mistakes, and how to avoid overfitting.',
    date: 'June 18, 2026',
    readTime: '6 min',
  },
  {
    slug: 'sebi-disclaimer',
    title: 'Why We&apos;re Not SEBI Registered — And Why That&apos;s Fine',
    desc: 'Understanding the difference between a software platform and a registered advisor in Indian markets.',
    date: 'June 15, 2026',
    readTime: '4 min',
  },
];

export const metadata = {
  title: 'Blog',
  description: 'Algorithmic trading guides, strategy tutorials, and market insights.',
};

export default function BlogIndex() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">Blog</h1>
        <p className="text-sm text-muted mb-12">Algorithmic trading guides, strategy tutorials, and market insights.</p>

        <div className="space-y-8">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group p-5 rounded-2xl bg-card border border-white/[0.06] hover:border-white/10 transition-all card-depth"
            >
              <div className="flex items-center gap-2 text-[10px] text-muted mb-2">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="text-base font-semibold text-white group-hover:text-accent transition-colors mb-1.5">
                {post.title}
              </h2>
              <p className="text-xs text-muted leading-relaxed">{post.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
