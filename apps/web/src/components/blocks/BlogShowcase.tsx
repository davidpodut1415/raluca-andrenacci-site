import { usePages } from '../../lib/usePages';
import type { ImageName } from '../../lib/images.generated';
import { ArrowRightIcon } from '../ui/icons';
import { Img } from '../ui/Img';
import { LocalizedLink } from '../ui/LocalizedLink';
import { Container } from '../ui/layout';

interface Post {
  category: string;
  date: string;
  title: string;
  image: ImageName;
}

/**
 * Blog block: one featured article (large square image, centered meta and title) next to a list
 * of the latest ones. Placeholder content; every link goes to the blog index until Phase 5.
 */
export function BlogShowcase() {
  const { t, items } = usePages();
  const [featured, ...latest] = items<Post>('home.blog.items');
  if (!featured) return null;

  return (
    <Container>
      <div className="mb-10 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mb-14">
        <h2 className="font-extrabold">{t('home.blog.title')}</h2>
        <LocalizedLink
          to={{ key: 'blog' }}
          className="inline-flex items-center gap-2 font-medium text-ink-700 hover:text-ink-900"
        >
          {t('home.blog.all')}
          <ArrowRightIcon className="size-4" />
        </LocalizedLink>
      </div>

      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <article className="group relative flex flex-col items-center text-center">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-card">
            <Img
              name={featured.image}
              decorative
              sizes="(min-width: 1024px) 24rem, 80vw"
              className="aspect-square w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <p className="mt-8 text-small tracking-wide text-ink-500 uppercase">
            {featured.category} <span aria-hidden="true">·</span> {featured.date}
          </p>
          <h3 className="mt-3 max-w-xl font-serif text-h2 leading-tight font-extrabold">
            <LocalizedLink to={{ key: 'blog' }} className="after:absolute after:inset-0">
              {featured.title}
            </LocalizedLink>
          </h3>
        </article>

        <ul className="divide-y divide-line border-y border-line">
          {latest.map((post) => (
            <li key={post.title}>
              <article className="group relative flex items-center gap-5 py-6 md:gap-6">
                <div className="size-24 shrink-0 overflow-hidden rounded-xl md:size-28">
                  <Img
                    name={post.image}
                    decorative
                    sizes="7rem"
                    className="size-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-small tracking-wide text-ink-500 uppercase">
                    {post.category} <span aria-hidden="true">·</span> {post.date}
                  </p>
                  <h3 className="mt-2 text-h4 leading-snug font-semibold">
                    <LocalizedLink to={{ key: 'blog' }} className="after:absolute after:inset-0">
                      {post.title}
                    </LocalizedLink>
                  </h3>
                </div>
                <span
                  aria-hidden="true"
                  className="hidden items-center gap-2 font-semibold text-ink-900 sm:inline-flex"
                >
                  {t('home.blog.read')}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
