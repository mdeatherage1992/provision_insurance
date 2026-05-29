import Link from 'next/link'
import Container from '@/components/shared/Container'
import SectionHeading from '@/components/shared/SectionHeading'
import type { Locale } from '@/i18n/config'

interface ServicesOverviewProps {
  familyCardTitle: string
  familyCardBody: string
  familyCardCta: string
  businessCardTitle: string
  businessCardBody: string
  businessCardCta: string
  headline?: string
  locale: Locale
}

export default function ServicesOverview({
  familyCardTitle,
  familyCardBody,
  familyCardCta,
  businessCardTitle,
  businessCardBody,
  businessCardCta,
  headline,
  locale,
}: ServicesOverviewProps) {
  return (
    <section id="services" className="py-20 bg-background-cream">
      <Container>
        {headline && <SectionHeading headline={headline} />}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Family card */}
          <div className="bg-white rounded-xl p-8 border border-light-gold shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-primary-gold mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10" aria-hidden="true">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-bold text-dark mb-4">{familyCardTitle}</h3>
            <p className="text-dark/70 leading-relaxed mb-6">{familyCardBody}</p>
            <Link
              href={`/${locale}/personal-lines`}
              className="text-primary-gold font-semibold hover:underline group-hover:translate-x-1 transition-transform inline-block"
            >
              {familyCardCta}
            </Link>
          </div>

          {/* Business card */}
          <div className="bg-white rounded-xl p-8 border border-light-gold shadow-sm hover:shadow-md transition-shadow group">
            <div className="text-primary-gold mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-10 h-10" aria-hidden="true">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <h3 className="font-heading text-2xl font-bold text-dark mb-4">{businessCardTitle}</h3>
            <p className="text-dark/70 leading-relaxed mb-6">{businessCardBody}</p>
            <Link
              href={`/${locale}/commercial-lines`}
              className="text-primary-gold font-semibold hover:underline group-hover:translate-x-1 transition-transform inline-block"
            >
              {businessCardCta}
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
