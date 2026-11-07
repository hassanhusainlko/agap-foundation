import { useCallback, useEffect, useState } from 'react';
import { MotionConfig, useReducedMotion } from 'framer-motion';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import Marquee from './components/Marquee.jsx';
import About from './components/About.jsx';
import Pillars from './components/Pillars.jsx';
import Approach from './components/Approach.jsx';
import Leadership from './components/Leadership.jsx';
import Connect from './components/Connect.jsx';
import Footer from './components/Footer.jsx';
import DonatePage from './components/DonatePage.jsx';
import IntroSplash from './components/IntroSplash.jsx';

const DONATE_ROUTE = '#/donate';

/** Tiny hash router: `#/donate` is the donation page, every other hash is a home-page section. */
function readRoute() {
  return window.location.hash.startsWith(DONATE_ROUTE) ? 'donate' : 'home';
}

export default function App() {
  const prefersReduced = useReducedMotion();
  const [introDone, setIntroDone] = useState(() => Boolean(prefersReduced));
  const [route, setRoute] = useState(readRoute);
  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  useEffect(() => {
    const onHashChange = () => setRoute(readRoute());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // The donate page opens at the top. Returning home scrolls to the section in the URL,
  // which the browser could not do natively because those sections were not mounted yet.
  useEffect(() => {
    if (route === 'donate') {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return undefined;
    }
    const id = window.location.hash.slice(1);
    if (!id || id.startsWith('/')) return undefined;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: 'start' });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [route]);

  return (
    // reducedMotion="user": Framer drops transform animations when the OS asks for reduced motion.
    <MotionConfig reducedMotion="user">
      <div
        className="site"
        aria-hidden={introDone ? undefined : true}
        {...(introDone ? {} : { inert: '' })}
      >
        <a className="skip-link" href={route === 'donate' ? '#donate' : '#about'}>Skip to content</a>
        <Header route={route} />
        <main>
          {route === 'donate' ? (
            <DonatePage />
          ) : (
            <>
              <Hero />
              <Marquee />
              <About />
              <Pillars />
              <Approach />
              <Leadership />
              <Connect />
            </>
          )}
        </main>
        <Footer />
      </div>

      {!introDone && <IntroSplash onDone={handleIntroDone} />}
    </MotionConfig>
  );
}
