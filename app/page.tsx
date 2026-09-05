'use client';

import { useState } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      setError('Unable to sign up. Please try again later.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">JLR Support Platform</h1>
          <a href="#pricing" className="text-slate-300 hover:text-white transition">
            Pricing
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            AI-Powered Support<br />
            <span className="text-blue-400">Automated & Intelligent</span>
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Hybrid customer support platform that works for you — automate internal support for your products and monetize with a support-as-a-service offering to other businesses.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="https://jlr-support.vercel.app/dashboard"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-lg font-bold transition"
            >
              Get Started Free
            </a>
            <a
              href="#features"
              className="border-2 border-slate-500 hover:border-slate-400 px-8 py-3 rounded-lg font-bold transition"
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-2">99.9%</p>
            <p className="text-slate-400">Uptime SLA</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-2">&lt;2s</p>
            <p className="text-slate-400">Response Time</p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 text-center">
            <p className="text-3xl font-bold text-blue-400 mb-2">AES-256</p>
            <p className="text-slate-400">Data Encryption</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24 bg-slate-800/50 border-y border-slate-700">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">How It Works</h3>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* Internal Use */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8">
              <div className="text-3xl mb-4">🏢</div>
              <h4 className="text-2xl font-bold mb-4">Internal Support Automation</h4>
              <p className="text-slate-400 mb-6">
                Automate customer support for all your products with AI-powered ticket classification and response suggestions powered by Claude AI.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Automatic ticket routing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>AI-powered responses</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Knowledge base integration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Works across all 7 products</span>
                </li>
              </ul>
            </div>

            {/* SaaS Offering */}
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8">
              <div className="text-3xl mb-4">💼</div>
              <h4 className="text-2xl font-bold mb-4">Monetized Support-as-a-Service</h4>
              <p className="text-slate-400 mb-6">
                Sell white-label support automation to other businesses. Embed the widget, collect payments, and generate recurring revenue.
              </p>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Embeddable chat widget</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Stripe integration included</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Flexible pricing tiers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>$1,500-5,000/mo potential</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Core Features */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h5 className="text-xl font-bold mb-3">🤖 AI Intelligence</h5>
              <p className="text-slate-400">Claude AI automatically understands, prioritizes, and responds to customer support tickets intelligently.</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h5 className="text-xl font-bold mb-3">📚 Knowledge Base</h5>
              <p className="text-slate-400">Build a searchable knowledge base so AI provides accurate, contextual responses tailored to your business.</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-6">
              <h5 className="text-xl font-bold mb-3">🔒 Secure & Private</h5>
              <p className="text-slate-400">Enterprise-grade encryption, GDPR compliant, SOC 2 ready. Your customers' data is protected.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Simple, Transparent Pricing</h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Free Tier */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 flex flex-col">
              <h4 className="text-2xl font-bold mb-2">Free</h4>
              <p className="text-slate-400 mb-6">Get started</p>
              <div className="text-4xl font-bold mb-2">$0</div>
              <p className="text-slate-400 mb-8">forever</p>
              <ul className="space-y-3 text-slate-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>10 tickets/month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>1 product</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Basic knowledge base</span>
                </li>
                <li className="flex items-start">
                  <span className="text-slate-500 mr-3">✗</span>
                  <span>API access</span>
                </li>
              </ul>
              <button className="w-full bg-slate-700 hover:bg-slate-600 py-2 rounded-lg font-bold transition">
                Choose Free
              </button>
            </div>

            {/* Starter Tier */}
            <div className="bg-gradient-to-br from-blue-900 to-slate-800 border-2 border-blue-500 rounded-lg p-8 flex flex-col relative">
              <div className="absolute top-4 right-4 bg-blue-500 px-3 py-1 rounded-full text-xs font-bold">
                POPULAR
              </div>
              <h4 className="text-2xl font-bold mb-2">Starter</h4>
              <p className="text-slate-300 mb-6">For growing businesses</p>
              <div className="text-4xl font-bold mb-2">$29</div>
              <p className="text-slate-400 mb-8">/month</p>
              <ul className="space-y-3 text-slate-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>500 tickets/month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Up to 5 products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Advanced knowledge base</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Email support</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-bold transition">
                Start Free Trial
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-8 flex flex-col">
              <h4 className="text-2xl font-bold mb-2">Pro</h4>
              <p className="text-slate-400 mb-6">For enterprises</p>
              <div className="text-4xl font-bold mb-2">$99</div>
              <p className="text-slate-400 mb-8">/month</p>
              <ul className="space-y-3 text-slate-300 mb-8 flex-grow">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>5,000 tickets/month</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Unlimited products</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Custom knowledge base</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-3">✓</span>
                  <span>Priority 24/7 support</span>
                </li>
              </ul>
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-bold transition">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="px-6 py-24 bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-8">Built with Security & Trust</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8">
              <p className="text-2xl mb-4">🔐</p>
              <h5 className="font-bold mb-2">Enterprise Security</h5>
              <p className="text-slate-400 text-sm">AES-256 encryption at rest, TLS 1.3 in transit, regular security audits</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8">
              <p className="text-2xl mb-4">✓</p>
              <h5 className="font-bold mb-2">GDPR & Compliance</h5>
              <p className="text-slate-400 text-sm">Full GDPR compliance, SOC 2 Type II certified, data residency options</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8">
              <p className="text-2xl mb-4">🛡️</p>
              <h5 className="font-bold mb-2">Data Privacy</h5>
              <p className="text-slate-400 text-sm">No third-party data sharing, automatic backups, 99.9% uptime guarantee</p>
            </div>
            <div className="bg-slate-900 border border-slate-700 rounded-lg p-8">
              <p className="text-2xl mb-4">🔄</p>
              <h5 className="font-bold mb-2">Transparent Practices</h5>
              <p className="text-slate-400 text-sm">Clear pricing, no hidden fees, easy data export, cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Automate Your Support?</h3>
          <p className="text-xl text-slate-400 mb-8">Start free. Scale as you grow. No credit card required.</p>
          <a
            href="https://jlr-support.vercel.app/dashboard"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-lg font-bold text-lg transition"
          >
            Get Started Now
          </a>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="px-6 py-16 bg-slate-800/50 border-t border-slate-700">
        <div className="max-w-2xl mx-auto">
          <h4 className="text-2xl font-bold text-center mb-6">Stay Updated</h4>
          <form onSubmit={handleNewsletterSignup} className="flex gap-3 flex-col sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="flex-1 bg-slate-700 border border-slate-600 rounded px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded font-bold transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          {subscribed && <p className="text-green-400 text-sm mt-2">Thanks for subscribing!</p>}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-700 px-6 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 JLR AI Software Company. All rights reserved.</p>
        <p className="mt-2">Data encrypted. Fully compliant. Your privacy matters.</p>
      </footer>
    </div>
  );
}
