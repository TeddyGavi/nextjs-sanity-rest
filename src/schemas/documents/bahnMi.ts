import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bahnMi',
  title: 'Bahn Mi',
  type: 'document',
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'menuItem',
    }),
  ],
})
