'use client'

import { useState } from 'react'
import { Send, Loader2, CheckCircle } from 'lucide-react'

const SERVICES = [
  'AI Automation',
  'AI App Development',
  'AI Lead Generation',
  'AI Consulting & Audit',
  'Intelligent Voice Agents',
  'Smart Chatbots',
  'Digital Resources',
  'Other',
]

export default function ContactForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set =
    (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Submission failed')
      setStatus('success')
      setForm({ firstName: '', lastName: '', email: '', phone: '', service: '', message: '' })
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-16 h-16 bg-green-900/40 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
        <p className="text-neutral-400 mb-2 max-w-sm">
          Thanks for reaching out. A confirmation email is on its way to you.
        </p>
        <p className="text-neutral-500 text-sm mb-6 max-w-sm">
          Israel or a team member will get back to you within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-brand-400 hover:text-brand-300 text-sm underline"
        >
          Send another message
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">
            First Name <span className="text-brand-500">*</span>
          </label>
          <input
            type="text"
            value={form.firstName}
            onChange={set('firstName')}
            required
            placeholder="John"
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-1.5">
            Last Name <span className="text-brand-500">*</span>
          </label>
          <input
            type="text"
            value={form.lastName}
            onChange={set('lastName')}
            required
            placeholder="Doe"
            className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          Email <span className="text-brand-500">*</span>
        </label>
        <input
          type="email"
          value={form.email}
          onChange={set('email')}
          required
          placeholder="john@example.com"
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">Phone (optional)</label>
        <input
          type="tel"
          value={form.phone}
          onChange={set('phone')}
          placeholder="+1 424 546 0129"
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 transition-colors"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          Service Interest <span className="text-brand-500">*</span>
        </label>
        <select
          value={form.service}
          onChange={set('service')}
          required
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-brand-500 transition-colors appearance-none"
        >
          <option value="" disabled>
            Select a service...
          </option>
          {SERVICES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          Message <span className="text-brand-500">*</span>
        </label>
        <textarea
          value={form.message}
          onChange={set('message')}
          required
          rows={5}
          placeholder="Tell us about your project or business needs..."
          className="w-full px-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-brand-500 transition-colors resize-none"
        />
      </div>

      {status === 'error' && <p className="text-red-400 text-sm">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-4 bg-brand-600 hover:bg-brand-500 disabled:opacity-60 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-5 h-5" />
            Send Message
          </>
        )}
      </button>

      <p className="text-neutral-600 text-xs text-center">
        You'll receive a confirmation email immediately after submitting.
      </p>
    </form>
  )
}
