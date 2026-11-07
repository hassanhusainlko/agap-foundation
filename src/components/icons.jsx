/** Small inline SVG icon set. All icons inherit colour via currentColor. */
const base = {
  width: 22,
  height: 22,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export const LogoMark = (props) => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
    <circle className="logo__ring" cx="24" cy="24" r="22" stroke="currentColor" strokeOpacity=".5" strokeWidth="1.5" strokeDasharray="3 5" />
    <path d="M24 12 12 34h24z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    <circle cx="24" cy="12" r="4" fill="var(--sky)" />
    <circle cx="12" cy="34" r="3.5" fill="currentColor" />
    <circle cx="36" cy="34" r="3.5" fill="currentColor" />
  </svg>
);

export const Facebook = () => (
  <svg {...base}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
export const Instagram = () => (
  <svg {...base}><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></svg>
);
export const XIcon = () => (
  <svg {...base}><path d="M4 4l16 16M20 4 4 20" /></svg>
);
export const LinkedIn = () => (
  <svg {...base}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
export const socialIcons = { facebook: Facebook, instagram: Instagram, x: XIcon, linkedin: LinkedIn };

export const Menu = () => (<svg {...base}><path d="M4 7h16M4 12h16M4 17h16" /></svg>);
export const Close = () => (<svg {...base}><path d="M6 6l12 12M18 6 6 18" /></svg>);
export const Mail = () => (<svg {...base}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>);
export const Pin = () => (<svg {...base}><path d="M12 21s7-6.2 7-11.5a7 7 0 1 0-14 0C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const ArrowLeft = () => (<svg {...base}><path d="M19 12H5m6-6-6 6 6 6" /></svg>);
export const ArrowRight = () => (<svg {...base}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>);

/** One icon per pillar; keys match `icon` in siteContent.js. */
const S = (children) => () => <svg {...base}>{children}</svg>;
export const pillarIcons = {
  landmark: S(<path d="M3 21h18M5 21V10m4 11V10m6 11V10m4 11V10M2 10l10-6 10 6z" />),
  graduation: S(<><path d="m2 9 10-5 10 5-10 5z" /><path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" /></>),
  research: S(<><circle cx="11" cy="11" r="6" /><path d="m20 20-4.2-4.2M9 13v-3m2 3V8m2 5v-2" /></>),
  users: S(<><circle cx="9" cy="8" r="3" /><path d="M3 20a6 6 0 0 1 12 0" /><circle cx="17" cy="9" r="2.5" /><path d="M17 14a5 5 0 0 1 4 5" /></>),
  cpu: S(<><rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9.5" y="9.5" width="5" height="5" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" /></>),
  coins: S(<><ellipse cx="12" cy="6" rx="7" ry="3" /><path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" /></>),
  file: S(<><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></>),
  book: S(<path d="M2 5h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2zM22 5h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7z" />),
  flask: S(<><path d="M9 3h6M10 3v6L4.5 19a1.5 1.5 0 0 0 1.3 2.2h12.4a1.5 1.5 0 0 0 1.3-2.2L14 9V3" /><path d="M7.5 15h9" /></>),
};
export const Check = () => (
  <svg viewBox="0 0 52 52" width="64" height="64" fill="none" aria-hidden="true">
    <circle className="check__circle" cx="26" cy="26" r="24" stroke="var(--success)" strokeWidth="3" />
    <path className="check__tick" d="m15 27 8 8 15-16" stroke="var(--success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
