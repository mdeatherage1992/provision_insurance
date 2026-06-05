import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Container from '@/components/shared/Container'
import QuoteForm from '@/components/forms/QuoteForm'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'es'
      ? 'Contacto — Solicitar Cotización | Provision Insurance Miami'
      : 'Contact — Request a Quote | Provision Insurance Miami',
    description: locale === 'es'
      ? 'Solicita una cotización de seguro o agenda una llamada. Contáctanos por teléfono, WhatsApp o correo electrónico. Atención en inglés y español.'
      : 'Request an insurance quote or schedule a call. Reach us by phone, WhatsApp, or email. Serving clients in English and Spanish.',
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Provision Insurance — Contact',
  mainEntity: {
    '@type': 'InsuranceAgency',
    name: 'Provision Insurance',
    telephone: '+17865680877',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1395 Brickell Ave, Suite 900',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33131',
    },
  },
}

export const dynamic = 'force-static'

export default async function ContactPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'contact' })

  const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/provisionassurance/30min'

  const contactItems = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      ),
      label: '+1 (786) 568-0877',
      href: 'tel:+17865680877',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      ),
      label: '1395 Brickell Ave, Suite 900, Miami FL 33131',
      href: 'https://maps.google.com/?q=1395+Brickell+Ave+Suite+900+Miami+FL+33131',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5"/>
          <circle cx="12" cy="12" r="4"/>
          <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
        </svg>
      ),
      label: '@Provisioninsurance',
      href: 'https://www.instagram.com/provisioninsurance',
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
      label: locale === 'es' ? 'Lun–Vie: 9:00 AM – 6:00 PM' : 'Monday – Friday: 9:00 AM – 6:00 PM',
      href: null,
    },
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div>
        {/* Hero */}
        <section className="py-16 lg:py-24 bg-background-cream border-b border-light-gold/60">
          <Container>
            <div className="max-w-3xl">
              <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark tracking-tight mb-6">
                {t('headline')}
              </h1>
              <p className="text-xl text-dark/70 leading-relaxed">{t('subheadline')}</p>
            </div>
          </Container>
        </section>

        <section className="py-16 bg-background-cream">
          <Container>
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Left: contact info + Calendly */}
              <div className="space-y-8">
                {/* Contact info */}
                <div className="bg-white rounded-xl p-6 border border-light-gold shadow-sm">
                  <ul className="space-y-4">
                    {contactItems.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-primary-gold mt-0.5 flex-shrink-0">{item.icon}</span>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={item.href.startsWith('http') ? '_blank' : undefined}
                            rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="text-dark hover:text-primary-gold transition-colors"
                          >
                            {item.label}
                          </a>
                        ) : (
                          <span className="text-dark">{item.label}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-dark/60 text-sm">
                    {locale === 'es'
                      ? 'También hacemos todo lo posible por estar disponibles los fines de semana y fuera del horario habitual — no dudes en comunicarte.'
                      : "We also do our best to be available on weekends and after hours — don't hesitate to reach out."}
                  </p>
                </div>

                {/* Calendly link */}
                <div className="bg-secondary-cream rounded-xl p-6 border border-light-gold/60">
                  <p className="text-dark/70 mb-4">{t('calendlyLabel')}</p>
                  <a
                    href={calendlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border-2 border-primary-gold text-primary-gold px-6 py-3 rounded-full font-semibold hover:bg-primary-gold hover:text-white transition-all duration-200"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                      <line x1="16" y1="2" x2="16" y2="6"/>
                      <line x1="8" y1="2" x2="8" y2="6"/>
                      <line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                    {locale === 'es' ? 'Agendar una Llamada' : 'Schedule a Call'}
                  </a>
                </div>

                {/* Google Maps embed */}
                <div className="rounded-xl overflow-hidden border border-light-gold shadow-sm h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3593.1!2d-80.1918!3d25.7617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s1395+Brickell+Ave+Suite+900+Miami+FL+33131!5e0!3m2!1sen!2sus!4v1"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title={locale === 'es' ? 'Ubicación de la oficina en el mapa' : 'Office location map'}
                  />
                </div>
              </div>

              {/* Right: Quote form */}
              <div>
                <div className="bg-white rounded-xl p-8 border border-light-gold shadow-sm">
                  <h2 className="font-heading text-2xl font-bold text-dark mb-6">
                    {locale === 'es' ? 'Solicitar Cotización' : 'Request a Quote'}
                  </h2>
                  <QuoteForm />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </div>
    </>
  )
}
