import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;
export type Note = CollectionEntry<'notes'>;

export async function getPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

export async function getNotes() {
  return (await getCollection('notes', ({ data }) => !data.draft))
    .sort((a, b) => b.data.date.localeCompare(a.data.date));
}

export function readingTime(body = '') {
  const cjk = body.match(/[\u3400-\u9fff]/g)?.length ?? 0;
  const words = body.replace(/[\u3400-\u9fff]/g, '').match(/\b[\w-]+\b/g)?.length ?? 0;
  return Math.max(1, Math.ceil(cjk / 350 + words / 220));
}

export function shortDate(date: string) {
  return date.slice(5).replace('-', '.');
}
