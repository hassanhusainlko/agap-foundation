import Reveal from './Reveal.jsx';
import './Section.css';

/**
 * Shared section shell. `tone` picks the background: 'light' | 'mist' | 'dark'.
 * `intro` fills the right half of the heading row so it never sits half-empty.
 * Page-level spacing and the heading reveal live here so sections never fight over padding.
 */
export default function Section({ id, tone = 'light', title, subtitle, intro, children }) {
  return (
    <section id={id} className={`section section--${tone}`} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        {title && (
          <header className={`section__head ${intro ? 'section__head--split' : ''}`}>
            <Reveal>
              <h2 id={`${id}-title`}>{title}</h2>
              {subtitle && <p className="section__sub">{subtitle}</p>}
            </Reveal>
            {intro && <Reveal as="p" variant="right" delay={150} className="section__intro">{intro}</Reveal>}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
