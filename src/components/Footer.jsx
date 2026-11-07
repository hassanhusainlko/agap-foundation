import { connect, footer, hero, navLinks, site } from '../data/siteContent.js';
import { Mail, Pin, socialIcons } from './icons.jsx';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__grid">
        <div className="footer__brand">
          <a className="footer__logo" href="#home" aria-label={`${site.shortName}, back to top`}>
            <img src="/logo-white.png" alt="" width="520" height="315" />
          </a>
          <p>{hero.tagline}</p>
        </div>

        <nav className="footer__col" aria-label="Footer">
          <h3>Navigation</h3>
          <ul>
            {navLinks.map((link) => (
              <li key={link.id}><a href={`#${link.id}`}>{link.label}</a></li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h3>Offices</h3>
          {connect.offices.map((office) => (
            <div key={office.label} className="footer__item">
              <Pin />
              <address>
                <strong>{office.label}</strong>
                {office.address}
              </address>
            </div>
          ))}
          <div className="footer__item">
            <Mail />
            <div className="footer__emails">
              {connect.emails.map((email) => (
                <a key={email} href={`mailto:${email}`}>{email}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer__col">
          <h3>Follow us</h3>
          <ul className="footer__socials">
            {connect.socials.map((s) => {
              const Icon = socialIcons[s.id];
              return (
                <li key={s.id}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} title={s.label}>
                    <Icon />
                  </a>
                </li>
              );
            })}
          </ul>
          <a className="footer__top" href="#home">Back to top</a>
        </div>
      </div>

      <div className="wrap footer__legal">
        {footer.lines.map((line) => <p key={line}>{line}</p>)}
      </div>
    </footer>
  );
}
