import { test, expect } from '@playwright/test'

test.describe('Admin panel', () => {
  test('loads the admin login page', async ({ page }) => {
    await page.goto('/admin')
    // Should see the Payload login form
    await expect(page.getByRole('heading', { name: /log in/i }).or(
      page.getByRole('heading', { name: /sign in/i })
    ).or(
      page.locator('h1').filter({ hasText: /admin/i })
    )).toBeVisible({ timeout: 10000 })
  })

  test('login page has email and password fields', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByLabel(/email/i).first()).toBeVisible({ timeout: 10000 })
    await expect(page.getByLabel(/password/i).first()).toBeVisible({ timeout: 10000 })
  })
})
