import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    lang: z.enum(['fr', 'en']),
  }),
});

export const collections = {
  blog: blogCollection,
};
