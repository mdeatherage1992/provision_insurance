import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Services } from './collections/Services'
import { Testimonials } from './collections/Testimonials'
import { QuoteSubmissions } from './collections/QuoteSubmissions'
import { Pages } from './collections/Pages'

import { SiteSettings } from './globals/SiteSettings'
import { HomePage } from './globals/HomePage'
import { AboutPage } from './globals/AboutPage'
import { PersonalLinesPage } from './globals/PersonalLinesPage'
import { CommercialLinesPage } from './globals/CommercialLinesPage'
import { ContactPage } from './globals/ContactPage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Services, Testimonials, QuoteSubmissions, Pages],
  globals: [SiteSettings, HomePage, AboutPage, PersonalLinesPage, CommercialLinesPage, ContactPage],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  localization: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    fallback: true,
  },
  upload: {
    limits: {
      fileSize: 10000000, // 10MB
    },
  },
})
