import type { GlobalConfig } from 'payload'

export const PersonalLinesPage: GlobalConfig = {
  slug: 'personal-lines-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'Protecting You & Everyone You Love.',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      defaultValue: "You shouldn't need to be an insurance expert to make sure your family is protected. That's what we're here for. We'll explain your options in plain language, compare plans across many carriers, and make sure you only pay for what you actually need.",
    },
    {
      name: 'carrierNote',
      type: 'textarea',
      localized: true,
      defaultValue: 'We are appointed with all major carriers — meaning we shop the entire market on your behalf. You get the best plan available, not just what one company offers.',
    },
    {
      name: 'licensingNote',
      type: 'text',
      localized: true,
      defaultValue: 'We are licensed to offer Health and Life insurance in Florida, Texas, Missouri, Maryland, Virginia, North Carolina, South Carolina, and Georgia.',
    },
    {
      name: 'bottomCtaText',
      type: 'text',
      localized: true,
      defaultValue: "Not sure what coverage you need? Call us — we'll walk you through everything.",
    },
    {
      name: 'bottomCtaButton',
      type: 'text',
      localized: true,
      defaultValue: 'Get a Quote',
    },
  ],
}
