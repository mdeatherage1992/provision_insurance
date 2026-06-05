import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://provisionassurance.com'
const locales = ['en', 'es']

const pages = ['', '/about', '/personal-lines', '/commercial-lines', '/contact']

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of pages) {
      entries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1.0 : 0.8,
      })
    }
  }

  return entries
}
