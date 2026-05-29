import { test, expect } from '@playwright/test'

test.describe('Personal Lines page', () => {
  test('loads in English with correct headline', async ({ page }) => {
    await page.goto('/en/personal-lines')
    await expect(page.getByRole('heading', { level: 1, name: /Protecting You & Everyone You Love/i })).toBeVisible()
  })

  test('loads in Spanish with correct headline', async ({ page }) => {
    await page.goto('/es/personal-lines')
    await expect(page.getByRole('heading', { level: 1, name: /Protegiéndote/i })).toBeVisible()
  })

  test('all 6 personal services are visible (EN)', async ({ page }) => {
    await page.goto('/en/personal-lines')
    await expect(page.getByText(/Health Insurance/i).first()).toBeVisible()
    await expect(page.getByText(/Life Insurance/i)).toBeVisible()
    await expect(page.getByText(/Dental Plans/i)).toBeVisible()
    await expect(page.getByText(/Medicare Coverage/i)).toBeVisible()
    await expect(page.getByText(/Supplemental Benefits/i)).toBeVisible()
    await expect(page.getByText(/Car Insurance/i)).toBeVisible()
  })

  test('all 6 personal services are visible (ES)', async ({ page }) => {
    await page.goto('/es/personal-lines')
    await expect(page.getByText(/Seguro Médico/i).first()).toBeVisible()
    await expect(page.getByText(/Seguro de Vida/i)).toBeVisible()
    await expect(page.getByText(/Planes Dentales/i)).toBeVisible()
    await expect(page.getByText(/Medicare/i)).toBeVisible()
    await expect(page.getByText(/Beneficios Suplementarios/i)).toBeVisible()
    await expect(page.getByText(/Seguro de Auto/i)).toBeVisible()
  })

  test('carrier note is visible', async ({ page }) => {
    await page.goto('/en/personal-lines')
    await expect(page.getByText(/appointed with all major carriers/i)).toBeVisible()
  })

  test('licensing note is visible', async ({ page }) => {
    await page.goto('/en/personal-lines')
    await expect(page.getByText(/licensed to offer Health and Life/i)).toBeVisible()
  })

  test('Get a Quote CTA links to contact', async ({ page }) => {
    await page.goto('/en/personal-lines')
    const link = page.getByRole('link', { name: /get a quote/i })
    await expect(link).toHaveAttribute('href', '/en/contact')
  })
})
