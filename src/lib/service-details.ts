export interface ServiceDetail {
  slug: string;
  title: string;
  icon: string;
  heroImage: string;
  heroImageAlt: string;
  heroIntro: string;
  problem: string;
  scopeOfWork: string[];
  deliverables: string[];
  howWeWork: string[];
  whoThisIsFor: string[];
  expertiseWeAssemble: string;
}

export const SERVICE_DETAILS: Record<string, ServiceDetail> = {
  infrastructure: {
    slug: 'infrastructure',
    title: 'Sport Infrastructure Planning & Development',
    icon: 'Building',
    heroImage: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop',
    heroImageAlt: 'Sport stadium and pitch infrastructure planning',
    heroIntro:
      'SportLead Africa supports the planning, improvement and delivery of sport facilities from early concept through implementation support. We help clients determine what is needed, what is feasible and how the facility should respond to sporting, operational and long term institutional requirements.',
    problem:
      'Sport facilities can fail long before construction begins. Poor needs assessment, weak planning, inappropriate specifications, unclear operating assumptions and fragmented technical coordination can produce facilities that are expensive to build but difficult to use, maintain or sustain.',
    scopeOfWork: [
      'Needs assessment and project definition',
      'Feasibility and early concept development',
      'Site and facility planning support',
      'Technical brief development',
      'Rehabilitation and redevelopment planning',
      'Stakeholder and specialist coordination',
      'Project delivery and implementation support',
      'Operational and long term use considerations',
    ],
    deliverables: [
      'Facility needs assessment',
      'Feasibility or concept report',
      'Project brief and scope',
      'Facility development or improvement roadmap',
      'Technical coordination framework',
      'Implementation plan',
      'Stakeholder consultation summary',
      'Project monitoring and reporting framework',
    ],
    howWeWork: [
      'Understand the sporting and institutional need',
      'Assess the site, existing conditions and project constraints',
      'Define the facility brief and intended use',
      'Assemble the required technical expertise',
      'Coordinate planning and project development',
      'Support implementation, monitoring and review',
    ],
    whoThisIsFor: [
      'Clubs and academies',
      'Schools and universities',
      'Government institutions',
      'Federations and associations',
      'Private facility owners and developers',
      'Foundations, funders and investors',
    ],
    expertiseWeAssemble:
      'Depending on the assignment, the project team may include architects, engineers, quantity surveyors, facility specialists, sport administrators, project managers, safety professionals and other relevant technical experts.',
  },

  auditing: {
    slug: 'auditing',
    title: 'Sport Facility Auditing & Improvement',
    icon: 'ClipboardCheck',
    heroImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=2000&auto=format&fit=crop',
    heroImageAlt: 'Sport facility inspection and condition auditing',
    heroIntro:
      'SportLead Africa assesses existing sport facilities to identify physical, safety, accessibility, operational and maintenance issues and to establish practical priorities for improvement.',
    problem:
      'Many sport facilities remain in use without a clear understanding of their current condition, risks, operating weaknesses or improvement priorities. This can reduce safety, user experience, sporting value and the long term usefulness of the asset.',
    scopeOfWork: [
      'Physical condition review',
      'Safety and risk observations',
      'Accessibility review',
      'Sporting functionality assessment',
      'Operations and maintenance review',
      'User flow and facility use assessment',
      'Improvement prioritisation',
      'Rehabilitation and upgrade planning',
    ],
    deliverables: [
      'Facility audit report',
      'Condition and risk register',
      'Priority improvement schedule',
      'Maintenance recommendations',
      'Accessibility observations',
      'Operational improvement recommendations',
      'Phased rehabilitation roadmap',
      'Indicative action plan',
    ],
    howWeWork: [
      'Define the purpose and scope of the audit',
      'Review available facility information',
      'Conduct site assessment',
      'Document findings and priority issues',
      'Develop practical improvement recommendations',
      'Present priorities and next steps',
    ],
    whoThisIsFor: [
      'Schools and universities',
      'Clubs and academies',
      'Government facility owners',
      'Private sport facility operators',
      'Associations and federations',
      'Funders considering facility improvement',
    ],
    expertiseWeAssemble:
      'Assignments may require facility auditors, architects, engineers, safety specialists, accessibility professionals, operations specialists, sport administrators and project managers.',
  },

  governance: {
    slug: 'governance',
    title: 'Sport Governance & Administration',
    icon: 'Shield',
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop',
    heroImageAlt: 'Institutional governance and board administration',
    heroIntro:
      'SportLead Africa helps sport organisations strengthen the structures, policies, decision systems and administrative processes through which they operate.',
    problem:
      'Sport organisations can have committed people and significant activity while still being held back by unclear responsibilities, weak policies, inconsistent administration, poor decision rights and systems that depend too heavily on individuals rather than institutions.',
    scopeOfWork: [
      'Governance reviews',
      'Board and committee structure review',
      'Policy development and review',
      'Administrative systems and workflows',
      'Roles, responsibilities and decision rights',
      'Operating procedures',
      'Institutional documentation',
      'Governance and administrative strengthening',
    ],
    deliverables: [
      'Governance review report',
      'Governance framework',
      'Policy suite or policy recommendations',
      'Board and committee terms of reference',
      'Decision rights framework',
      'Administrative process maps',
      'Standard operating procedures',
      'Institutional strengthening plan',
    ],
    howWeWork: [
      'Understand the organisation and its current operating structure',
      'Review relevant policies, documents and decision processes',
      'Identify governance and administrative gaps',
      'Develop practical structures and documentation',
      'Support adoption and implementation',
      'Review how the new systems are working',
    ],
    whoThisIsFor: [
      'Clubs and leagues',
      'Associations and federations',
      'Academies',
      'Schools and universities',
      'Sport NGOs and development organisations',
      'Public sport institutions',
    ],
    expertiseWeAssemble:
      'Assignments may involve sport administrators, governance specialists, legal professionals where required, policy specialists, organisational development practitioners and other relevant experts.',
  },

  strategy: {
    slug: 'strategy',
    title: 'Strategy & Institutional Development',
    icon: 'Target',
    heroImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop',
    heroImageAlt: 'Strategy and institutional development planning',
    heroIntro:
      'SportLead Africa helps sport organisations clarify direction, strengthen operating models and build practical plans for institutional growth and long term development.',
    problem:
      'Strategy becomes weak when it is disconnected from institutional capacity, operating reality and clear implementation responsibility. Organisations may know what they want to become without having a workable path for getting there.',
    scopeOfWork: [
      'Strategic planning',
      'Organisational review',
      'Operating model development',
      'Institutional growth planning',
      'Reform and restructuring support',
      'Programme and portfolio prioritisation',
      'Implementation planning',
      'Monitoring and review frameworks',
    ],
    deliverables: [
      'Strategic plan',
      'Organisational diagnostic',
      'Operating model',
      'Growth or reform roadmap',
      'Priority action plan',
      'Implementation framework',
      'Performance and monitoring framework',
      'Institutional development plan',
    ],
    howWeWork: [
      'Establish the current position and desired future state',
      'Assess institutional capacity and constraints',
      'Identify strategic choices and priorities',
      'Design the operating and implementation model',
      'Assign responsibilities, milestones and measures',
      'Support implementation and periodic review',
    ],
    whoThisIsFor: [
      'Federations and associations',
      'Clubs and leagues',
      'Schools and universities',
      'Government agencies',
      'Sport development organisations',
      'Private sport organisations and investors',
    ],
    expertiseWeAssemble:
      'Depending on the assignment, we may assemble strategy professionals, sport administrators, organisational development specialists, researchers, finance professionals, governance specialists and subject matter experts.',
  },

  competitions: {
    slug: 'competitions',
    title: 'Competition & Event Management',
    icon: 'Layers',
    heroImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2000&auto=format&fit=crop',
    heroImageAlt: 'Athletics and sports competition operations',
    heroIntro:
      'SportLead Africa supports the design, planning, administration and delivery of sport competitions and events with attention to sporting integrity, operations, participant experience and institutional objectives.',
    problem:
      'Competitions can be undermined by weak formats, unclear regulations, poor scheduling, fragmented responsibilities, inadequate operational planning and inconsistent communication. Good competition management requires more than event day execution.',
    scopeOfWork: [
      'Competition concept and format design',
      'Rules and competition regulations support',
      'Scheduling and operational planning',
      'Venue and facility coordination',
      'Participant and stakeholder coordination',
      'Competition administration',
      'Event delivery planning',
      'Post event review and reporting',
    ],
    deliverables: [
      'Competition framework',
      'Competition regulations or operational handbook',
      'Schedule and delivery plan',
      'Roles and responsibility matrix',
      'Venue and logistics plan',
      'Stakeholder communication plan',
      'Risk and issue register',
      'Post event report',
    ],
    howWeWork: [
      'Clarify the purpose, participants and competition model',
      'Design the format and operating framework',
      'Develop regulations, schedules and responsibilities',
      'Coordinate venues, stakeholders and delivery teams',
      'Support competition delivery',
      'Review outcomes and lessons',
    ],
    whoThisIsFor: [
      'Leagues and clubs',
      'Associations and federations',
      'Schools and universities',
      'Government sport programmes',
      'Corporate and institutional sport organisers',
      'Development organisations',
    ],
    expertiseWeAssemble:
      'Assignments may involve competition managers, sport administrators, event professionals, venue specialists, safeguarding and safety professionals, communications specialists, officials and other technical personnel.',
  },

  'project-management': {
    slug: 'project-management',
    title: 'Sport Project Development & Management',
    icon: 'Users',
    heroImage: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2000&auto=format&fit=crop',
    heroImageAlt: 'Complex sport project delivery and technical management',
    heroIntro:
      'SportLead Africa helps clients turn sport sector ideas and priorities into structured projects with clear objectives, expertise, responsibilities, implementation plans and reporting.',
    problem:
      'Good ideas often stall because the project has not been properly defined, the right specialists are not coordinated, stakeholders are working in isolation or implementation responsibility is unclear.',
    scopeOfWork: [
      'Project concept development',
      'Project scoping and structuring',
      'Stakeholder mapping and coordination',
      'Technical team assembly',
      'Implementation planning',
      'Project management support',
      'Progress monitoring and reporting',
      'Evaluation and close out',
    ],
    deliverables: [
      'Project concept note',
      'Project charter or scope',
      'Stakeholder map',
      'Implementation plan',
      'Roles and responsibility matrix',
      'Project schedule',
      'Progress reports',
      'Evaluation or close out report',
    ],
    howWeWork: [
      'Define the problem and intended outcome',
      'Structure the project and scope',
      'Identify stakeholders and required expertise',
      'Assemble the project team',
      'Coordinate implementation and reporting',
      'Evaluate progress, outcomes and lessons',
    ],
    whoThisIsFor: [
      'Government institutions',
      'Federations and associations',
      'Universities and schools',
      'Clubs and leagues',
      'Foundations and NGOs',
      'Investors and private organisations',
    ],
    expertiseWeAssemble:
      'The team may include project managers, sport administrators, technical specialists, researchers, finance professionals, monitoring and evaluation specialists, communications professionals and other experts required by the project.',
  },
};

export const SERVICE_SLUGS = Object.keys(SERVICE_DETAILS);
