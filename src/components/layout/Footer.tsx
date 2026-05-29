import Link from 'next/link'
import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import LanguageToggle from './LanguageToggle'
import type { Locale } from '@/i18n/config'

interface FooterProps {
  locale: Locale
}

export default async function Footer({ locale }: FooterProps) {
  const t = await getTranslations({ locale, namespace: 'footer' })
  const tn = await getTranslations({ locale, namespace: 'nav' })

  const navLinks = [
    { href: `/${locale}`, label: tn('home') },
    { href: `/${locale}/about`, label: tn('about') },
    { href: `/${locale}/personal-lines`, label: tn('personal') },
    { href: `/${locale}/commercial-lines`, label: tn('commercial') },
    { href: `/${locale}/contact`, label: tn('contact') },
  ]

  return (
    <footer className="bg-background-cream border-t border-primary-gold/60 pt-12 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Logos */}
        <div className="flex items-center gap-4 mb-10">
          <Image src="/images/provision_nobg.png" alt="Provision Insurance" width={56} height={56} />
          <Image src="/images/good_deal_nobg.png" alt="Good Deal Insurance Agency" width={56} height={56} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Contact */}
          <div>
            <h3 className="font-heading font-bold text-dark mb-4">{t('contact')}</h3>
            <div className="space-y-2 text-dark/70 text-sm">
              <p>
                <a href="tel:+17865680877" className="hover:text-primary-gold transition-colors">
                  +1 (786) 568-0877
                </a>
              </p>
              <p>1395 Brickell Ave, Suite 900</p>
              <p>Miami FL 33131</p>
              <p className="mt-3">{t('hours')}</p>
              <p>{t('afterHours')}</p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-heading font-bold text-dark mb-4">{t('navigation')}</h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-dark/70 hover:text-primary-gold text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Language */}
          <div>
            <h3 className="font-heading font-bold text-dark mb-4">{t('followUs')}</h3>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/marianunezinsurance"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark/70 hover:text-primary-gold text-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
                </svg>
                @Provisioninsurance
              </a>
              <a
                href="https://wa.me/message/LCXLISEUZQ5YH1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-dark/70 hover:text-primary-gold text-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp
              </a>
              <div className="pt-2">
                <LanguageToggle currentLocale={locale} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-light-gold/60 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-dark/50">
          <p>{t('copyright')}</p>
          <p>{t('rights')}</p>
        </div>
      </div>
    </footer>
  )
}
