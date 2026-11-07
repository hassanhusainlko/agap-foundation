import { useState } from 'react';
import { VIEWPORT, motionTag, revealVariants } from './motion.js';

/**
 * Animates its content in when scrolled into view (Framer Motion). variant: up | left | right | scale.
 * Also adds `is-visible` once shown, so CSS-only details (heading underline, timeline rail) can follow.
 */
export default function Reveal({ as = 'div', variant = 'up', delay = 0, className = '', children, ...rest }) {
  const [shown, setShown] = useState(false);
  const Tag = motionTag(as);
  return (
    <Tag
      className={`${shown ? 'is-visible' : ''} ${className}`.trim()}
      variants={revealVariants(variant, delay / 1000)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      onViewportEnter={() => setShown(true)}
      {...rest}
    >
      {children}
    </Tag>
  );
}
