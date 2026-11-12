import { pillars } from '../data/siteContent.js';
import { pillarIcons } from './icons.jsx';
import './OrbitVisual.css';

// Two rings of pillar icons orbiting the logo. Tweak speed, direction and layout here.
const RINGS = [
  { name: 'outer', items: pillars.slice(0, 5), offset: 0, duration: 70, reverse: false },
  { name: 'inner', items: pillars.slice(5), offset: 45, duration: 45, reverse: true },
];

export default function OrbitVisual() {
  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit__core">
        <img className="orbit__logo" src="/logo-white.png" alt="" width="520" height="315" />
      </div>
      {RINGS.map((ring) => (
        <div
          key={ring.name}
          className={`orbit__ring orbit__ring--${ring.name}`}
          style={{ '--dur': `${ring.duration}s`, '--dir': ring.reverse ? 'reverse' : 'normal', '--dir-inv': ring.reverse ? 'normal' : 'reverse' }}
        >
          {ring.items.map((pillar, i) => {
            const Icon = pillarIcons[pillar.icon];
            const angle = ring.offset + (360 / ring.items.length) * i;
            return (
              <span key={pillar.id} className="orbit__item" style={{ '--a': `${angle}deg` }}>
                <span className="orbit__icon" data-label={pillar.short}><Icon /></span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
}
