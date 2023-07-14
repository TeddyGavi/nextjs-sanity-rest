import { LinkIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLinks',
  title: 'Social Links',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'URL',
      type: 'url',
    }),
    defineField({
      name: 'link',
      title: 'Link Title',
      type: 'string',
    }),
    defineField({
      name: 'handle',
      title: 'Handle',
      type: 'string',
    }),
  ],
})
