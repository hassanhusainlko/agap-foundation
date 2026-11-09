import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { hero } from '../data/siteContent.js';
import NetworkField from './NetworkField.jsx';
import OrbitVisual from './OrbitVisual.jsx';
import StatsBar from './StatsBar.jsx';
import WordReveal from './WordReveal.jsx';
import { ArrowRight } from './icons.jsx';
import './Hero.css';

// Background slideshow for the hero. Optimised WebP versions live in /public/crousel/hero.
const HERO_SLIDES = [
  '/crousel/hero/beautiful-landscape.webp',
  '/crousel/hero/ao-phra-nang-beach-krabi-thailand.webp',
  '/crousel/hero/japanese-torii-gate-lake-biwa-japan-generative-ai.webp',
  '/crousel/hero/dubai-burj-khalifa-skyline-tallest-building-world-top-view-downtown.webp',
  '/crousel/hero/beautiful-architecture-building-lotte-tower.webp',
  '/crousel/hero/district-reflection-bay-commercial-financial.webp',
  '/crousel/hero/bridge-travel-architecture-absolute-pavilion.webp',
  '/crousel/hero/lighthouse-beautiful-beach-landscape-sri-lanka (1).webp',
  '/crousel/hero/asokan-pillar-kutagarasala-vihara-vaishali-bihar-india.webp',
];
const SLIDE_INTERVAL = 6500;

export default function Hero() {
  const ref = useRef(null);
  const [slide, setSlide] = useState(0);
  // Only the first image is requested up front. Others get a src just before their turn.
  const [loaded, setLoaded] = useState(() => new Set([0]));
  const [heroVisible, setHeroVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);

  const loadSlide = (index) => {
    setLoaded((current) => {
      if (current.has(index)) return current;
      const next = new Set(current);
      next.add(index);
      return next;
    });
  };

  const showSlide = (index) => {
    loadSlide(index);
    setSlide(index);
  };

  // Stop the slideshow while the hero is off-screen or the tab is in the background.
  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, []);

  // Crossfade through the slides. Reduced-motion users keep the first image still.
  useEffect(() => {
    if (!heroVisible || !pageVisible) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = window.setTimeout(
      () => setSlide((current) => (current + 1) % HERO_SLIDES.length),
      SLIDE_INTERVAL,
    );
    return () => window.clearTimeout(id);
  }, [slide, heroVisible, pageVisible]);

  // Prefetch only the upcoming image, once the current one has settled on screen.
  useEffect(() => {
    if (!heroVisible || !pageVisible) return undefined;
    const next = (slide + 1) % HERO_SLIDES.length;
    const id = window.setTimeout(() => loadSlide(next), 1200);
    return () => window.clearTimeout(id);
  }, [slide, heroVisible, pageVisible]);

  // Parallax as the hero scrolls away: copy drifts up and fades, the orbit lags behind.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const orbitRotate = useTransform(scrollYProgress, [0, 1], [0, 25]);

  // Keep only the previous, current and upcoming slides mounted: enough for the crossfade,
  // without holding every decoded photo in memory.
  const previousIndex = (slide - 1 + HERO_SLIDES.length) % HERO_SLIDES.length;
  const nextIndex = (slide + 1) % HERO_SLIDES.length;

  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__slides" aria-hidden="true">
        {HERO_SLIDES.map((src, index) => {
          const inWindow = index === slide || index === previousIndex || index === nextIndex;
          return loaded.has(index) && inWindow && (
            <img
              key={src}
              className={`hero__slide${index === slide ? ' is-active' : ''}`}
              src={encodeURI(src)}
              alt=""
              loading={index === 0 ? 'eager' : 'lazy'}
              decoding="async"
            />
          );
        })}
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
            onPointerEnter={() => loadSlide(index)}
            onFocus={() => loadSlide(index)}
            onClick={() => showSlide(index)}
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
