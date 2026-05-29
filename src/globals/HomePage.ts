import type { GlobalConfig } from 'payload'

export const HomePage: GlobalConfig = {
  slug: 'home-page',
  admin: {
    group: 'Pages',
  },
  fields: [
    {
      name: 'heroHeadline',
      type: 'text',
      localized: true,
      defaultValue: 'Think Insurance — Think Us.',
    },
    {
      name: 'heroSubheadline',
      type: 'text',
      localized: true,
      defaultValue: 'Your one-stop shop for all your insurance needs — for your family, your health, and your business.',
    },
    {
      name: 'heroBody',
      type: 'textarea',
      localized: true,
      defaultValue: "We are independent advisers. That means we don't work for one insurance company — we work for you. We shop across many carriers to find the best coverage at the best price, every time.",
    },
    {
      name: 'primaryCtaText',
      type: 'text',
      localized: true,
      defaultValue: 'Get a Quote',
    },
    {
      name: 'secondaryCtaText',
      type: 'text',
      localized: true,
      defaultValue: 'Learn More',
    },
    {
      name: 'trustBarItems',
      type: 'array',
      localized: true,
      fields: [
        { name: 'icon', type: 'text' },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'familyCardTitle',
      type: 'text',
      localized: true,
      defaultValue: 'You & Your Family',
    },
    {
      name: 'familyCardBody',
      type: 'textarea',
      localized: true,
      defaultValue: 'From health and life insurance to dental, Medicare, and your car — we make sure the people you love are always protected.',
    },
    {
      name: 'familyCardCta',
      type: 'text',
      localized: true,
      defaultValue: 'Personal Insurance →',
    },
    {
      name: 'businessCardTitle',
      type: 'text',
      localized: true,
      defaultValue: 'Your Business',
    },
    {
      name: 'businessCardBody',
      type: 'textarea',
      localized: true,
      defaultValue: 'Whether you\'re a small business owner, self-employed, or run a fleet of trucks — we have the right coverage to keep your business running.',
    },
    {
      name: 'businessCardCta',
      type: 'text',
      localized: true,
      defaultValue: 'Commercial Insurance →',
    },
    {
      name: 'whyHeadline',
      type: 'text',
      localized: true,
      defaultValue: "We Don't Sell Insurance. We Advise You.",
    },
    {
      name: 'whyColumns',
      type: 'array',
      localized: true,
      fields: [
        { name: 'title', type: 'text' },
        { name: 'body', type: 'textarea' },
      ],
    },
    {
      name: 'testimonialsHeadline',
      type: 'text',
      localized: true,
      defaultValue: 'What Our Clients Say',
    },
    {
      name: 'instagramHeadline',
      type: 'text',
      localized: true,
      defaultValue: 'Follow Us @Provisioninsurance',
    },
    {
      name: 'finalCtaText',
      type: 'text',
      localized: true,
      defaultValue: 'Not sure where to start? Just call us — call us anytime — we are always happy to help.',
    },
    {
      name: 'finalCtaButton',
      type: 'text',
      localized: true,
      defaultValue: 'Call Now',
    },
  ],
}
