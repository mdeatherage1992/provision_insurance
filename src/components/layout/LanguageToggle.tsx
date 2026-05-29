'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useTransition } from 'react'
import type { Locale } from '@/i18n/config'

interface LanguageToggleProps {
  currentLocale: Locale
}

export default function LanguageToggle({ currentLocale }: LanguageToggleProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  function switchLocale(newLocale: Locale) {
    if (newLocale === currentLocale) return
    // Replace /en/ or /es/ at start of path
    const newPath = pathname.replace(/^\/(en|es)/, `/${newLocale}`)
    startTransition(() => {
      router.push(newPath)
    })
  }

  return (
    <div
      className="flex items-center gap-1 bg-secondary-cream rounded-full p-1"
      role="group"
      aria-label={currentLocale === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
    >
      <button
        onClick={() => switchLocale('en')}
        disabled={isPending}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
          currentLocale === 'en'
            ? 'bg-primary-gold text-white'
            : 'text-dark/60 hover:text-dark'
        }`}
        aria-pressed={currentLocale === 'en'}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale('es')}
        disabled={isPending}
        className={`px-3 py-1 rounded-full text-sm font-semibold transition-all duration-200 ${
          currentLocale === 'es'
            ? 'bg-primary-gold text-white'
            : 'text-dark/60 hover:text-dark'
        }`}
        aria-pressed={currentLocale === 'es'}
        aria-label="Cambiar a Español"
      >
        ES
      </button>
    </div>
  )
}
