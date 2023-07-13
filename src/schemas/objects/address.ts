import { PROVINCES } from 'constants/provinces'
import { defineField, defineType } from 'sanity'
const provTransformed = PROVINCES.map((prov) => ({
  title: prov.short,
  value: prov.name,
}))

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
      name: 'province',
      title: 'Province',
      type: 'string',
      options: {
        list: provTransformed,
        layout: 'dropdown',
      },
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
