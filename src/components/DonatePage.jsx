import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { connect, donation } from '../data/siteContent.js';
import Reveal from './Reveal.jsx';
import EmailChooser from './EmailChooser.jsx';
import { ArrowRight, Mail } from './icons.jsx';
import { EASE } from './motion.js';
import './DonatePage.css';

const CHECK = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m5 12 5 5L20 7" />
  </svg>
);

const EMAIL_BODY = [
  'Dear AGAP Foundation,',
  '',
  'I would like to support the work of the AGAP Foundation. Please let me know how I can contribute.',
  '',
  'Thank you.',
].join('\n');

/** Legacy fallback for browsers that block the async Clipboard API. */
function legacyCopy(value) {
  const field = document.createElement('textarea');
  field.value = value;
  field.setAttribute('readonly', '');
  field.style.position = 'fixed';
  field.style.opacity = '0';
  document.body.appendChild(field);
  field.select();
  const ok = document.execCommand('copy');
  document.body.removeChild(field);
  return ok;
}

function CopyButton({ value, label }) {
  const [status, setStatus] = useState('idle');
  const timer = useRef(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = useCallback(async () => {
    let ok = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(value);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      try { ok = legacyCopy(value); } catch { ok = false; }
    }
    setStatus(ok ? 'copied' : 'failed');
    if (ok) {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setStatus('idle'), 1800);
    }
  }, [value]);

  return (
    <button
      type="button"
      className="donate__copy"
      data-copied={status === 'copied'}
      data-failed={status === 'failed'}
      onClick={copy}
      aria-label={`Copy ${label}`}
    >
      {status === 'copied' ? 'Copied' : status === 'failed' ? 'Copy failed' : 'Copy'}
      <span className="sr-only" role="status">
        {status === 'copied' ? `${label} copied` : status === 'failed' ? `Could not copy ${label}` : ''}
      </span>
    </button>
  );
}

export default function DonatePage() {
  const email = connect.emails[0];
  const [chooserOpen, setChooserOpen] = useState(false);

  return (
    <div className="donate" id="donate">
      <section className="donate__hero" aria-labelledby="donate-title">
        <div className="wrap donate__hero-inner">
          <motion.p
            className="donate__eyebrow"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease: EASE }}
          >
            {donation.eyebrow}
          </motion.p>
          <motion.h1
            id="donate-title"
            className="donate__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          >
            {donation.title}
          </motion.h1>
          <motion.p
            className="donate__intro"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: EASE }}
          >
            {donation.intro}
          </motion.p>
        </div>
      </section>

      <section className="donate__main">
        <div className="wrap donate__grid">
          <Reveal className="donate__card">
            <header className="donate__card-head">
              <h2>Bank transfer details</h2>
              <p>Use these details for NEFT, RTGS or IMPS transfers from any bank.</p>
            </header>

            <dl className="donate__fields">
              {donation.fields.map((field) => (
                <div className="donate__field" key={field.label}>
                  <dt>{field.label}</dt>
                  <dd>
                    <span className="donate__value">{field.value}</span>
                    <CopyButton value={field.value} label={field.label} />
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className="donate__aside" delay={120}>
            <h2>Where your support goes</h2>
            <ul className="donate__support">
              {donation.support.map((item) => (
                <li key={item}>{CHECK}<span>{item}</span></li>
              ))}
            </ul>

            <div className="donate__note">
              <Mail />
              <p>
                {donation.note}{' '}
                <a href={`mailto:${email}`}>{email}</a>
              </p>
            </div>

            <button
              type="button"
              className="btn btn--primary donate__contact"
              onClick={() => setChooserOpen(true)}
            >
              Write to us<ArrowRight />
            </button>

            <EmailChooser
              open={chooserOpen}
              onClose={() => setChooserOpen(false)}
              to={email}
              subject="Supporting the AGAP Foundation"
              body={EMAIL_BODY}
              title="How would you like to write to us?"
              description={`Pick your email service and we will open a pre-filled message addressed to ${email}.`}
            />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
