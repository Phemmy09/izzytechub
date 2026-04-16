'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import ProductCard from './ProductCard'
import type { Product } from '@/lib/products'

const FILTERS = ['All', 'Free', 'Paid'] as const
type Filter = (typeof FILTERS)[number]

export default function ProductsClient({ products }: { products: Product[] }) {
  const [filter, setFilter] = useState<Filter>('All')
  const [query, setQuery] = useState('')

  const visible = products.filter((p) => {
    const matchesFilter =
      filter === 'All' ||
      (filter === 'Free' && p.price === 'Free') ||
      (filter === 'Paid' && p.price !== 'Free')
    const matchesSearch =
      !query ||
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.type.toLowerCase().includes(query.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <>
      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
        <div className="flex gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-brand-600 text-white'
                  : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-600'
              }`}
            >
              {f} Products
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search resources..."
            className="pl-9 pr-4 py-2 bg-neutral-900 border border-neutral-800 rounded-lg text-white text-sm placeholder-neutral-500 focus:outline-none focus:border-brand-500 transition-colors w-56"
          />
        </div>
      </div>

      {/* Grid */}
      {visible.length === 0 ? (
        <div className="text-center py-20 text-neutral-500">
          <p className="text-lg">No products found.</p>
          <button
            onClick={() => { setFilter('All'); setQuery('') }}
            className="mt-3 text-brand-400 hover:text-brand-300 text-sm underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  )
}
