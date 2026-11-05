import raw from './posts.ro.json';

export type CategoryKey =
  'moneyFamily' | 'leadership' | 'familyBusiness' | 'mentoring' | 'reflections' | 'interviews';

export type PostBlock =
  | { type: 'paragraph'; html: string }
  | { type: 'heading'; level: 2 | 3; html: string }
  | { type: 'list' | 'ordered'; items: string[] }
  | { type: 'quote'; html: string }
  | { type: 'image'; id: string; alt: string };

export interface BlogPostData {
  slug: string;
  title: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  category: CategoryKey;
  /** Image id in BLOG_IMAGES, or null. */
  cover: string | null;
  excerpt: string;
  blocks: PostBlock[];
}

/**
 * Blog content imported from the previous site (Romanian; newest first) by scripts/import-blog.mjs.
 * Phase 5 moves this into the database; the shape mirrors the planned Post/PostTranslation models.
 */
export const POSTS = raw as BlogPostData[];

export const getPost = (slug: string | undefined) => POSTS.find((p) => p.slug === slug);

export const CATEGORY_KEYS = [...new Set(POSTS.map((p) => p.category))];
