import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Bot,
  Target,
  BarChart3,
  Mic,
  Workflow,
  MessageSquare,
  ArrowRight,
  CheckCircle,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'AI Services & Solutions',
  description:
    'From AI automation to custom app development, voice agents and smart chatbots. Izzytechub builds the AI infrastructure that powers your business.',
}

const services = [
  {
    icon: Bot,
    title: 'AI App Development',
    description:
      'Custom SaaS, Web, and Mobile applications integrated with LLMs. We build the software that powers your unique business idea.',
    features: [
      'Full-stack web and mobile apps',
      'LLM integration (GPT-4, Claude, Gemini)',
      'Custom AI dashboards and portals',
      'API development and integrations',
    ],
    cta: 'Start a Project',
  },
  {
    icon: Target,
    title: 'AI Lead Generation',
    description:
      'Automated outreach and appointment setting systems. Scrape leads, qualify them with AI, and book calls on autopilot.',
    features: [
      'Automated lead scraping & enrichment',
      'AI-powered qualification sequences',
      'CRM integration (GoHighLevel, HubSpot)',
      'Appointment booking on autopilot',
    ],
    cta: 'Automate Your Pipeline',
  },
  {
    icon: BarChart3,
    title: 'AI Consulting & Audits',
    description:
      'Strategic analysis of your business processes to identify automation opportunities. We provide the roadmap for AI adoption.',
    features: [
      'Process audit & gap analysis',
      'AI readiness assessment',
      'Implementation roadmap',
      'ROI forecasting & projections',
    ],
    cta: 'Book an Audit',
  },
  {
    icon: Mic,
    title: 'Intelligent Voice Agents',
    description:
      'Deploy human-like voice assistants that handle customer support, inbound bookings, and cold calling 24/7.',
    features: [
      'Human-like conversational AI',
      'Inbound support & FAQ handling',
      'Outbound cold calling automation',
      '24/7 availability without staff',
    ],
    cta: 'Deploy a Voice Agent',
  },
  {
    icon: Workflow,
    title: 'Custom Workflows & Automations',
    description:
      'Connect your stack (Slack, Zapier, Notion, CRM) to automate repetitive data entry and admin tasks.',
    features: [
      'n8n, Make, and Zapier workflows',
      'CRM and database automation',
      'Slack, email, and Notion integrations',
      'Document processing pipelines',
    ],
    cta: 'Automate My Stack',
  },
  {
    icon: MessageSquare,
    title: 'Smart Chatbots',
    description:
      'RAG-based chatbots trained on your specific business knowledge base to answer queries instantly.',
    features: [
      'Trained on your docs & FAQs',
      'Website & WhatsApp deployment',
      'Lead capture & qualification',
      'Ongoing training and updates',
    ],
    cta: 'Build My Chatbot',
  },
]

const processSteps = [
  { step: '01', title: 'Discovery Call', desc: 'We understand your business, goals, and pain points in a free 30-minute strategy call.' },
  { step: '02', title: 'Audit & Proposal', desc: 'We audit your current processes and deliver a tailored AI implementation roadmap.' },
  { step: '03', title: 'Build & Deploy', desc: 'Our team builds, tests, and deploys your custom AI system with full documentation.' },
  { step: '04', title: 'Optimize & Scale', desc: 'Ongoing support, monitoring, and optimization to continuously improve performance.' },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-24 pb-16 px-4 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-wider mb-3">What We Do</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            AI <span className="text-brand-500">Services</span> &amp; Solutions
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto mb-8">
            From consulting to custom code. We build the infrastructure that powers your next phase of growth.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 group">
            Book a Free Consultation
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 border-b border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map(({ icon: Icon, title, description, features, cta }) => (
              <div
                key={title}
                className="group p-7 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-500/40 transition-all flex flex-col"
              >
                <div className="w-12 h-12 bg-brand-900/50 rounded-xl flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed mb-5">{description}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                      <CheckCircle className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="text-brand-400 hover:text-brand-300 text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  {cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 px-4 border-b border-neutral-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">How We Work</h2>
            <p className="section-sub">A proven process that delivers results from day one.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map(({ step, title, desc }) => (
              <div key={step} className="text-center p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl">
                <div className="text-4xl font-black text-brand-900/60 mb-3">{step}</div>
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Not Sure Where to Start?</h2>
          <p className="text-neutral-400 mb-8">
            Book a free 30-minute strategy call. We'll identify your biggest automation opportunity and give you a
            clear action plan.
          </p>
          <Link href="/contact" className="btn-primary inline-flex items-center gap-2 group">
            Book Free Strategy Call
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  )
}
