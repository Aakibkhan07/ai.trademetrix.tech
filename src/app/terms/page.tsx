export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">Terms of Service</h1>
        <p className="text-xs text-muted mb-8">Last updated: June 2026</p>

        <div className="space-y-6 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">1. Acceptance of Terms</h2>
            <p>By accessing and using Trade Metrix ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree, do not use the Platform.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">2. Software Only — No Financial Advice</h2>
            <p>Trade Metrix is a software platform for building, backtesting, and deploying algorithmic trading strategies. We are <strong>NOT</strong> a SEBI-registered entity. We do not provide investment advice, portfolio management, stock tips, or trading recommendations.</p>
            <p className="mt-2">All strategies and outputs from the Platform are for educational and informational purposes only. You are solely responsible for your trading decisions.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">3. Eligibility</h2>
            <p>You must be at least 18 years old and legally capable of entering into binding contracts. By registering, you represent that you meet these requirements.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">4. Accounts & Registration</h2>
            <p>You are responsible for maintaining the confidentiality of your account credentials. You must provide accurate, current, and complete information. We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">5. Subscription & Billing</h2>
            <p>Paid plans are billed in advance on a monthly, quarterly, half-yearly, or yearly basis. All fees are non-refundable except as required by applicable law. We may change pricing with 30 days&apos; notice.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">6. No Guarantee of Results</h2>
            <p>Past performance in backtests does not guarantee future results. Algorithmic trading involves substantial risk of loss. You may lose some or all of your capital. Never trade with money you cannot afford to lose.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">7. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Trade Metrix shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Platform.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">8. Termination</h2>
            <p>We may terminate or suspend your account at any time for violation of these terms. Upon termination, your access to the Platform ceases immediately.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Material changes will be notified via email. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">10. Contact</h2>
            <p>For questions about these terms, contact us at <span className="text-accent">support@trademetrix.tech</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
