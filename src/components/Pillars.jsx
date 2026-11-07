import { motion } from 'framer-motion';
import { pillars, pillarsSection } from '../data/siteContent.js';
import usePointerFx from '../hooks/usePointerFx.js';
import Section from './Section.jsx';
import { pillarIcons } from './icons.jsx';
import { EASE, VIEWPORT, stagger } from './motion.js';
import './Pillars.css';

const pad = (n) => String(n).padStart(2, '0');

const card = {
  hidden: { opacity: 0, y: 50, scale: 0.94 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

function PillarCard({ pillar, index }) {
  const fx = usePointerFx({ tilt: 7 });
  const Icon = pillarIcons[pillar.icon];
  return (
    <motion.li variants={card} whileTap={{ scale: 0.98 }}>
      <motion.article className="pillar" {...fx} whileHover="hover" initial="rest" animate="rest">
        <span className="pillar__num" aria-hidden="true">{pad(index + 1)}</span>
        <motion.span
          className="pillar__icon"
          variants={{ rest: { rotate: 0, scale: 1 }, hover: { rotate: -10, scale: 1.12 } }}
          transition={{ type: 'spring', stiffness: 320, damping: 14 }}
        >
          <Icon />
        </motion.span>
        <h3>{pillar.title}</h3>
        <p>{pillar.description}</p>
        <motion.span
          className="pillar__bar"
          aria-hidden="true"
          variants={{ rest: { scaleX: 0.18 }, hover: { scaleX: 1 } }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </motion.article>
    </motion.li>
  );
}

export default function Pillars() {
  return (
    <Section id="pillars" tone="dark" title={pillarsSection.title} subtitle={pillarsSection.subtitle} intro={pillarsSection.intro}>
      <motion.ol className="pillars" variants={stagger(0.09)} initial="hidden" whileInView="visible" viewport={{ ...VIEWPORT, amount: 0.1 }}>
        {pillars.map((pillar, i) => <PillarCard key={pillar.id} pillar={pillar} index={i} />)}
      </motion.ol>
    </Section>
  );
}
