import type { GlobalConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'A Calling to Help People.',
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor(),
      localized: true,
    },
    {
      name: 'credentialsTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Credentials & Licensing',
    },
    {
      name: 'credentials',
      type: 'array',
      localized: true,
      fields: [
        { name: 'item', type: 'text' },
      ],
    },
    {
      name: 'provisionDescription',
      type: 'text',
      localized: true,
      defaultValue: 'Specializing in Health & Life coverage',
    },
    {
      name: 'goodDealDescription',
      type: 'text',
      localized: true,
      defaultValue: 'Specializing in Property & Casualty coverage',
    },
  ],
}
