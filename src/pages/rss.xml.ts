import type { APIRoute } from 'astro';
import { getPosts, getNotes } from '../lib/content';
import { siteConfig, url } from '../config';

function escapeXml(text: string) { return text.replace(/[<>&"']/g, char => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' }[char]!)); }

export const GET: APIRoute = async ({ site }) => {
  const [posts, notes] = await Promise.all([getPosts(), getNotes()]);
  const entries = [...posts, ...notes].sort((a, b) => b.data.date.localeCompare(a.data.date));
  const origin = site ?? new URL('http://localhost:4321');
  const items = entries.map(entry => {
    const link = new URL(url(`${entry.collection === 'blog' ? 'posts' : 'notes'}/${entry.id}/`), origin).href;
    return `<item><title>${escapeXml(entry.data.title)}</title><description>${escapeXml(entry.data.description)}</description><link>${escapeXml(link)}</link><guid isPermaLink="true">${escapeXml(link)}</guid><pubDate>${new Date(`${entry.data.date}T00:00:00+08:00`).toUTCString()}</pubDate>${entry.data.tags.map(tag => `<category>${escapeXml(tag)}</category>`).join('')}</item>`;
  }).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(siteConfig.title)}</title><link>${escapeXml(new URL(url(), origin).href)}</link><description>${escapeXml(siteConfig.description)}</description><language>zh-CN</language>${items}</channel></rss>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
