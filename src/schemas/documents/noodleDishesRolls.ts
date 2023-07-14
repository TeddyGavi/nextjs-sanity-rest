import { BillIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'mains',
  title: 'Noodle Dishes and Rolls',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'item',
      title: 'Item',
      type: 'menuItem'
    })
  ],
  preview: {
    select: {
      price: 'item.price',
      title: 'item.title'
    },
    prepare(selection) {
      const { price, title } = selection
      return { ...selection, subtitle: `Price: ${price}` }
    }
  }
})
