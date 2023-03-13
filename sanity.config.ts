import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import { schemaTypes } from './schemas'
import { myTheme } from './theme'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string

export default defineConfig({
  basePath: "/studio",
  name: 'PAPAFMA_Content_Studio',
  title: 'PAPAFAM Content studio',
  projectId,
  dataset,

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
  theme: myTheme
})
