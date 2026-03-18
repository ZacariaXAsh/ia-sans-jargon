import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    eyebrow: z.string(),
    heroTitle: z.string(),
    heroSummary: z.string(),
    reassurance: z.string(),
    featuredArticles: z.array(z.string()).default([]),
    featuredGlossary: z.array(z.string()).default([]),
    checklist: z.array(z.string()).default([]),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    category: z.string(),
    audienceLevel: z.string().default('beginner'),
    estimatedMinutes: z.number(),
    publishOrder: z.number(),
    publishedAt: z.coerce.date(),
    featured: z.boolean().default(false),
    relatedGlossary: z.array(z.string()).default([]),
  }),
});

const glossary = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/glossary' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    summary: z.string(),
    shortDefinition: z.string(),
    category: z.string().default('bases'),
    relatedArticles: z.array(z.string()).default([]),
  }),
});

export const collections = { pages, articles, glossary };
