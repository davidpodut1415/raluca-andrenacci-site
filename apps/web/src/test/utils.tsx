import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { App } from '../app/App';
import i18n from '../i18n';

/** Renders the whole app at a URL. Resets the language so tests do not leak into each other. */
export function renderApp(path = '/') {
  void i18n.changeLanguage('ro');
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );
}

export function resetBrowserState() {
  window.localStorage.clear();
  delete window.dataLayer;
  document.getElementById('gtm-script')?.remove();
}
