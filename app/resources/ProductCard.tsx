'use client'

import Image from 'next/image'
import { ShoppingCart, Download, BookOpen, Headphones, Video, FileText, CheckCircle, ExternalLink } from 'lucide-react'
import type { Product } from '@/lib/products'

const typeIcons: Record<string, React.ElementType> = {
  eBook: BookOpen,
  Audio: Headphones,
  Video: Video,
  Template: FileText,
  Course: BookOpen,
}

const typeBadgeColor: Record<string, string> = {
  eBook: 'bg-blue-900/50 text-blue-300 border-blue-800/50',
  Audio: 'bg-purple-900/50 text-purple-300 border-purple-800/50',
  Video: 'bg-green-900/50 text-green-300 border-green-800/50',
  Template: 'bg-yellow-900/50 text-yellow-300 border-yellow-800/50',
  Course: 'bg-orange-900/50 text-orange-300 border-orange-800/50',
}

export default function ProductCard({ product }: { product: Product }) {
  const TypeIcon = typeIcons[product.type] ?? BookOpen
  const isFree = product.price === 'Free'

  return (
    <div className="group flex flex-col bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <div className="relative aspect-[16/9] bg-neutral-800 overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Type badge */}
        <span
          className={`absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
            typeBadgeColor[product.type] ?? 'bg-neutral-800 text-neutral-300 border-neutral-700'
          }`}
        >
          <TypeIcon className="w-3 h-3" />
          {product.type}
        </span>

        {isFree && (
          <span className="absolute top-3 right-3 px-2.5 py-1 bg-green-600/90 text-white text-xs font-bold rounded-full">
            FREE
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-bold text-white text-lg mb-2 leading-snug">{product.title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-4 flex-1">{product.description}</p>

        {/* Features */}
        <ul className="space-y-1.5 mb-5">
          {product.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-xs text-neutral-300">
              <CheckCircle className="w-3.5 h-3.5 text-brand-500 shrink-0 mt-0.5" />
              {f}
            </li>
          ))}
        </ul>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3 mt-auto pt-4 border-t border-neutral-800">
          <div>
            {isFree ? (
              <span className="text-2xl font-black text-green-400">Free</span>
            ) : (
              <span className="text-2xl font-black text-white">
                ${(product.price as number).toFixed(2)}
              </span>
            )}
          </div>

          {isFree ? (
            <a
              href={product.downloadUrl ?? '#'}
              download
              className="inline-flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              Download
            </a>
          ) : (
            <a
              href={product.whopCheckoutUrl ?? 'https://whop.com'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white text-sm font-semibold rounded-lg transition-colors"
            >
              <ShoppingCart className="w-4 h-4" />
              Buy Now
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
