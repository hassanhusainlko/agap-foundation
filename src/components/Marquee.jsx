import { pillars } from '../data/siteContent.js';
import { pillarIcons } from './icons.jsx';
import './Marquee.css';

/** Endless ribbon of the nine pillars. The list is rendered twice so the loop is seamless. */
export default function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <ul className="marquee__track">
        {[...pillars, ...pillars].map((p, i) => {
          const Icon = pillarIcons[p.icon];
          return (
            <li key={`${p.id}-${i}`} className="marquee__item"><Icon />{p.short}</li>
          );
        })}
      </ul>
    </div>
  );
}
