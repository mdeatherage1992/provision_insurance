'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import LanguageToggle from './LanguageToggle'
import type { Locale } from '@/i18n/config'

interface HeaderProps {
  locale: Locale
}

export default function Header({ locale }: HeaderProps) {
  const t = useTranslations('nav')
  const tc = useTranslations('common')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/about`, label: t('about') },
    { href: `/${locale}/personal-lines`, label: t('personal') },
    { href: `/${locale}/commercial-lines`, label: t('commercial') },
    { href: `/${locale}/contact`, label: t('contact') },
  ]

  return (
    <header className="sticky top-0 z-40 bg-background-cream border-b border-light-gold/60">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex items-center justify-between h-20">
          {/* Logos */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link href={`/${locale}`} aria-label="Provision Insurance — Home">
              {/* Compact logo on mobile, horizontal on desktop */}
              <Image
                src="/images/provision_compact.svg"
                alt="Provision Insurance"
                width={200}
                height={240}
                className="h-14 w-auto lg:hidden"
              />
              <Image
                src="/images/provision_horizontal.svg"
                alt="Provision Insurance"
                width={320}
                height={160}
                className="hidden lg:block h-24 w-auto"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-dark/80 hover:text-primary-gold font-medium transition-colors duration-200 text-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right actions */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+17865680877"
              className="text-dark/80 hover:text-primary-gold text-sm font-medium transition-colors"
            >
              {tc('phone')}
            </a>
            <LanguageToggle currentLocale={locale} />
            <Link
              href={`/${locale}/contact`}
              className="bg-primary-gold text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-amber-700 transition-colors duration-200"
            >
              {t('getQuote')}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageToggle currentLocale={locale} />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-dark hover:text-primary-gold transition-colors"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? tc('close') : tc('openMenu')}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-background-cream border-t border-light-gold/60 px-4 pb-6 pt-4"
        >
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-dark/80 hover:text-primary-gold font-medium py-3 border-b border-soft-gray/50 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <a
                href="tel:+17865680877"
                className="text-center bg-soft-gray text-dark px-6 py-3 rounded-full font-medium"
              >
                {tc('phone')}
              </a>
              <Link
                href={`/${locale}/contact`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-center bg-primary-gold text-white px-6 py-3 rounded-full font-semibold"
              >
                {t('getQuote')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
