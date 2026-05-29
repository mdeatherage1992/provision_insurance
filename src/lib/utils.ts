import type { Locale } from '@/i18n/config'

/**
 * Format a raw phone number to US display format
 * e.g. "7865680877" → "+1 (786) 568-0877"
 */
export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`
  }
  return raw
}

/**
 * Returns the WhatsApp Business direct link.
 * The locale parameter is kept for API compatibility.
 */
export function buildWhatsAppUrl(_whatsappNumber: string, _locale: Locale): string {
  return 'https://wa.me/message/LCXLISEUZQ5YH1'
}

/**
 * Detect locale from Accept-Language header
 * Returns 'en' or 'es'
 */
export function detectLocaleFromHeader(acceptLanguage?: string): Locale {
  if (!acceptLanguage) return 'en'
  const preferred = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase()
  return preferred === 'es' ? 'es' : 'en'
}

/**
 * Validate US phone number formats
 */
export function isValidUSPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '')
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'))
}

/**
 * Merge class names (simple utility)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}
