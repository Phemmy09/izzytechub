import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

const parser = new Parser({
  timeout: 8000,
  headers: { 'User-Agent': 'Izzytechub-News-Aggregator/1.0' },
})

export type NewsItem = {
  id: string
  title: string
  link: string
  pubDate: string
  summary: string
  source: string
  category: 'AI' | 'Tech' | 'Entrepreneur'
  image?: string
}

const feeds: { url: string; source: string; category: NewsItem['category'] }[] = [
  // AI
  { url: 'https://venturebeat.com/category/ai/feed/', source: 'VentureBeat AI', category: 'AI' },
  { url: 'https://feeds.feedburner.com/aiweekly', source: 'AI Weekly', category: 'AI' },
  { url: 'https://hnrss.org/newest?q=AI+machine+learning&count=15', source: 'Hacker News', category: 'AI' },
  // Tech
  { url: 'https://techcrunch.com/feed/', source: 'TechCrunch', category: 'Tech' },
  { url: 'https://www.theverge.com/rss/index.xml', source: 'The Verge', category: 'Tech' },
  { url: 'https://feeds.arstechnica.com/arstechnica/index', source: 'Ars Technica', category: 'Tech' },
  // Entrepreneur
  { url: 'https://www.entrepreneur.com/latest.rss', source: 'Entrepreneur', category: 'Entrepreneur' },
  { url: 'https://feeds.feedburner.com/entrepreneur/latest', source: 'Entrepreneur.com', category: 'Entrepreneur' },
  { url: 'https://www.inc.com/rss', source: 'Inc.com', category: 'Entrepreneur' },
]

async function fetchFeed(feed: (typeof feeds)[number]): Promise<NewsItem[]> {
  try {
    const parsed = await parser.parseURL(feed.url)
    return (parsed.items ?? []).slice(0, 8).map((item, i) => ({
      id: `${feed.source}-${i}-${Date.now()}`,
      title: item.title ?? 'Untitled',
      link: item.link ?? '#',
      pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
      summary: (item.contentSnippet ?? item.content ?? '').slice(0, 200).trim(),
      source: feed.source,
      category: feed.category,
      image: item.enclosure?.url ?? extractImage(item.content ?? ''),
    }))
  } catch {
    return []
  }
}

function extractImage(html: string): string | undefined {
  const match = html.match(/<img[^>]+src="([^"]+)"/i)
  return match?.[1]
}

// Cache results for 60 minutes
let cache: { data: NewsItem[]; ts: number } | null = null
const CACHE_TTL = 60 * 60 * 1000

export async function GET() {
  if (cache && Date.now() - cache.ts < CACHE_TTL) {
    return NextResponse.json(cache.data)
  }

  const results = await Promise.allSettled(feeds.map(fetchFeed))
  const all: NewsItem[] = results
    .flatMap((r) => (r.status === 'fulfilled' ? r.value : []))
    .filter((item) => item.title && item.link)
    .sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime())

  // Deduplicate by title
  const seen = new Set<string>()
  const deduped = all.filter((item) => {
    const key = item.title.toLowerCase().slice(0, 60)
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })

  cache = { data: deduped, ts: Date.now() }
  return NextResponse.json(deduped)
}
