import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'galleryImages',
      title: 'Gallery',
      type: 'imageGallery'
    })
  ],
  preview: {
    select: {
      images: 'galleryImages'
    },
    prepare(selection) {
      const { images } = selection

      return {
        title: `Gallery of ${Object.keys(images.images).length} images`,
        subtitle: `Alt text: ${images.images[0].alt}`,
        media: images.images[0]
      }
    }
  }
})
