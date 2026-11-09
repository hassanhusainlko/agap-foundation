import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { hero } from '../data/siteContent.js';
import NetworkField from './NetworkField.jsx';
import OrbitVisual from './OrbitVisual.jsx';
import StatsBar from './StatsBar.jsx';
import WordReveal from './WordReveal.jsx';
import { ArrowRight } from './icons.jsx';
import './Hero.css';

// Background slideshow for the hero. Drop new files in /public/crousel and list them here.
const HERO_SLIDES = [
  '/crousel/beautiful-landscape.jpg',
  '/crousel/ao-phra-nang-beach-krabi-thailand.jpg',
  '/crousel/japanese-torii-gate-lake-biwa-japan-generative-ai.jpg',
  '/crousel/dubai-burj-khalifa-skyline-tallest-building-world-top-view-downtown.jpg',
  '/crousel/beautiful-architecture-building-lotte-tower.jpg',
  '/crousel/district-reflection-bay-commercial-financial.jpg',
  '/crousel/bridge-travel-architecture-absolute-pavilion.jpg',
  '/crousel/lighthouse-beautiful-beach-landscape-sri-lanka (1).jpg',
  '/crousel/asokan-pillar-kutagarasala-vihara-vaishali-bihar-india.jpg',
];
const SLIDE_INTERVAL = 6500;

export default function Hero() {
  const ref = useRef(null);
  const [slide, setSlide] = useState(0);

  // Crossfade through the slides. Reduced-motion users keep the first image still.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setInterval(
      () => setSlide((current) => (current + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, []);

  // Warm the cache so the next frames appear instantly.
  useEffect(() => {
    HERO_SLIDES.forEach((src) => {
      const image = new Image();
      image.src = encodeURI(src);
    });
  }, []);
  // Parallax as the hero scrolls away: copy drifts up and fades, the orbit lags behind.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__slides" aria-hidden="true">
        {HERO_SLIDES.map((src, index) => (
          <img
            key={src}
            className={`hero__slide${index === slide ? ' is-active' : ''}`}
            src={encodeURI(src)}
            alt=""
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
          />
        ))}
      </div>
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__dots" role="group" aria-label="Choose hero background">
        {HERO_SLIDES.map((src, index) => (
          <button
            key={src}
            type="button"
            className={`hero__dot-btn${index === slide ? ' is-active' : ''}`}
            aria-label={`Show background image ${index + 1}`}
            aria-pressed={index === slide}
            onClick={() => setSlide(index)}
          />
        ))}
      </div>
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
