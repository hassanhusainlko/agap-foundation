import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { hero } from '../data/siteContent.js';
import NetworkField from './NetworkField.jsx';
import OrbitVisual from './OrbitVisual.jsx';
import StatsBar from './StatsBar.jsx';
import WordReveal from './WordReveal.jsx';
import { ArrowRight } from './icons.jsx';
import './Hero.css';

export default function Hero() {
  const ref = useRef(null);
  // Parallax as the hero scrolls away: copy drifts up and fades, the orbit lags behind.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__aurora" aria-hidden="true"><span /><span /><span /></div>
      <NetworkField className="hero__canvas" />

      <div className="wrap hero__grid">
        <motion.div className="hero__content" style={{ y: contentY, opacity: contentOpacity }}>
          <p className="hero__tagline"><span className="hero__dot" aria-hidden="true" />{hero.tagline}</p>
          <WordReveal as="h1" className="hero__headline" text={hero.headline} startDelay={900} />
          <p className="hero__body">{hero.body}</p>
          <div className="hero__actions">
            <motion.a className="btn btn--primary" href={hero.primaryCta.href} whileTap={{ scale: 0.96 }}>
              {hero.primaryCta.label}<ArrowRight />
            </motion.a>
            <motion.a className="btn btn--ghost" href={hero.secondaryCta.href} whileTap={{ scale: 0.96 }}>
              {hero.secondaryCta.label}
            </motion.a>
          </div>
        </motion.div>
        <motion.div className="hero__visual" style={{ y: orbitY, rotate: orbitRotate }}>
          <OrbitVisual />
        </motion.div>
      </div>

      <StatsBar />
    </section>
  );
}
