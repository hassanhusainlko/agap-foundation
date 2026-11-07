import { useEffect, useState } from 'react';
import useInView from './useInView.js';

/** Animates a number from `from` to `target` once it scrolls into view. Returns [ref, value]. */
export default function useCountUp(target, { from = 0, duration = 1800 } = {}) {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [value, setValue] = useState(from);

  useEffect(() => {
    if (!inView) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return undefined;
    }
    let raf;
    let start;
    const tick = (now) => {
      start ??= now;
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(from + (target - from) * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, from, duration]);

  return [ref, value];
}
