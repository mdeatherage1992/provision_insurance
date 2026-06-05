import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import type { Locale } from '@/i18n/config'
import Hero from '@/components/home/Hero'
import TrustBar from '@/components/home/TrustBar'
import ServicesOverview from '@/components/home/ServicesOverview'
import WhyWorkWithUs from '@/components/home/WhyWorkWithUs'
import Testimonials from '@/components/home/Testimonials'
import InstagramFeed from '@/components/home/InstagramFeed'
import FinalCTA from '@/components/home/FinalCTA'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })

  return {
    title: locale === 'es'
      ? 'Provision Insurance — Seguro de Salud, Vida y Más | Miami, FL'
      : 'Provision Insurance — Health, Life & More | Miami, FL',
    description: locale === 'es'
      ? 'Asesora de seguros independiente en Miami. Seguros de salud, vida, dental, Medicare, auto y comerciales. Servicio en inglés y español.'
      : 'Independent insurance adviser in Miami. Health, life, dental, Medicare, auto, and commercial insurance. Serving clients in English and Spanish.',
    openGraph: {
      title: 'Provision Insurance',
      description: t('subheadline'),
      type: 'website',
      locale: locale === 'es' ? 'es_US' : 'en_US',
    },
  }
}

const defaultWhyColumns = {
  en: [
    { title: "We're Independent", body: 'We work with many carriers so we always find the best option for you, not for us.' },
    { title: "We're Accessible", body: 'Call, text, or WhatsApp us. We respond within 2 hours and we go above and beyond regular business hours.' },
    { title: 'We Speak Your Language', body: 'We serve our clients in English and Spanish, and we understand the needs of diverse communities across Florida and beyond.' },
  ],
  es: [
    { title: 'Somos Independientes', body: 'Trabajamos con muchas aseguradoras para siempre encontrar la mejor opción para ti, no para nosotros.' },
    { title: 'Somos Accesibles', body: 'Llámanos, escríbenos o contáctanos por WhatsApp. Respondemos en menos de 2 horas y estamos disponibles más allá del horario habitual.' },
    { title: 'Hablamos Tu Idioma', body: 'Atendemos a nuestros clientes en inglés y español, y entendemos las necesidades de las comunidades diversas en toda la Florida y más allá.' },
  ],
}

const defaultReviews = {
  en: [
    { author: 'Ana García', location: 'Miami, FL', rating: 5, text: 'Maria went above and beyond to find us the right health plan for our whole family. She explained everything clearly and never made us feel rushed. I recommend her to everyone I know.' },
    { author: 'Carlos Mendoza', location: 'Doral, FL', rating: 5, text: "As a small business owner, I was overwhelmed with insurance options. Maria simplified everything and got me exactly what I needed at a price I could afford. She's the best in the business." },
    { author: 'Jennifer Torres', location: 'Hialeah, FL', rating: 5, text: "I called Maria on a Saturday afternoon and she answered right away. She spent over an hour with me going over my Medicare options. That kind of dedication is rare. I'm so grateful." },
  ],
  es: [
    { author: 'Ana García', location: 'Miami, FL', rating: 5, text: 'Maria hizo todo lo posible para encontrar el plan de salud correcto para toda nuestra familia. Explicó todo con claridad y nunca nos hizo sentir apresurados. La recomiendo a todos los que conozco.' },
    { author: 'Carlos Mendoza', location: 'Doral, FL', rating: 5, text: 'Como dueño de un pequeño negocio, estaba abrumado con las opciones de seguro. Maria simplificó todo y me consiguió exactamente lo que necesitaba a un precio que podía pagar. Es la mejor en su campo.' },
    { author: 'Jennifer Torres', location: 'Hialeah, FL', rating: 5, text: 'Llamé a Maria un sábado por la tarde y respondió de inmediato. Pasó más de una hora conmigo revisando mis opciones de Medicare. Esa clase de dedicación es poco común. Estoy muy agradecida.' },
  ],
}

export const revalidate = 3600

export default async function HomePage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'hero' })
  const tw = await getTranslations({ locale, namespace: 'why' })
  const ts = await getTranslations({ locale, namespace: 'services' })
  const tFinal = await getTranslations({ locale, namespace: 'finalCta' })
  const tInsta = await getTranslations({ locale, namespace: 'instagram' })
  const tTestimonials = await getTranslations({ locale, namespace: 'testimonials' })

  // Try to fetch live Google reviews, fall back to defaults
  let reviews = defaultReviews[locale as 'en' | 'es']
  try {
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
    const res = await fetch(`${baseUrl}/api/reviews`, { next: { revalidate: 86400 } })
    if (res.ok) {
      const data = await res.json()
      if (data.reviews && data.reviews.length > 0) {
        reviews = data.reviews
      }
    }
  } catch {
    // Use defaults
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'InsuranceAgency'],
    name: 'Provision Insurance',
    description: 'Independent insurance adviser offering health, life, dental, Medicare, auto, and commercial insurance.',
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    telephone: '+17865680877',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1395 Brickell Ave, Suite 900',
      addressLocality: 'Miami',
      addressRegion: 'FL',
      postalCode: '33131',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 25.7617,
      longitude: -80.1918,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero
        headline={t('headline')}
        subheadline={t('subheadline')}
        body={t('body')}
        primaryCtaText={t('primaryCta')}
        secondaryCtaText={t('secondaryCta')}
        locale={locale as Locale}
      />
      <TrustBar locale={locale} />
      <ServicesOverview
        headline={ts('headline')}
        familyCardTitle={ts('family.title')}
        familyCardBody={ts('family.body')}
        familyCardCta={ts('family.cta')}
        businessCardTitle={ts('business.title')}
        businessCardBody={ts('business.body')}
        businessCardCta={ts('business.cta')}
        locale={locale as Locale}
      />
      <WhyWorkWithUs
        headline={tw('headline')}
        columns={defaultWhyColumns[locale as 'en' | 'es']}
      />
      <Testimonials
        headline={tTestimonials('headline')}
        reviews={reviews}
      />
      <InstagramFeed
        headline={tInsta('headline')}
        beholdFeedId={process.env.BEHOLD_FEED_ID}
      />
      <FinalCTA
        text={tFinal('text')}
        buttonText={tFinal('button')}
      />
    </>
  )
}
