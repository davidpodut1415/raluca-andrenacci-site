import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BlogCard, type BlogPost } from '../components/blocks/BlogCard';
import { Seo } from '../components/Seo';
import { Img } from '../components/ui/Img';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { Container, Section } from '../components/ui/layout';
import { cn } from '../lib/cn';
import { usePages } from '../lib/usePages';

/**
 * Blog index, laid out like the reference: huge title, a large featured photo card beside a list of
 * three latest articles (thumbnail, category, title, excerpt), then topic filter pills and a 3-column
 * grid. Placeholder articles until Phase 5.
 */
export function BlogPage() {
  const { t } = useTranslation();
  const { t: tp, items } = usePages();
  const posts = items<BlogPost>('home.blog.items');
  const [featured, ...rest] = posts;
  const latest = rest.slice(0, 3);
  const categories = [...new Set(posts.map((p) => p.category))];
  const [topic, setTopic] = useState<string | null>(null);
  const shown = topic ? posts.filter((p) => p.category === topic) : posts;

  return (
    <>
      <Seo title={t('nav.blog')} description={tp('blogPage.lead')} />

      <header className="bg-grey-50 pt-12 pb-10 md:pt-20 md:pb-14 lg:pt-24">
        <Container>
          <h1 className="text-hero font-extrabold">{tp('blogPage.title')}</h1>
        </Container>
      </header>

      {featured && (
        <section className="bg-grey-50 pb-12 md:pb-16">
          <Container>
            <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
              <article className="group relative isolate flex min-h-[28rem] flex-col justify-end overflow-hidden rounded-2xl bg-black p-6 md:min-h-[36rem] md:p-10 lg:col-span-7">
                <Img
                  name={featured.image}
                  decorative
                  priority
                  sizes="(min-width: 1024px) 58vw, 100vw"
                  className="absolute inset-0 -z-20 size-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 bg-black/20 bg-linear-to-t from-black/90 via-black/50 to-transparent"
                />
                <p className="text-small tracking-wide text-white/80 uppercase">
                  {featured.category}
                </p>
                <h2 className="mt-3 max-w-2xl font-serif text-h2 leading-tight font-extrabold text-white">
                  <LocalizedLink
                    to={{ key: 'post', slug: featured.slug }}
                    className="after:absolute after:inset-0"
                  >
                    {featured.title}
                  </LocalizedLink>
                </h2>
                {featured.excerpt && (
                  <p className="mt-4 line-clamp-3 max-w-2xl text-white/85">{featured.excerpt}</p>
                )}
              </article>

              <ul className="flex flex-col justify-between gap-6 lg:col-span-5">
                {latest.map((post) => (
                  <li key={post.slug}>
                    <article className="group relative flex items-center gap-5 md:gap-6">
                      <div className="w-32 shrink-0 overflow-hidden rounded-xl md:w-44">
                        <Img
                          name={post.image}
                          decorative
                          sizes="11rem"
                          className="aspect-4/3 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-small tracking-wide text-ink-500 uppercase">
                          {post.category}
                        </p>
                        <h3 className="mt-2 text-h4 leading-snug font-semibold">
                          <LocalizedLink
                            to={{ key: 'post', slug: post.slug }}
                            className="after:absolute after:inset-0"
                          >
                            {post.title}
                          </LocalizedLink>
                        </h3>
                        {post.excerpt && (
                          <p className="mt-2 line-clamp-2 text-small text-ink-500">
                            {post.excerpt}
                          </p>
                        )}
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </Container>
        </section>
      )}

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div
          role="group"
          aria-label={tp('blogPage.topics')}
          className="mb-10 flex flex-wrap gap-3 md:mb-14"
        >
          {[null, ...categories].map((c) => {
            const active = c === topic;
            return (
              <button
                key={c ?? 'all'}
                type="button"
                aria-pressed={active}
                onClick={() => setTopic(c)}
                className={cn(
                  'inline-flex min-h-11 items-center rounded-full border px-6 font-medium transition-colors',
                  active
                    ? 'border-black bg-black text-white'
                    : 'border-line bg-grey-50 text-ink-900 hover:border-ink-900',
                )}
              >
                {c ?? tp('blogPage.allTopics')}
              </button>
            );
          })}
        </div>
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
