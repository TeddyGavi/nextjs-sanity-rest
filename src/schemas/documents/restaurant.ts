import { defineField, defineType } from 'sanity'

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
  ],
})
