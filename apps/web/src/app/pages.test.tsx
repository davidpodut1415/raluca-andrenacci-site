import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { PROGRAM_KEYS } from '../i18n/routes';
import { renderApp, resetBrowserState } from '../test/utils';

beforeEach(() => {
  resetBrowserState();
  // Keep the cookie banner out of the way.
  window.localStorage.setItem(
    'ra_consent_v1',
    JSON.stringify({ analytics: false, marketing: false, savedAt: Date.now() }),
  );
});

describe('home', () => {
  it('leads with the family-business offer and links every family program', async () => {
    renderApp('/');
    expect(
      await screen.findByRole('heading', { level: 1, name: /succesiune fără conflict/i }),
    ).toBeInTheDocument();

    const main = screen.getByRole('main');
    for (const name of [
      'Co-Leadership: Fondator & NextGen',
      'Mentorat pentru Succesorii NextGen',
      'Integrarea Succesorului în Business',
      'Entrepreneur-in-Residence',
      'Advisory de Guvernanță & Board Family-Office',
    ]) {
      expect(
        within(main).getByRole('link', {
          name: new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`),
        }),
      ).toBeInTheDocument();
    }
    // The individual Audit program is not promoted on the landing page (it lives on the Programs page).
    expect(
      within(main).queryByRole('heading', { name: 'Auditul Prezentului Tău' }),
    ).not.toBeInTheDocument();
  });

  it('plays a silent looping background video without a pause control', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const video = document.querySelector('video')!;
    expect(video).toHaveAttribute('poster', '/video/hero-poster.jpg');
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video).toHaveAttribute('aria-hidden', 'true');
    expect(video.querySelectorAll('source')).toHaveLength(2);
    expect(screen.queryByRole('button', { name: /videoclip/i })).not.toBeInTheDocument();
  });

  it('shows a centered "Featured in" label above the partner logos', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const bar = screen.getByRole('region', { name: 'Featured in' });
    expect(within(bar).getByText('Featured in')).toBeVisible();
    const logos = within(bar).getAllByRole('img');
    expect(logos.map((l) => l.getAttribute('alt'))).toEqual([
      expect.stringMatching(/^Forbes România/),
      expect.stringMatching(/^Ziarul Financiar/),
      'EMCC Global',
      expect.stringMatching(/^Family Firm Institute/),
      'Elian Partners',
    ]);
    for (const logo of logos) {
      expect(logo).toHaveAttribute('width');
      expect(logo).toHaveAttribute('height');
    }
    expect(within(bar).getByRole('list').className).toContain('justify-center');
  });

  it('shows one large testimonial at a time with a selectable attribution row', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/ca succesor/);

    await userEvent.click(tabs[1]!);
    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent(/momentul meu de reset/);

    tabs[1]!.focus();
    await userEvent.keyboard('{ArrowRight}');
    expect(tabs[2]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[2]).toHaveFocus();
  });
});

describe('media carousel', () => {
  it('lists the media features as links and has working controls', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const carousel = screen.getByRole('region', { name: 'Apariții în media' });
    expect(within(carousel).getAllByRole('article')).toHaveLength(6);
    const links = within(carousel).getAllByRole('link', { name: /^Deschide:/ });
    expect(links).toHaveLength(6);
    for (const link of links) expect(link).toHaveAttribute('href', '/blog');
    expect(within(carousel).getByRole('button', { name: 'Următorul' })).toBeInTheDocument();
    expect(within(carousel).getByRole('button', { name: 'Anterior' })).toBeInTheDocument();
    expect(
      within(carousel).getAllByRole('button', { name: /Mergi la grupul/ }).length,
    ).toBeGreaterThan(0);
  });
});

describe('programs', () => {
  it('lists the programs and an FAQ', async () => {
    renderApp('/programe');
    await screen.findByRole('heading', { level: 1, name: /programe de mentorat/i });
    // five family programs + the individual Audit track, each as one "Part" block
    expect(screen.getAllByRole('article')).toHaveLength(6);
    expect(screen.getByText('Ce este prima sesiune gratuită?')).toBeInTheDocument();
  });

  it.each(PROGRAM_KEYS)('renders the %s detail page in every language', async (program) => {
    for (const [path, name] of [
      [
        `/programe/${
          {
            coLeadership: 'co-leadership-fondator-nextgen',
            nextgenMentoring: 'mentorat-succesori-nextgen',
            successorIntegration: 'integrarea-succesorului',
            entrepreneurInResidence: 'entrepreneur-in-residence',
            governanceBoard: 'guvernanta-family-office-board',
            audit: 'auditul-prezentului-tau',
          }[program]
        }`,
        null,
      ],
    ] as const) {
      const { unmount } = renderApp(path);
      expect(await screen.findByRole('heading', { level: 1 })).toBeInTheDocument();
      expect(name).toBeNull();
      expect(screen.getByRole('heading', { level: 2, name: 'Cum lucrăm' })).toBeInTheDocument();
      unmount();
    }
  });

  it('the Audit page has its perks and testimonials', async () => {
    renderApp('/programe/auditul-prezentului-tau');
    await screen.findByRole('heading', { level: 1, name: 'Auditul Prezentului Tău' });
    expect(screen.getByText('MiniAudit gratuit inclus')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });
});

describe('about, contact and legal', () => {
  it('about shows the bio, certifications and certificate image', async () => {
    renderApp('/despre-mine');
    await screen.findByRole('heading', { level: 1, name: 'Raluca Andrenacci' });
    expect(screen.getByText(/Mentor EIA Practitioner, EMCC România/)).toBeInTheDocument();
    expect(screen.getByAltText(/Certificat EMCC/)).toBeInTheDocument();
  });

  it('contact has the full form with a disabled submit until Phase 4', async () => {
    renderApp('/contact');
    await screen.findByRole('heading', { level: 1, name: /prima sesiune gratuită/i });
    expect(screen.getByLabelText(/Nume și prenume/)).toBeRequired();
    expect(screen.getByLabelText(/^Email/)).toBeRequired();
    expect(screen.getByRole('checkbox')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Trimite mesajul' })).toBeDisabled();
    expect(screen.getAllByRole('link', { name: /mentoringshop@gmail.com/ }).length).toBeGreaterThan(
      0,
    );
  });

  it('FAQ items expand', async () => {
    renderApp('/contact');
    const summary = await screen.findByText('Este confidențial?');
    await userEvent.click(summary);
    expect(summary.closest('details')).toHaveAttribute('open');
  });

  it('legal pages render the carried-over text; EN/IT carry a translation notice', async () => {
    const { unmount } = renderApp('/confidentialitate');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Politica de confidențialitate' }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(4);
    unmount();

    renderApp('/en/cookies');
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Cookie policy' }),
    ).toBeInTheDocument();
    expect(screen.getByText(/currently available in Romanian only/)).toBeInTheDocument();
  });
});

describe('footer', () => {
  it('has program links, site links, legal links, social links and a language menu', async () => {
    renderApp('/en');
    await screen.findByRole('heading', { level: 1 });
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getAllByRole('link', { name: /Co-Leadership/ })).toHaveLength(1);
    expect(within(footer).getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
      'href',
      '/en/privacy',
    );
    expect(
      within(footer).getByRole('link', { name: 'Raluca Andrenacci on LinkedIn' }),
    ).toHaveAttribute('rel', 'noopener noreferrer');
    expect(within(footer).getByRole('button', { name: 'Language: English' })).toBeInTheDocument();
    expect(within(footer).getByRole('button', { name: 'Cookie settings' })).toBeInTheDocument();
  });
});

describe('persistent chrome and templates', () => {
  it.each([
    ['/', /discutăm despre continuitatea/i],
    ['/despre-mine', /să ne cunoaștem/i],
    ['/programe', /care program ți se potrivește/i],
    ['/programe/auditul-prezentului-tau', /audit al prezentului tău/i],
    ['/blog', /ai o întrebare după ce ai citit/i],
    ['/en/programs/entrepreneur-in-residence', /find out if this program is right for you/i],
  ])(
    '%s ends with the closing CTA (page-specific headline) above the footer',
    async (path, title) => {
      renderApp(path);
      await screen.findByRole('heading', { level: 1 });
      const cta = screen.getByRole('heading', { level: 2, name: title });
      const footer = screen.getByRole('contentinfo');
      expect(cta.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
      const section = cta.closest('section')!;
      const link = within(section).getByRole('link', { name: /sesiunea|session/i });
      expect(link.getAttribute('href')).toMatch(/\/contact\?type=free-session$/);
    },
  );

  it('the contact page has no closing CTA (it is the form)', async () => {
    renderApp('/contact');
    await screen.findByRole('heading', { level: 1 });
    expect(
      screen.queryByRole('heading', { level: 2, name: /discutăm despre continuitatea/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('about shows the numbers band and testimonials', async () => {
    renderApp('/despre-mine');
    await screen.findByRole('heading', { level: 1, name: 'Raluca Andrenacci' });
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('program pages show numbered directions and step cards', async () => {
    renderApp('/programe/mentorat-succesori-nextgen');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getAllByRole('listitem').some((li) => li.textContent?.startsWith('01'))).toBe(
      true,
    );
    expect(
      screen.getByRole('heading', {
        level: 3,
        name: /Plan personalizat pentru următoarele 90 de zile/,
      }),
    ).toBeInTheDocument();
  });

  it('blog index lists featured and latest articles that link to post pages', async () => {
    renderApp('/blog');
    await screen.findByRole('heading', { level: 1, name: /idei despre bani/i });
    const links = screen.getAllByRole('link', {
      name: /Cât este suficient|Cea mai grea lecție|AUTORITATE|educația copiilor|guvernanța familială/,
    });
    expect(links.length).toBeGreaterThanOrEqual(5);
    for (const link of links) expect(link.getAttribute('href')).toMatch(/^\/blog\/.+/);
  });

  it('post pages show the article template; unknown slugs 404', async () => {
    const { unmount } = renderApp('/blog/cea-mai-grea-lectie-pe-care-o-inveti-dupa-ce-ai-succes');
    expect(
      await screen.findByRole('heading', { level: 1, name: /cea mai grea lecție/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/va fi publicat în curând/i)).toBeInTheDocument();
    unmount();
    renderApp('/blog/nu-exista');
    expect(
      await screen.findByRole('heading', { level: 1, name: /pagina nu a fost găsită/i }),
    ).toBeInTheDocument();
  });
});
