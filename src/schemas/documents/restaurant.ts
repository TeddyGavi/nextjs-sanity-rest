import { defineField, defineType, defineArrayMember } from 'sanity'

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
      of: [defineArrayMember({ type: 'dayAndTime' })],
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
      name: 'email',
      title: 'The business email',
      type: 'email'
    }),
    defineField({
      name: 'links',
      title: 'Social Links',
      type: 'array',
      of: [defineArrayMember({ type: 'socialLinks' })]
    }),
    defineField({
      name: 'logo',
      title: 'Restaurant Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text'
          // validation: Rule => Rule.required()
        }
      ]
    }),
    defineField({
      name: 'homeVid',
      title: 'Home Page Video',
      type: 'mux.video'
    })
  ]
})
