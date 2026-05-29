import { test, expect } from '@playwright/test'

test.describe('Home page', () => {
  test('loads in English and shows hero content', async ({ page }) => {
    await page.goto('/en')
    await expect(page).toHaveTitle(/Maria Nunez Insurance/)
    await expect(page.getByRole('heading', { name: /Think Insurance/i })).toBeVisible()
    await expect(page.getByText(/independent advisers/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /get a quote/i }).first()).toBeVisible()
  })

  test('loads in Spanish and shows hero content', async ({ page }) => {
    await page.goto('/es')
    await expect(page.getByRole('heading', { name: /Piensa en Seguros/i })).toBeVisible()
    await expect(page.getByText(/asesores independientes/i)).toBeVisible()
    await expect(page.getByRole('link', { name: /obtener cotización/i }).first()).toBeVisible()
  })

  test('trust bar is visible', async ({ page }) => {
    await page.goto('/en')
    await expect(page.getByText(/Independent Adviser/i)).toBeVisible()
    await expect(page.getByText(/Licensed in 8 States/i)).toBeVisible()
    await expect(page.getByText(/Many Carriers, One Call/i)).toBeVisible()
  })

  test('services section is visible', async ({ page }) => {
    await page.goto('/en')
    await expect(page.getByText(/You & Your Family/i)).toBeVisible()
    await expect(page.getByText(/Your Business/i)).toBeVisible()
  })

  test('why work with us section is visible', async ({ page }) => {
    await page.goto('/en')
    await expect(page.getByText(/We Don't Sell Insurance/i)).toBeVisible()
    await expect(page.getByText(/We're Independent/i)).toBeVisible()
  })

  test('final CTA links to phone', async ({ page }) => {
    await page.goto('/en')
    const callLink = page.getByRole('link', { name: /call now/i })
    await expect(callLink).toBeVisible()
    await expect(callLink).toHaveAttribute('href', 'tel:+17865680877')
  })

  test('primary CTA links to contact page', async ({ page }) => {
    await page.goto('/en')
    const link = page.getByRole('link', { name: /get a quote/i }).first()
    await expect(link).toHaveAttribute('href', '/en/contact')
  })
})
