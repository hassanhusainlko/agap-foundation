import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, Close, Mail } from './icons.jsx';
import './EmailChooser.css';

const enc = encodeURIComponent;

/** Build one compose URL per provider from the same prefilled draft. */
function providerHref(provider, { to, subject, body }) {
  const t = enc(to);
  const s = enc(subject);
  const b = enc(body);
  switch (provider) {
    case 'gmail':
      return `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${t}&su=${s}&body=${b}`;
    case 'outlook':
      return `https://outlook.live.com/mail/0/deeplink/compose?to=${t}&subject=${s}&body=${b}`;
    case 'microsoft365':
      return `https://outlook.office.com/mail/deeplink/compose?to=${t}&subject=${s}&body=${b}`;
    case 'yahoo':
      return `https://compose.mail.yahoo.com/?to=${t}&subject=${s}&body=${b}`;
    default:
      return `mailto:${to}?subject=${s}&body=${b}`;
  }
}

// Order shown in the dialog. `monogram` gives each service a recognisable initial
// without pulling in third-party brand colours.
const PROVIDERS = [
  { id: 'gmail', name: 'Gmail', hint: 'Compose in Gmail · opens a new tab', monogram: 'G', external: true },
  { id: 'outlook', name: 'Outlook.com', hint: 'Personal Outlook mailbox · new tab', monogram: 'O', external: true },
  { id: 'microsoft365', name: 'Microsoft 365', hint: 'Work or school account · new tab', monogram: 'M', external: true },
  { id: 'yahoo', name: 'Yahoo Mail', hint: 'Compose in Yahoo Mail · opens a new tab', monogram: 'Y', external: true },
  { id: 'default', name: 'Default email app', hint: "Uses your device's mail app", monogram: null, external: false },
];

function ChooserDialog({ to, subject, body, title, description, onClose, onSelect }) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);
  const firstRef = useRef(null);

  // Lock the page behind the dialog, compensating for the disappeared scrollbar.
  useEffect(() => {
    const root = document.documentElement;
    const previous = document.activeElement;
    const scrollbarWidth = window.innerWidth - root.clientWidth;
    root.style.setProperty('--scrollbar-w', `${scrollbarWidth}px`);
    root.classList.add('chooser-open');

    const frame = window.requestAnimationFrame(() => firstRef.current?.focus({ preventScroll: true }));

    return () => {
      window.cancelAnimationFrame(frame);
      root.classList.remove('chooser-open');
      root.style.removeProperty('--scrollbar-w');
      if (previous instanceof HTMLElement) previous.focus({ preventScroll: true });
    };
  }, []);

  // Escape closes; Tab stays inside the dialog.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll('a[href], button:not([disabled])'),
      ).filter((el) => el.offsetParent !== null);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const choose = (provider) => {
    onSelect?.(provider.name);
    onClose();
  };

  return (
    <div className="chooser">
      <div className="chooser__backdrop" onClick={onClose} aria-hidden="true" />
      <div
        className="chooser__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        ref={dialogRef}
      >
        <button type="button" className="chooser__close" onClick={onClose} aria-label="Close email options">
          <Close />
        </button>

        <header className="chooser__head">
          <p className="chooser__eyebrow">
            <Mail />
            Choose how to send
          </p>
          <h2 id={titleId} className="chooser__title">{title}</h2>
          <p id={descId} className="chooser__desc">{description}</p>
        </header>

        <ul className="chooser__options">
          {PROVIDERS.map((provider, index) => (
            <li key={provider.id}>
              <a
                className="chooser__option"
                href={providerHref(provider.id, { to, subject, body })}
                target={provider.external ? '_blank' : undefined}
                rel={provider.external ? 'noopener noreferrer' : undefined}
                onClick={() => choose(provider)}
                ref={index === 0 ? firstRef : null}
              >
                <span className="chooser__icon" aria-hidden="true">
                  {provider.monogram ?? <Mail />}
                </span>
                <span className="chooser__text">
                  <strong className="chooser__name">{provider.name}</strong>
                  <small className="chooser__hint">{provider.hint}</small>
                </span>
                <span className="chooser__go" aria-hidden="true"><ArrowRight /></span>
              </a>
            </li>
          ))}
        </ul>

        <p className="chooser__note">
          Your message is pre-filled and addressed to <strong>{to}</strong>.
        </p>
      </div>
    </div>
  );
}

/**
 * Accessible "which email service?" picker. Portal-rendered so a transformed or
 * overflow-hidden parent cannot clip it.
 */
export default function EmailChooser({ open, onClose, onSelect, to, subject, body, title, description }) {
  if (!open) return null;
  return createPortal(
    <ChooserDialog
      to={to}
      subject={subject}
      body={body}
      title={title}
      description={description}
      onClose={onClose}
      onSelect={onSelect}
    />,
    document.body,
  );
}
