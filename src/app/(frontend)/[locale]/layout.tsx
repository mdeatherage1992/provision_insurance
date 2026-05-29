import { Inter, Playfair_Display } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { locales } from '@/i18n/config'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import WhatsAppFloat from '@/components/layout/WhatsAppFloat'
import Script from 'next/script'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound()
  }

  // Required for static rendering with next-intl
  setRequestLocale(locale)

  const messages = await getMessages()
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  return (
    <html lang={locale} className={`${inter.variable} ${playfairDisplay.variable}`}>
      <body className="bg-background-cream text-dark font-body antialiased">
        {/* Skip to content */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-gold text-white px-4 py-2 rounded-full z-50 focus:z-50"
        >
          {locale === 'es' ? 'Saltar al contenido' : 'Skip to content'}
        </a>

        <NextIntlClientProvider messages={messages}>
          <Header locale={locale as 'en' | 'es'} />
          <main id="main-content" className="min-h-screen">
            {children}
          </main>
          <Footer locale={locale as 'en' | 'es'} />
          <WhatsAppFloat locale={locale as 'en' | 'es'} />
        </NextIntlClientProvider>

        {/* Google Analytics — production only */}
        {gaId && process.env.NODE_ENV === 'production' && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
      </body>
    </html>
  )
}
