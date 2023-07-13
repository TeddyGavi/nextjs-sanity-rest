import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title of item',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        'This is optional. Write the short description you would like to be displayed under the title of this menu item',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => [
        Rule.required(),
        Rule.precision(2).warning('Maximum two decimal places!'),
        Rule.positive().error('Cannot be negative!'),
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description:
        'Secondary Price, if you input a number here it will be displayed as a range',
      validation: (Rule) => [
        Rule.precision(2).warning('Maximum two decimal places!'),
        Rule.positive().error('Cannot be negative!'),
      ],
    }),
  ],
})
