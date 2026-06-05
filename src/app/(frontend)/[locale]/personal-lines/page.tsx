import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Link from 'next/link'
import Container from '@/components/shared/Container'
import ServiceCard from '@/components/shared/ServiceCard'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'es'
      ? 'Seguros Personales — Salud, Vida, Dental, Medicare | Provision Insurance'
      : 'Personal Insurance — Health, Life, Dental, Medicare | Provision Insurance',
    description: locale === 'es'
      ? 'Seguros de salud, vida, dental, Medicare, beneficios suplementarios y auto. Cobertura para ti y tu familia en Florida y 7 estados más.'
      : 'Health, life, dental, Medicare, supplemental benefits, and auto insurance. Coverage for you and your family in Florida and 7 more states.',
  }
}

const servicesEN = [
  { icon: 'stethoscope', title: 'Health Insurance', description: 'Coverage for doctor visits, hospital stays, prescriptions, and preventive care. We work with all ACA carriers and find the best plan for your budget and needs.' },
  { icon: 'heart', title: 'Life Insurance', description: 'Financial protection for the people who depend on you. If something happens to you, we make sure your family is taken care of.' },
  { icon: 'smile', title: 'Dental Plans', description: 'Because your health starts with your smile. Individual and family dental plans that fit your budget.' },
  { icon: 'shield', title: 'Medicare Coverage', description: "Turning 65 or navigating Medicare for the first time? We make it simple and make sure you get every benefit you're entitled to." },
  { icon: 'plus', title: 'Supplemental Benefits', description: "Extra coverage that fills the gaps your main insurance doesn't cover — like hospital stays, accidents, or critical illness." },
  { icon: 'car', title: 'Car Insurance', description: 'Stop overpaying for auto coverage. We shop multiple carriers to get you the right protection at the right price.' },
]

const servicesES = [
  { icon: 'stethoscope', title: 'Seguro Médico', description: 'Cobertura para visitas médicas, hospitalizaciones, medicamentos y atención preventiva. Trabajamos con todas las aseguradoras del mercado ACA y encontramos el plan ideal para tu presupuesto y necesidades.' },
  { icon: 'heart', title: 'Seguro de Vida', description: 'Protección financiera para las personas que dependen de ti. Si algo llegara a ocurrirte, nos aseguramos de que tu familia esté protegida.' },
  { icon: 'smile', title: 'Planes Dentales', description: 'Porque tu salud comienza con tu sonrisa. Planes dentales individuales y familiares que se adaptan a tu presupuesto.' },
  { icon: 'shield', title: 'Cobertura Medicare', description: '¿Vas a cumplir 65 años o te enfrentas a Medicare por primera vez? Lo hacemos sencillo y nos aseguramos de que aproveches todos los beneficios a los que tienes derecho.' },
  { icon: 'plus', title: 'Beneficios Suplementarios', description: 'Cobertura adicional que llena los vacíos que tu seguro principal no cubre — como hospitalizaciones, accidentes o enfermedades graves.' },
  { icon: 'car', title: 'Seguro de Auto', description: 'Deja de pagar de más por tu seguro de auto. Comparamos múltiples aseguradoras para conseguirte la protección correcta al precio justo.' },
]

export const dynamic = 'force-static'

export default async function PersonalLinesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'personalLines' })

  const services = locale === 'es' ? servicesES : servicesEN

  const intro = locale === 'es'
    ? "No necesitas ser un experto en seguros para asegurarte de que tu familia esté protegida. Para eso estamos aquí. Te explicamos las opciones en un lenguaje claro, comparamos planes de múltiples aseguradoras y nos aseguramos de que solo pagues por lo que realmente necesitas."
    : "You shouldn't need to be an insurance expert to make sure your family is protected. That's what we're here for. We'll explain your options in plain language, compare plans across many carriers, and make sure you only pay for what you actually need."

  const carrierNote = locale === 'es'
    ? "Contamos con contratos con todas las principales aseguradoras — lo que significa que comparamos todo el mercado en tu nombre. Obtienes el mejor plan disponible, no solo lo que una empresa ofrece."
    : "We are appointed with all major carriers — meaning we shop the entire market on your behalf. You get the best plan available, not just what one company offers."

  const licensingNote = locale === 'es'
    ? "Tenemos licencia para ofrecer seguros de Salud y Vida en Florida, Texas, Missouri, Maryland, Virginia, Carolina del Norte, Carolina del Sur y Georgia."
    : "We are licensed to offer Health and Life insurance in Florida, Texas, Missouri, Maryland, Virginia, North Carolina, South Carolina, and Georgia."

  const bottomCta = locale === 'es'
    ? "¿No sabes qué cobertura necesitas? Llámanos — te explicaremos todo."
    : "Not sure what coverage you need? Call us — we'll walk you through everything."

  return (
    <div>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-background-cream border-b border-light-gold/60">
        <Container>
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark tracking-tight mb-6">
              {t('headline')}
            </h1>
            <p className="text-xl text-dark/70 leading-relaxed">{intro}</p>
          </div>
        </Container>
      </section>

      {/* Services grid */}
      <section className="py-16 bg-background-cream" aria-label="Personal insurance services">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <ServiceCard key={i} title={svc.title} description={svc.description} icon={svc.icon} />
            ))}
          </div>

          {/* Carrier note */}
          <div className="mt-12 bg-secondary-cream border border-primary-gold/40 rounded-xl p-6 max-w-3xl mx-auto text-center">
            <p className="text-dark/80 leading-relaxed">
              <span className="font-semibold text-primary-gold">
                {locale === 'es' ? '¿Por qué trabajar con nosotros? ' : 'Why work with us? '}
              </span>
              {carrierNote}
            </p>
          </div>

          {/* Licensing note */}
          <p className="mt-6 text-center text-dark/60 text-sm max-w-2xl mx-auto">
            {licensingNote}
          </p>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-secondary-cream">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xl text-dark/80 leading-relaxed mb-8">{bottomCta}</p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 bg-primary-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              {t('getQuote')}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  )
}
