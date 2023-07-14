import { BillIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'drinks',
  title: 'Drinks',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'menuItem'
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: { type: 'drinkCategory' },
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      price: 'item.price',
      title: 'item.title'
    },
    prepare(selection) {
      const { price } = selection
      return { ...selection, subtitle: `Price: ${price}` }
    }
  }
})
