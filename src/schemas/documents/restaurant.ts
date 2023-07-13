import { defineField, defineType } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export default defineType({
  name: 'information',
  title: 'Restaurant Information',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      title: 'Your Restaurant Business Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'address',
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'links',
      title: 'Social Links',
      type: 'array',
      icon: LinkIcon,
      of: [{ type: 'socialLinks' }],
    }),
  ],
})
