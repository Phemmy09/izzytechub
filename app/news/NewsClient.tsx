'use client'

import { useState, useEffect } from 'react'
import { ExternalLink, Clock, RefreshCw, Rss, Bot, Cpu, TrendingUp } from 'lucide-react'
import type { NewsItem } from '@/app/api/news/route'

type Category = 'All' | 'AI' | 'Tech' | 'Entrepreneur'
const CATEGORIES: Category[] = ['All', 'AI', 'Tech', 'Entrepreneur']

const catStyles: Record<string, string> = {
  AI: 'bg-purple-900/60 text-purple-300 border-purple-700/50',
  Tech: 'bg-blue-900/60 text-blue-300 border-blue-700/50',
  Entrepreneur: 'bg-orange-900/60 text-orange-300 border-orange-700/50',
}

const catIcons: Record<string, React.ElementType> = {
  AI: Bot,
  Tech: Cpu,
  Entrepreneur: TrendingUp,
}

/** Fallback gradient per category when no image is available */
const catGradient: Record<string, string> = {
  AI: 'from-purple-900/60 to-neutral-900',
  Tech: 'from-blue-900/60 to-neutral-900',
  Entrepreneur: 'from-orange-900/60 to-neutral-900',
}

function timeAgo(dateStr: string): string {
  try {
    const diff = (Date.now() - new Date(dateStr).getTime()) / 1000
    if (diff < 60) return 'just now'
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
    return `${Math.floor(diff / 86400)}d ago`
  } catch {
    return ''
  }
}

function NewsCard({ item }: { item: NewsItem }) {
  const CatIcon = catIcons[item.category] ?? Rss
  const [imgError, setImgError] = useState(false)
  const showImage = item.image && !imgError

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image / gradient header */}
      <div className="relative h-44 overflow-hidden bg-neutral-800">
        {showImage ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={item.image}
            alt={item.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full bg-gradient-to-br ${catGradient[item.category] ?? 'from-neutral-800 to-neutral-900'} flex items-center justify-center`}>
            <CatIcon className="w-10 h-10 text-white/10" />
          </div>
        )}
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent" />

        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border backdrop-blur-sm ${
            catStyles[item.category] ?? 'bg-neutral-800/80 text-neutral-300 border-neutral-700'
          }`}
        >
          <CatIcon className="w-3 h-3" />
          {item.category}
        </span>

        {/* Time */}
        <span className="absolute top-3 right-3 text-neutral-300 text-xs flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <Clock className="w-3 h-3" />
          {timeAgo(item.pubDate)}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-white text-sm leading-snug mb-2 group-hover:text-brand-400 transition-colors line-clamp-2">
          {item.title}
        </h3>
        {item.summary && (
          <p className="text-neutral-400 text-xs leading-relaxed line-clamp-2 flex-1">{item.summary}</p>
        )}
        <div className="mt-3 pt-3 border-t border-neutral-800 flex items-center justify-between">
          <span className="text-neutral-500 text-xs font-medium">{item.source}</span>
          <div className="flex items-center gap-1 text-neutral-600 group-hover:text-brand-400 transition-colors text-xs">
            Read more <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  )
}

export default function NewsClient() {
  const [items, setItems] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState<Category>('All')
  const [refreshing, setRefreshing] = useState(false)

  const load = async (showRefresh = false) => {
    if (showRefresh) setRefreshing(true)
    else setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/news')
      if (!res.ok) throw new Error('Failed to load news')
      const data: NewsItem[] = await res.json()
      setItems(data)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load news')
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  useEffect(() => { load() }, [])

  const visible = category === 'All' ? items : items.filter((i) => i.category === category)

  return (
    <>
      {/* Filters + Refresh */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                category === c
                  ? 'bg-brand-600 text-white'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
              }`}
            >
              {c === 'All' ? 'All News' : `${c} News`}
            </button>
          ))}
        </div>
        <button
          onClick={() => load(true)}
          disabled={refreshing}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-neutral-400 hover:text-white text-sm transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden animate-pulse">
              <div className="h-44 bg-neutral-800" />
              <div className="p-4 space-y-3">
                <div className="h-4 bg-neutral-800 rounded w-1/4" />
                <div className="h-5 bg-neutral-800 rounded w-full" />
                <div className="h-3 bg-neutral-800 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center py-16">
          <p className="text-red-400 mb-4">{error}</p>
          <button onClick={() => load()} className="btn-primary">
            Try Again
          </button>
        </div>
      )}

      {!loading && !error && visible.length === 0 && (
        <div className="text-center py-16 text-neutral-500">
          <Rss className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p>No articles found for this category.</p>
        </div>
      )}

      {!loading && !error && visible.length > 0 && (
        <>
          <p className="text-neutral-600 text-sm mb-5">{visible.length} articles</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((item) => (
              <NewsCard key={item.id} item={item} />
            ))}
          </div>
        </>
      )}
    </>
  )
}
