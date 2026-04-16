import type { Metadata } from 'next'
import { Mail, Phone, MessageCircle, Clock } from 'lucide-react'
import ContactForm from './ContactForm'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Ready to transform your business with AI? Contact Izzytechub to discuss your project, consulting needs, or automation strategy.',
}

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-24 pb-12 px-4 border-b border-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Let's Build Something
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get In Touch</h1>
          <p className="text-neutral-400 text-lg">
            Ready to transform your business? Fill out the form below to discuss your project,
            consulting needs, or automation strategy.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Left — contact info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Email */}
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-900/50 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Email Us</h3>
                  <a
                    href="mailto:izzytechub@gmail.com"
                    className="text-neutral-400 hover:text-brand-400 text-sm transition-colors block"
                  >
                    izzytechub@gmail.com
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-brand-900/50 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1">Phone / WhatsApp</h3>
                  <a
                    href="tel:+14245460129"
                    className="text-neutral-400 hover:text-brand-400 text-sm transition-colors block"
                  >
                    +1 424 546 0129
                  </a>
                  <p className="text-neutral-600 text-xs mt-1">Available Mon–Fri, 9am – 5pm WAT</p>
                </div>
              </div>
            </div>

            {/* WhatsApp direct */}
            <a
              href="https://wa.me/14245460129"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-5 bg-green-900/20 border border-green-800/40 rounded-xl hover:border-green-600/60 transition-all group"
            >
              <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Chat on WhatsApp</p>
                <p className="text-neutral-500 text-xs">Fastest response — usually under 1 hour</p>
              </div>
            </a>

            {/* Response time */}
            <div className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl flex items-start gap-3">
              <Clock className="w-5 h-5 text-neutral-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-white font-semibold text-sm mb-1">Response Time</p>
                <p className="text-neutral-400 text-xs leading-relaxed">
                  Form submissions are typically answered within 24 hours on business days.
                  WhatsApp is fastest for urgent matters.
                </p>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div className="lg:col-span-3">
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
              <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
