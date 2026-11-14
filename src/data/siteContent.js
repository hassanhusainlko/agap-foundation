/**
 * Single source of truth for all site copy and links.
 * To change text, add a pillar, or swap a social URL, edit this file only.
 */

export const site = {
  name: 'Asian Governance and Policy Foundation',
  shortName: 'AGAP Foundation',
  cin: 'U72200BR2026NPL088870',
};

export const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About Us' },
  { id: 'pillars', label: 'Core Pillars' },
  { id: 'leadership', label: 'Leadership' },
  { id: 'connect', label: 'Connect With Us' },
];

export const hero = {
  tagline: 'A Modern Think Tank Advancing Evidence-Based Governance & Public Policy',
  headline: 'Shaping Resilient Institutions and Sustainable Regional Development',
  body: 'Incorporated as a Section 8 non-profit think tank, the Asian Governance and Policy Foundation (AGAP Foundation) partners with elected leaders, state institutions, and public authorities to design and implement transparent, high-impact administrative solutions across Asia.',
  primaryCta: { label: 'Explore Our Pillars', href: '#pillars' },
  secondaryCta: { label: 'Partner With Us', href: '#connect' },
};

// Donation section on the landing page (below Core Capabilities) and the navbar CTA that jumps to it.
export const donation = {
  cta: { label: 'Contribute to Our Mission', href: '#donate' },
  eyebrow: 'Support AGAP Foundation',
  title: 'Contribute to Our Mission',
  intro:
    'Your contribution funds field research, governance fellowships and pilot programmes that help public institutions plan, spend and deliver better for the people they serve.',
  fields: [
    { label: 'Account Name', value: 'AGAP FOUNDATION' },
    { label: 'Bank Name', value: 'State Bank of India (SBI)' },
    { label: 'Account No.', value: '45697062662' },
    { label: 'IFS Code', value: 'SBIN0003564' },
  ],
  support: [
    'Field research, budget analysis and social audits in districts and villages',
    'The Governance & Policy Fellowship for early-career professionals',
    'Digital public infrastructure and scheme-tracking dashboards',
    'Capacity building for elected representatives and administrators',
  ],
  note: 'After transferring, email us the transaction reference so we can send you a receipt and a note of thanks.',
};

// Facts taken from the About Us text. `from` is where the count-up animation starts.
export const stats = [
  { value: 9, from: 0, label: 'Functional pillars' },
  { value: 6, from: 0, label: 'Years of ground-level engagement' },
  { value: 2020, from: 1990, label: 'Year our network began' },
];

export const about = {
  title: 'About Us',
  intro: 'Born in the field during COVID-19, built over six years of roundtables and field sessions, and incorporated in 2026 to institutionalise the work.',
  // Who we partner with (from the hero copy).
  partners: ['Elected leaders', 'State institutions', 'Public authorities'],
  paragraphs: [
    'The genesis of the Asian Governance and Policy Foundation dates back to 2020 during the peak of the COVID-19 crisis, when a collective of researchers, policy enthusiasts, and public administrators came together to address critical gaps in grassroots relief, public health communication, and community resilience.',
    `Over the subsequent six years, this informal network hosted numerous regional discussions, public roundtables, and field-level sessions. Building upon this deep legacy of ground-level engagement, AGAP Foundation was formally incorporated in 2026 as a Section 8 non-profit entity (CIN: ${site.cin}) to institutionalise its mission of delivering rigorous technical assistance and public systems research.`,
  ],
  timeline: [
    {
      year: '2020',
      title: 'A network forms during COVID-19',
      text: 'Researchers, policy enthusiasts, and public administrators unite to close gaps in grassroots relief, public health communication, and community resilience.',
    },
    {
      year: '2020 to 2026',
      title: 'Six years of ground-level engagement',
      text: 'The informal network hosts regional discussions, public roundtables, and field-level sessions.',
    },
    {
      year: '2026',
      title: 'Formally incorporated',
      text: 'AGAP Foundation registers as a Section 8 non-profit to deliver rigorous technical assistance and public systems research.',
    },
  ],
};

export const pillarsSection = {
  title: 'Core Capabilities',
  subtitle: 'The 9 Functional Pillars',
  intro: 'From research and fellowships to GovTech and fiscal advisory, each pillar strengthens a different part of how public systems plan, spend and deliver.',
};

// `short` is the label in the list; `title` and `description` show in the detail panel.
export const pillars = [
  {
    id: 'government-advisory',
    icon: 'landmark',
    short: 'Government Advisory & PMUS',
    title: 'Government Advisory & Public Systems Management (PMUS)',
    description:
      'Partnering with Government Bodies to streamline scheme execution, optimize public expenditure, and build last-mile administrative capacity.',
  },
  {
    id: 'fellowship',
    icon: 'graduation',
    short: 'Governance & Policy Fellowship',
    title: 'The Governance & Policy Fellowship',
    description:
      'Administering premier, field-based professional programs placing top law, policy, and management graduates directly inside administration to act as force-multipliers.',
  },
  {
    id: 'research',
    icon: 'research',
    short: 'Policy Research & Field Studies',
    title: 'Policy Research & Field Studies',
    description:
      'Conducting ground-level empirical studies, budget analysis, and scheme impact assessments to inform data-driven decision-making in grassroots governance.',
  },
  {
    id: 'convenings',
    icon: 'users',
    short: 'Summits, Convenings & Awards',
    title: 'State Convenings, Summits & Awards',
    description:
      'Hosting regional governance summits to foster dialogue between policy experts, bureaucrats, and local leaders, while celebrating excellence in grassroots administration.',
  },
  {
    id: 'govtech',
    icon: 'cpu',
    short: 'Digital Public Infrastructure & GovTech',
    title: 'Digital Public Infrastructure & GovTech',
    description:
      'Building custom data monitoring tools, scheme-tracking dashboards, and digital platforms to modernize local government operations and enable data-driven decision-making.',
  },
  {
    id: 'pfm',
    icon: 'coins',
    short: 'Public Finance & Fiscal Advisory',
    title: 'Public Finance Management (PFM) & Fiscal Advisory',
    description:
      'Assisting local bodies in tracking scheme fund utilisation, identifying unspent balances, conducting revenue-gap audits, and preparing sovereign grant applications.',
  },
  {
    id: 'legislative',
    icon: 'file',
    short: 'Legislative Drafting & Assistance',
    title: 'Legislative Drafting & Policy Assistance',
    description:
      'Providing evidence-based briefing notes, council resolution drafting, private member bill research, and legislative summaries for elected representatives.',
  },
  {
    id: 'education',
    icon: 'book',
    short: 'Executive Education & Training',
    title: 'Executive Education & Civil Servant Training',
    description:
      'Delivering specialised training bootcamps and capacity-building programs for administrative staff, departmental heads, and newly elected representatives.',
  },
  {
    id: 'action-research',
    icon: 'flask',
    short: 'Action Research & Social Audits',
    title: 'Action Research, Pilot Programs & Social Audits',
    description:
      'Designing and implementing village-level pilot programs to establish proof of concept on the ground before scaling policies state-wide, backed by rigorous social audits.',
  },
];

export const leadership = {
  title: 'Our Leadership',
  intro: 'AGAP Foundation is directed by a board accountable under the Companies Act, 2013, and run on public-interest compliance.',
  // Add `photo: '/team/name.jpg'` (file in /public/team) to replace the monogram.
  // `badge` is the short word on the rotating ribbon; it falls back to `role`.
  people: [
    {
      name: 'Prasun Kumar',
      role: 'Director & Founder',
      badge: 'Founder',
      bio: [
        'A political strategist, governance expert, and public policy advisor with over a decade of professional experience in large-scale strategic communications, campaign structures, and administrative systems design.',
        'He specialises in engineering data-driven public outreach frameworks and advising public leaders on legislative and institutional reforms across India.',
      ],
    },
    {
      name: 'Sukriti Shandilya',
      role: 'Director',
      bio: [
        'A practicing advocate at the Patna High Court specialising in institutional law and regulatory compliance, paired with a dedicated research background in public governance and policy structures.',
        "She brings rigorous legal oversight to the foundation's administrative frameworks and policy drafting initiatives.",
      ],
    },
  ],
};

export const connect = {
  title: 'Connect With Us',
  intro: 'Research collaborations, institutional partnerships, media or a general question: pick a topic and write to us.',
  // Add more offices by appending to this list; Connect and Footer both render it.
  offices: [
    {
      label: 'Registered Office',
      address: 'Jahanwi, M/620, Lohia Nagar, Kankarbagh, Patna - 800020, Bihar, India',
    },
  ],
  emails: ['contact@agapfoundation.org', 'office.agapfoundation@gmail.com'],
  inquiryTypes: [
    'Research Collaboration',
    'Institutional Partnership',
    'General Inquiry',
    'Media',
  ],
  // Replace each href with the real profile URL.
  socials: [
    { id: 'facebook', label: 'Facebook', short: 'FB', href: '#' },
    { id: 'instagram', label: 'Instagram', short: 'Insta', href: '#' },
    { id: 'x', label: 'X', short: 'X', href: '#' },
    { id: 'linkedin', label: 'LinkedIn', short: 'LinkedIn', href: '#' },
  ],
};

export const footer = {
  lines: [
    `CIN: ${site.cin} | Section 8 Company, Registered under the Companies Act, 2013 (Govt. of India)`,
    'NITI Aayog NGO Darpan Registered | 12A & 80G Tax-Exempt Status Compliant',
  ],
};
