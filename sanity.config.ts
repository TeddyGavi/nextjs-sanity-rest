/**
 * This config is used to set up Sanity Studio that's mounted on the `/pages/studio/[[...index]].tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { cloudinarySchemaPlugin } from 'sanity-plugin-cloudinary'

// see https://www.sanity.io/docs/api-versioning for how versioning works
import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId
} from '~/lib/sanity.api'
import { schema } from '~/schemas'
import { productionUrl } from '~/utils/productionUrl'

import { myStructure } from './sanity/deskStructure'
const config = defineConfig({
  basePath: '/studio',
  name: 'pho-restaurant',
  title: 'Taste of Saigon',
  projectId,
  dataset,
  //edit schemas in './src/schemas'
  schema,
  plugins: [
    deskTool({
      structure: myStructure
    }),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    productionUrl({ previewSecretId, types: ['post'], apiVersion }),
    cloudinarySchemaPlugin()
  ]
})

export default config
