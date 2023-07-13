import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'bahnMi',
  title: 'Bahn Mi',
  type: 'document',
  fields: [
    defineField({
      name: 'item',
      title: 'item',
      type: 'menuItem',
    }),
  ],
  preview: {
    select: {
      price: 'item.price',
      title: 'item.title',
    },
    prepare(selection) {
      const { price, title } = selection
      return { ...selection, subtitle: `Price is: ${price}` }
    },
  },
})
