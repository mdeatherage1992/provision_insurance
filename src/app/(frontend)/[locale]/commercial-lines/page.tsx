import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
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
      ? 'Seguros Comerciales — Responsabilidad, Camiones, Auto | Maria Nunez'
      : 'Commercial Insurance — Liability, Truckers, Commercial Auto | Maria Nunez',
    description: locale === 'es'
      ? 'Seguros comerciales en Florida: responsabilidad civil, profesional, camioneros, auto comercial, BOP y compensación laboral.'
      : 'Commercial insurance in Florida: general liability, professional, truckers, commercial auto, BOP, and workers compensation.',
  }
}

const servicesEN = [
  { icon: 'shield', title: 'General Liability', description: 'Protects your business if a customer or third party makes a claim against you for injury or property damage.' },
  { icon: 'file-text', title: 'Professional Liability (E&O)', description: 'If a client claims your advice or service caused them a financial loss, this coverage has your back.' },
  { icon: 'truck', title: 'Truckers Insurance', description: 'Specialized coverage for owner-operators and trucking companies — on the road and off.' },
  { icon: 'car', title: 'Commercial Auto', description: "Covers your business vehicles and the people who drive them, whether it's one van or a full fleet." },
  { icon: 'briefcase', title: 'Business Owner Policy (BOP)', description: 'A bundled plan that combines general liability and property coverage — ideal for small and medium businesses.' },
  { icon: 'hard-hat', title: "Workers' Compensation", description: 'Required in Florida for most businesses. Protects your employees and your company in the event of a workplace injury.' },
]

const servicesES = [
  { icon: 'shield', title: 'Responsabilidad Civil General', description: 'Protege tu negocio si un cliente o tercero presenta un reclamo contra ti por lesiones o daños a la propiedad.' },
  { icon: 'file-text', title: 'Responsabilidad Profesional (E&O)', description: 'Si un cliente alega que tu asesoría o servicio le causó una pérdida económica, esta cobertura te respalda.' },
  { icon: 'truck', title: 'Seguro para Camioneros', description: 'Cobertura especializada para propietarios-operadores y empresas de transporte — en carretera y fuera de ella.' },
  { icon: 'car', title: 'Auto Comercial', description: 'Cubre los vehículos de tu negocio y a las personas que los conducen, ya sea una sola van o toda una flota.' },
  { icon: 'briefcase', title: 'Póliza para Propietarios de Negocio (BOP)', description: 'Un plan combinado que une la responsabilidad civil y la cobertura de propiedad — ideal para pequeñas y medianas empresas.' },
  { icon: 'hard-hat', title: 'Compensación Laboral', description: 'Obligatoria en Florida para la mayoría de los negocios. Protege a tus empleados y a tu empresa en caso de lesión laboral.' },
]

export const dynamic = 'force-static'

export default async function CommercialLinesPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'commercialLines' })

  const services = locale === 'es' ? servicesES : servicesEN
  const calendlyUrl = process.env.CALENDLY_URL || 'https://calendly.com/marianunez/insurance-consultation'

  const intro = locale === 'es'
    ? "Todo negocio enfrenta riesgos. Ya sea que estés comenzando o llevas años operando, el seguro correcto garantiza que un evento inesperado no ponga en riesgo todo lo que has construido. Trabajamos con dueños de negocios en toda la Florida para encontrar cobertura que realmente se adapte — no una póliza universal."
    : "Every business faces risk. Whether you're just starting out or have been running your operation for years, the right insurance makes sure one unexpected event doesn't put everything you've built at risk. We work with business owners across Florida to find coverage that actually fits — not a one-size-fits-all policy."

  const carrierNote = locale === 'es'
    ? "Trabajamos con muchas aseguradoras comerciales en toda la Florida para encontrar la opción correcta para tu industria, tu tamaño y tu presupuesto."
    : "We work with many commercial carriers across Florida so we can find the right fit for your industry, your size, and your budget."

  const licensingNote = locale === 'es'
    ? "Los servicios de seguros comerciales están disponibles para negocios que operan en el estado de Florida."
    : "Commercial insurance services are available for businesses operating in the state of Florida."

  const bottomCta = locale === 'es'
    ? "¿No sabes qué necesita tu negocio? Hablemos — revisaremos tu situación y nos aseguraremos de que estés debidamente cubierto."
    : "Not sure what your business needs? Let's talk — we'll review your situation and make sure you're properly covered."

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
      <section className="py-16 bg-background-cream" aria-label="Commercial insurance services">
        <Container>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <ServiceCard key={i} title={svc.title} description={svc.description} icon={svc.icon} />
            ))}
          </div>

          {/* Carrier note */}
          <div className="mt-12 bg-secondary-cream border border-primary-gold/40 rounded-xl p-6 max-w-3xl mx-auto text-center">
            <p className="text-dark/80 leading-relaxed">{carrierNote}</p>
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
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              {t('scheduleCall')}
            </a>
          </div>
        </Container>
      </section>
    </div>
  )
}
