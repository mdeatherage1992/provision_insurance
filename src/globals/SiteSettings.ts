import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Site Settings',
  },
  fields: [
    {
      name: 'phone',
      type: 'text',
      defaultValue: '+1 (786) 568-0877',
    },
    {
      name: 'phoneRaw',
      type: 'text',
      defaultValue: '+17865680877',
    },
    {
      name: 'address',
      type: 'text',
      defaultValue: '1395 Brickell Ave, Suite 900, Miami FL 33131',
      localized: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'instagramHandle',
      type: 'text',
      defaultValue: '@Provisioninsurance',
    },
    {
      name: 'instagramUrl',
      type: 'text',
      defaultValue: 'https://www.instagram.com/marianunezinsurance',
    },
    {
      name: 'whatsappNumber',
      type: 'text',
      defaultValue: '17865680877',
    },
    {
      name: 'whatsappMessageEN',
      type: 'text',
      defaultValue: "Hi! I'd like to get an insurance quote.",
    },
    {
      name: 'whatsappMessageES',
      type: 'text',
      defaultValue: '¡Hola! Me gustaría obtener una cotización gratuita.',
    },
    {
      name: 'hoursText',
      type: 'text',
      defaultValue: 'Mon–Fri 9 AM – 6 PM',
      localized: true,
    },
    {
      name: 'afterHoursText',
      type: 'text',
      defaultValue: 'We also do our best to be available on weekends and after hours.',
      localized: true,
    },
    {
      name: 'calendlyUrl',
      type: 'text',
      defaultValue: 'https://calendly.com/marianunez/insurance-consultation',
    },
    {
      name: 'googlePlaceId',
      type: 'text',
    },
  ],
}
