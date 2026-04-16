import type { Metadata } from 'next'
import { Rss } from 'lucide-react'
import NewsClient from './NewsClient'

export const metadata: Metadata = {
  title: 'News & Insights',
  description:
    'Stay ahead with curated AI, Tech, and Entrepreneur news. Updated daily from top sources.',
}

const sources = [
  { label: 'AI News', sources: 'VentureBeat, Hacker News' },
  { label: 'Tech News', sources: 'TechCrunch, The Verge, Ars Technica' },
  { label: 'Entrepreneur', sources: 'Entrepreneur.com, Inc.com' },
]

export default function NewsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-24 pb-12 px-4 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-900/40 border border-brand-800/60 rounded-full text-brand-400 text-xs font-medium mb-6">
            <Rss className="w-3.5 h-3.5" />
            Live RSS Feeds · Updated Hourly
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            News &amp; Insights
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-8">
            Stay ahead of the curve with curated AI, Tech, and Entrepreneur news pulled live from
            the world's top publications.
          </p>

          {/* Source tags */}
          <div className="flex flex-wrap justify-center gap-4">
            {sources.map(({ label, sources: src }) => (
              <div key={label} className="text-center px-5 py-3 bg-neutral-900/60 border border-neutral-800 rounded-xl">
                <p className="text-white font-semibold text-sm">{label}</p>
                <p className="text-neutral-500 text-xs mt-0.5">{src}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News feed */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <NewsClient />
        </div>
      </section>
    </>
  )
}
