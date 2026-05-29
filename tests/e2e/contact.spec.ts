import { test, expect } from '@playwright/test'

test.describe('Contact page', () => {
  test('loads in English with correct headline', async ({ page }) => {
    await page.goto('/en/contact')
    await expect(page.getByRole('heading', { level: 1, name: /Let's Talk/i })).toBeVisible()
  })

  test('loads in Spanish with correct headline', async ({ page }) => {
    await page.goto('/es/contact')
    await expect(page.getByRole('heading', { level: 1, name: /Hablemos/i })).toBeVisible()
  })

  test('form renders all fields', async ({ page }) => {
    await page.goto('/en/contact')
    await expect(page.getByLabel(/full name/i)).toBeVisible()
    await expect(page.getByLabel(/phone number/i)).toBeVisible()
    await expect(page.getByLabel(/email address/i)).toBeVisible()
    await expect(page.getByLabel(/type of insurance/i)).toBeVisible()
    await expect(page.getByLabel(/^state/i)).toBeVisible()
    await expect(page.getByRole('button', { name: /request a quote/i })).toBeVisible()
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/en/contact')
    await page.getByRole('button', { name: /request a quote/i }).click()
    await expect(page.getByText(/full name is required/i)).toBeVisible()
    await expect(page.getByText(/phone number is required/i)).toBeVisible()
    await expect(page.getByText(/email address is required/i)).toBeVisible()
  })

  test('Google Maps iframe is present', async ({ page }) => {
    await page.goto('/en/contact')
    await expect(page.frameLocator('iframe[title*="map" i]').locator('body')).toBeTruthy()
    // Just check iframe exists
    await expect(page.locator('iframe[title*="map" i]')).toBeVisible()
  })

  test('phone number is tappable', async ({ page }) => {
    await page.goto('/en/contact')
    const phoneLink = page.getByRole('link', { name: /786.*568/i }).first()
    await expect(phoneLink).toHaveAttribute('href', 'tel:+17865680877')
  })

  test('shows success after valid form submission', async ({ page }) => {
    // Mock API
    await page.route('/api/quote', async (route) => {
      await route.fulfill({ json: { ok: true }, status: 200 })
    })

    await page.goto('/en/contact')
    await page.getByLabel(/full name/i).fill('Test User')
    await page.getByLabel(/phone number/i).fill('7865550000')
    await page.getByLabel(/email address/i).fill('test@example.com')
    await page.selectOption('select[id="insuranceType"]', 'health')
    await page.selectOption('select[id="state"]', 'Florida')
    await page.getByLabel(/^english$/i).check()
    await page.getByRole('button', { name: /request a quote/i }).click()

    await expect(page.getByText(/thank you/i)).toBeVisible({ timeout: 5000 })
  })
})
