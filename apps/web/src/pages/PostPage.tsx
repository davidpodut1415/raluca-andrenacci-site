import { useParams } from 'react-router-dom';
import { useLocale } from '../app/LocaleContext';
import { BlogCard } from '../components/blocks/BlogCard';
import { PageHeader } from '../components/blocks/PageHeader';
import { PostBody } from '../components/blocks/PostBody';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { BlogImg } from '../components/ui/BlogImg';
import { Section, SectionHeading } from '../components/ui/layout';
import { POSTS, getPost } from '../content/blog';
import { useBlogMeta } from '../lib/useBlogMeta';
import { usePages } from '../lib/usePages';
import { NotFoundPage } from './NotFoundPage';

/** Article page: text-led header, cover, the imported article body, back link and related articles. */
export function PostPage() {
  const { slug } = useParams();
  const { t: tp } = usePages();
  const meta = useBlogMeta();
  const locale = useLocale();
  const post = getPost(slug);
  if (!post) return <NotFoundPage />;
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />
      <PageHeader
        eyebrow={`${meta.category(post.category)} · ${meta.date(post.date)}`}
        title={post.title}
        lead={locale !== 'ro' ? tp('postPage.roOnly') : undefined}
      />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="mx-auto max-w-3xl">
          {post.cover && (
            <div className="mb-10 overflow-hidden rounded-2xl bg-grey-100 shadow-card">
              <BlogImg
                image={post.cover}
                priority
                sizes="(min-width: 1024px) 48rem, 100vw"
                className="aspect-16/9 w-full object-cover object-top"
              />
            </div>
          )}
          <PostBody blocks={post.blocks} />
          <div className="mt-12">
            <ButtonLink to={{ key: 'blog' }} variant="secondary">
              {tp('postPage.back')}
            </ButtonLink>
          </div>
        </div>
      </Section>
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <SectionHeading title={tp('postPage.related')} />
        <ul className="grid gap-x-5 gap-y-12 sm:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <BlogCard post={p} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
