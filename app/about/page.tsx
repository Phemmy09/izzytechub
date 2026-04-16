import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Flame, TrendingUp, Globe, Trophy, Users, ArrowRight, Linkedin, ExternalLink } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Israel O. Dare',
  description:
    'Visionary Tech Lead, Digital Strategist, and Developer. Learn the journey behind Izzytechub — from adversity to $2M+ recovered for clients using AI.',
}

const stats = [
  { icon: Trophy, value: '5+', label: 'Years Experience' },
  { icon: Globe, value: 'Global', label: 'Client Reach' },
  { icon: TrendingUp, value: 'Top 1%', label: 'Industry Talent' },
  { icon: Users, value: '100+', label: 'Projects Delivered' },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-24 pb-12 px-4 border-b border-neutral-900 bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="relative order-2 lg:order-1">
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 max-w-sm mx-auto lg:mx-0">
                <Image
                  src="https://oaohufpuxlpmmacrxcdq.supabase.co/storage/v1/object/public/Izzytechub%20Files/0476ebad-f2a3-49e7-96c2-c9cfe2391db5%20(1).jpg"
                  alt="Israel O. Dare"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 1024px) 384px, 384px"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div className="order-1 lg:order-2">
              <p className="text-brand-400 text-sm font-semibold uppercase tracking-wider mb-3">Premier · Israel Dare</p>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                Israel O. Dare
              </h1>
              <p className="text-xl text-brand-400 font-medium mb-6">
                Visionary Tech Lead, Digital Strategist &amp; Developer
              </p>
              <p className="text-neutral-300 leading-relaxed mb-4">
                I help businesses and entrepreneurs unlock exponential growth by harnessing the power of Artificial
                Intelligence. I've been helping businesses scale for 5+ years, transforming challenges into opportunities
                through intelligent automation and strategic thinking.
              </p>
              <p className="text-neutral-400 leading-relaxed mb-8">
                My story is not typical — it is a testament to resilience, strategy, and the relentless pursuit of
                excellence. From adversity to innovation, every step has been deliberate and purposeful.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/contact" className="btn-primary inline-flex items-center gap-2 group">
                  Work With Me
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="https://linkedin.com/in/israeldare"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center gap-2"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={value} className="p-6 bg-neutral-900/50 border border-neutral-800 rounded-xl text-center">
              <div className="w-10 h-10 mx-auto bg-brand-900/50 rounded-full flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-brand-500" />
              </div>
              <p className="text-3xl font-bold text-white">{value}</p>
              <p className="text-neutral-500 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Journey */}
      <section className="py-20 px-4 border-b border-neutral-900">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">My Journey</h2>

          <div className="space-y-14">
            {/* Chapter 1 */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                <Flame className="text-brand-500 w-5 h-5 shrink-0" />
                Forged in Fire
              </h3>
              <div className="pl-8 space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  My path into technology wasn't paved with gold; it was forged in fire. I was a bright student,
                  consistently top of my class and full of promise. But life has a way of testing your resolve. In a
                  devastating turn of events, I lost my father in a fatal motor accident, and my mother was left
                  hospitalized.
                </p>
                <p>
                  In an instant, my world collapsed. I was a student with immense potential but zero source of income.
                  The bills were mounting, and the pressure was overwhelming. I could have given up — most would have.
                  But I chose to fight. I chose technology.
                </p>
                <p>
                  I taught myself programming, digital marketing, and eventually AI, not from a place of comfort but out
                  of sheer necessity. Every late night, every skill I gained, was fuel for survival and then for
                  building something bigger than myself.
                </p>
              </div>
            </div>

            {/* Chapter 2 */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                <TrendingUp className="text-brand-500 w-5 h-5 shrink-0" />
                The Power of Lean Automation
              </h3>
              <div className="pl-8 space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  Necessity drove me to automation. I realized early on that the only way to do more with less was to
                  build systems that worked while I slept. This philosophy — lean, intelligent automation — became the
                  cornerstone of everything I now build.
                </p>
                <p>
                  I began working with clients on automating their workflows and quickly saw the transformative effect:
                  businesses were saving hundreds of hours per month and dramatically increasing their revenue without
                  additional employees.
                </p>
              </div>
            </div>

            {/* Chapter 3 */}
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-3 mb-4">
                <TrendingUp className="text-brand-500 w-5 h-5 shrink-0" />
                Scaling to $500K+
              </h3>
              <div className="pl-8 space-y-4 text-neutral-300 leading-relaxed">
                <p>
                  My work with <strong className="text-white">Digital Mavericks Media</strong> stands as a testament
                  to what's possible when you combine strategy with extreme automation. They needed a machine, not just
                  a marketing plan.
                </p>
                <ul className="space-y-3">
                  {[
                    'Generated over 10,000 qualified leads in less than 3 months',
                    'Improved lead-to-close ratio by over 40% with intelligent follow-up sequences',
                    'Drove over $500K in attributable revenue through AI-led growth campaigns',
                    'Drove over 90,000 quality leads across all channels',
                    'Generated $800,000 in revenue',
                  ].map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="text-brand-500 font-bold mt-0.5 shrink-0">→</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-brand-900/20 to-neutral-900 border border-brand-800/30 rounded-3xl p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">The Impact Today</h2>
            <p className="text-5xl font-black text-brand-500 mb-4">$2,000,000+</p>
            <p className="text-neutral-300 mb-6 text-lg">In lost revenue recovered for clients using AI.</p>
            <p className="text-neutral-400 leading-relaxed max-w-xl mx-auto text-sm">
              My journey from a grieving student with no income to a leader in the AI space has taught me one thing:
              Challenges are just opportunities in disguise. I now dedicate my life to helping businesses turn their
              own challenges into unparalleled growth.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2 group">
                Start Your Journey
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
