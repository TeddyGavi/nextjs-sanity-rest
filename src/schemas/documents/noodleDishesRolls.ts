import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mains',
  title: 'Noodle Dishes and Rolls',
  type: 'document',
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'menuItem',
    }),
  ],
})
