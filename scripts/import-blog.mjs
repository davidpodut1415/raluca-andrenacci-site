// Imports the blog from the current WordPress site (Romanian) into the repo:
//   - apps/web/src/content/blog/posts.ro.json   (title, date, category key, excerpt, body blocks)
//   - assets-source/blog/*                      (cover + inline images, later optimized by `npm run images`)
// Run: node scripts/import-blog.mjs   (then `npm run images`)
// Phase 5 replaces this with the database + admin; the JSON shape mirrors the planned Post/PostTranslation tables.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://ralucaandrenacci.com';
const UA = {
  'user-agent':
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
};
const NOT_POSTS =
  /^(latest-news|despre-mine|servicii|contacte|uncategorized|politica-de-[a-z-]+|programeaza-prima-sesiune-gratuita|en|it)$/;

/** Editorial categories (the old site has none: every post is "Uncategorized"). Keys map to i18n `blogCategories`. */
const CATEGORY = {
  'cat-este-suficient-despre-bani-viata-familie-si-mostenirea-pe-care-o-construim': 'moneyFamily',
  'cea-mai-grea-lectie-pe-care-o-inveti-dupa-ce-ai-succes': 'leadership',
  'ce-mai-inseamna-autoritate-intr-o-lume-cu-tiktok-reclame-platite-si-validare-instanta':
    'leadership',
  'educatia-copiilor-asumare-parinti': 'familyBusiness',
  'mentorat-protectie-avere-generatii-romania': 'moneyFamily',
  '2025-un-an-al-rezilientei-dar-noi-profesionistii-suntem-pregatiti': 'leadership',
  'cum-poate-ajuta-guvernanta-familiala-afacerea-familiei-tale': 'familyBusiness',
  'validarea-ca-moneda-sociala-in-lumea-elitelor': 'leadership',
  'un-moment-de-reflectie-inceputuri-sens-si-misiune-personala': 'reflections',
  'smark-2': 'interviews',
  'de-ce-nu-pot-lucra-cu-membrii-familiei-mele-2': 'familyBusiness',
  'mentoring-notes-3': 'mentoring',
  'viata-e-perversanu-e-dreapta-si-niciodata-destula-2': 'reflections',
};

const get = async (url) => {
  const res = await fetch(url, { headers: UA });
  if (!res.ok) throw new Error(`${res.status} ${url}`);
  return res;
};
const dom = async (url) => new JSDOM(await (await get(url)).text(), { url }).window.document;

// 1. post URLs from the paginated list
const urls = new Set();
for (const page of [`${BASE}/latest-news/`, `${BASE}/latest-news/page/2/`]) {
  const doc = await dom(page);
  for (const a of doc.querySelectorAll('a[href]')) {
    const u = new URL(a.href);
    const slug = u.pathname.replace(/^\/|\/$/g, '');
    if (u.origin === BASE && slug && !slug.includes('/') && !NOT_POSTS.test(slug))
      urls.add(`${BASE}/${slug}/`);
  }
}
console.log(`found ${urls.size} posts`);

// 2. inline HTML sanitizer: keep only strong / em / a / br
function inline(node) {
  let out = '';
  for (const child of node.childNodes) {
    if (child.nodeType === 3)
      out += child.textContent
        .replace(/\u00a0/g, ' ')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    else if (child.nodeType === 1) {
      const tag = child.tagName.toLowerCase();
      const inner = inline(child);
      if (tag === 'strong' || tag === 'b')
        out += inner.trim() ? `<strong>${inner}</strong>` : inner;
      else if (tag === 'em' || tag === 'i') out += inner.trim() ? `<em>${inner}</em>` : inner;
      else if (tag === 'br') out += '<br>';
      else if (tag === 'a' && /^https?:/.test(child.href))
        out += `<a href="${child.href}" target="_blank" rel="noopener noreferrer">${inner}</a>`;
      else out += inner;
    }
  }
  return out.replace(/\s+/g, ' ').trim();
}
const plain = (html) =>
  html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .trim();

await mkdir(path.join(root, 'assets-source/blog'), { recursive: true });
async function download(src, name) {
  const res = await get(src);
  const ext = (new URL(src).pathname.match(/\.(webp|jpe?g|png)$/i)?.[1] ?? 'jpg').toLowerCase();
  await writeFile(
    path.join(root, 'assets-source/blog', `${name}.${ext}`),
    Buffer.from(await res.arrayBuffer()),
  );
  return name;
}

const posts = [];
for (const url of urls) {
  const slug = url.replace(BASE, '').replace(/\//g, '');
  const doc = await dom(url);
  const title = doc.title
    .replace(/\s*[-–|]\s*Raluca Andrenacci\s*$/, '')
    .replace(/([a-zăâîșț]):(?=[a-zăâîșț])/gi, '$1: ') // source typo: "reflecție:începuturi"
    .trim();
  const date = doc.querySelector('meta[property="article:published_time"]')?.content?.slice(0, 10);
  const widget =
    doc.querySelector('.elementor-widget-text-editor .elementor-widget-container') ??
    doc.querySelector('.elementor-widget-text-editor');
  if (!title || !date || !widget) {
    console.warn('skipped (missing data):', url);
    continue;
  }

  const blocks = [];
  let imgCount = 0;
  const walk = async (el) => {
    for (const node of el.children) {
      const tag = node.tagName.toLowerCase();
      if (tag === 'p') {
        const imgs = [...node.querySelectorAll('img')];
        for (const img of imgs) {
          const src = img.getAttribute('data-src') || img.src;
          if (src)
            blocks.push({
              type: 'image',
              id: await download(src, `${slug}--${++imgCount}`),
              alt: img.alt || '',
            });
        }
        const html = inline(node);
        if (plain(html)) blocks.push({ type: 'paragraph', html });
      } else if (/^h[1-6]$/.test(tag)) {
        const html = inline(node);
        if (plain(html)) blocks.push({ type: 'heading', level: tag === 'h2' ? 2 : 3, html });
      } else if (tag === 'ul' || tag === 'ol') {
        const items = [...node.querySelectorAll(':scope > li')].map(inline).filter((h) => plain(h));
        if (items.length) blocks.push({ type: tag === 'ul' ? 'list' : 'ordered', items });
      } else if (tag === 'blockquote') {
        const html = inline(node);
        if (plain(html)) blocks.push({ type: 'quote', html });
      } else if (tag === 'img' || tag === 'figure') {
        const img = tag === 'img' ? node : node.querySelector('img');
        const src = img?.getAttribute('data-src') || img?.src;
        if (src)
          blocks.push({
            type: 'image',
            id: await download(src, `${slug}--${++imgCount}`),
            alt: img.alt || '',
          });
      } else {
        await walk(node);
      }
    }
  };
  await walk(widget);

  const cover = doc.querySelector('meta[property="og:image"]')?.content;
  const coverId = cover ? await download(cover, slug) : null;
  const first = blocks.find((b) => b.type === 'paragraph');
  let excerpt = first ? plain(first.html) : '';
  if (excerpt.length > 190) excerpt = excerpt.slice(0, 190).replace(/\s+\S*$/, '') + '…';

  posts.push({
    slug,
    title,
    date,
    category: CATEGORY[slug] ?? 'reflections',
    cover: coverId,
    excerpt,
    blocks,
  });
  console.log(
    date,
    slug.slice(0, 60),
    `${blocks.length} blocks`,
    coverId ? '+cover' : '(no cover)',
  );
}

posts.sort((a, b) => b.date.localeCompare(a.date));
await mkdir(path.join(root, 'apps/web/src/content/blog'), { recursive: true });
await writeFile(
  path.join(root, 'apps/web/src/content/blog/posts.ro.json'),
  JSON.stringify(posts, null, 2) + '\n',
);
console.log(`wrote ${posts.length} posts`);
