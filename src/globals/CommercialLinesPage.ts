import type { GlobalConfig } from 'payload'

export const CommercialLinesPage: GlobalConfig = {
  slug: 'commercial-lines-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      localized: true,
      defaultValue: 'Protecting Your Business, So You Can Focus on Running It.',
    },
    {
      name: 'intro',
      type: 'textarea',
      localized: true,
      defaultValue: "Every business faces risk. Whether you're just starting out or have been running your operation for years, the right insurance makes sure one unexpected event doesn't put everything you've built at risk. We work with business owners across Florida to find coverage that actually fits — not a one-size-fits-all policy.",
    },
    {
      name: 'carrierNote',
      type: 'textarea',
      localized: true,
      defaultValue: 'We work with many commercial carriers across Florida so we can find the right fit for your industry, your size, and your budget.',
    },
    {
      name: 'licensingNote',
      type: 'text',
      localized: true,
      defaultValue: 'Commercial insurance services are available for businesses operating in the state of Florida.',
    },
    {
      name: 'bottomCtaText',
      type: 'text',
      localized: true,
      defaultValue: "Not sure what your business needs? Let's talk — we'll review your situation and make sure you're properly covered.",
    },
    {
      name: 'bottomCtaButton',
      type: 'text',
      localized: true,
      defaultValue: 'Schedule a Call',
    },
  ],
}
