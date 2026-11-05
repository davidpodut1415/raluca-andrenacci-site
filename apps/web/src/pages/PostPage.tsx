import { useParams } from 'react-router-dom';
import { BlogCard, type BlogPost } from '../components/blocks/BlogCard';
import { PageHeader } from '../components/blocks/PageHeader';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Section, SectionHeading } from '../components/ui/layout';
import { usePages } from '../lib/usePages';
import { NotFoundPage } from './NotFoundPage';

/** Article page template. The body comes from the blog API in Phase 5; today it shows the header and a notice. */
export function PostPage() {
  const { slug } = useParams();
  const { t: tp, items } = usePages();
  const posts = items<BlogPost>('home.blog.items');
  const post = posts.find((p) => p.slug === slug);
  if (!post) return <NotFoundPage />;
  const related = posts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo title={post.title} noindex />
      <PageHeader eyebrow={`${post.category} · ${post.date}`} title={post.title} />
      <Section className="pt-0 md:pt-0 lg:pt-0">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-2xl shadow-card">
            <Img
              name={post.image}
              decorative
              sizes="(min-width: 1024px) 48rem, 100vw"
              className="aspect-16/9 w-full object-cover object-top"
            />
          </div>
          <p className="mt-10 font-serif text-h3 leading-snug font-semibold text-ink-900">
            {tp('postPage.soon')}
          </p>
          <div className="mt-8">
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
