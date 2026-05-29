import type { GlobalConfig } from 'payload'

export const ContactPage: GlobalConfig = {
  slug: 'contact-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: "Let's Talk. We're Here for You.",
    },
    {
      name: 'subheadline',
      type: 'textarea',
      localized: true,
      defaultValue: 'Whether you have a question, need a quote, or just want to review what you already have — reach out. Call us anytime — we are always happy to help.',
    },
    {
      name: 'formConfirmationMessage',
      type: 'text',
      localized: true,
      defaultValue: "Thank you! We'll be in touch soon.",
    },
    {
      name: 'calendlyLabel',
      type: 'text',
      localized: true,
      defaultValue: 'Prefer to schedule a call? Pick a time that works for you.',
    },
  ],
}
