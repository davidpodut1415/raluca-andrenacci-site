import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../../components/ui/Button';
import { CloseIcon } from '../../components/ui/icons';
import { useConsent } from './ConsentProvider';

interface ToggleProps {
  id: string;
  title: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
}

function Toggle({ id, title, text, checked, disabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-start gap-4 py-4">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.checked)}
        aria-describedby={`${id}-text`}
        className="mt-1 size-5 shrink-0 accent-burgundy-700"
      />
      <div>
        <label htmlFor={id} className="font-semibold text-ink-900">
          {title}
        </label>
        <p id={`${id}-text`} className="text-small text-ink-500">
          {text}
        </p>
      </div>
    </div>
  );
}

/** Native <dialog>: focus trapping, Escape and backdrop come from the platform. */
export function PreferencesDialog() {
  const { t } = useTranslation('consent');
  const { consent, preferencesOpen, closePreferences, save, rejectAll } = useConsent();
  const ref = useRef<HTMLDialogElement>(null);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (preferencesOpen && !dialog.open) {
      setAnalytics(consent?.analytics ?? false);
      setMarketing(consent?.marketing ?? false);
      if (typeof dialog.showModal === 'function') dialog.showModal();
      else dialog.setAttribute('open', '');
    } else if (!preferencesOpen && dialog.open) {
      if (typeof dialog.close === 'function') dialog.close();
      else dialog.removeAttribute('open');
    }
  }, [preferencesOpen, consent]);

  return (
    // Backdrop click is a pointer convenience; keyboard users close with Escape or the close button.
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <dialog
      ref={ref}
      aria-labelledby="consent-dialog-title"
      onClose={closePreferences}
      onClick={(e) => {
        if (e.target === ref.current) closePreferences();
      }}
      className="m-auto w-[calc(100%-1.5rem)] max-w-lg rounded-xl bg-white p-0 text-ink-700 shadow-card backdrop:bg-black/60"
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="consent-dialog-title" className="text-h3">
            {t('dialogTitle')}
          </h2>
          <button
            type="button"
            onClick={closePreferences}
            aria-label={t('close')}
            className="-m-2 rounded-md p-2 text-ink-900 hover:bg-grey-100"
          >
            <CloseIcon />
          </button>
        </div>
        <p className="mt-2 text-small text-ink-500">{t('dialogIntro')}</p>
        <div className="mt-4">
          <Toggle
            id="consent-necessary"
            title={t('necessaryTitle')}
            text={t('necessaryText')}
            checked
            disabled
          />
          <Toggle
            id="consent-analytics"
            title={t('analyticsTitle')}
            text={t('analyticsText')}
            checked={analytics}
            onChange={setAnalytics}
          />
          <Toggle
            id="consent-marketing"
            title={t('marketingTitle')}
            text={t('marketingText')}
            checked={marketing}
            onChange={setMarketing}
          />
        </div>
        <div className="mt-4 flex flex-wrap justify-end gap-3">
          <Button onClick={rejectAll}>{t('rejectAll')}</Button>
          <Button onClick={() => save({ analytics, marketing })}>{t('save')}</Button>
        </div>
      </div>
    </dialog>
  );
}
