export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-24">
        <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy</h1>
        <p className="text-xs text-muted mb-8">Last updated: June 2026</p>

        <div className="space-y-6 text-sm text-muted leading-relaxed">
          <section>
            <h2 className="text-base font-semibold text-white mb-2">1. Information We Collect</h2>
            <p>We collect information you provide during registration: email address, password (encrypted), and broker preference. We also collect usage data such as pages visited and features used to improve the Platform.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">2. How We Use Your Information</h2>
            <p>Your information is used to provide and maintain the Platform, send service-related communications (e.g., welcome emails, billing), and improve our product. We do not sell your personal information.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">3. Data Storage & Security</h2>
            <p>Your data is stored securely using industry-standard encryption. Passwords are hashed using bcrypt. We implement reasonable safeguards to protect against unauthorized access.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">4. Third-Party Services</h2>
            <p>We use Razorpay for payment processing and may use Resend for transactional emails. These services have their own privacy policies. We do not share your data with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">5. Cookies</h2>
            <p>We use essential cookies for authentication and session management. Optional analytics cookies (Plausible) are privacy-friendly and do not track you across sites. You can disable cookies in your browser settings.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">6. Your Rights</h2>
            <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us. You may also export your data or request account deletion.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">7. Data Retention</h2>
            <p>We retain your data for as long as your account is active. Upon account deletion, your data is removed within 30 days unless required for legal compliance.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-white mb-2">8. Contact</h2>
            <p>For privacy-related inquiries, contact <span className="text-accent">privacy@trademetrix.tech</span>.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
