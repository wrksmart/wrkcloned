import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'wrkflow Solutions Pricing — wrksourcing',
  description:
    'One-time assessments starting at $1,800 CAD. Pick a tier, get the strategy report, then decide how to execute. No subscriptions.',
  openGraph: {
    title: 'wrkflow Solutions Pricing — wrksourcing',
    description: 'Assessment tiers: Focus ($1,800), Momentum ($3,500), Transform ($5,000). One-time. No subscriptions.',
    url: 'https://wrksourcing.com/pricing',
    siteName: 'wrksourcing',
    type: 'website',
  },
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
