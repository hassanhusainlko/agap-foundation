import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion';
import { donation, navLinks, site } from '../data/siteContent.js';
import useScrollSpy from '../hooks/useScrollSpy.js';
import { Menu, Close } from './icons.jsx';
import { EASE } from './motion.js';
import './Header.css';

const SECTION_IDS = navLinks.map((link) => link.id);
// The donation CTA is not a nav link, but it still needs an active state while its section is on screen.
const SPY_IDS = [...SECTION_IDS, donation.cta.href.slice(1)];
const MOBILE_QUERY = '(max-width: 1120px)';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

function NavLinks({ activeId, onNavigate, animated }) {
  return (
    <ul>
      {navLinks.map((link, i) => (
        <motion.li
          key={link.id}
          style={{ '--i': i }}
          initial={animated ? { opacity: 0, x: -24 } : false}
          animate={animated ? { opacity: 1, x: 0, transition: { delay: 0.05 * i, duration: 0.4, ease: EASE } } : undefined}
        >
          <a
            href={`#${link.id}`}
            className="nav__link"
            aria-current={activeId === link.id ? 'location' : undefined}
            onClick={() => onNavigate(link.id)}
          >
            {activeId === link.id && (
              <motion.span className="nav__pill" layoutId="nav-pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
            )}
            <span className="nav__label">{link.label}</span>
          </a>
        </motion.li>
      ))}
    </ul>
  );
}

function HeaderCta({ onNavigate, current }) {
  return (
    <motion.a
      className="header__cta"
      href={donation.cta.href}
      aria-current={current ? 'page' : undefined}
      onClick={onNavigate}
      whileTap={{ scale: 0.96 }}
    >
      {donation.cta.label}
    </motion.a>
  );
}

export default function Header() {
  const observedId = useScrollSpy(SPY_IDS);
  const isMobile = useMediaQuery(MOBILE_QUERY);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Highlight a clicked section immediately instead of waiting for the smooth scroll to finish.
  const [pendingId, setPendingId] = useState(null);
  const activeId = pendingId ?? observedId;

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => { if (!isMobile) setMenuOpen(false); }, [isMobile]);

  // Once the target section is actually active, hand control back to the scroll spy.
  useEffect(() => {
    if (!pendingId) return undefined;
    if (observedId === pendingId) {
      setPendingId(null);
      return undefined;
    }
    // A manual scroll cancels the wait immediately; the timer covers interrupted/blocked scrolls.
    const cancel = () => setPendingId(null);
    window.addEventListener('wheel', cancel, { passive: true, once: true });
    window.addEventListener('touchstart', cancel, { passive: true, once: true });
    const timer = window.setTimeout(cancel, 2500);
    return () => {
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
      window.clearTimeout(timer);
    };
  }, [pendingId, observedId]);

  const navigate = useCallback((id) => {
    setPendingId(id);
    setMenuOpen(false);
  }, []);

  return (
    <header className="header" data-scrolled={scrolled}>
      <div className="wrap header__inner">
        <a className="brand" href="#home" aria-label={`${site.shortName}, back to top`}>
          <img className="brand__logo" src="/logo-blue.png" alt="" width="520" height="315" />
        </a>

        {isMobile ? (
          <>
            <motion.button
              type="button"
              className="header__toggle"
              aria-expanded={menuOpen}
              aria-controls="primary-nav"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((open) => !open)}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={menuOpen ? 'close' : 'open'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'grid' }}
                >
                  {menuOpen ? <Close /> : <Menu />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
            <AnimatePresence>
              {menuOpen && (
                <motion.nav
                  id="primary-nav"
                  className="nav nav--mobile"
                  aria-label="Primary"
                  initial={{ clipPath: 'inset(0 0 100% 0)' }}
                  animate={{ clipPath: 'inset(0 0 0% 0)', transition: { duration: 0.45, ease: EASE } }}
                  exit={{ clipPath: 'inset(0 0 100% 0)', transition: { duration: 0.3, ease: EASE } }}
                >
                  <NavLinks activeId={activeId} onNavigate={navigate} animated />
                  <HeaderCta onNavigate={() => navigate('donate')} current={activeId === 'donate'} />
                </motion.nav>
              )}
            </AnimatePresence>
          </>
        ) : (
          <div className="header__nav">
            <nav id="primary-nav" className="nav" aria-label="Primary">
              <NavLinks activeId={activeId} onNavigate={navigate} />
            </nav>
            <HeaderCta onNavigate={() => navigate('donate')} current={activeId === 'donate'} />
          </div>
        )}
      </div>
      <motion.span className="header__progress" style={{ scaleX: progress }} aria-hidden="true" />
    </header>
  );
}
