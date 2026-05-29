import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://marianunezinsurance.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
