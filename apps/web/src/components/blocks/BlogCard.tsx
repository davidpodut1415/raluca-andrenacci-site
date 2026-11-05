import type { ImageName } from '../../lib/images.generated';
import { Img } from '../ui/Img';
import { LocalizedLink } from '../ui/LocalizedLink';

export interface BlogPost {
  slug: string;
  category: string;
  date: string;
  title: string;
  image: ImageName;
}

/** Article card: photo, category · date, title. The whole card is one link. */
export function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group relative flex flex-col">
      <div className="overflow-hidden rounded-2xl">
        <Img
          name={post.image}
          decorative
          sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw"
          className="aspect-4/3 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <p className="mt-5 text-small tracking-wide text-ink-500 uppercase">
        {post.category} <span aria-hidden="true">·</span> {post.date}
      </p>
      <h3 className="mt-2 text-h4 leading-snug font-semibold">
        <LocalizedLink
          to={{ key: 'post', slug: post.slug }}
          className="after:absolute after:inset-0"
        >
          {post.title}
        </LocalizedLink>
      </h3>
    </article>
  );
}
