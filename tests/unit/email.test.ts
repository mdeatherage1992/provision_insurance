import { describe, it, expect } from 'vitest'
import { buildQuoteEmailHtml } from '../../src/lib/email'

const baseData = {
  fullName: 'Ana García',
  phone: '7865550000',
  email: 'ana@example.com',
  insuranceType: 'health',
  state: 'Florida',
  language: 'en' as const,
  message: 'I need health coverage for my family.',
}

describe('buildQuoteEmailHtml', () => {
  it('includes the submitter name', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('Ana García')
  })

  it('includes phone number with tel link', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('tel:7865550000')
    expect(html).toContain('7865550000')
  })

  it('includes email with mailto link', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('mailto:ana@example.com')
  })

  it('maps insuranceType to human-readable label', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('Health Insurance')
  })

  it('includes state', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('Florida')
  })

  it('includes language label for English', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('English')
  })

  it('includes language label for Spanish', () => {
    const html = buildQuoteEmailHtml({ ...baseData, language: 'es' })
    expect(html).toContain('Spanish')
  })

  it('includes message when provided', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('I need health coverage for my family.')
  })

  it('omits message row when not provided', () => {
    const html = buildQuoteEmailHtml({ ...baseData, message: undefined })
    expect(html).not.toContain('I need health coverage')
  })

  it('includes call button', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('Call Ana García')
  })

  it('handles unknown insurance type gracefully', () => {
    const html = buildQuoteEmailHtml({ ...baseData, insuranceType: 'unknown-type' })
    expect(html).toContain('unknown-type')
  })

  it('returns valid HTML with DOCTYPE', () => {
    const html = buildQuoteEmailHtml(baseData)
    expect(html).toContain('<!DOCTYPE html>')
    expect(html).toContain('</html>')
  })
})
