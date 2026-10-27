import { useTranslation } from 'react-i18next';
import { CheckList } from '../components/blocks/CheckList';
import { CTABand } from '../components/blocks/CTABand';
import { Seo } from '../components/Seo';
import { ButtonLink } from '../components/ui/Button';
import { Img } from '../components/ui/Img';
import { Container, Eyebrow, Section } from '../components/ui/layout';
import { usePages } from '../lib/usePages';

interface Stat {
  value: string;
  label: string;
}

export function AboutPage() {
  const { t } = useTranslation();
  const { t: tp, list, items } = usePages();

  return (
    <>
      <Seo title={t('nav.about')} description={tp('about.seoDescription')} />

      <section className="bg-grey-50 py-12 md:py-16 lg:py-20">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <Eyebrow>{tp('about.eyebrow')}</Eyebrow>
              <h1>{tp('about.title')}</h1>
              <p className="max-w-prose font-serif text-h3 text-ink-900">{tp('about.lead')}</p>
              <div className="flex max-w-prose flex-col gap-5 text-ink-700">
                {list('about.bio').map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="overflow-hidden rounded-2xl">
                <Img
                  name="portrait-leaning"
                  priority
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="aspect-4/5 w-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <dl className="grid gap-10 md:grid-cols-3 md:gap-8">
          {items<Stat>('about.stats').map((stat) => (
            <div key={stat.value + stat.label} className="border-t-2 border-burgundy-700 pt-6">
              <dt className="font-serif text-display font-bold text-ink-900">{stat.value}</dt>
              <dd className="mt-3 text-ink-500">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="muted">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <h2 className="mb-8">{tp('about.credentialsTitle')}</h2>
            <CheckList items={list('about.credentials')} />
          </div>
          <div className="lg:col-span-6">
            <div className="mx-auto max-w-sm overflow-hidden rounded-xl border border-line bg-white p-3 shadow-card">
              <Img
                name="certificate-emcc"
                sizes="(min-width: 1024px) 24rem, 100vw"
                className="w-full rounded-md"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <h2>{tp('about.pressTitle')}</h2>
          </div>
          <div className="flex flex-col gap-8 lg:col-span-7">
            <p className="text-ink-700">{tp('about.pressText')}</p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {list('about.pressItems').map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-line px-5 py-4 font-serif text-h4 font-semibold text-ink-900"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CTABand
        title={tp('about.ctaTitle')}
        text={tp('about.ctaText')}
        action={
          <ButtonLink to={{ key: 'contact' }} search="?type=free-session" size="lg">
            {t('cta.freeSession')}
          </ButtonLink>
        }
      />
    </>
  );
}
