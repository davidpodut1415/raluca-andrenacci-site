import { POSTS } from '../../content/blog';
import { useBlogMeta } from '../../lib/useBlogMeta';
import { usePages } from '../../lib/usePages';
import { ArrowRightIcon } from '../ui/icons';
import { BlogImg } from '../ui/BlogImg';
import { LocalizedLink } from '../ui/LocalizedLink';
import { Container } from '../ui/layout';

/** Landing-page blog block: one featured article (large square image) next to three latest articles. */
export function BlogShowcase() {
  const { t } = usePages();
  const meta = useBlogMeta();
  const [featured, ...rest] = POSTS;
  const latest = rest.slice(0, 3);
  if (!featured) return null;

  return (
    <Container>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mb-10">
        <h2 className="font-extrabold">{t('home.blog.title')}</h2>
        <LocalizedLink
          to={{ key: 'blog' }}
          className="inline-flex items-center gap-2 font-medium text-ink-700 hover:text-ink-900"
        >
          {t('home.blog.all')}
          <ArrowRightIcon className="size-4" />
        </LocalizedLink>
      </div>

      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <article className="group relative flex flex-col items-center text-center">
          <div className="w-full max-w-64 overflow-hidden rounded-2xl bg-grey-100 shadow-card transition-transform duration-500 group-hover:scale-105">
            <BlogImg
              image={featured.cover}
              sizes="16rem"
              className="aspect-square w-full object-cover object-top"
            />
          </div>
          <p className="mt-6 text-small tracking-wide text-ink-500 uppercase">
            {meta.category(featured.category)} <span aria-hidden="true">·</span>{' '}
            {meta.date(featured.date)}
          </p>
          <h3 className="mt-3 max-w-lg font-serif text-h3 leading-tight font-extrabold">
            <LocalizedLink
              to={{ key: 'post', slug: featured.slug }}
              className="after:absolute after:inset-0"
            >
              {featured.title}
            </LocalizedLink>
          </h3>
        </article>

        <ul className="divide-y divide-line border-y border-line">
          {latest.map((post) => (
            <li key={post.slug}>
              <article className="group relative flex items-center gap-5 py-5 md:gap-6">
                <div className="size-20 shrink-0 overflow-hidden rounded-xl bg-grey-100 md:size-24 transition-transform duration-500 group-hover:scale-105">
                  <BlogImg
                    image={post.cover}
                    sizes="6rem"
                    className="size-full object-cover object-top"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-small tracking-wide text-ink-500 uppercase">
                    {meta.category(post.category)} <span aria-hidden="true">·</span>{' '}
                    {meta.date(post.date)}
                  </p>
                  <h3 className="mt-2 text-h4 leading-snug font-semibold">
                    <LocalizedLink
                      to={{ key: 'post', slug: post.slug }}
                      className="after:absolute after:inset-0"
                    >
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
