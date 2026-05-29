import { test, expect } from '@playwright/test'

test.describe('About page', () => {
  test('loads in English', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page).toHaveTitle(/About.*Maria Nunez/)
    await expect(page.getByRole('heading', { level: 1, name: /A Calling to Help People/i })).toBeVisible()
  })

  test('loads in Spanish', async ({ page }) => {
    await page.goto('/es/about')
    await expect(page.getByRole('heading', { level: 1, name: /Vocación de Ayudar/i })).toBeVisible()
  })

  test('shows Maria bio in English', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page.getByText(/Maria Nunez/i).first()).toBeVisible()
    await expect(page.getByText(/Venezuela/i)).toBeVisible()
    await expect(page.getByText(/medical school/i)).toBeVisible()
  })

  test('shows Maria bio in Spanish', async ({ page }) => {
    await page.goto('/es/about')
    await expect(page.getByText(/Venezuela/i)).toBeVisible()
    await expect(page.getByText(/escuela de medicina/i)).toBeVisible()
  })

  test('shows credentials section', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page.getByText(/Licensed Insurance Adviser/i)).toBeVisible()
    await expect(page.getByText(/Health Insurance.*FL/i)).toBeVisible()
  })

  test('shows both company logos', async ({ page }) => {
    await page.goto('/en/about')
    await expect(page.getByAltText(/Provision Insurance logo/i)).toBeVisible()
    await expect(page.getByAltText(/Good Deal Insurance Agency logo/i)).toBeVisible()
  })
})
