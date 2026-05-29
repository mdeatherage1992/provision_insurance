import 'dotenv/config'
import { getPayload } from 'payload'
import config from '../src/payload.config'

async function seed() {
  const payload = await getPayload({ config })

  console.log('🌱 Starting seed...')

  // ── Admin user ─────────────────────────────────────────────────────────────
  const email = process.env.ADMIN_EMAIL ?? 'admin@example.com'
  const password = process.env.ADMIN_PASSWORD ?? 'Admin1234!'

  const existingUsers = await payload.find({ collection: 'users', where: { email: { equals: email } } })
  if (existingUsers.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: { email, password, role: 'admin' },
    })
    console.log(`✅ Admin user created: ${email}`)
  } else {
    console.log(`⏭  Admin user already exists: ${email}`)
  }

  // ── Services — Personal ────────────────────────────────────────────────────
  const personalServices = [
    {
      titleEN: 'Health Insurance',
      titleES: 'Seguro Médico',
      descEN: 'Coverage for doctor visits, hospital stays, prescriptions, and preventive care. We work with all ACA carriers and find the best plan for your budget and needs.',
      descES: 'Cobertura para visitas médicas, hospitalizaciones, medicamentos y atención preventiva. Trabajamos con todas las aseguradoras del mercado ACA y encontramos el plan ideal para tu presupuesto y necesidades.',
      icon: 'stethoscope',
      order: 1,
    },
    {
      titleEN: 'Life Insurance',
      titleES: 'Seguro de Vida',
      descEN: 'Financial protection for the people who depend on you. If something happens to you, we make sure your family is taken care of.',
      descES: 'Protección financiera para las personas que dependen de ti. Si algo llegara a ocurrirte, nos aseguramos de que tu familia esté protegida.',
      icon: 'heart',
      order: 2,
    },
    {
      titleEN: 'Dental Plans',
      titleES: 'Planes Dentales',
      descEN: 'Because your health starts with your smile. Individual and family dental plans that fit your budget.',
      descES: 'Porque tu salud comienza con tu sonrisa. Planes dentales individuales y familiares que se adaptan a tu presupuesto.',
      icon: 'smile',
      order: 3,
    },
    {
      titleEN: 'Medicare Coverage',
      titleES: 'Cobertura Medicare',
      descEN: 'Turning 65 or navigating Medicare for the first time? We make it simple and make sure you get every benefit you\'re entitled to.',
      descES: '¿Vas a cumplir 65 años o te enfrentas a Medicare por primera vez? Lo hacemos sencillo y nos aseguramos de que aproveches todos los beneficios a los que tienes derecho.',
      icon: 'shield',
      order: 4,
    },
    {
      titleEN: 'Supplemental Benefits',
      titleES: 'Beneficios Suplementarios',
      descEN: 'Extra coverage that fills the gaps your main insurance doesn\'t cover — like hospital stays, accidents, or critical illness.',
      descES: 'Cobertura adicional que llena los vacíos que tu seguro principal no cubre — como hospitalizaciones, accidentes o enfermedades graves.',
      icon: 'plus',
      order: 5,
    },
    {
      titleEN: 'Car Insurance',
      titleES: 'Seguro de Auto',
      descEN: 'Stop overpaying for auto coverage. We shop multiple carriers to get you the right protection at the right price.',
      descES: 'Deja de pagar de más por tu seguro de auto. Comparamos múltiples aseguradoras para conseguirte la protección correcta al precio justo.',
      icon: 'car',
      order: 6,
    },
  ]

  for (const svc of personalServices) {
    const existing = await payload.find({
      collection: 'services',
      locale: 'en',
      where: { title: { equals: svc.titleEN } },
    })
    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'services',
        locale: 'en',
        data: {
          title: svc.titleEN,
          description: svc.descEN,
          icon: svc.icon as string,
          type: 'personal',
          order: svc.order,
          active: true,
        },
      })
      await payload.find({
        collection: 'services',
        where: { title: { equals: svc.titleEN } },
        locale: 'en',
      }).then(async (res) => {
        if (res.docs[0]) {
          await payload.update({
            collection: 'services',
            id: res.docs[0].id,
            locale: 'es',
            data: {
              title: svc.titleES,
              description: svc.descES,
            },
          })
        }
      })
      console.log(`✅ Personal service: ${svc.titleEN}`)
    } else {
      console.log(`⏭  Service already exists: ${svc.titleEN}`)
    }
  }

  // ── Services — Commercial ──────────────────────────────────────────────────
  const commercialServices = [
    {
      titleEN: 'General Liability',
      titleES: 'Responsabilidad Civil General',
      descEN: 'Protects your business if a customer or third party makes a claim against you for injury or property damage.',
      descES: 'Protege tu negocio si un cliente o tercero presenta un reclamo contra ti por lesiones o daños a la propiedad.',
      icon: 'shield',
      order: 1,
    },
    {
      titleEN: 'Professional Liability (E&O)',
      titleES: 'Responsabilidad Profesional (E&O)',
      descEN: 'If a client claims your advice or service caused them a financial loss, this coverage has your back.',
      descES: 'Si un cliente alega que tu asesoría o servicio le causó una pérdida económica, esta cobertura te respalda.',
      icon: 'file-text',
      order: 2,
    },
    {
      titleEN: 'Truckers Insurance',
      titleES: 'Seguro para Camioneros',
      descEN: 'Specialized coverage for owner-operators and trucking companies — on the road and off.',
      descES: 'Cobertura especializada para propietarios-operadores y empresas de transporte — en carretera y fuera de ella.',
      icon: 'truck',
      order: 3,
    },
    {
      titleEN: 'Commercial Auto',
      titleES: 'Auto Comercial',
      descEN: 'Covers your business vehicles and the people who drive them, whether it\'s one van or a full fleet.',
      descES: 'Cubre los vehículos de tu negocio y a las personas que los conducen, ya sea una sola van o toda una flota.',
      icon: 'car',
      order: 4,
    },
    {
      titleEN: 'Business Owner Policy (BOP)',
      titleES: 'Póliza para Propietarios de Negocio (BOP)',
      descEN: 'A bundled plan that combines general liability and property coverage — ideal for small and medium businesses.',
      descES: 'Un plan combinado que une la responsabilidad civil y la cobertura de propiedad — ideal para pequeñas y medianas empresas.',
      icon: 'briefcase',
      order: 5,
    },
    {
      titleEN: 'Workers\' Compensation',
      titleES: 'Compensación Laboral',
      descEN: 'Required in Florida for most businesses. Protects your employees and your company in the event of a workplace injury.',
      descES: 'Obligatoria en Florida para la mayoría de los negocios. Protege a tus empleados y a tu empresa en caso de lesión laboral.',
      icon: 'hard-hat',
      order: 6,
    },
  ]

  for (const svc of commercialServices) {
    const existing = await payload.find({
      collection: 'services',
      where: { title: { equals: svc.titleEN }, type: { equals: 'commercial' } },
      locale: 'en',
    })
    if (existing.totalDocs === 0) {
      const created = await payload.create({
        collection: 'services',
        locale: 'en',
        data: {
          title: svc.titleEN,
          description: svc.descEN,
          icon: svc.icon as string,
          type: 'commercial',
          order: svc.order,
          active: true,
        },
      })
      await payload.update({
        collection: 'services',
        id: created.id,
        locale: 'es',
        data: {
          title: svc.titleES,
          description: svc.descES,
        },
      })
      console.log(`✅ Commercial service: ${svc.titleEN}`)
    } else {
      console.log(`⏭  Service already exists: ${svc.titleEN}`)
    }
  }

  // ── Testimonials ───────────────────────────────────────────────────────────
  const testimonials = [
    {
      name: 'Ana García',
      location: 'Miami, FL',
      quoteEN: 'Maria went above and beyond to find us the right health plan for our whole family. She explained everything clearly and never made us feel rushed. I recommend her to everyone I know.',
      quoteES: 'Maria hizo todo lo posible para encontrar el plan de salud correcto para toda nuestra familia. Explicó todo con claridad y nunca nos hizo sentir apresurados. La recomiendo a todos los que conozco.',
    },
    {
      name: 'Carlos Mendoza',
      location: 'Doral, FL',
      quoteEN: 'As a small business owner, I was overwhelmed with insurance options. Maria simplified everything and got me exactly what I needed at a price I could afford. She\'s the best in the business.',
      quoteES: 'Como dueño de un pequeño negocio, estaba abrumado con las opciones de seguro. Maria simplificó todo y me consiguió exactamente lo que necesitaba a un precio que podía pagar. Es la mejor en su campo.',
    },
    {
      name: 'Jennifer Torres',
      location: 'Hialeah, FL',
      quoteEN: 'I called Maria on a Saturday afternoon and she answered right away. She spent over an hour with me going over my Medicare options. That kind of dedication is rare. I\'m so grateful.',
      quoteES: 'Llamé a Maria un sábado por la tarde y respondió de inmediato. Pasó más de una hora conmigo revisando mis opciones de Medicare. Esa clase de dedicación es poco común. Estoy muy agradecida.',
    },
  ]

  for (const t of testimonials) {
    const existing = await payload.find({ collection: 'testimonials', where: { name: { equals: t.name } } })
    if (existing.totalDocs === 0) {
      const created = await payload.create({
        collection: 'testimonials',
        locale: 'en',
        data: { name: t.name, location: t.location, rating: 5, quote: t.quoteEN, active: true, order: testimonials.indexOf(t) + 1 },
      })
      await payload.update({ collection: 'testimonials', id: created.id, locale: 'es', data: { quote: t.quoteES } })
      console.log(`✅ Testimonial: ${t.name}`)
    } else {
      console.log(`⏭  Testimonial already exists: ${t.name}`)
    }
  }

  // ── Site Settings ──────────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    data: {
      phone: '+1 (786) 568-0877',
      phoneRaw: '+17865680877',
      address: '1395 Brickell Ave, Suite 900, Miami FL 33131',
      instagramHandle: '@Provisioninsurance',
      instagramUrl: 'https://www.instagram.com/marianunezinsurance',
      whatsappNumber: '17865680877',
      whatsappMessageEN: "Hi! I'd like to get an insurance quote.",
      whatsappMessageES: '¡Hola! Me gustaría obtener una cotización gratuita.',
      hoursText: 'Mon–Fri 9 AM – 6 PM',
      afterHoursText: 'We also do our best to be available on weekends and after hours.',
      calendlyUrl: process.env.CALENDLY_URL ?? 'https://calendly.com/provisionassurance/30min',
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'es',
    data: {
      address: '1395 Brickell Ave, Suite 900, Miami FL 33131',
      hoursText: 'Lun–Vie 9 AM – 6 PM',
      afterHoursText: 'También hacemos todo lo posible por estar disponibles los fines de semana y fuera del horario habitual.',
    },
  })
  console.log('✅ Site settings seeded')

  // ── Home Page Global ───────────────────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'en',
    data: {
      heroHeadline: 'Think Insurance — Think Us.',
      heroSubheadline: 'Your one-stop shop for all your insurance needs — for your family, your health, and your business.',
      heroBody: "We are independent advisers. That means we don't work for one insurance company — we work for you. We shop across many carriers to find the best coverage at the best price, every time.",
      primaryCtaText: 'Get a Quote',
      secondaryCtaText: 'Learn More',
      trustBarItems: [
        { icon: 'user-check', label: 'Independent Adviser' },
        { icon: 'map-pin', label: 'Licensed in 8 States' },
        { icon: 'message-circle', label: 'English & Spanish' },
        { icon: 'layers', label: 'Personal & Commercial' },
        { icon: 'phone-call', label: 'Many Carriers, One Call' },
      ],
      familyCardTitle: 'You & Your Family',
      familyCardBody: 'From health and life insurance to dental, Medicare, and your car — we make sure the people you love are always protected.',
      familyCardCta: 'Personal Insurance →',
      businessCardTitle: 'Your Business',
      businessCardBody: "Whether you're a small business owner, self-employed, or run a fleet of trucks — we have the right coverage to keep your business running.",
      businessCardCta: 'Commercial Insurance →',
      whyHeadline: "We Don't Sell Insurance. We Advise You.",
      whyColumns: [
        { title: "We're Independent", body: 'We work with many carriers so we always find the best option for you, not for us.' },
        { title: "We're Accessible", body: 'Call, text, or WhatsApp us. We respond within 2 hours and we go above and beyond regular business hours.' },
        { title: 'We Speak Your Language', body: 'We serve our clients in English and Spanish, and we understand the needs of diverse communities across Florida and beyond.' },
      ],
      testimonialsHeadline: 'What Our Clients Say',
      instagramHeadline: 'Follow Us @Provisioninsurance',
      finalCtaText: 'Not sure where to start? Just call us — call us anytime — we are always happy to help.',
      finalCtaButton: 'Call Now',
    },
  })
  await payload.updateGlobal({
    slug: 'home-page',
    locale: 'es',
    data: {
      heroHeadline: 'Piensa en Seguros — Piensa en Nosotros.',
      heroSubheadline: 'Tu solución completa para todas tus necesidades de seguro — para tu familia, tu salud y tu negocio.',
      heroBody: 'Somos asesores independientes. Eso significa que no trabajamos para una sola compañía de seguros — trabajamos para ti. Comparamos múltiples aseguradoras para encontrar la mejor cobertura al mejor precio, siempre.',
      primaryCtaText: 'Obtener Cotización',
      secondaryCtaText: 'Conocer Más',
      trustBarItems: [
        { icon: 'user-check', label: 'Asesor Independiente' },
        { icon: 'map-pin', label: 'Licenciado en 8 Estados' },
        { icon: 'message-circle', label: 'Inglés y Español' },
        { icon: 'layers', label: 'Personal y Comercial' },
        { icon: 'phone-call', label: 'Muchas Aseguradoras, Una Llamada' },
      ],
      familyCardTitle: 'Tú y Tu Familia',
      familyCardBody: 'Desde seguro médico y de vida hasta dental, Medicare y tu auto — nos aseguramos de que las personas que amas siempre estén protegidas.',
      familyCardCta: 'Seguros Personales →',
      businessCardTitle: 'Tu Negocio',
      businessCardBody: 'Ya seas dueño de un negocio pequeño, trabajador independiente o manejes una flota de camiones — tenemos la cobertura correcta para mantener tu negocio en marcha.',
      businessCardCta: 'Seguros Comerciales →',
      whyHeadline: 'No Vendemos Seguros. Te Asesoramos.',
      whyColumns: [
        { title: 'Somos Independientes', body: 'Trabajamos con muchas aseguradoras para siempre encontrar la mejor opción para ti, no para nosotros.' },
        { title: 'Somos Accesibles', body: 'Llámanos, escríbenos o contáctanos por WhatsApp. Respondemos en menos de 2 horas y estamos disponibles más allá del horario habitual.' },
        { title: 'Hablamos Tu Idioma', body: 'Atendemos a nuestros clientes en inglés y español, y entendemos las necesidades de las comunidades diversas en toda la Florida y más allá.' },
      ],
      testimonialsHeadline: 'Lo Que Dicen Nuestros Clientes',
      instagramHeadline: 'Síguenos @Provisioninsurance',
      finalCtaText: '¿No sabes por dónde empezar? Llámanos — llámanos en cualquier momento — siempre estamos felices de ayudar.',
      finalCtaButton: 'Llamar Ahora',
    },
  })
  console.log('✅ Home page global seeded')

  console.log('\n🎉 Seed complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
