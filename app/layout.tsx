import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ChatWidget from '@/components/ChatWidget'

export const metadata: Metadata = {
  title: {
    default: 'Izzytechub | AI Automation & Consulting Agency',
    template: '%s | Izzytechub',
  },
  description:
    'Premier AI Agency for Automation, App Development, Lead Generation, and Consulting. Led by Israel O. Dare. We build intelligent systems that scale your business.',
  keywords: ['AI automation', 'AI consulting', 'app development', 'lead generation', 'Israel Dare', 'izzytechub'],
  openGraph: {
    title: 'Izzytechub | AI Automation & Consulting Agency',
    description: 'We build intelligent infrastructures that automate operations, generate leads, and drive revenue.',
    url: 'https://izzytechub.com',
    siteName: 'Izzytechub',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Izzytechub | AI Automation & Consulting Agency',
    description: 'We build intelligent infrastructures that automate operations, generate leads, and drive revenue.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <ChatWidget />
      </body>
    </html>
  )
}
