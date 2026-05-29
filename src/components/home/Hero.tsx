import Link from 'next/link'
import Container from '@/components/shared/Container'
import type { Locale } from '@/i18n/config'

interface HeroProps {
  headline: string
  subheadline: string
  body: string
  primaryCtaText: string
  secondaryCtaText: string
  locale: Locale
}

export default function Hero({ headline, subheadline, body, primaryCtaText, secondaryCtaText, locale }: HeroProps) {
  return (
    <section className="relative bg-background-cream py-20 lg:py-32 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-background-cream via-secondary-cream to-background-cream opacity-70" aria-hidden="true" />

      <Container className="relative z-10">
        <div className="max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-dark tracking-tight leading-tight mb-6">
            {headline}
          </h1>
          <p className="text-xl sm:text-2xl text-dark/80 font-medium mb-6 leading-snug">
            {subheadline}
          </p>
          <p className="text-lg text-dark/70 leading-relaxed mb-10 max-w-2xl">
            {body}
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href={`/${locale}/contact`}
              className="bg-primary-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors duration-200 shadow-sm"
            >
              {primaryCtaText}
            </Link>
            <a
              href="#services"
              className="border-2 border-primary-gold text-primary-gold px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-gold hover:text-white transition-all duration-200"
            >
              {secondaryCtaText}
            </a>
          </div>
        </div>
      </Container>

      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary-gold/40" aria-hidden="true" />
    </section>
  )
}
