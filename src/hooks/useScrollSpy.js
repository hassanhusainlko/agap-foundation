import { useEffect, useState } from 'react';

/** Returns the id of the section currently crossing the middle of the viewport. */
export default function useScrollSpy(ids, enabled = true) {
  const [activeId, setActiveId] = useState(ids[0]);

  useEffect(() => {
    // Sections unmount on the donation page; re-observe them when they return.
    if (!enabled) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids, enabled]);

  return activeId;
}
