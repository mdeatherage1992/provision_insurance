import { test, expect } from '@playwright/test'

const pages = ['/en', '/en/about', '/en/personal-lines', '/en/commercial-lines', '/en/contact']

for (const path of pages) {
  test(`WhatsApp button is visible on ${path}`, async ({ page }) => {
    await page.goto(path)
    const btn = page.getByRole('link', { name: /chat on whatsapp/i })
    await expect(btn).toBeVisible()
    const href = await btn.getAttribute('href')
    expect(href).toContain('wa.me/17865680877')
    expect(href).toContain('text=')
  })
}

test('WhatsApp button uses Spanish prefill on /es', async ({ page }) => {
  await page.goto('/es')
  const btn = page.getByRole('link', { name: /whatsapp/i })
  const href = await btn.getAttribute('href')
  expect(href).toContain('cotizaci')
})

test('WhatsApp button uses English prefill on /en', async ({ page }) => {
  await page.goto('/en')
  const btn = page.getByRole('link', { name: /chat on whatsapp/i })
  const href = await btn.getAttribute('href')
  expect(href).toContain('quote')
})
