import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './i18n/config'

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always',
})

export const config = {
  // Match all pathnames except api routes, _next internals, and static files
  matcher: ['/((?!api|_next|.*\\..*).*)'],
}
