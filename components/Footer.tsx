'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Zap, Twitter, Instagram, Linkedin, Send, Briefcase } from 'lucide-react'

const NEWSLETTER_WEBHOOK =
  process.env.NEXT_PUBLIC_NEWSLETTER_WEBHOOK ||
  'https://n8n-digitalmavericks-u48043.vm.elestio.app/webhook/d4aa2064-907b-443b-a094-d2f6277e8cde'

export default function Footer() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setStatus('loading')
    try {
      const res = await fetch(NEWSLETTER_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'Footer Newsletter' }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer className="bg-black border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-brand-500">izzy</span>
                <span className="text-white">techub</span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed mb-5">
              The premier agency for AI automation, consulting, and app development. Helping
              businesses scale through intelligent systems.
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: Linkedin, href: 'https://linkedin.com/in/israeldare', label: 'LinkedIn' },
                { icon: Twitter, href: 'https://x.com/izzytechub', label: 'X (Twitter)' },
                { icon: Instagram, href: 'https://instagram.com/izzytechub', label: 'Instagram' },
                {
                  icon: Briefcase,
                  href: 'https://www.upwork.com/freelancers/~010297ccb4983d90e7',
                  label: 'Upwork',
                },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="w-8 h-8 rounded-lg bg-neutral-900 hover:bg-brand-600 flex items-center justify-center text-neutral-400 hover:text-white transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Services</h3>
            <ul className="space-y-2">
              {['AI Automation', 'AI App Development', 'AI Consulting', 'Digital Resources'].map((s) => (
                <li key={s}>
                  <Link
                    href={s === 'Digital Resources' ? '/resources' : '/services'}
                    className="text-neutral-400 hover:text-brand-400 text-sm transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About Israel O. Dare', href: '/about' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'News & Insights', href: '/news' },
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-neutral-400 hover:text-white text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Upwork */}
            <div className="mt-5">
              <a
                href="https://www.upwork.com/freelancers/~010297ccb4983d90e7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#14a800]/10 border border-[#14a800]/30 hover:border-[#14a800]/60 rounded-lg text-[#14a800] text-xs font-semibold transition-all"
              >
                <Briefcase className="w-3.5 h-3.5" />
                Hire on Upwork
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Stay Connected</h3>
            <p className="text-neutral-400 text-sm mb-4">Subscribe for AI insights and agency updates.</p>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-500 transition-colors min-w-0"
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="p-2 bg-brand-600 hover:bg-brand-500 rounded-lg text-white transition-colors disabled:opacity-50 shrink-0"
                aria-label="Subscribe"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            {status === 'success' && <p className="text-green-400 text-xs mt-2">Subscribed!</p>}
            {status === 'error' && <p className="text-red-400 text-xs mt-2">Error. Please try again.</p>}

            {/* Contact quick info */}
            <div className="mt-5 space-y-1.5">
              <a
                href="mailto:izzytechub@gmail.com"
                className="block text-neutral-500 hover:text-neutral-300 text-xs transition-colors"
              >
                izzytechub@gmail.com
              </a>
              <a
                href="tel:+14245460129"
                className="block text-neutral-500 hover:text-neutral-300 text-xs transition-colors"
              >
                +1 424 546 0129
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">© {new Date().getFullYear()} Izzytechub. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/privacy" className="text-neutral-500 hover:text-white text-xs transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="text-neutral-500 hover:text-white text-xs transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
