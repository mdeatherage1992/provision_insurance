import { test, expect } from '@playwright/test'

test.describe('Language toggle', () => {
  test('switches URL from /en to /es on home page', async ({ page }) => {
    await page.goto('/en')
    // Find ES button in toggle
    const esButton = page.getByRole('button', { name: /cambiar a español/i }).or(
      page.locator('button[aria-label*="Español"]')
    ).or(
      page.locator('button').filter({ hasText: 'ES' }).first()
    )
    await esButton.click()
    await expect(page).toHaveURL(/\/es/)
    await expect(page.getByRole('heading', { name: /Piensa en Seguros/i })).toBeVisible()
  })

  test('switches URL from /es to /en on home page', async ({ page }) => {
    await page.goto('/es')
    const enButton = page.locator('button').filter({ hasText: 'EN' }).first()
    await enButton.click()
    await expect(page).toHaveURL(/\/en/)
    await expect(page.getByRole('heading', { name: /Think Insurance/i })).toBeVisible()
  })

  test('toggle persists on about page', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page.getByRole('heading', { name: /A Calling to Help People/i })).toBeVisible()

    const esButton = page.locator('button').filter({ hasText: 'ES' }).first()
    await esButton.click()
    await expect(page).toHaveURL('/es/about')
    await expect(page.getByRole('heading', { name: /Vocación/i })).toBeVisible()
  })
})
