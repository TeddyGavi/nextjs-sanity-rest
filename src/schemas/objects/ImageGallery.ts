import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'imageGallery',
  title: 'Image Gallery',
  type: 'object',
  fields: [
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          title: 'Image',
          options: {
            hotspot: true
          },
          fields: [
            defineField({
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              validation: rule => rule.required()
            }),
            defineField({
              name: 'menuCatPhoto',
              title: 'Photo of which menu item?',
              type: 'string'
            })
          ]
        })
      ],
      options: {
        layout: 'grid'
      }
    })
  ]
})
