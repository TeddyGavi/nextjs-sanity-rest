import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'information',
  title: 'Restaurant Information',
  type: 'document',
  fields: [
    defineField({
      name: 'Title',
      title: 'Your Restaurant Business Name',
      type: 'string',
      validation: rule => rule.required()
    }),
    defineField({
      name: 'hours',
      title: 'Operation Hours',
      type: 'array',
      validation: Rule => Rule.unique(),
      of: [{ type: 'dayAndTime' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'address'
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string'
    }),
    defineField({
      name: 'links',
      title: 'Social Links',
      type: 'array',
      of: [{ type: 'socialLinks' }]
    })
  ]
})
