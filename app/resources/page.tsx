import type { Metadata } from 'next'
import { products } from '@/lib/products'
import ProductsClient from './ProductsClient'

export const metadata: Metadata = {
  title: 'Digital Products Hub',
  description:
    'Resources to accelerate your growth — eBooks, Audio Courses, and Video Masterclasses curated by Israel O. Dare.',
}

export default function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-black pt-24 pb-12 px-4 border-b border-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-brand-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Blueprints, templates, and courses
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Digital Products Hub
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Resources to accelerate your growth — eBooks, Audio Courses, and Video Masterclasses
            curated by Israel O. Dare.
          </p>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <ProductsClient products={products} />
        </div>
      </section>

      {/* Custom work CTA */}
      <section className="py-16 px-4 border-t border-neutral-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Need a Custom Solution?</h2>
          <p className="text-neutral-400 mb-6">
            Can't find what you're looking for? We build tailored AI systems for businesses of all sizes.
          </p>
          <a href="/contact" className="btn-primary inline-flex items-center gap-2">
            Let's Talk
          </a>
        </div>
      </section>
    </>
  )
}
