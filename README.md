# AGAP Foundation website

React 18 + Vite + Framer Motion. No UI libraries; plain CSS with design tokens.

## Run
```bash
npm install
npm run dev      # local dev server
npm run build    # production build in /dist
```

## Where to change things
| Change | File |
| --- | --- |
| Any copy, pillars, directors, emails, social URLs | `src/data/siteContent.js` |
| Colours, fonts, spacing | `src/styles/tokens.css` |
| Form fields and validation | `src/components/InquiryForm.jsx` |
| Where the form sends data | `.env` (`VITE_INQUIRY_ENDPOINT`), `src/services/submitInquiry.js` |
| Hero network animation (density, colours) | props in `src/components/Hero.jsx` / `NetworkField.jsx` |
| Orbiting pillar icons (speed, direction) | `RINGS` in `src/components/OrbitVisual.jsx` |
| Stats under the hero (9 / 6 / 2020) | `stats` in `siteContent.js` |
| Pillar icons | `icon` key in `siteContent.js` + `pillarIcons` in `src/components/icons.jsx` |
| Scroll animations | `src/components/Reveal.jsx` (`variant`, `delay`); shared timing/easing in `src/components/motion.js` |
| Section intro text (right of each heading) | `intro` on each section in `siteContent.js` |
| "How We Work" steps | `approach` in `siteContent.js` |
| Compliance panel beside Leadership | `leadership.credentials` in `siteContent.js` |
| Nav links | `navLinks` in `siteContent.js` (each `id` must match a section `id`) |
| Donation page copy + bank details | `donation` in `siteContent.js` (route: `#/donate`) |

Each component has a co-located `.css` file. Add a director photo by putting an image in `public/team/` and adding `photo: '/team/name.jpg'` to the person in `siteContent.js`.

## Contact form
Without `VITE_INQUIRY_ENDPOINT` the form runs in demo mode: it shows the success state but sends nothing. Copy `.env.example` to `.env` and point it at your backend or a form service.
