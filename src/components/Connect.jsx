import { useState } from 'react';
import { motion } from 'framer-motion';
import { connect } from '../data/siteContent.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';
import InquiryForm from './InquiryForm.jsx';
import { Mail, Pin, socialIcons } from './icons.jsx';
import { VIEWPORT, item, stagger } from './motion.js';
import './Connect.css';

export default function Connect() {
  const [topic, setTopic] = useState('');

  return (
    <Section id="connect" tone="dark" title={connect.title} intro={connect.intro}>
      <div className="connect">
        <div className="connect__info">
          {/* Picking a topic pre-fills "Nature of Inquiry" in the form. */}
          <Reveal variant="left" className="topics">
            <h3 id="topics-title">What would you like to discuss?</h3>
            <div className="topics__list" role="group" aria-labelledby="topics-title">
              {connect.inquiryTypes.map((type) => (
                <motion.button
                  key={type}
                  type="button"
                  className="topics__chip"
                  aria-pressed={topic === type}
                  onClick={() => setTopic(type)}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {topic === type && (
                    <motion.span className="topics__pill" layoutId="topic-pill" transition={{ type: 'spring', stiffness: 400, damping: 32 }} />
                  )}
                  <span className="topics__label">{type}</span>
                </motion.button>
              ))}
            </div>
          </Reveal>

          {connect.offices.map((office) => (
            <Reveal key={office.label} variant="left" delay={100} className="connect__block">
              <span className="connect__icon"><Pin /></span>
              <div>
                <h3>{office.label}</h3>
                <address>{office.address}</address>
              </div>
            </Reveal>
          ))}

          <Reveal variant="left" delay={180} className="connect__block">
            <span className="connect__icon"><Mail /></span>
            <div>
              <h3>Official Email</h3>
              {connect.emails.map((email) => (
                <a key={email} href={`mailto:${email}`}>{email}</a>
              ))}
            </div>
          </Reveal>

          <motion.ul className="socials" aria-label="Social media" variants={stagger(0.08, 0.2)} initial="hidden" whileInView="visible" viewport={VIEWPORT}>
            {connect.socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <motion.li key={s.id} variants={item}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                    <Icon />
                    <span>{s.short}</span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>

        <Reveal variant="right" className="connect__form">
          <InquiryForm topic={topic} onTopicChange={setTopic} />
        </Reveal>
      </div>
    </Section>
  );
}
