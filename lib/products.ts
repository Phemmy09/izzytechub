export type ProductType = 'eBook' | 'Audio' | 'Video' | 'Template' | 'Course'

export interface Product {
  id: string
  title: string
  type: ProductType
  price: number | 'Free'
  description: string
  image: string
  /** Whop checkout URL — paste your https://whop.com/checkout/plan_xxxx/ link here */
  whopCheckoutUrl?: string
  /** For free products — direct download link */
  downloadUrl?: string
  features: string[]
}

export const products: Product[] = [
  {
    id: 'ai-agency-blueprint',
    title: 'The AI Agency Blueprint',
    type: 'eBook',
    price: 49.99,
    description:
      'A step-by-step guide to starting and scaling your own AI automation agency from scratch. Covers positioning, pricing, client acquisition, and service delivery.',
    image: 'https://picsum.photos/seed/blueprint/600/400',
    // Replace with your Whop checkout link: https://whop.com/checkout/plan_xxxx/
    whopCheckoutUrl: 'https://whop.com',
    features: [
      'Complete agency setup framework',
      'Client acquisition scripts & templates',
      'Pricing & packaging guide',
      'Service delivery workflows',
      'Lifetime updates included',
    ],
  },
  {
    id: 'automation-mastery-audio',
    title: 'Automation Mastery Audio',
    type: 'Audio',
    price: 19.99,
    description:
      'Listen on the go. Expert insights on workflow optimization and productivity hacks packed into an audio series you can consume anywhere.',
    image: 'https://picsum.photos/seed/audio/600/400',
    // Replace with your Whop checkout link: https://whop.com/checkout/plan_xxxx/
    whopCheckoutUrl: 'https://whop.com',
    features: [
      '6+ hours of expert content',
      'Workflow optimization tactics',
      'AI tool deep-dives',
      'Downloadable MP3 format',
      'Bonus cheat sheets included',
    ],
  },
  {
    id: 'sales-funnel-template-pack',
    title: 'Sales Funnel Template Pack',
    type: 'Template',
    price: 'Free',
    description:
      'High-converting funnel templates for ClickFunnels and GoHighLevel. Completely free — grab and deploy in minutes.',
    image: 'https://picsum.photos/seed/funnel/600/400',
    downloadUrl: '/downloads/sales-funnel-templates.zip',
    features: [
      'ClickFunnels & GoHighLevel ready',
      'Lead capture + upsell pages',
      'Thank you page templates',
      'Email follow-up sequences',
      'No credit card required',
    ],
  },
  {
    id: 'freelance-to-founder',
    title: 'Freelance to Founder System',
    type: 'eBook',
    price: 29.99,
    description:
      'Transition from a gig worker to a business owner with this comprehensive framework. Build systems, hire smarter, and reclaim your time.',
    image: 'https://picsum.photos/seed/founder/600/400',
    // Replace with your Whop checkout link: https://whop.com/checkout/plan_xxxx/
    whopCheckoutUrl: 'https://whop.com',
    features: [
      'Business systemisation framework',
      'Hiring & delegation playbook',
      'Revenue diversification strategies',
      'Mindset shift exercises',
      'Editable Notion templates',
    ],
  },
]
