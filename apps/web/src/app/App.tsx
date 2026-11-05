import { LOCALES } from '@raluca/shared';
import { lazy, type ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
import { ConsentProvider } from '../features/consent/ConsentProvider';
import { routePattern, STATIC_ROUTE_KEYS, type StaticRouteKey } from '../i18n/routes';
import { LocaleLayout } from './LocaleLayout';

// Route-level code splitting: each page is its own chunk.
function page<K extends string>(load: () => Promise<Record<K, ComponentType>>, name: K) {
  return lazy(() => load().then((m) => ({ default: m[name] })));
}

const Home = page(() => import('../pages/Home'), 'Home');
const ProgramsPage = page(() => import('../pages/ProgramsPage'), 'ProgramsPage');
const ProgramDetailPage = page(() => import('../pages/ProgramDetailPage'), 'ProgramDetailPage');
const PostPage = page(() => import('../pages/PostPage'), 'PostPage');
const NotFoundPage = page(() => import('../pages/NotFoundPage'), 'NotFoundPage');
const Styleguide = import.meta.env.DEV
  ? page(() => import('../pages/Styleguide'), 'Styleguide')
  : null;
const AboutPage = page(() => import('../pages/AboutPage'), 'AboutPage');
const ContactPage = page(() => import('../pages/ContactPage'), 'ContactPage');
const LegalPage = lazy(() => import('../pages/LegalPage').then((m) => ({ default: m.LegalPage })));
const BlogPage = page(() => import('../pages/BlogPage'), 'BlogPage');

function staticElement(key: StaticRouteKey) {
  switch (key) {
    case 'home':
      return <Home />;
    case 'programs':
      return <ProgramsPage />;
    case 'about':
      return <AboutPage />;
    case 'contact':
      return <ContactPage />;
    case 'privacy':
    case 'cookies':
      return <LegalPage document={key} />;
    default:
      return <BlogPage />;
  }
}

export function App() {
  return (
    <ConsentProvider>
      <Routes>
        {LOCALES.map((locale) => (
          <Route key={locale} element={<LocaleLayout locale={locale} />}>
            {STATIC_ROUTE_KEYS.map((key) => (
              <Route key={key} path={routePattern(locale, key)} element={staticElement(key)} />
            ))}
            <Route path={routePattern(locale, 'program')} element={<ProgramDetailPage />} />
            <Route path={routePattern(locale, 'post')} element={<PostPage />} />
          </Route>
        ))}
        <Route element={<LocaleLayout />}>
          {Styleguide && <Route path="/styleguide" element={<Styleguide />} />}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ConsentProvider>
  );
}
