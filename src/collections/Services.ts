import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'order', 'active'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'icon',
      type: 'select',
      required: true,
      options: [
        { label: 'Heart', value: 'heart' },
        { label: 'Shield', value: 'shield' },
        { label: 'Smile', value: 'smile' },
        { label: 'Stethoscope', value: 'stethoscope' },
        { label: 'Car', value: 'car' },
        { label: 'Briefcase', value: 'briefcase' },
        { label: 'Truck', value: 'truck' },
        { label: 'Hard Hat', value: 'hard-hat' },
        { label: 'File Text', value: 'file-text' },
        { label: 'Plus', value: 'plus' },
      ],
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Personal', value: 'personal' },
        { label: 'Commercial', value: 'commercial' },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'active',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
