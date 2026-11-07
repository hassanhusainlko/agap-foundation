import { Fragment } from 'react';

/** Splits text into words that slide up from behind a mask (styles in Hero.css `.word`). */
export default function WordReveal({ as: Tag = 'span', text, className = '', startDelay = 0, step = 80 }) {
  return (
    <Tag className={className} aria-label={text}>
      {text.split(' ').map((word, i) => (
        <Fragment key={i}>
          <span className="word" aria-hidden="true">
            <span className="word__inner" style={{ '--d': `${startDelay + i * step}ms`, '--w': `${i * 350}ms` }}>
              {word}
            </span>
          </span>{' '}
        </Fragment>
      ))}
    </Tag>
  );
}
