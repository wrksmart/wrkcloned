import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'wrksourcing — Workflow Solutions for Entrepreneurs and SMBs',
  description:
    'We audit your operations, build the systems, and deploy trained specialists across North American hours. Systems first. People second.',
  metadataBase: new URL('https://wrksourcing.com'),
  openGraph: {
    title: 'wrksourcing — Workflow Solutions for Entrepreneurs and SMBs',
    description:
      'Expert support for growing companies. 200,000+ hours delivered across Canada.',
    url: 'https://wrksourcing.com',
    siteName: 'wrksourcing',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'wrksourcing — Workflow Solutions for Entrepreneurs and SMBs',
    description: 'Expert support for growing companies.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
