import { cn } from '@/lib/utils'

// Map icon names to simple SVG path strings
const iconPaths: Record<string, string> = {
  heart: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
  shield: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  smile: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 0',
  stethoscope: 'M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 0 .3',
  car: 'M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-1',
  briefcase: 'M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2',
  truck: 'M1 3h15v13H1z M16 8h4l3 3v5h-7V8z M5.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z M18.5 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  'hard-hat': 'M2 18a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v2z M10 10V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5',
  'file-text': 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8',
  plus: 'M12 5v14 M5 12h14',
}

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  className?: string
}

function ServiceIcon({ icon }: { icon: string }) {
  const path = iconPaths[icon] || iconPaths.shield

  // Special handling for multi-path icons
  if (['truck', 'briefcase', 'file-text', 'stethoscope'].includes(icon)) {
    const paths = path.split(' M').map((p, i) => (i === 0 ? p : 'M' + p))
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
        aria-hidden="true"
      >
        {paths.map((p, i) => (
          <path key={i} d={p} />
        ))}
      </svg>
    )
  }

  if (icon === 'smile') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 13s1.5 2 4 2 4-2 4-2"/>
        <line x1="9" y1="9" x2="9.01" y2="9"/>
        <line x1="15" y1="9" x2="15.01" y2="9"/>
      </svg>
    )
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  )
}

export default function ServiceCard({ title, description, icon, className }: ServiceCardProps) {
  return (
    <div
      className={cn(
        'bg-white rounded-xl p-6 border border-light-gold shadow-sm hover:shadow-md transition-shadow duration-200',
        className,
      )}
    >
      <div className="text-primary-gold mb-4">
        <ServiceIcon icon={icon} />
      </div>
      <h3 className="font-heading text-xl font-bold text-dark mb-3">{title}</h3>
      <p className="text-dark/70 leading-relaxed">{description}</p>
    </div>
  )
}
