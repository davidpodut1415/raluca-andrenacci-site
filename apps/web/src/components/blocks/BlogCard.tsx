import type { BlogPostData } from '../../content/blog';
import { useBlogMeta } from '../../lib/useBlogMeta';
import { BlogImg } from '../ui/BlogImg';
import { LocalizedLink } from '../ui/LocalizedLink';

/** Article card: photo, category · date, title, excerpt. The whole card is one link. */
export function BlogCard({ post }: { post: BlogPostData }) {
  const meta = useBlogMeta();

  return (
    <article className="group relative flex flex-col">
      <div className="overflow-hidden rounded-2xl bg-grey-100">
        <BlogImg
          image={post.cover}
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
          className="aspect-4/3 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-5 text-small tracking-wide text-ink-500 uppercase">
        {meta.category(post.category)} <span aria-hidden="true">·</span> {meta.date(post.date)}
      </p>
      <h3 className="mt-2 text-h4 leading-snug font-semibold">
        <LocalizedLink
          to={{ key: 'post', slug: post.slug }}
          className="after:absolute after:inset-0"
        >
          {post.title}
        </LocalizedLink>
      </h3>
      {post.excerpt && <p className="mt-3 line-clamp-2 text-ink-500">{post.excerpt}</p>}
    </article>
  );
}
