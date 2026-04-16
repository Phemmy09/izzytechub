import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowRight,
  Bot,
  Cpu,
  BarChart3,
  Mic,
  Workflow,
  MessageSquare,
  Star,
  ChevronRight,
  Play,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Izzytechub | AI Automation & Custom App Development',
  description:
    'We build intelligent infrastructures that automate operations, generate leads, and drive revenue. Led by Israel O. Dare.',
}

const services = [
  {
    icon: Cpu,
    title: 'AI Automation',
    description: 'Automate repetitive workflows, connect your tools, and scale operations without adding headcount.',
    href: '/services',
  },
  {
    icon: Bot,
    title: 'AI App Development',
    description: 'Custom SaaS, web, and mobile apps integrated with LLMs that power your unique business idea.',
    href: '/services',
  },
  {
    icon: BarChart3,
    title: 'AI Consulting',
    description: "Strategic AI roadmap tailored to your business. We identify gaps, then build the solution.",
    href: '/services',
  },
  {
    icon: MessageSquare,
    title: 'Digital Resources',
    description: 'eBooks, templates, and courses to build and scale your AI business or agency.',
    href: '/resources',
  },
]

const testimonials = [
  {
    id: 1,
    name: 'Timothy',
    role: 'AI Developer',
    content:
      "Working with Izzy was a FANTASTIC experience! His expertise in AI agents and automation systems truly shines through his meticulous code, detailed documentation, and PROACTIVE communication. Izzy consistently went above and beyond.",
  },
  {
    id: 2,
    name: 'Darryl',
    role: 'AI Marketing Strategist',
    content:
      "Izzy's expertise is truly unmatched. He tackled a problem that had been plaguing me for over a year and resolved it within just an hour! If you're looking for someone who delivers high-quality work quickly, get IZZY.",
  },
  {
    id: 3,
    name: 'DC Fawcett',
    role: 'CEO, Digital Mavericks Media',
    content:
      "Izzy overdelivered and gave me way more than I expected. I came in thinking I was just getting an AI appointment setter, but he set me up with way more than that. He took the time to make sure everything was customized to my needs.",
  },
  {
    id: 4,
    name: 'John Santangelo',
    role: 'CEO',
    content:
      "I've worked with many technical consultants, but Izzy stands out. He didn't just build a bot; he built a comprehensive system that actually understands our business logic. The ROI was evident within the first week of deployment.",
  },
  {
    id: 5,
    name: 'Fredrick Bahr',
    role: 'Sunrun Energy',
    content:
      "Our lead handling process was manual and slow before Izzy stepped in. He implemented an AI workflow that qualifies leads instantly and schedules appointments without human intervention. Massive uptick in conversion rates.",
  },
  {
    id: 6,
    name: 'Tony Flores',
    role: 'One Nation Energy',
    content:
      "Technical mastery combined with strategic vision. Izzy helped us automate our client onboarding and support systems. The result is a smoother customer experience and significantly less administrative overhead.",
  },
]

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: 'Global', label: 'Client Reach' },
  { value: 'Top 1%', label: 'Industry Talent' },
  { value: '100+', label: 'Projects Delivered' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-16 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center py-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-900/40 border border-brand-800/60 rounded-full text-brand-400 text-xs font-medium mb-8">
            <span className="w-1.5 h-1.5 bg-brand-400 rounded-full animate-pulse" />
            AI Agency &amp; Consulting — Led by Israel O. Dare
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
            Scalable AI Systems.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-red-300">
              Custom App Development.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            We build intelligent infrastructures that automate operations, generate leads, and drive revenue.
            Led by{' '}
            <span className="text-white font-semibold">Israel O. Dare</span>.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/services" className="btn-primary flex items-center justify-center gap-2 group">
              Explore Services
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/contact" className="btn-secondary flex items-center justify-center gap-2">
              Book a Free Call
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div key={s.value} className="p-5 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
                <p className="text-2xl font-bold text-white">{s.value}</p>
                <p className="text-neutral-500 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">What We Build</h2>
            <p className="section-sub max-w-2xl mx-auto">
              From consulting to custom code — we build the infrastructure that powers your business.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {services.map(({ icon: Icon, title, description, href }) => (
              <Link
                key={title}
                href={href}
                className="group p-6 bg-neutral-900/60 border border-neutral-800 rounded-xl card-hover"
              >
                <div className="w-10 h-10 bg-brand-900/50 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-brand-400" />
                </div>
                <h3 className="font-semibold text-white mb-2">{title}</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{description}</p>
                <div className="mt-4 flex items-center gap-1 text-brand-400 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ChevronRight className="w-4 h-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About / Engineering Business Growth */}
      <section className="py-20 px-4 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800">
                <Image
                  src="https://oaohufpuxlpmmacrxcdq.supabase.co/storage/v1/object/public/Izzytechub%20Files/DGF_6811%20copy.jpg"
                  alt="Israel O. Dare"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-brand-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                $2M+ Recovered for Clients
              </div>
            </div>

            <div>
              <p className="text-brand-400 text-sm font-semibold uppercase tracking-wider mb-3">
                Meet the Founder
              </p>
              <h2 className="section-heading mb-5">Engineering Business Growth</h2>
              <p className="text-neutral-300 text-lg mb-6 leading-relaxed">
                "We don't just write code; we solve business problems. My mission is to help companies leverage
                the full power of Artificial Intelligence to automate mundane tasks, generate qualified leads,
                and build scalable software solutions."
              </p>
              <p className="text-neutral-400 mb-8 leading-relaxed">
                Israel O. Dare is a Visionary Tech Lead, Digital Strategist, and Developer who has helped
                businesses worldwide scale to new heights using intelligent automation systems.
              </p>
              <Link href="/about" className="btn-primary inline-flex items-center gap-2 group">
                Read My Full Profile
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-20 px-4 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-wider mb-3">Experience the Capability</p>
          <h2 className="section-heading mb-8">See What AI Can Do For Your Business</h2>
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 group cursor-pointer">
            <video
              src="https://oaohufpuxlpmmacrxcdq.supabase.co/storage/v1/object/public/Izzytechub%20Files/Izzy%20Jain.mp4"
              poster="https://oaohufpuxlpmmacrxcdq.supabase.co/storage/v1/object/public/Izzytechub%20Files/DGF_6811%20copy.jpg"
              controls
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="section-heading mb-3">Client Success Stories</h2>
            <p className="section-sub">Trusted by businesses worldwide to deliver complex AI solutions and automations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="group p-7 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-brand-500/30 transition-all relative"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-brand-500 text-brand-500" />
                  ))}
                </div>
                <p className="text-neutral-300 text-sm leading-relaxed mb-5">"{t.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-brand-900/50 border border-brand-800/60 flex items-center justify-center text-brand-400 font-bold text-sm">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{t.name}</p>
                    <p className="text-neutral-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 px-4 border-t border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-900/30 to-neutral-900 border border-brand-800/30 rounded-3xl p-12">
            <h2 className="text-4xl font-bold text-white mb-4">Ready to Scale with AI?</h2>
            <p className="text-neutral-400 mb-8 text-lg max-w-xl mx-auto">
              Book a free strategy call. Let's identify the best automation opportunities for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 group">
                Book a Free Call
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/resources" className="btn-secondary inline-flex items-center gap-2">
                Browse Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
