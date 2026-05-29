import { describe, it, expect } from 'vitest'
import { formatPhoneDisplay, buildWhatsAppUrl, detectLocaleFromHeader, isValidUSPhone, cn } from '../../src/lib/utils'

describe('formatPhoneDisplay', () => {
  it('formats 10-digit number', () => {
    expect(formatPhoneDisplay('7865680877')).toBe('+1 (786) 568-0877')
  })

  it('formats 11-digit number starting with 1', () => {
    expect(formatPhoneDisplay('17865680877')).toBe('+1 (786) 568-0877')
  })

  it('strips non-digit chars first', () => {
    expect(formatPhoneDisplay('+1 (786) 568-0877')).toBe('+1 (786) 568-0877')
  })

  it('returns raw input for unrecognized formats', () => {
    expect(formatPhoneDisplay('123')).toBe('123')
  })
})

describe('buildWhatsAppUrl', () => {
  it('builds English WhatsApp URL', () => {
    const url = buildWhatsAppUrl('17865680877', 'en')
    expect(url).toContain('wa.me/17865680877')
    expect(url).toContain('quote')
  })

  it('builds Spanish WhatsApp URL', () => {
    const url = buildWhatsAppUrl('17865680877', 'es')
    expect(url).toContain('wa.me/17865680877')
    expect(url).toContain('cotizaci')
  })

  it('strips non-digit chars from number', () => {
    const url = buildWhatsAppUrl('+1 (786) 568-0877', 'en')
    expect(url).toContain('wa.me/17865680877')
  })
})

describe('detectLocaleFromHeader', () => {
  it('returns en for undefined header', () => {
    expect(detectLocaleFromHeader(undefined)).toBe('en')
  })

  it('returns es for Spanish header', () => {
    expect(detectLocaleFromHeader('es-US,es;q=0.9,en;q=0.8')).toBe('es')
  })

  it('returns es for simple es header', () => {
    expect(detectLocaleFromHeader('es')).toBe('es')
  })

  it('returns en for English header', () => {
    expect(detectLocaleFromHeader('en-US,en;q=0.9')).toBe('en')
  })

  it('returns en for French header (unsupported)', () => {
    expect(detectLocaleFromHeader('fr-FR')).toBe('en')
  })
})

describe('isValidUSPhone', () => {
  it('accepts 10-digit number', () => {
    expect(isValidUSPhone('7865680877')).toBe(true)
  })

  it('accepts 11-digit with leading 1', () => {
    expect(isValidUSPhone('17865680877')).toBe(true)
  })

  it('accepts formatted phone', () => {
    expect(isValidUSPhone('+1 (786) 568-0877')).toBe(true)
  })

  it('rejects 9-digit number', () => {
    expect(isValidUSPhone('123456789')).toBe(false)
  })

  it('rejects non-US 11-digit', () => {
    expect(isValidUSPhone('27865680877')).toBe(false)
  })
})

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('a', 'b')).toBe('a b')
  })

  it('filters falsy values', () => {
    expect(cn('a', undefined, null, false, 'b')).toBe('a b')
  })

  it('returns empty string for all falsy', () => {
    expect(cn(undefined, null, false)).toBe('')
  })
})
