import { leadership } from '../data/siteContent.js';
import Reveal from './Reveal.jsx';
import Section from './Section.jsx';
import './Leadership.css';

const initials = (name) => name.split(' ').map((part) => part[0]).join('');

/** Role set on a rotating circular ribbon. Decorative; the role is also in the text for screen readers. */
function RoleBadge({ role, id }) {
  const pathId = `badge-path-${id}`;
  return (
    <svg className="roster__badge" viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <path id={pathId} d="M60 60m-46 0a46 46 0 1 1 92 0a46 46 0 1 1-92 0" />
      </defs>
      <g className="roster__badge-ring">
        <text>
          <textPath href={`#${pathId}`} textLength="284" lengthAdjust="spacing">{`${role} • `.repeat(3)}</textPath>
        </text>
      </g>
      <image
        className="roster__badge-logo"
        href="/logo-blue.png"
        x="32"
        y="43"
        width="56"
        height="34"
        preserveAspectRatio="xMidYMid meet"
      />
    </svg>
  );
}

export default function Leadership() {
  return (
    <Section id="leadership" tone="mist" title={leadership.title} intro={leadership.intro}>
      <ul className="roster">
        {leadership.people.map((person, i) => (
          <Reveal as="li" key={person.name} variant="left" delay={i * 120}>
            <article className="roster__row">
              <div className="roster__arch">
                <div className="roster__arch-fill">
                  {person.photo ? <img src={person.photo} alt={person.name} /> : <span aria-hidden="true">{initials(person.name)}</span>}
                </div>
              </div>
              <div className="roster__info">
                <h3 className="roster__name">{person.name}<span className="sr-only">, {person.role}</span></h3>
                <p className="roster__role" aria-hidden="true">{person.role}</p>
                {person.bio && (
                  <div className="roster__bio">
                    {person.bio.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
              <RoleBadge role={person.badge || person.role} id={i} />
            </article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
