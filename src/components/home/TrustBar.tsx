import Container from '@/components/shared/Container'

interface TrustBarItem {
  icon: string
  label: string
}

interface TrustBarProps {
  items?: TrustBarItem[]
  locale: string
}

const defaultItems: TrustBarItem[] = [
  { icon: 'user-check', label: 'Independent Adviser' },
  { icon: 'map-pin', label: 'Licensed in 8 States' },
  { icon: 'message-circle', label: 'English & Spanish' },
  { icon: 'layers', label: 'Personal & Commercial' },
  { icon: 'phone-call', label: 'Many Carriers, One Call' },
]

const defaultItemsES: TrustBarItem[] = [
  { icon: 'user-check', label: 'Asesor Independiente' },
  { icon: 'map-pin', label: 'Licenciado en 8 Estados' },
  { icon: 'message-circle', label: 'Inglés y Español' },
  { icon: 'layers', label: 'Personal y Comercial' },
  { icon: 'phone-call', label: 'Muchas Aseguradoras, Una Llamada' },
]

function TrustIcon({ icon }: { icon: string }) {
  const icons: Record<string, JSX.Element> = {
    'user-check': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <polyline points="16 11 18 13 22 9"/>
      </svg>
    ),
    'map-pin': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    'message-circle': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    'layers': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
        <polygon points="12 2 2 7 12 12 22 7 12 2"/>
        <polyline points="2 17 12 22 22 17"/>
        <polyline points="2 12 12 17 22 12"/>
      </svg>
    ),
    'phone-call': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
      </svg>
    ),
  }
  return icons[icon] || icons['user-check']
}

export default function TrustBar({ items, locale }: TrustBarProps) {
  const displayItems = items ?? (locale === 'es' ? defaultItemsES : defaultItems)

  return (
    <section className="bg-secondary-cream border-y border-light-gold/60 py-6" aria-label="Trust indicators">
      <Container>
        <ul className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 md:gap-10">
          {displayItems.map((item, index) => (
            <li key={index} className="flex items-center gap-2 text-dark/80">
              <span className="text-primary-gold flex-shrink-0">
                <TrustIcon icon={item.icon} />
              </span>
              <span className="text-sm font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
