import { NextResponse } from 'next/server'
import Parser from 'rss-parser'

type CustomItem = {
  'media:content': { $: { url: string } }
  'media:thumbnail': { $: { url: string } }
  'content:encoded': string
  enclosure: { url: string; type: string }
}

const parser = new Parser<Record<string, unknown>, CustomItem>({
  timeout: 8000,
  headers: { 'User-Agent': 'Izzytechub-News-Aggregator/1.0' },
  customFields: {
    item: [
      ['media:content', 'media:content'],
      ['media:thumbnail', 'media:thumbnail'],
      ['content:encoded', 'content:encoded'],
    ],
  },
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
  { url: 'https://hnrss.org/newest?q=AI+machine+learning&count=15', source: 'Hacker News', category: 'AI' },
  // Tech
  { url: 'https://techcrunch.com/feed/', source: 'TechCrunch', category: 'Tech' },
  { url: 'https://www.theverge.com/rss/index.xml', source: 'The Verge', category: 'Tech' },
  { url: 'https://feeds.arstechnica.com/arstechnica/index', source: 'Ars Technica', category: 'Tech' },
  // Entrepreneur
  { url: 'https://www.entrepreneur.com/latest.rss', source: 'Entrepreneur', category: 'Entrepreneur' },
  { url: 'https://www.inc.com/rss', source: 'Inc.com', category: 'Entrepreneur' },
]

/** Pull the best available image from an RSS item */
function extractImage(item: Partial<CustomItem> & { enclosure?: { url: string } }): string | undefined {
  // 1. media:content
  const mc = item['media:content']
  if (mc?.['$']?.url) return mc['$'].url

  // 2. media:thumbnail
  const mt = item['media:thumbnail']
  if (mt?.['$']?.url) return mt['$'].url

  // 3. enclosure (common in podcast / media feeds)
  if (item.enclosure?.url && /\.(jpg|jpeg|png|webp|gif)/i.test(item.enclosure.url)) {
    return item.enclosure.url
  }

  // 4. First <img> tag in content:encoded or content
  const html = item['content:encoded'] ?? ''
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  if (match?.[1]) return match[1]

  return undefined
}

/** Plain-text summary from HTML */
function toText(html: string): string {
  return html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 220)
}

async function fetchFeed(feed: (typeof feeds)[number]): Promise<NewsItem[]> {
  try {
    const parsed = await parser.parseURL(feed.url)
    return (parsed.items ?? []).slice(0, 10).map((item, i) => ({
      id: `${feed.source}-${i}-${Date.now()}`,
      title: (item.title ?? 'Untitled').replace(/&amp;/g, '&').replace(/&#039;/g, "'"),
      link: item.link ?? '#',
      pubDate: item.pubDate ?? item.isoDate ?? new Date().toISOString(),
      summary: toText(item['content:encoded'] ?? item.contentSnippet ?? item.content ?? ''),
      source: feed.source,
      category: feed.category,
      image: extractImage(item as Partial<CustomItem>),
    }))
  } catch {
    return []
  }
}

// In-memory cache — 60 minutes
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

  // Deduplicate by title prefix
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
