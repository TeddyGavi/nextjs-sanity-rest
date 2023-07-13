import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'drinks',
  title: 'Drinks',
  type: 'document',
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'menuItem',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'drinkCategory' },
    }),
  ],
  preview: {
    select: {
      price: 'item.price',
      title: 'item.title',
    },
    prepare(selection) {
      const { price, title } = selection
      return { ...selection, subtitle: `Price: ${price}` }
    },
  },
})
