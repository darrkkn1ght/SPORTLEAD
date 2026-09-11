import type { NavItem, ServicePillar, AudienceItem, Differentiator, ApproachStep, ValueItem } from '@/types';

export const SITE_NAME = 'SportLead Africa';
export const SITE_URL = 'https://sportleadafrica.com';
export const SITE_EMAIL = 'inquiries@sportleadafrica.com';
export const SITE_TAGLINE = 'Building Better Sport Systems Through Infrastructure, Governance, Strategy & Institutional Development Across Africa.';
export const HEADQUARTERS = 'Lagos, Nigeria';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Sport Infrastructure Planning & Development', href: '/services/infrastructure' },
      { label: 'Sport Facility Auditing & Improvement', href: '/services/auditing' },
      { label: 'Sport Governance & Administration', href: '/services/governance' },
      { label: 'Strategy & Institutional Development', href: '/services/strategy' },
      { label: 'Competition & Event Management', href: '/services/competitions' },
      { label: 'Sport Project Development & Management', href: '/services/project-management' },
    ],
  },
  { label: 'Expert Network', href: '/expert-network' },
  { label: 'Insights', href: '/insights' },
  {
    label: 'Partner With Us',
    href: '/partner-with-us',
    children: [
      { label: 'Commission a Project', href: '/discuss-a-project' },
      { label: 'Fund a Facility Project', href: '/partner-with-us#fund' },
      { label: 'Join Our Expert Network', href: '/partner-with-us#expert-network' },
      { label: 'Institutional Partnerships', href: '/partner-with-us#institutional' },
    ],
  },
  { label: 'Contact', href: '/contact' },
];

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    id: 'infrastructure',
    title: 'Sport Infrastructure Planning & Development',
    description: 'Feasibility, concept development, technical planning, rehabilitation, redevelopment and project-delivery support for pitches, courts, stadia, sport complexes and related facilities.',
    icon: 'Building',
    href: '/services/infrastructure',
  },
  {
    id: 'auditing',
    title: 'Sport Facility Auditing & Improvement',
    description: 'Structured assessment of facility condition, safety, accessibility, operations, maintenance and improvement priorities, with practical recommendations for better use and long-term value.',
    icon: 'ClipboardCheck',
    href: '/services/auditing',
  },
  {
    id: 'governance',
    title: 'Sport Governance & Administration',
    description: 'Governance reviews, policy development, administrative systems, board support, operating structures and institutional strengthening for sport organisations.',
    icon: 'Shield',
    href: '/services/governance',
  },
  {
    id: 'strategy',
    title: 'Strategy & Institutional Development',
    description: 'Strategic plans, organisational reviews, operating models, growth frameworks, institutional reform and long-term development plans.',
    icon: 'Target',
    href: '/services/strategy',
  },
  {
    id: 'competitions',
    title: 'Competition & Event Management',
    description: 'Competition design, operational planning, administration and delivery support for leagues, tournaments, championships and other organised sport events.',
    icon: 'Layers',
    href: '/services/competitions',
  },
  {
    id: 'project-management',
    title: 'Sport Project Development & Management',
    description: 'Project concept development, stakeholder coordination, technical-team assembly, implementation management, reporting and evaluation.',
    icon: 'Users',
    href: '/services/project-management',
  },
];

export const AUDIENCES: AudienceItem[] = [
  { label: 'Clubs and leagues', icon: 'Shield' },
  { label: 'Sport associations and federations', icon: 'Users' },
  { label: 'Schools and universities', icon: 'Building' },
  { label: 'Government ministries, agencies and public institutions', icon: 'Building' },
  { label: 'Sport institutions and development organisations', icon: 'Globe' },
  { label: 'Investors, companies, foundations and philanthropists', icon: 'Target' },
  { label: 'Private organisations and project owners', icon: 'Users' },
];

export const DIFFERENTIATORS: Differentiator[] = [
  {
    title: 'Sport Sector Understanding',
    description: 'We approach assignments through the realities of sport organisations, facilities, competitions and development systems.',
  },
  {
    title: 'Multidisciplinary Expert Network',
    description: 'We assemble relevant specialists around the requirements of each assignment rather than forcing every project through one discipline.',
  },
  {
    title: 'Evidence Led Diagnosis',
    description: 'We begin by understanding the actual problem, constraints, risks and operating context before recommending solutions.',
  },
  {
    title: 'Context Sensitive Solutions',
    description: 'Our African focus does not assume African markets are identical. Each solution should respond to the specific institutional, economic, regulatory and operational context of the assignment.',
  },
  {
    title: 'Coordinated Project Delivery',
    description: 'Where required, we move beyond advice to coordinate expertise, stakeholders, implementation, reporting and evaluation.',
  },
];

export const APPROACH_STEPS: ApproachStep[] = [
  {
    title: 'Audit',
    description: 'Understand the current condition, system, need or opportunity.',
    icon: 'ClipboardCheck',
  },
  {
    title: 'Diagnose',
    description: 'Identify the underlying problems, constraints, risks and priorities.',
    icon: 'Target',
  },
  {
    title: 'Design',
    description: 'Develop the appropriate strategy, solution, facility concept, operating model or project framework.',
    icon: 'Layers',
  },
  {
    title: 'Assemble',
    description: 'Bring together the specialist expertise and stakeholders required for the assignment.',
    icon: 'Users',
  },
  {
    title: 'Deliver',
    description: 'Support or manage implementation with clear responsibilities and reporting.',
    icon: 'Building',
  },
  {
    title: 'Evaluate',
    description: 'Assess outcomes, identify lessons and support continuous improvement.',
    icon: 'CheckCircle',
  },
];

export const VALUES: ValueItem[] = [
  {
    title: 'Professionalism',
    description: 'We work to clear professional standards in communication, conduct, documentation and delivery.',
  },
  {
    title: 'Evidence',
    description: 'Recommendations should be grounded in credible information, structured assessment and defensible reasoning.',
  },
  {
    title: 'Accountability & Transparency',
    description: 'Responsibilities, assumptions, decisions and reporting should be clear to clients and partners.',
  },
  {
    title: 'Safety & Responsibility',
    description: 'Facility, event and project decisions should treat participant, workforce and public safety as fundamental.',
  },
  {
    title: 'Context Sensitivity',
    description: 'We work from the realities of each institution and market rather than assuming one African context fits another.',
  },
  {
    title: 'Long-Term Value',
    description: 'We favour solutions that strengthen institutional capability and create value beyond the immediate assignment.',
  },
  {
    title: 'African Relevance',
    description: 'Our work is built around African sport realities while remaining open to appropriate global standards, expertise and practice.',
  },
];

// Social media profile links — pending official handle provisioning from client.
// Kept inactive ('#') so the footer does not render visibly broken external links.
export const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: '#', icon: 'LinkedIn' },
  { name: 'Instagram', url: '#', icon: 'Instagram' },
  { name: 'X / Twitter', url: '#', icon: 'Twitter' },
  { name: 'Facebook', url: '#', icon: 'Facebook' },
  { name: 'TikTok', url: '#', icon: 'Globe' },
];

export const INQUIRY_TYPES = [
  'General Inquiry',
  'Project Discussion',
  'Partnership Opportunity',
  'Expert Network',
  'Media / Press',
  'Other',
];

export const SERVICE_OPTIONS = [
  'Sport Infrastructure Planning & Development',
  'Sport Facility Auditing & Improvement',
  'Sport Governance & Administration',
  'Strategy & Institutional Development',
  'Competition & Event Management',
  'Sport Project Development & Management',
  'Multiple / Not Sure',
];

export const ORGANISATION_TYPES = [
  'Club or league',
  'Sport association or federation',
  'School or university',
  'Government ministry, agency or public institution',
  'Sport institution or development organisation',
  'Investor, company, foundation or philanthropist',
  'Private organisation or project owner',
  'Other',
];

export const PROJECT_STAGES = [
  'Concept / early idea',
  'Feasibility or scoping',
  'Planning or design',
  'Implementation or delivery',
  'Operational / existing facility or programme',
  'Not sure',
];

export const BUDGET_RANGES = [
  'Under $50,000',
  '$50,000 – $250,000',
  '$250,000 – $1,000,000',
  '$1,000,000 – $5,000,000',
  'Over $5,000,000',
  'Not yet determined',
  'Prefer not to say',
];

export const TIMELINE_OPTIONS = [
  'Immediate (within 1 month)',
  'Short-term (1–3 months)',
  'Medium-term (3–6 months)',
  'Long-term (6–12 months)',
  'Over 12 months',
  'Not yet determined',
];

export const PARTNER_ROUTES = [
  {
    title: 'Commission a Project',
    description: 'For organisations that need a facility audit, advisory engagement, infrastructure assignment, governance or strategy work, competition/event management, or broader sport-project support.',
    href: '/discuss-a-project',
    icon: 'Building',
  },
  {
    title: 'Fund a Facility Project',
    description: 'For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport-facility or infrastructure project.',
    href: '/contact',
    icon: 'Target',
  },
  {
    title: 'Join Our Expert Network',
    description: 'For qualified individual specialists, technical firms and professional organisations interested in contributing to SportLead Africa project teams.',
    href: '/contact',
    icon: 'Users',
  },
  {
    title: 'Institutional Partnerships',
    description: 'For universities, associations, federations, government bodies, NGOs, professional bodies and other institutions interested in longer-term collaboration.',
    href: '/contact',
    icon: 'Globe',
  },
];
