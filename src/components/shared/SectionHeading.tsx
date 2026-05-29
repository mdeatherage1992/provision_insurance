import { cn } from '@/lib/utils'

interface SectionHeadingProps {
  headline: string
  subheadline?: string
  centered?: boolean
  className?: string
}

export default function SectionHeading({ headline, subheadline, centered = true, className }: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <h2 className="font-heading text-3xl sm:text-4xl font-bold text-dark tracking-tight mb-4">
        {headline}
      </h2>
      {subheadline && (
        <p className="text-lg text-dark/70 max-w-2xl mx-auto leading-relaxed">
          {subheadline}
        </p>
      )}
      <div className={cn('mt-4 h-px bg-primary-gold/60 w-16', centered && 'mx-auto')} />
    </div>
  )
}
