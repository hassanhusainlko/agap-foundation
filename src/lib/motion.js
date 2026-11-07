// Shared motion language for Framer Motion.
// One easing curve and a few variants keep every reveal feeling related.
export const EASE_OUT = [0.22, 1, 0.36, 1];

// Trigger scroll reveals a little before the element is fully in view.
export const viewportOnce = { once: true, amount: 0.2 };

export const springSoft = { type: 'spring', stiffness: 220, damping: 26 };
export const springSnappy = { type: 'spring', stiffness: 340, damping: 28 };

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT } },
};

/** Parent variants: children reveal one after another. */
export const stagger = (delayChildren = 0, staggerChildren = 0.08) => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Child variants used with `stagger()`. */
export const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE_OUT } },
};
