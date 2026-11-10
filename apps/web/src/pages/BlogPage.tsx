import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Seo } from '../components/Seo';
import { BlogTilesGrid, PageIntro } from '../components/tiles/Sections';
import { CATEGORY_KEYS, POSTS } from '../content/blog';
import type { CategoryKey } from '../content/blog';
import { cn } from '../lib/cn';
import { useBlogMeta } from '../lib/useBlogMeta';
import { usePages } from '../lib/usePages';

/** Blog index: title cell, topic filter cells (like the reference's Filtra), then a 3-column tile grid. */
export function BlogPage() {
  const { t } = useTranslation();
  const { t: tp } = usePages();
  const meta = useBlogMeta();
  const [topic, setTopic] = useState<CategoryKey | null>(null);
  const shown = topic ? POSTS.filter((p) => p.category === topic) : POSTS;

  return (
    <>
      <Seo title={t('nav.blog')} description={tp('blogPage.lead')} />
      <PageIntro title={tp('blogPage.title')} lead={tp('blogPage.lead')} />

      <div role="group" aria-label={tp('blogPage.topics')} className="mb-6 flex flex-wrap gap-0.5">
        {[null, ...CATEGORY_KEYS].map((c) => {
          const active = c === topic;
          return (
            <button
              key={c ?? 'all'}
              type="button"
              aria-pressed={active}
              onClick={() => setTopic(c)}
              className={cn(
                'inline-flex min-h-11 items-center px-3 text-small font-bold',
                active ? 'bg-tint-100 text-black' : 'bg-black text-white hover:bg-ink-700',
              )}
            >
              {c ? meta.category(c) : tp('blogPage.allTopics')}
            </button>
          );
        })}
      </div>

      <BlogTilesGrid posts={shown} />
    </>
  );
}
