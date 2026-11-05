import { useTranslation } from 'react-i18next';
import { BlogCard, type BlogPost } from '../components/blocks/BlogCard';
import { PageHeader } from '../components/blocks/PageHeader';
import { Seo } from '../components/Seo';
import { Img } from '../components/ui/Img';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { ArrowRightIcon } from '../components/ui/icons';
import { Chip, Section } from '../components/ui/layout';
import { usePages } from '../lib/usePages';

/** Blog index: text-led header → featured article → article grid. Placeholder posts until Phase 5. */
export function BlogPage() {
  const { t } = useTranslation();
  const { t: tp, items } = usePages();
  const [featured, ...rest] = items<BlogPost>('home.blog.items');

  return (
    <>
      <Seo title={t('nav.blog')} description={tp('blogPage.lead')} />
      <PageHeader
        eyebrow={tp('blogPage.eyebrow')}
        title={tp('blogPage.title')}
        lead={tp('blogPage.lead')}
      />

      {featured && (
        <Section className="pt-0 md:pt-0 lg:pt-0">
          <article className="group relative grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-2xl shadow-card">
              <Img
                name={featured.image}
                decorative
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="aspect-4/3 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col items-start gap-5">
              <Chip>{tp('blogPage.featured')}</Chip>
              <p className="text-small tracking-wide text-ink-500 uppercase">
                {featured.category} <span aria-hidden="true">·</span> {featured.date}
              </p>
              <h2 className="font-extrabold">
                <LocalizedLink
                  to={{ key: 'post', slug: featured.slug }}
                  className="after:absolute after:inset-0"
                >
                  {featured.title}
                </LocalizedLink>
              </h2>
              <span className="inline-flex items-center gap-2 font-semibold text-ink-900">
                {tp('blogPage.read')}
                <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        </Section>
      )}

      <Section className="pt-0 md:pt-0 lg:pt-0">
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((post) => (
            <li key={post.slug}>
              <BlogCard post={post} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
