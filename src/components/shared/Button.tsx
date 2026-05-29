import Link from 'next/link'
import { cn } from '@/lib/utils'

interface ButtonProps {
  href?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  external?: boolean
  ariaLabel?: string
}

export default function Button({
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  children,
  className,
  type = 'button',
  disabled,
  external,
  ariaLabel,
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-gold'

  const variants = {
    primary: 'bg-primary-gold text-white hover:bg-amber-700 rounded-full shadow-sm',
    secondary: 'bg-transparent border-2 border-primary-gold text-primary-gold hover:bg-primary-gold hover:text-white rounded-full',
    outline: 'bg-transparent border border-dark text-dark hover:border-primary-gold hover:text-primary-gold rounded-xl',
    ghost: 'bg-transparent text-primary-gold hover:underline',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const classes = cn(base, variants[variant], sizes[size], disabled && 'opacity-50 cursor-not-allowed', className)

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} {...linkProps}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled} aria-label={ariaLabel}>
      {children}
    </button>
  )
}
