import type { CollectionConfig } from 'payload'

export const QuoteSubmissions: CollectionConfig = {
  slug: 'quote-submissions',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'insuranceType', 'state', 'status', 'submittedAt'],
    description: 'Quote requests submitted via the website contact form.',
  },
  access: {
    create: () => true, // Allow public form submission via API
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'insuranceType',
      type: 'select',
      required: true,
      options: [
        { label: 'Health Insurance', value: 'health' },
        { label: 'Life Insurance', value: 'life' },
        { label: 'Dental Plans', value: 'dental' },
        { label: 'Medicare', value: 'medicare' },
        { label: 'Supplemental Benefits', value: 'supplemental' },
        { label: 'Car Insurance', value: 'car' },
        { label: 'General Liability', value: 'general-liability' },
        { label: 'Commercial Coverage', value: 'commercial' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'state',
      type: 'text',
      required: true,
    },
    {
      name: 'language',
      type: 'select',
      required: true,
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Closed', value: 'closed' },
      ],
    },
    {
      name: 'submittedAt',
      type: 'date',
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'adminNotes',
      type: 'textarea',
    },
  ],
}
