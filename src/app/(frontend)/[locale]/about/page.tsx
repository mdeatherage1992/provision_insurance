import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import Image from 'next/image'
import Link from 'next/link'
import Container from '@/components/shared/Container'
import type { Locale } from '@/i18n/config'

type Props = {
  params: Promise<{ locale: Locale }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  return {
    title: locale === 'es'
      ? 'Nosotros — Provision Insurance | Miami, FL'
      : 'About — Provision Insurance | Miami, FL',
    description: locale === 'es'
      ? 'Conoce a Maria Nunez, asesora de seguros licenciada en Miami. Su historia, su misión y su compromiso con las familias que sirve.'
      : 'Meet Maria Nunez, licensed insurance adviser in Miami. Her story, her mission, and her commitment to the families she serves.',
  }
}

export const dynamic = 'force-static'

export default async function AboutPage({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'about' })
  const tn = await getTranslations({ locale, namespace: 'nav' })

  const bodyEN = [
    "My name is Maria Nunez. I am a Licensed Insurance Adviser and the founder of this agency. I was born and raised in Venezuela, and I moved to the United States in 2018 with my parents and my brother — chasing the same dream that brings so many families here: to build something better.",
    "Before insurance, I studied medicine. I spent a year in medical school because my goal has always been to help people. When I discovered the insurance industry, I found something that let me do exactly that — protect families, guide individuals through some of the most important decisions of their lives, and make sure no one ever feels alone when navigating something as overwhelming as insurance.",
    "I didn't plan for this career — it found me. A mentor early on saw something in me and encouraged me to pursue it. From my very first client, I knew this was where I was meant to be.",
    "Today, I am proud to serve individuals, families, and business owners across Florida and beyond. My clients come from all walks of life — and many of them call me because a friend gave them my number and told them I was the best. That means everything to me. It tells me that the people I work with feel genuinely taken care of.",
    "What makes us different is simple: we are independent. We are not tied to any one insurance company. We work with many carriers so we can always find the right coverage for your specific situation — not the easiest sale for us.",
    "I am family-oriented to my core. I am here building something — not just a business, but a legacy. And the way I see it, every client I protect is a family I get to be part of.",
    "If you are looking for someone who will treat your insurance needs with the same care they would give their own family — you are in the right place.",
    "Let's talk. Call us anytime — we are always happy to help.",
  ]

  const bodyES = [
    "Me llamo Maria Nunez. Soy Asesora de Seguros Licenciada y fundadora de esta agencia. Nací y crecí en Venezuela, y me mudé a los Estados Unidos en 2018 con mis padres y mi hermano — persiguiendo el mismo sueño que trae a tantas familias aquí: construir algo mejor.",
    "Antes de los seguros, estudié medicina. Pasé un año en la escuela de medicina porque mi objetivo siempre ha sido ayudar a las personas. Cuando descubrí la industria de los seguros, encontré algo que me permitía hacer exactamente eso — proteger familias, guiar a personas en algunas de las decisiones más importantes de sus vidas, y asegurarme de que nadie se sienta solo al navegar algo tan abrumador como los seguros.",
    "No planeé esta carrera — ella me encontró a mí. Un mentor que tuve al principio vio algo en mí y me alentó a seguirla. Desde mi primer cliente, supe que era aquí donde debía estar.",
    "Hoy me enorgullece servir a personas, familias y dueños de negocios en toda la Florida y más allá. Mis clientes vienen de todos los ámbitos de la vida — y muchos de ellos me llaman porque un amigo les dio mi número y les dijo que era la mejor. Eso lo significa todo para mí. Me dice que las personas con quienes trabajo se sienten genuinamente atendidas.",
    "Lo que nos hace diferentes es simple: somos independientes. No estamos atados a ninguna compañía de seguros. Trabajamos con muchas aseguradoras para siempre encontrar la cobertura correcta para tu situación específica — no la venta más fácil para nosotros.",
    "Soy profundamente familiar en mi esencia. Estoy aquí construyendo algo — no solo un negocio, sino un legado. Y como yo lo veo, cada cliente que protejo es una familia de la que tengo el privilegio de formar parte.",
    "Si buscas a alguien que trate tus necesidades de seguro con el mismo cuidado que le daría a su propia familia — estás en el lugar correcto.",
    "Hablemos. Llámanos en cualquier momento — siempre estamos felices de ayudar.",
  ]

  const body = locale === 'es' ? bodyES : bodyEN

  const credentialsEN = [
    'Licensed Insurance Adviser',
    'Health Insurance: FL, TX, MO, MD, VA, NC, SC, GA',
    'Life Insurance: FL, TX, MO, MD, VA, NC, SC, GA',
    'Property & Casualty: Florida',
  ]

  const credentialsES = [
    'Asesora de Seguros Licenciada',
    'Seguro Médico: FL, TX, MO, MD, VA, NC, SC, GA',
    'Seguro de Vida: FL, TX, MO, MD, VA, NC, SC, GA',
    'Propiedad y Accidentes: Florida',
  ]

  const credentials = locale === 'es' ? credentialsES : credentialsEN

  return (
    <div>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-background-cream border-b border-light-gold/60">
        <Container>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-dark tracking-tight max-w-3xl">
            {t('headline')}
          </h1>
        </Container>
      </section>

      {/* Body */}
      <section className="py-16 bg-background-cream">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {body.map((paragraph, i) => (
                <p key={i} className="text-dark/80 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}

              <div className="pt-6">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 bg-primary-gold text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-amber-700 transition-colors"
                >
                  {tn('getQuote')}
                </Link>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-8">
              {/* Credentials */}
              <div className="bg-white rounded-xl p-6 border border-light-gold shadow-sm">
                <h2 className="font-heading text-lg font-bold text-dark mb-4">{t('credentialsTitle')}</h2>
                <ul className="space-y-3">
                  {credentials.map((cred, i) => (
                    <li key={i} className="flex items-start gap-2 text-dark/70 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#B8903A" strokeWidth="2.5" className="w-4 h-4 mt-0.5 flex-shrink-0" aria-hidden="true">
                        <polyline points="20 6 9 17 4 12"/>
                      </svg>
                      {cred}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company logos */}
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-6 border border-light-gold shadow-sm flex items-center gap-4">
                  <Image src="/images/provision_nobg.png" alt="Provision Insurance logo" width={64} height={64} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-dark">Provision Insurance</p>
                    <p className="text-dark/60 text-sm">
                      {locale === 'es' ? 'Especialistas en Salud y Vida' : 'Specializing in Health & Life coverage'}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 border border-light-gold shadow-sm flex items-center gap-4">
                  <Image src="/images/good_deal_nobg.png" alt="Good Deal Insurance Agency logo" width={64} height={64} className="flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-dark">Good Deal Insurance Agency</p>
                    <p className="text-dark/60 text-sm">
                      {locale === 'es' ? 'Especialistas en Propiedad y Accidentes' : 'Specializing in Property & Casualty coverage'}
                    </p>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </section>
    </div>
  )
}
