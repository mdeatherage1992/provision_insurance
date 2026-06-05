import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://provisionassurance.com'),
  title: 'Provision Insurance — Maria Nunez | Miami, FL',
  description: 'Licensed Insurance Adviser — Health, Life, and Property & Casualty insurance in Florida and beyond.',
  openGraph: {
    siteName: 'Provision Insurance',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@provision_insurance',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/images/provision_nobg.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
