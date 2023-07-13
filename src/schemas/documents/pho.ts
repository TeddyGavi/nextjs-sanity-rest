import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'pho',
  title: 'Pho',
  type: 'document',
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'menuItem',
    }),
  ],
})
