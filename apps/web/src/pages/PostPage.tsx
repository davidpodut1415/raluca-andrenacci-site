import { useParams } from 'react-router-dom';
import { useLocale } from '../app/LocaleContext';
import { PostBody } from '../components/blocks/PostBody';
import { Seo } from '../components/Seo';
import { BlogTilesGrid } from '../components/tiles/Sections';
import { Box, Cell, SectionLabel } from '../components/tiles/Tiles';
import { BlogImg } from '../components/ui/BlogImg';
import { LocalizedLink } from '../components/ui/LocalizedLink';
import { POSTS, getPost } from '../content/blog';
import { site } from '../lib/site';
import { useBlogMeta } from '../lib/useBlogMeta';
import { usePages } from '../lib/usePages';
import { NotFoundPage } from './NotFoundPage';

/**
 * Article page like the reference: date cell, outlined title and excerpt, byline cell beside a large
 * cover, then the body, a way back, and related articles as tiles.
 */
export function PostPage() {
  const { slug } = useParams();
  const { t: tp } = usePages();
  const meta = useBlogMeta();
  const locale = useLocale();
  const post = getPost(slug);
  if (!post) return <NotFoundPage />;
  // The excerpt is the article's opening paragraph: show it once, in the header, like the reference.
  const first = post.blocks[0];
  const openingInHeader =
    first?.type === 'paragraph' &&
    first.html.replace(/<[^>]+>/g, '').startsWith(post.excerpt.slice(0, 40));
  const body = openingInHeader ? post.blocks.slice(1) : post.blocks;
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <Seo title={post.title} description={post.excerpt} />

      <header className="grid gap-0.5 lg:grid-cols-3">
        <div className="flex flex-col gap-0.5">
          <Cell>
            {meta.date(post.date)} · {meta.category(post.category)}
          </Cell>
          <Box className="flex-1">
            <h1 className="text-display">{post.title}</h1>
            {post.excerpt && <p className="mt-4">{post.excerpt}</p>}
            {locale !== 'ro' && (
              <p className="mt-4 text-small text-ink-500">{tp('postPage.roOnly')}</p>
            )}
          </Box>
          <Cell>{site.name}</Cell>
        </div>
        {post.cover && (
          <div className="aspect-4/5 overflow-hidden bg-black lg:col-span-2 lg:aspect-auto lg:min-h-[32rem]">
            <BlogImg
              image={post.cover}
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="size-full object-cover object-top"
            />
          </div>
        )}
      </header>

      <div className="mt-6 grid gap-0.5 lg:grid-cols-3">
        <Box className="lg:col-span-2">
          <PostBody blocks={body} />
        </Box>
        <div className="lg:sticky lg:top-1.5 lg:self-start">
          <LocalizedLink
            to={{ key: 'blog' }}
            className="flex min-h-11 items-center bg-black px-2 py-2 text-small font-bold text-white hover:bg-ink-700"
          >
            ← {tp('postPage.back')}
          </LocalizedLink>
        </div>
      </div>

      <section className="mt-16">
        <SectionLabel title={tp('postPage.related')} />
        <BlogTilesGrid posts={related} />
      </section>
    </>
  );
}
