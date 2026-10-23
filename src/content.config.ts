import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const schema = z.object({
  title: z.string(),
  description: z.string().default(''),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
});

export const collections = {
  blog: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/blog' }), schema }),
  notes: defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/notes' }), schema }),
};
