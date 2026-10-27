import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { useConsent } from '../../features/consent/ConsentProvider';
import { PROGRAM_KEYS, type StaticRouteKey } from '../../i18n/routes';
import { site } from '../../lib/site';
import { ChevronRightIcon, InstagramIcon, LinkedInIcon } from '../ui/icons';
import { LocalizedLink } from '../ui/LocalizedLink';
import { Container } from '../ui/layout';
import { LanguageMenu } from './LanguageMenu';

const SITE_LINKS: StaticRouteKey[] = ['home', 'about', 'programs', 'blog', 'contact'];

const linkClass =
  'inline-flex min-h-12 items-center text-body text-white underline-offset-4 hover:underline';
const mutedLinkClass =
  'inline-flex min-h-11 items-center text-small text-white/75 underline-offset-4 hover:text-white hover:underline';

function Blurb({ text, link }: { text: ReactNode; link: ReactNode }) {
  return (
    <div>
      <p className="inline-flex items-center gap-1 text-body font-semibold text-white">
        {link}
        <ChevronRightIcon className="size-5" />
      </p>
      <p className="mt-2 max-w-xs text-small text-white/75">{text}</p>
    </div>
  );
}

export function Footer() {
  const { t } = useTranslation();
  const { openPreferences } = useConsent();

  return (
    <footer className="bg-espresso-900 text-white/85">
      <Container className="pt-16 md:pt-20 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <p className="text-button font-semibold tracking-wordmark text-white uppercase">
              {t('brand')}
            </p>
            <p className="mt-4 max-w-xs text-small text-white/75">{t('footer.tagline')}</p>
          </div>

          <nav aria-labelledby="footer-programs" className="lg:col-span-4">
            <h2 id="footer-programs" className="sr-only">
              {t('footer.programsTitle')}
            </h2>
            <ul>
              {PROGRAM_KEYS.map((program) => (
                <li key={program}>
                  <LocalizedLink to={{ key: 'program', program }} className={linkClass}>
                    {t(`programs.names.${program}`)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-labelledby="footer-site" className="lg:col-span-2">
            <h2 id="footer-site" className="sr-only">
              {t('footer.navTitle')}
            </h2>
            <ul>
              {SITE_LINKS.map((key) => (
                <li key={key}>
                  <LocalizedLink to={{ key }} className={linkClass}>
                    {t(`nav.${key}`)}
                  </LocalizedLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col gap-10 lg:col-span-3">
            <Blurb
              text={t('footer.blurbs.freeSession.text')}
              link={
                <LocalizedLink
                  to={{ key: 'contact' }}
                  search="?type=free-session"
                  className="underline-offset-4 hover:underline"
                >
                  {t('footer.blurbs.freeSession.title')}
                </LocalizedLink>
              }
            />
            <Blurb
              text={
                <>
                  {t('footer.blurbs.contact.text')}{' '}
                  <a
                    href={`mailto:${site.email}`}
                    className="text-white underline underline-offset-4"
                  >
                    {site.email}
                  </a>
                </>
              }
              link={
                <LocalizedLink
                  to={{ key: 'contact' }}
                  className="underline-offset-4 hover:underline"
                >
                  {t('footer.blurbs.contact.title')}
                </LocalizedLink>
              }
            />
          </div>
        </div>

        <div className="mt-16 grid items-start gap-8 border-t border-white/15 py-10 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <LanguageMenu
              placement="up"
              tone="inverted"
              align="left"
              className="-ml-3 inline-block"
            />
          </div>

          <div className="lg:col-span-6">
            <ul className="flex flex-wrap gap-x-8">
              <li>
                <LocalizedLink to={{ key: 'privacy' }} className={mutedLinkClass}>
                  {t('footer.privacy')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to={{ key: 'cookies' }} className={mutedLinkClass}>
                  {t('footer.cookies')}
                </LocalizedLink>
              </li>
              <li>
                <button type="button" onClick={openPreferences} className={mutedLinkClass}>
                  {t('footer.manageCookies')}
                </button>
              </li>
            </ul>
            <p className="mt-2 text-small text-white/75">
              {t('footer.rights', { year: new Date().getFullYear() })} · {t('footer.location')}
            </p>
          </div>

          <ul className="flex items-center gap-1 lg:col-span-3 lg:justify-end">
            <li>
              <a
                href={site.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.linkedin')}
                className="inline-flex size-11 items-center justify-center rounded-md text-white hover:bg-white/10"
              >
                <LinkedInIcon />
              </a>
            </li>
            <li>
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t('footer.instagram')}
                className="inline-flex size-11 items-center justify-center rounded-md text-white hover:bg-white/10"
              >
                <InstagramIcon />
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </footer>
  );
}
