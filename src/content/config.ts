import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    category: z.string().default('Systems & AI'),
    readingTime: z.string().optional(),
    series: z
      .object({
        name: z.string(),
        order: z.number(),
      })
      .optional(),
  }),
});

const publications = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    venue: z.string(),
    year: z.number(),
    paperUrl: z.string().optional(),
    projectUrl: z.string().optional(),
    codeUrl: z.string().optional(),
    bibtex: z.string().optional(),
    highlightNote: z.string().optional(),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    audioComparison: z
      .object({
        title: z.string(),
        description: z.string().optional(),
        inputAudio: z.string(),
        outputAudio: z.string(),
        inputLabel: z.string().optional(),
        outputLabel: z.string().optional(),
      })
      .optional(),
  }),
});

export const collections = { blog, publications };
