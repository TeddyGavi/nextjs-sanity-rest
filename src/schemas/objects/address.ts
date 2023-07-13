import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'address',
  type: 'object',
  title: 'address',
  fields: [
    defineField({
      name: 'city',
      title: 'City or Town',
      type: 'string',
    }),
    defineField({
      name: 'postalCode',
      title: 'Postal Code',
      type: 'string',
    }),
    defineField({
      name: 'streetOrPO',
      title: 'Street Or P.O. box',
      type: 'string',
    }),
  ],
})
