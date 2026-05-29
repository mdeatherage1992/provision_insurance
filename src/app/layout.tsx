import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Maria Nunez Insurance',
  description: 'Licensed Insurance Adviser — Health, Life, and Property & Casualty insurance in Florida and beyond.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
