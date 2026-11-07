import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { approach, hero } from '../data/siteContent.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';
import { ArrowRight, pillarIcons } from './icons.jsx';
import { EASE, VIEWPORT, stagger } from './motion.js';
import './Approach.css';

const step = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

/** Lights up when the scroll-linked line reaches it. */
function StepDot({ progress, at, index }) {
  const lit = useTransform(progress, [at - 0.08, at], [0, 1]);
  const color = useTransform(lit, [0, 1], ['#003366', '#ffffff']);
  return (
    <span className="step__dot" aria-hidden="true">
      <motion.span className="step__dot-fill" style={{ opacity: lit, scale: lit }} />
      <motion.span className="step__dot-num" style={{ color }}>{index + 1}</motion.span>
    </span>
  );
}

export default function Approach() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 55%'] });
  const line = useSpring(scrollYProgress, { stiffness: 110, damping: 26 });
  const count = approach.steps.length;

  return (
    <Section id="approach" tone="light" title={approach.title} intro={approach.intro}>
      <div className="approach" ref={ref}>
        <span className="approach__track" aria-hidden="true"><motion.span style={{ scaleX: line }} /></span>
        <motion.ol className="approach__steps" variants={stagger(0.15)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
          {approach.steps.map((s, i) => {
            const Icon = pillarIcons[s.icon];
            return (
              <motion.li key={s.title} className="step" variants={step}>
                <StepDot progress={line} at={(i + 0.5) / count} index={i} />
                <motion.div className="step__card" whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                  <span className="step__icon"><Icon /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </motion.div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>

      <Reveal variant="scale" className="cta">
        <span className="cta__glow" aria-hidden="true" />
        <div>
          <h3 className="cta__title">Have a scheme, district or department that needs evidence and execution support?</h3>
          <p className="cta__text">We work with elected leaders, state institutions and public authorities from diagnosis to scale.</p>
        </div>
        <motion.a className="btn btn--primary" href={hero.secondaryCta.href} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          {hero.secondaryCta.label}<ArrowRight />
        </motion.a>
      </Reveal>
    </Section>
  );
}
