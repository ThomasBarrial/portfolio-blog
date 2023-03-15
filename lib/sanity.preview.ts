import { definePreview } from 'next-sanity/preview';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID as string;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET as string;

export const usePreview = definePreview({
  projectId,
  dataset,
});
