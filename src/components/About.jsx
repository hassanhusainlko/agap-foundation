import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { about, site } from '../data/siteContent.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';
import { pillarIcons } from './icons.jsx';
import { VIEWPORT, item, stagger } from './motion.js';
import './About.css';

const PARTNER_ICONS = ['users', 'landmark', 'file'];

export default function About() {
  const timelineRef = useRef(null);
  // The rail fills as the timeline scrolls through the viewport.
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ['start 80%', 'end 55%'] });
  const rail = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <Section id="about" tone="mist" title={about.title} intro={about.intro}>
      <div className="about">
        <div className="about__copy">
          {about.paragraphs.map((text, i) => (
            <Reveal as="p" key={text.slice(0, 24)} delay={i * 150}>{text}</Reveal>
          ))}

          <div className="about__partners">
            <Reveal as="h3" className="about__label">We partner with</Reveal>
            <motion.ul className="about__chips" variants={stagger(0.12)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
              {about.partners.map((label, i) => {
                const Icon = pillarIcons[PARTNER_ICONS[i % PARTNER_ICONS.length]];
                return (
                  <motion.li key={label} variants={item} whileHover={{ y: -4 }}>
                    <span className="about__chip-icon"><Icon /></span>{label}
                  </motion.li>
                );
              })}
            </motion.ul>
          </div>

          <Reveal className="about__plaque" delay={300}>
            <span className="about__plaque-label">Corporate Identification Number</span>
            <strong>{site.cin}</strong>
          </Reveal>
        </div>

        <div className="timeline" ref={timelineRef}>
          <motion.span className="timeline__rail" style={{ scaleY: rail }} aria-hidden="true" />
          <ol className="timeline__list">
            {about.timeline.map((entry, i) => (
              <Reveal as="li" key={entry.year} variant="right" delay={i * 150} className="timeline__item">
                <motion.div className="timeline__card" whileHover={{ x: 8 }} transition={{ type: 'spring', stiffness: 300, damping: 22 }}>
                  <span className="timeline__year">{entry.year}</span>
                  <h3>{entry.title}</h3>
                  <p>{entry.text}</p>
                </motion.div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
