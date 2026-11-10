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
    const hrefs = within(main)
      .getAllByRole('link')
      .map((l) => l.getAttribute('href'));
    for (const slug of [
      'co-leadership-fondator-nextgen',
      'mentorat-succesori-nextgen',
      'integrarea-succesorului',
      'entrepreneur-in-residence',
      'guvernanta-family-office-board',
    ]) {
      expect(hrefs).toContain(`/programe/${slug}`);
    }
    // The individual Audit program is not promoted on the landing page (it lives on the Programs page).
    expect(hrefs.some((h) => h?.includes('auditul-prezentului-tau'))).toBe(false);
  });

  it('has no video or slideshow: the page is a grid of tiles', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    expect(document.querySelector('video')).toBeNull();
    expect(document.querySelector('.hero-slide')).toBeNull();
    expect(within(screen.getByRole('main')).getAllByRole('article').length).toBeGreaterThan(8);
  });

  it('shows the key figures on the landing page, with the first one oversized', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByText('EMCC')).toBeInTheDocument();
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
    expect(bar.querySelector('.marquee-track')).not.toBeNull();
  });

  it('shows the testimonials as black quote tiles', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const quotes = screen.getAllByRole('blockquote');
    expect(quotes).toHaveLength(3);
    expect(quotes[0]).toHaveTextContent(/ca succesor/);
  });
});

describe('press tiles', () => {
  it('open verified press items externally; the rest go to the blog', async () => {
    renderApp('/');
    await screen.findByRole('heading', { level: 1 });
    const main = screen.getByRole('main');
    const external = within(main)
      .getAllByRole('link')
      .filter((l) => l.getAttribute('href')?.startsWith('https://www.forbes.ro/'));
    expect(external).toHaveLength(3);
    for (const link of external) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    }
  });
});

describe('programs', () => {
  it('lists every program as a large photo card', async () => {
    renderApp('/programe');
    await screen.findByRole('heading', { level: 1, name: /programe de mentorat/i });
    // five family programs + the individual Audit track, each as one "Part" block
    expect(screen.getAllByRole('article')).toHaveLength(6);
    // each card links to its program page
    expect(
      within(screen.getByRole('main'))
        .getAllByRole('link')
        .map((l) => l.getAttribute('href')),
    ).toContain('/programe/co-leadership-fondator-nextgen');
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
    expect(screen.getAllByRole('blockquote')).toHaveLength(3);
  });
});

describe('about, contact and legal', () => {
  it('about shows the bio, certifications and certificate image', async () => {
    renderApp('/despre-mine');
    await screen.findByRole('heading', { level: 1, name: 'Mentor, coach și antreprenor' });
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

describe('footer and sidebar', () => {
  it('footer has legal links and cookie settings; the sidebar has social links and languages', async () => {
    renderApp('/en');
    await screen.findByRole('heading', { level: 1 });
    const footer = screen.getByRole('contentinfo');
    expect(within(footer).getByRole('link', { name: 'Privacy policy' })).toHaveAttribute(
      'href',
      '/en/privacy',
    );
    expect(within(footer).getByRole('button', { name: 'Cookie settings' })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Main navigation' });
    expect(within(nav).getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
    expect(within(nav).getByRole('group', { name: 'Language' })).toBeInTheDocument();
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
    await screen.findByRole('heading', { level: 1, name: 'Mentor, coach și antreprenor' });
    expect(screen.getByText('Despre Raluca Andrenacci')).toBeInTheDocument();
    expect(screen.getByText('20+')).toBeInTheDocument();
    expect(screen.getByRole('blockquote')).toHaveTextContent(/frustrarea în progres/);
  });

  it('program pages show numbered directions and step cards', async () => {
    renderApp('/programe/mentorat-succesori-nextgen');
    await screen.findByRole('heading', { level: 1 });
    expect(screen.getAllByRole('listitem').some((li) => li.textContent?.startsWith('01'))).toBe(
      true,
    );
    expect(screen.getByText(/Plan personalizat pentru următoarele 90 de zile/)).toBeInTheDocument();
  });

  it('blog index lists the imported articles that link to post pages', async () => {
    renderApp('/blog');
    await screen.findByRole('heading', { level: 1, name: /idei care contează/i });
    const links = screen.getAllByRole('link', {
      name: /Cât este suficient|Cea mai grea lecție|Interviu SMARK/,
    });
    expect(links.length).toBeGreaterThanOrEqual(3);
    for (const link of links) expect(link.getAttribute('href')).toMatch(/^\/blog\/.+/);
  });

  it('blog topic pills filter the grid', async () => {
    renderApp('/blog');
    await screen.findByRole('heading', { level: 1, name: /idei care contează/i });
    const group = screen.getByRole('group', { name: 'Subiecte' });
    expect(within(group).getByRole('button', { name: 'Toate subiectele' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    const grid = screen.getAllByRole('list').find((l) => l.className.includes('lg:grid-cols-3'))!;
    expect(within(grid).getAllByRole('article')).toHaveLength(13);
    await userEvent.click(within(group).getByRole('button', { name: 'Leadership' }));
    expect(within(grid).getAllByRole('article')).toHaveLength(4);
    expect(within(group).getByRole('button', { name: 'Leadership' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
  });

  it('post pages show the full imported article text; unknown slugs 404', async () => {
    const { unmount } = renderApp('/blog/cea-mai-grea-lectie-pe-care-o-inveti-dupa-ce-ai-succes');
    expect(
      await screen.findByRole('heading', { level: 1, name: /cea mai grea lecție/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/Toată lumea vorbește despre cum să reușești/)).toBeInTheDocument();
    expect(screen.getAllByRole('article').length).toBe(3); // related articles
    unmount();
    renderApp('/blog/nu-exista');
    expect(
      await screen.findByRole('heading', { level: 1, name: /nu am găsit ce căutai/i }),
    ).toBeInTheDocument();
  });
});
