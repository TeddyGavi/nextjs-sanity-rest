import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'drinkCategory',
  title: 'Drink Category',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})
