import { useCallback } from 'react';

/**
 * Spread the result onto an element. It sets --mx/--my (cursor position, for spotlight glows)
 * and, when `tilt` > 0, --rx/--ry (degrees, for a 3D tilt) as CSS variables.
 */
export default function usePointerFx({ tilt = 0 } = {}) {
  const onPointerMove = useCallback(
    (e) => {
      if (e.pointerType === 'touch') return;
      const el = e.currentTarget;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.setProperty('--mx', `${x}px`);
      el.style.setProperty('--my', `${y}px`);
      if (tilt) {
        el.style.setProperty('--rx', `${(y / rect.height - 0.5) * -tilt}deg`);
        el.style.setProperty('--ry', `${(x / rect.width - 0.5) * tilt}deg`);
      }
    },
    [tilt],
  );

  const onPointerLeave = useCallback((e) => {
    e.currentTarget.style.setProperty('--rx', '0deg');
    e.currentTarget.style.setProperty('--ry', '0deg');
  }, []);

  return { onPointerMove, onPointerLeave };
}
