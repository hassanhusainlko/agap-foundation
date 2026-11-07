import { motion } from 'framer-motion';

/** Shared Framer Motion tokens so every section moves with the same rhythm. */
export const EASE = [0.2, 0.8, 0.2, 1];
export const VIEWPORT = { once: true, amount: 0.2 };

const offsets = {
  up: { y: 40 },
  left: { x: -48 },
  right: { x: 48 },
  scale: { scale: 0.92 },
};

export const revealVariants = (variant = 'up', delay = 0) => ({
  hidden: { opacity: 0, ...offsets[variant] },
  visible: { opacity: 1, x: 0, y: 0, scale: 1, transition: { duration: 0.9, ease: EASE, delay } },
});

/** Parent that staggers its children; children use `item`. */
export const stagger = (gap = 0.08, delayChildren = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: gap, delayChildren } },
});

export const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// motion.create must not run during render, so cache one component per tag.
const cache = new Map();
export function motionTag(tag) {
  if (!cache.has(tag)) cache.set(tag, motion.create(tag));
  return cache.get(tag);
}
