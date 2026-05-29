import { test, expect } from '@playwright/test'

test.describe('Commercial Lines page', () => {
  test('loads in English with correct headline', async ({ page }) => {
    await page.goto('/en/commercial-lines')
    await expect(page.getByRole('heading', { level: 1, name: /Protecting Your Business/i })).toBeVisible()
  })

  test('loads in Spanish with correct headline', async ({ page }) => {
    await page.goto('/es/commercial-lines')
    await expect(page.getByRole('heading', { level: 1, name: /Protegiendo Tu Negocio/i })).toBeVisible()
  })

  test('all 6 commercial services are visible (EN)', async ({ page }) => {
    await page.goto('/en/commercial-lines')
    await expect(page.getByText(/General Liability/i)).toBeVisible()
    await expect(page.getByText(/Professional Liability/i)).toBeVisible()
    await expect(page.getByText(/Truckers Insurance/i)).toBeVisible()
    await expect(page.getByText(/Commercial Auto/i)).toBeVisible()
    await expect(page.getByText(/Business Owner Policy/i)).toBeVisible()
    await expect(page.getByText(/Workers.* Compensation/i)).toBeVisible()
  })

  test('all 6 commercial services are visible (ES)', async ({ page }) => {
    await page.goto('/es/commercial-lines')
    await expect(page.getByText(/Responsabilidad Civil General/i)).toBeVisible()
    await expect(page.getByText(/Responsabilidad Profesional/i)).toBeVisible()
    await expect(page.getByText(/Camioneros/i)).toBeVisible()
    await expect(page.getByText(/Auto Comercial/i)).toBeVisible()
    await expect(page.getByText(/Propietarios de Negocio/i)).toBeVisible()
    await expect(page.getByText(/Compensación Laboral/i)).toBeVisible()
  })

  test('Schedule a Call CTA is present', async ({ page }) => {
    await page.goto('/en/commercial-lines')
    await expect(page.getByRole('link', { name: /schedule a call/i })).toBeVisible()
  })
})
