# SportLead Africa — Content Drift Audit Report

This report documents all discrepancies between the authoritative content specification (`docs/CONTENT_SOURCE_OF_TRUTH.md`) and the current repository codebase.

---

## A. Verbatim string violations

| Source-of-truth ref | File path | Line | Current string in code | Required string | Diff type |
|---|---|---|---|---|---|
| §3.1 | src/components/home/Hero.tsx | 63 | `through Infrastructure, Governance, Strategy &amp; Institutional Development Across Africa.` | `Building Better Sport Systems Through Infrastructure, Governance, Strategy & Institutional Development Across Africa.` | CASING |
| §3.1 | src/components/home/Hero.tsx | 125 | `...develop effective strategies and deliver complex sport-sector projects.` | `SportLead Africa helps sport organisations plan better facilities, strengthen institutions, improve governance and administration, develop effective strategies and deliver complex sport sector projects.` | HYPHENATION |
| §3.2 | src/components/home/ServicePillars.tsx | 19 | `Our Services` | `Our Services` | MATCH |
| §3.2 | src/lib/constants.ts | 43 | `Feasibility, concept development, technical planning, rehabilitation, redevelopment and project-delivery support for pitches, courts, stadia, sport complexes and related facilities.` | `Feasibility, concept development, technical planning, rehabilitation, redevelopment and project delivery support for pitches, courts, stadia, sport complexes and related facilities.` | HYPHENATION |
| §3.2 | src/lib/constants.ts | 50 | `Structured assessment of facility condition, safety, accessibility, operations, maintenance and improvement priorities, with practical recommendations for better use and long-term value.` | `Structured assessment of facility condition, safety, accessibility, operations, maintenance and improvement priorities, with practical recommendations for better use and long term value.` | HYPHENATION |
| §3.2 | src/lib/constants.ts | 57 | `Governance reviews, policy development, administrative systems, board support, operating structures and institutional strengthening for sport organisations.` | `Governance reviews, policy development, administrative systems, board support, operating structures and institutional strengthening for sport organisations.` | MATCH |
| §3.2 | src/lib/constants.ts | 64 | `Strategic plans, organisational reviews, operating models, growth frameworks, institutional reform and long-term development plans.` | `Strategic plans, organisational reviews, operating models, growth frameworks, institutional reform and long term development plans.` | HYPHENATION |
| §3.2 | src/lib/constants.ts | 71 | `Competition design, operational planning, administration and delivery support for leagues, tournaments, championships and other organised sport events.` | `Competition design, operational planning, administration and delivery support for leagues, tournaments, championships and other organised sport events.` | MATCH |
| §3.2 | src/lib/constants.ts | 78 | `Project concept development, stakeholder coordination, technical-team assembly, implementation management, reporting and evaluation.` | `Project concept development, stakeholder coordination, technical team assembly, implementation management, reporting and evaluation.` | HYPHENATION |
| §3.3 | src/components/home/WhoWeServe.tsx | 13 | `Who We Work With` | `Who We Work With` | MATCH |
| §3.3 | src/components/home/WhoWeServe.tsx | 20 | `SportLead Africa works with the institutions, organisations and partners responsible for planning, governing, financing and delivering sport. We support clients and partners who need stronger facilities, better systems, clearer strategy and more effective project delivery.` | `SportLead Africa works with the institutions, organisations and partners responsible for planning, governing, financing and delivering sport. We support clients and partners who need stronger facilities, better systems, clearer strategy and more effective project delivery.` | MATCH |
| §3.4 | src/lib/constants.ts | 97 | `We approach assignments through the realities of sport organisations, facilities, competitions and development systems.` | `We approach assignments through the realities of sport organisations, facilities, competitions and development systems.` | MATCH |
| §3.4 | src/lib/constants.ts | 101 | `We assemble relevant specialists around the requirements of each assignment rather than forcing every project through one discipline.` | `We assemble relevant specialists around the requirements of each assignment rather than forcing every project through one discipline.` | MATCH |
| §3.4 | src/lib/constants.ts | 105 | `We begin by understanding the actual problem, constraints, risks and operating context before recommending solutions.` | `We begin by understanding the actual problem, constraints, risks and operating context before recommending solutions.` | MATCH |
| §3.4 | src/lib/constants.ts | 109 | `Our African focus does not assume African markets are identical. Each solution should respond to the specific institutional, economic, regulatory and operational context of the assignment.` | `Our African focus does not assume African markets are identical. Each solution should respond to the specific institutional, economic, regulatory and operational context of the assignment.` | MATCH |
| §3.4 | src/lib/constants.ts | 113 | `Where required, we move beyond advice to coordinate expertise, stakeholders, implementation, reporting and evaluation.` | `Where required, we move beyond advice to coordinate expertise, stakeholders, implementation, reporting and evaluation.` | MATCH |
| §3.5 | src/components/home/ClosingCTA.tsx | 18 | `Have a sport-sector challenge, facility need or institutional project to develop?` | `Have a sport sector challenge, facility need or institutional project to develop? Let us discuss the problem and determine the right next step.` | HYPHENATION |
| §4.1 | src/components/about/WhoWeAre.tsx | 20 | `SportLead Africa is a sport management, infrastructure and institutional advisory organisation focused on strengthening the systems through which sport is planned, governed, organised and delivered across Africa.` | `SportLead Africa is a sport management, infrastructure and institutional advisory organisation focused on strengthening the systems through which sport is planned, governed, organised and delivered across Africa.` | MATCH |
| §4.1 | src/components/about/WhoWeAre.tsx | 23 | `We work with sport organisations, governments, educational institutions and private sector partners to plan and improve facilities, strengthen governance and administration, develop institutional strategy, organise effective competitions and deliver complex sport sector projects.` | `We work with sport organisations, governments, educational institutions and private sector partners to plan and improve facilities, strengthen governance and administration, develop institutional strategy, organise effective competitions and deliver complex sport sector projects.` | MATCH |
| §4.2 | src/components/about/OurMandate.tsx | 17 | `Sport development depends on more than talent. It also depends on functioning institutions, appropriate infrastructure, capable administration, sound governance, effective competition systems and projects that are properly designed and delivered.` | `Sport development depends on more than talent. It also depends on functioning institutions, appropriate infrastructure, capable administration, sound governance, effective competition systems and projects that are properly designed and delivered.` | MATCH |
| §4.2 | src/components/about/OurMandate.tsx | 20 | `SportLead Africa exists to help address these institutional, operational and physical gaps. We work with clients and partners to understand what is not working, determine what is required and support the development of stronger systems for the delivery of sport.` | `SportLead Africa exists to help address these institutional, operational and physical gaps. We work with clients and partners to understand what is not working, determine what is required and support the development of stronger systems for the delivery of sport.` | MATCH |
| §4.2 | src/components/about/OurMandate.tsx | 23 | `Our African focus does not assume that African sport operates in one uniform context. Each assignment should respond to the specific institutional, economic, regulatory and operational realities in which it sits.` | `Our African focus does not assume that African sport operates in one uniform context. Each assignment should respond to the specific institutional, economic, regulatory and operational realities in which it sits.` | MATCH |
| §4.3 | src/lib/constants.ts | 120 | `Understand the current condition, system, need or opportunity.` | `Understand the current condition, system, need or opportunity.` | MATCH |
| §4.3 | src/lib/constants.ts | 125 | `Identify the underlying problems, constraints, risks and priorities.` | `Identify the underlying problems, constraints, risks and priorities.` | MATCH |
| §4.3 | src/lib/constants.ts | 130 | `Develop the appropriate strategy, solution, facility concept, operating model or project framework.` | `Develop the appropriate strategy, solution, facility concept, operating model or project framework.` | MATCH |
| §4.3 | src/lib/constants.ts | 135 | `Bring together the specialist expertise and stakeholders required for the assignment.` | `Bring together the specialist expertise and stakeholders required for the assignment.` | MATCH |
| §4.3 | src/lib/constants.ts | 140 | `Support or manage implementation with clear responsibilities and reporting.` | `Support or manage implementation with clear responsibilities and reporting.` | MATCH |
| §4.3 | src/lib/constants.ts | 145 | `Assess outcomes, identify lessons and support continuous improvement.` | `Assess outcomes, identify lessons and support continuous improvement.` | MATCH |
| §4.4 | src/components/about/Leadership.tsx | 10 | `Dr. Joshua A. Oparachukwu` | `Dr. Joshua A. Oparachukwu` | MATCH |
| §4.4 | src/components/about/Leadership.tsx | 12 | `titleLine: 'Founder, SportLead Africa | Performance Strategist | Applied Performance Scientist | Sport Administration Expert'` | `Founder, SportLead Africa │ Performance Strategist │ Applied Performance Scientist │ Sport Administration Expert` | PUNCTUATION |
| §4.4 | src/components/about/Leadership.tsx | 16 | `Dr. Joshua A. Oparachukwu is a Performance Strategist, Applied Performance Scientist and Sport Administration expert working at the intersection of human performance and the systems that shape sport. He is the Founder of SportLead Africa, where his focus is on sport management, governance, institutional development, infrastructure strategy and the development of stronger systems for the delivery of sport across Africa.` | `Dr. Joshua A. Oparachukwu is a Performance Strategist, Applied Performance Scientist and Sport Administration expert working at the intersection of human performance and the systems that shape sport. He is the Founder of SportLead Africa, where his focus is on sport management, governance, institutional development, infrastructure strategy and the development of stronger systems for the delivery of sport across Africa.` | MATCH |
| §4.4 | src/components/about/Leadership.tsx | 17 | `His academic background spans Human Kinetics, the Sociology and Psychology of Sport, Performance Psychology and Sport Administration. This combination gives his work a dual perspective: an understanding of how people perform within sport environments and how the structures, leadership systems, governance arrangements and institutions around them influence what those environments are capable of producing.` | `His academic background spans Human Kinetics, the Sociology and Psychology of Sport, Performance Psychology and Sport Administration. This combination gives his work a dual perspective: an understanding of how people perform within sport environments and how the structures, leadership systems, governance arrangements and institutions around them influence what those environments are capable of producing.` | MATCH |
| §4.4 | src/components/about/Leadership.tsx | 18 | `His work across research, teaching, consulting and sport has included performance psychology, athlete development, organisational decision making, sport governance and applied performance systems. Through SportLead Africa, he is extending this work toward the institutional questions that sit behind sustainable sport development, including how facilities are planned and improved, how organisations are governed and administered, how strategy is developed, and how multidisciplinary expertise can be coordinated around complex sport sector projects.` | `His work across research, teaching, consulting and sport has included performance psychology, athlete development, organisational decision making, sport governance and applied performance systems. Through SportLead Africa, he is extending this work toward the institutional questions that sit behind sustainable sport development, including how facilities are planned and improved, how organisations are governed and administered, how strategy is developed, and how multidisciplinary expertise can be coordinated around complex sport sector projects.` | MATCH |
| §4.4 | src/components/about/Leadership.tsx | 21 | `Dr. Oparachukwu holds a Bachelor's degree in Human Kinetics, a Master's degree in the Sociology and Psychology of Sport, a Master's degree in Sport Administration and a PhD in Performance Psychology.` | `Dr. Oparachukwu holds a Bachelor's degree in Human Kinetics, a Master's degree in the Sociology and Psychology of Sport, a Master's degree in Sport Administration and a PhD in Performance Psychology.` | MATCH |
| §4.5 | src/components/about/Leadership.tsx | 207 | `Additional leadership appointments and profiles will be published as the founding team develops.` | `Additional leadership appointments and profiles will be published as the founding team develops.` | MATCH |
| §4.6 | src/lib/constants.ts | 153 | `We work to clear professional standards in communication, conduct, documentation and delivery.` | `We work to clear professional standards in communication, conduct, documentation and delivery.` | MATCH |
| §4.6 | src/lib/constants.ts | 157 | `Recommendations should be grounded in credible information, structured assessment and defensible reasoning.` | `Recommendations should be grounded in credible information, structured assessment and defensible reasoning.` | MATCH |
| §4.6 | src/lib/constants.ts | 161 | `Responsibilities, assumptions, decisions and reporting should be clear to clients and partners.` | `Responsibilities, assumptions, decisions and reporting should be clear to clients and partners.` | MATCH |
| §4.6 | src/lib/constants.ts | 165 | `Facility, event and project decisions should treat participant, workforce and public safety as fundamental.` | `Facility, event and project decisions should treat participant, workforce and public safety as fundamental.` | MATCH |
| §4.6 | src/lib/constants.ts | 169 | `We work from the realities of each institution and market rather than assuming one African context fits another.` | `We work from the realities of each institution and market rather than assuming one African context fits another.` | MATCH |
| §4.6 | src/lib/constants.ts | 172 | `title: 'Long-Term Value'` | `Long Term Value` | HYPHENATION |
| §4.6 | src/lib/constants.ts | 173 | `We favour solutions that strengthen institutional capability and create value beyond the immediate assignment.` | `We favour solutions that strengthen institutional capability and create value beyond the immediate assignment.` | MATCH |
| §4.6 | src/lib/constants.ts | 177 | `Our work is built around African sport realities while remaining open to appropriate global standards, expertise and practice.` | `Our work is built around African sport realities while remaining open to appropriate global standards, expertise and practice.` | MATCH |
| §5 | src/app/services/page.tsx | 20 | `We provide advisory, technical and project support across the institutional, operational and physical systems through which sport is delivered.` | `We provide advisory, technical and project support across the institutional, operational and physical systems through which sport is delivered.` | MATCH |
| §6.1 | src/lib/service-details.ts | 24 | `SportLead Africa supports the planning, improvement and delivery of sport facilities from early concept through implementation support. We help clients determine what is needed, what is feasible and how the facility should respond to sporting, operational and long term institutional requirements.` | `SportLead Africa supports the planning, improvement and delivery of sport facilities from early concept through implementation support. We help clients determine what is needed, what is feasible and how the facility should respond to sporting, operational and long term institutional requirements.` | MATCH |
| §6.1 | src/lib/service-details.ts | 26 | `Sport facilities can fail long before construction begins. Poor needs assessment, weak planning, inappropriate specifications, unclear operating assumptions and fragmented technical coordination can produce facilities that are expensive to build but difficult to use, maintain or sustain.` | `Sport facilities can fail long before construction begins. Poor needs assessment, weak planning, inappropriate specifications, unclear operating assumptions and fragmented technical coordination can produce facilities that are expensive to build but difficult to use, maintain or sustain.` | MATCH |
| §6.2 | src/lib/service-details.ts | 74 | `SportLead Africa assesses existing sport facilities to identify physical, safety, accessibility, operational and maintenance issues and to establish practical priorities for improvement.` | `SportLead Africa assesses existing sport facilities to identify physical, safety, accessibility, operational and maintenance issues and to establish practical priorities for improvement.` | MATCH |
| §6.2 | src/lib/service-details.ts | 76 | `Many sport facilities remain in use without a clear understanding of their current condition, risks, operating weaknesses or improvement priorities. This can reduce safety, user experience, sporting value and the long term usefulness of the asset.` | `Many sport facilities remain in use without a clear understanding of their current condition, risks, operating weaknesses or improvement priorities. This can reduce safety, user experience, sporting value and the long term usefulness of the asset.` | MATCH |
| §6.3 | src/lib/service-details.ts | 124 | `SportLead Africa helps sport organisations strengthen the structures, policies, decision systems and administrative processes through which they operate.` | `SportLead Africa helps sport organisations strengthen the structures, policies, decision systems and administrative processes through which they operate.` | MATCH |
| §6.3 | src/lib/service-details.ts | 126 | `Sport organisations can have committed people and significant activity while still being held back by unclear responsibilities, weak policies, inconsistent administration, poor decision rights and systems that depend too heavily on individuals rather than institutions.` | `Sport organisations can have committed people and significant activity while still being held back by unclear responsibilities, weak policies, inconsistent administration, poor decision rights and systems that depend too heavily on individuals rather than institutions.` | MATCH |
| §6.4 | src/lib/service-details.ts | 174 | `SportLead Africa helps sport organisations clarify direction, strengthen operating models and build practical plans for institutional growth and long term development.` | `SportLead Africa helps sport organisations clarify direction, strengthen operating models and build practical plans for institutional growth and long term development.` | MATCH |
| §6.4 | src/lib/service-details.ts | 176 | `Strategy becomes weak when it is disconnected from institutional capacity, operating reality and clear implementation responsibility. Organisations may know what they want to become without having a workable path for getting there.` | `Strategy becomes weak when it is disconnected from institutional capacity, operating reality and clear implementation responsibility. Organisations may know what they want to become without having a workable path for getting there.` | MATCH |
| §6.5 | src/lib/service-details.ts | 224 | `SportLead Africa supports the design, planning, administration and delivery of sport competitions and events with attention to sporting integrity, operations, participant experience and institutional objectives.` | `SportLead Africa supports the design, planning, administration and delivery of sport competitions and events with attention to sporting integrity, operations, participant experience and institutional objectives.` | MATCH |
| §6.5 | src/lib/service-details.ts | 226 | `Competitions can be undermined by weak formats, unclear regulations, poor scheduling, fragmented responsibilities, inadequate operational planning and inconsistent communication. Good competition management requires more than event day execution.` | `Competitions can be undermined by weak formats, unclear regulations, poor scheduling, fragmented responsibilities, inadequate operational planning and inconsistent communication. Good competition management requires more than event day execution.` | MATCH |
| §6.6 | src/lib/service-details.ts | 274 | `SportLead Africa helps clients turn sport sector ideas and priorities into structured projects with clear objectives, expertise, responsibilities, implementation plans and reporting.` | `SportLead Africa helps clients turn sport sector ideas and priorities into structured projects with clear objectives, expertise, responsibilities, implementation plans and reporting.` | MATCH |
| §6.6 | src/lib/service-details.ts | 276 | `Good ideas often stall because the project has not been properly defined, the right specialists are not coordinated, stakeholders are working in isolation or implementation responsibility is unclear.` | `Good ideas often stall because the project has not been properly defined, the right specialists are not coordinated, stakeholders are working in isolation or implementation responsibility is unclear.` | MATCH |
| §7 | src/app/expert-network/page.tsx | 28 | `Expert Network` | `SportLead Africa Expert Network` | TRUNCATED |
| §7 | src/app/expert-network/page.tsx | 32 | `Our Expert Network brings together qualified specialists across the disciplines required to plan, strengthen and deliver sport sector projects. Experts are engaged according to the needs of each assignment, allowing SportLead Africa to assemble multidisciplinary teams around specific institutional, infrastructure and project challenges.` | `Our Expert Network brings together qualified specialists across the disciplines required to plan, strengthen and deliver sport sector projects. Experts are engaged according to the needs of each assignment, allowing SportLead Africa to assemble multidisciplinary teams around specific institutional, infrastructure and project challenges.` | MATCH |
| §7 | src/app/expert-network/page.tsx | 46 | `The network is currently being developed. Approved expert profiles will be added as specialists complete our review and onboarding process.` | `The network is currently being developed. Approved expert profiles will be added as specialists complete our review and onboarding process.` | MATCH |
| §7.2 | src/app/expert-network/page.tsx | 110 | `Are you a qualified professional whose expertise can contribute to stronger sport systems, facilities, institutions or projects across Africa? Apply to join the SportLead Africa Expert Network.` | `Are you a qualified professional whose expertise can contribute to stronger sport systems, facilities, institutions or projects across Africa? Apply to join the SportLead Africa Expert Network.` | MATCH |
| §8 | src/app/insights/page.tsx | 59 | `SportLead Africa Insights is in development. This section will publish original sector assessments, practical analysis, research, reports and evidence on the institutions, infrastructure and systems shaping African sport.` | `SportLead Africa Insights is in development.` | EXTRA-TEXT |
| §8 | src/app/insights/page.tsx | 59 | `This section will publish original sector assessments, practical analysis, research, reports and evidence on the institutions, infrastructure and systems shaping African sport.` | `This section will publish original sector assessments, practical analysis, research and reports on the institutions, infrastructure and systems shaping African sport.` | EXTRA-TEXT |
| §8 | src/app/insights/page.tsx | 62 | `Our first publications will be added as SportLead Africa's research and sector assessment work develops.` | `Our first publications will be added as SportLead Africa's research and sector assessment work develops.` | MATCH |
| §9 | src/app/partner-with-us/page.tsx | 35 | `Partner With SportLead Africa` | `Partner With SportLead Africa` | MATCH |
| §9 | src/app/partner-with-us/page.tsx | 39 | `SportLead Africa works with organisations, funders, technical professionals and institutions that want to develop stronger sport facilities, systems and projects. Choose the route that best describes the conversation you want to start.` | `SportLead Africa works with organisations, funders, technical professionals and institutions that want to develop stronger sport facilities, systems and projects. Choose the route that best describes the conversation you want to start.` | MATCH |
| §9.1 | src/lib/constants.ts | 246 | `For organisations that need a facility audit, advisory engagement, infrastructure assignment, governance or strategy work, competition/event management, or broader sport-project support.` | `For organisations that need a facility audit, advisory engagement, infrastructure assignment, governance or strategy work, competition management or broader sport project support.` | HYPHENATION |
| §9.2 | src/lib/constants.ts | 252 | `For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport-facility or infrastructure project.` | `For companies, foundations, philanthropists, investors and other funders interested in supporting a defined sport facility or infrastructure project.` | HYPHENATION |
| §9.3 | src/lib/constants.ts | 258 | `For qualified individual specialists, technical firms and professional organisations interested in contributing to SportLead Africa project teams.` | `For qualified individual specialists and technical professionals interested in contributing to SportLead Africa project teams.` | REWORDED |
| §9.4 | src/lib/constants.ts | 264 | `For universities, associations, federations, government bodies, NGOs, professional bodies and other institutions interested in longer-term collaboration.` | `For universities, associations, federations, government institutions, NGOs, professional bodies and other organisations interested in longer term collaboration with SportLead Africa.` | REWORDED |
| §10 | src/app/discuss-a-project/page.tsx | 17 | `Discuss a Project` | `Discuss a Project` | MATCH |
| §10 | src/app/discuss-a-project/page.tsx | 18 | `Tell us what you are trying to develop, improve or solve. We will review the information and determine the most appropriate next conversation.` | `Tell us what you are trying to develop, improve or solve. We will review the information and determine the most appropriate next conversation.` | MATCH |
| §11 | src/app/contact/page.tsx | 18 | `Contact Us` | `Contact SportLead Africa` | REWORDED |
| §11 | src/app/contact/page.tsx | 19 | `Reach our advisory practice directly for exploratory discussions, project inquiries, or partnership evaluations.` | `Contact us for general enquiries, service questions or to be directed to the appropriate project or partnership pathway.` | REWORDED |
| §12 | src/components/layout/Footer.tsx | 30 | `Building Better Sport Systems Across Africa.` | `Building Better Sport Systems Across Africa.` | MATCH |
| §10 | src/components/forms/ProjectInquiryForm.tsx | 603 | `Submit Mandate Brief` | `Submit Project Enquiry` | REWORDED |

---

## B. Fabricated or unverifiable content

The authoritative specification explicitly establishes that there are **zero approved statistics**, **zero publishable projects/case studies**, **zero approved client logos/testimonials**, and **zero external awards/fellowships** for this website. Any numeric claim, counter, or credential embellishment not in `docs/CONTENT_SOURCE_OF_TRUTH.md` is a violation.

| Item Type | File Path | Line | Unverifiable / Fabricated String | SOT Reference & Violation Context |
|---|---|---|---|---|
| Statistic / Counter | src/components/home/Hero.tsx | 8 | `{ value: "15+", label: "Countries" }` | §1, §3.1: Zero approved statistics. Fabricated geographic footprint counter. |
| Statistic / Counter | src/components/home/Hero.tsx | 9 | `{ value: "50+", label: "Projects" }` | §1, §3.1: Zero approved statistics. Fabricated project delivery count. |
| Statistic / Counter | src/components/home/Hero.tsx | 10 | `{ value: "10", label: "Years" }` | §1, §3.1: Zero approved statistics. Fabricated years-in-business counter. |
| Credential / Title | src/components/about/Leadership.tsx | 11 | `role: 'Founder & Principal Consultant'` | §4.4: Embellished role title. SOT defines title segments strictly as "Founder, SportLead Africa │ Performance Strategist │ Applied Performance Scientist │ Sport Administration Expert". |
| Credential / Registration | src/components/about/Leadership.tsx | 33 | `'Postgraduate Fellow in Sport Administration'` | §4.4: Fabricated fellowship credential. SOT explicit rule: "Postgraduate study in Sport Administration — in progress, not completed. Do not add fellowship titles, awards, years of experience, publication counts or professional memberships not listed here." |
| Metric / SLA Claim | src/lib/email.ts | 158 | `Our senior practice leadership conducts technical reviews within <strong>48 hours</strong>.` | §1, §10: Fabricated SLA / turnaround commitment. Unverifiable commercial response timeframe not in SOT. |
| Email Contact Fact | src/lib/constants.ts | 5 | `export const SITE_EMAIL = 'info@sportleadafrica.com';` | §1: Incorrect global contact email. Canonical email is `inquiries@sportleadafrica.com`. |

---

## C. American spellings

All copy must strictly adhere to British English (e.g. `-ise`, `-yse`, `programme`, `licence` as noun).

| File Path | Line | Found American String | Correct British Form | Context / Excerpt |
|---|---|---|---|---|
| src/components/forms/ProjectInquiryForm.tsx | 572 | `authorize` | `authorise` | `label="I confirm the accuracy of this brief and authorize SportLead Africa to review our project data..."` |
| src/app/terms/page.tsx | 67 | `authorization` | `authorisation` | `"...without explicit written authorization."` |
| src/app/layout.tsx | 21 | `en_US` | `en_GB` | `openGraph: { locale: 'en_US' }` (British English locale required) |

*Note on code tokens:* Browser DOM API properties such as `window.scrollTo({ behavior: 'smooth' })` (`ProjectInquiryForm.tsx:151`, `ExpertApplicationForm.tsx:235, 241`) and internal code variables (`MAX_SIZE` in `src/lib/storage.ts`) use standard API identifiers and do not affect user-facing copy.

---

## D. Placeholder and dead content

| Type | File Path | Line | Dead / Placeholder Content | Remediation Required |
|---|---|---|---|---|
| Placeholder Tooltip | src/components/about/Leadership.tsx | 100 | `title={profile.linkedin === '#' ? 'LinkedIn profile forthcoming' : 'View LinkedIn Profile'}` | Remove "LinkedIn profile forthcoming" placeholder string. Hide social links completely until official URLs exist (§1). |
| Dead / Dummy Anchor | src/components/about/Leadership.tsx | 97-98 | `profile.linkedin === '#'` | Social media URLs must be hidden if not supplied. Never render `#` anchors (§1, §4.4). |
| Dead / Dummy Anchor | src/app/expert-network/[expertId]/page.tsx | 186-187 | `expert.linkedin === '#'` | Never render dummy `#` anchor links for expert profiles (§1, §7.1). |
| Dead Submenu Link | src/lib/constants.ts | 31 | `href: '/partner-with-us#fund'` | Replace dummy anchor with dedicated route once built. |
| Dead Submenu Link | src/lib/constants.ts | 32 | `href: '/partner-with-us#expert-network'` | Route directly to `/expert-network/apply`. |
| Dead Submenu Link | src/lib/constants.ts | 33 | `href: '/partner-with-us#institutional'` | Replace dummy anchor with dedicated route once built. |
| Dead Route Fallback | src/lib/constants.ts | 253 | `href: '/contact'` (Fund a Facility Project) | Fallback dead-ends into general contact form instead of dedicated pathway. |
| Dead Route Fallback | src/lib/constants.ts | 259 | `href: '/contact'` (Join Our Expert Network) | Fallback points to general contact instead of `/expert-network/apply`. |
| Dead Route Fallback | src/lib/constants.ts | 265 | `href: '/contact'` (Institutional Partnerships) | Fallback dead-ends into general contact form instead of dedicated pathway. |

---

## E. Routing gaps

### 1. Six Services

| Service | Expected Destination | Actual Destination in Code | Status |
|---|---|---|---|
| Sport Infrastructure Planning & Development | `/services/infrastructure` | `/services/infrastructure` | PASS |
| Sport Facility Auditing & Improvement | `/services/auditing` | `/services/auditing` | PASS |
| Sport Governance & Administration | `/services/governance` | `/services/governance` | PASS |
| Strategy & Institutional Development | `/services/strategy` | `/services/strategy` | PASS |
| Competition & Event Management | `/services/competitions` | `/services/competitions` | PASS |
| Sport Project Development & Management | `/services/project-management` | `/services/project-management` | PASS |

### 2. Four Partner With Us Routes

| Partner Route | Expected Destination | Actual Destination in Code | Status |
|---|---|---|---|
| 1. Commission a Project (§9.1) | Dedicated project enquiry form (`/discuss-a-project`) | `/discuss-a-project` | PASS |
| 2. Fund a Facility Project (§9.2) | Dedicated Facility Funding form / page | `/contact?subject=Fund+a+Facility+Project` (in `PartnerWithUsPage`), `/partner-with-us#fund` (in `NAV_ITEMS`), `/contact` (in `PARTNER_ROUTES`) | FAIL |
| 3. Join Our Expert Network (§9.3) | Dedicated expert application form (`/expert-network/apply`) | `/expert-network/apply` (in `PartnerWithUsPage`), `/partner-with-us#expert-network` (in `NAV_ITEMS`), `/contact` (in `PARTNER_ROUTES`) | FAIL (in Nav / Constants) / PASS (in Page) |
| 4. Institutional Partnerships (§9.4) | Dedicated Institutional Partnerships form / page | `/contact?subject=Institutional+Partnership` (in `PartnerWithUsPage`), `/partner-with-us#institutional` (in `NAV_ITEMS`), `/contact` (in `PARTNER_ROUTES`) | FAIL |

### 3. CTA Button Labels & Destinations

| CTA Button Label (Source of Truth) | SOT Ref | Expected Destination | Actual Destination in Code | Actual Button Label in Code | Status |
|---|---|---|---|---|---|
| **Discuss a Project** | §3.1 | `/discuss-a-project` | `/discuss-a-project` | "Discuss a Project" | PASS |
| **Explore Our Services** | §3.1 | `/services` | `/services` | "Explore Services" | FAIL (Label missing "Our") |
| **Explore Service** | §3.2 | `/services/[slug]` | `/services/[slug]` | "Explore Service" | PASS |
| **Discuss a Project** | §3.5 | `/discuss-a-project` | `/discuss-a-project` | "Discuss a Project" | PASS |
| **Explore Service** / **Learn More** | §5 | `/services/[slug]` | `/services/${service.id}` | "Learn more" | PASS |
| **Discuss This Service** | §6 | `/discuss-a-project?service=[slug]` | `/discuss-a-project?service=${service.slug}` | "Discuss This Service" | PASS |
| **Apply to Join the Expert Network** | §7.2 | `/expert-network/apply` | `/expert-network/apply` | "Apply to Join the Network" | FAIL (Label missing "Expert") |
| **Discuss a Project** | §9.1 | `/discuss-a-project` | `/discuss-a-project` | "Discuss a Project" | PASS |
| **Discuss Facility Funding** | §9.2 | Dedicated Facility Funding Form | `/contact?subject=Fund+a+Facility+Project` | "Contact Us" | FAIL (Wrong label & routing) |
| **Apply to Join** | §9.3 | `/expert-network/apply` | `/expert-network/apply` | "Apply to Join" | PASS |
| **Discuss an Institutional Partnership** | §9.4 | Dedicated Institutional Partnership Form | `/contact?subject=Institutional+Partnership` | "Explore Partnerships" | FAIL (Wrong label & routing) |
| **Submit Project Enquiry** | §10 | Form Submit Action | Form Submit Action | "Submit Mandate Brief" | FAIL (Wrong submit label) |

---

## F. Structural gaps

| Required Feature / Architecture | Current Status in Codebase | Detail & Code References |
|---|---|---|
| **Services nav dropdown** | **IMPLEMENTED** | Implemented on desktop in `src/components/layout/Header.tsx:86-103` and mobile in `src/components/layout/MobileNav.tsx:88-101` via `NAV_ITEMS` children. |
| **Partner With Us nav dropdown** | **PARTIAL / DEFICIENT** | Submenu exists in `Header.tsx` and `MobileNav.tsx`, but links use fragment hashes (`#fund`, `#expert-network`, `#institutional`) rather than functional dedicated destination routes. |
| **Fund a Facility Project form + API route** | **MISSING** | No dedicated form component, no dedicated page route, and no dedicated API endpoint (`src/app/api/facility-funding/route.ts`). Currently dumps users into `/contact` with a query string. Field requirements specified in §9.2 (11 fields including indicative funding range, partnership model, document upload) are completely unimplemented. |
| **Institutional Partnership form + API route** | **MISSING** | No dedicated form component, no dedicated page route, and no dedicated API endpoint (`src/app/api/institutional-partnerships/route.ts`). Currently dumps users into `/contact`. Field requirements specified in §9.4 (10 fields including institution type, collaboration area, proposed objectives, document upload) are completely unimplemented. |
| **Hidden Projects data model** | **MISSING** | No TypeScript interface or CMS schema defined in `src/types/index.ts` or `src/lib/` for projects. §14 requires a structured hidden model containing: `title`, `client`, `location`, `service category`, `problem/brief`, `scope`, `disciplines involved`, `images`, `outputs`, `outcomes`, `project status`, `dates`, `case-study narrative`. |
| **Insights category data model & public leakage** | **DEFICIENT / VIOLATION** | 1. CMS/data layer lacks full publication models (articles, reports, downloadable PDFs, featured research).<br>2. §8 explicitly dictates: *"empty categories are **not displayed publicly**"*. However, `src/app/insights/page.tsx:86-99` publicly renders empty category tags in production. |
| **Analytics integration** | **MISSING** | §13 requires analytics installed with CTA tracking and successful form submissions tracked. No analytics scripts (e.g. Google Analytics / Plausible / PostHog) or event dispatch hooks exist in `src/app/layout.tsx` or form components. |
| **Per-page metadata & canonical URLs** | **PARTIAL / DEFICIENT** | 1. `src/app/page.tsx` has no metadata export.<br>2. `src/app/layout.tsx:14, 18, 27` contains hyphenation errors (`sport-sector`) and US locale (`en_US` instead of `en_GB`).<br>3. Canonical URL definitions (`alternates.canonical`) and OpenGraph sharing images are absent across all routes. |
| **Service pre-selection on project form** | **IMPLEMENTED WITH GAPS** | Pre-selection via URL search param `?service=...` is implemented in `src/components/forms/ProjectInquiryForm.tsx:76-91`. However:<br>1. SOT requires `Service required` options to strictly match the six services in §3.2; codebase includes an extra `"Multiple / Not Sure"` option.<br>2. Project form is missing the required **Preferred contact method** and **Relevant document upload** fields (§10).<br>3. Submit button is labeled "Submit Mandate Brief" instead of **"Submit Project Enquiry"**. |


## G. Service Detailed Lists Audit (§6.1 – §6.6)

Audit of all 168 list items (8 Scope of Work, 8 Typical Deliverables, 6 How We Work, 6 Who This Is For per service) and 6 Expertise paragraphs across the six practice areas in `src/lib/service-details.ts` against `docs/CONTENT_SOURCE_OF_TRUTH.md` §6.1 – §6.6.

| Service Name | Section Name | Index / Step | Code Value | Required Value (SOT) | Status |
|---|---|:---:|---|---|:---:|
| Sport Infrastructure Planning & Development | Scope of Work | 1 | Needs assessment and project definition | Needs assessment and project definition | **MATCH** |
| Sport Infrastructure Planning & Development | Scope of Work | 2 | Feasibility and early concept development | Feasibility and early concept development | **MATCH** |
| Sport Infrastructure Planning & Development | Scope of Work | 3 | Site and facility planning support | Site and facility planning support | **MATCH** |
| Sport Infrastructure Planning & Development | Scope of Work | 4 | Technical brief development | Technical brief development | **MATCH** |
| Sport Infrastructure Planning & Development | Scope of Work | 5 | Rehabilitation and redevelopment planning | Rehabilitation and redevelopment planning | **MATCH** |
| Sport Infrastructure Planning & Development | Scope of Work | 6 | Stakeholder and specialist coordination | Stakeholder and specialist coordination | **MATCH** |
| Sport Infrastructure Planning & Development | Scope of Work | 7 | Project delivery and implementation support | Project delivery and implementation support | **MATCH** |
| Sport Infrastructure Planning & Development | Scope of Work | 8 | Operational and long term use considerations | Operational and long term use considerations | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 1 | Facility needs assessment | Facility needs assessment | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 2 | Feasibility or concept report | Feasibility or concept report | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 3 | Project brief and scope | Project brief and scope | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 4 | Facility development or improvement roadmap | Facility development or improvement roadmap | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 5 | Technical coordination framework | Technical coordination framework | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 6 | Implementation plan | Implementation plan | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 7 | Stakeholder consultation summary | Stakeholder consultation summary | **MATCH** |
| Sport Infrastructure Planning & Development | Typical Deliverables | 8 | Project monitoring and reporting framework | Project monitoring and reporting framework | **MATCH** |
| Sport Infrastructure Planning & Development | How We Work | 1 | Understand the sporting and institutional need | Understand the sporting and institutional need | **MATCH** |
| Sport Infrastructure Planning & Development | How We Work | 2 | Assess the site, existing conditions and project constraints | Assess the site, existing conditions and project constraints | **MATCH** |
| Sport Infrastructure Planning & Development | How We Work | 3 | Define the facility brief and intended use | Define the facility brief and intended use | **MATCH** |
| Sport Infrastructure Planning & Development | How We Work | 4 | Assemble the required technical expertise | Assemble the required technical expertise | **MATCH** |
| Sport Infrastructure Planning & Development | How We Work | 5 | Coordinate planning and project development | Coordinate planning and project development | **MATCH** |
| Sport Infrastructure Planning & Development | How We Work | 6 | Support implementation, monitoring and review | Support implementation, monitoring and review | **MATCH** |
| Sport Infrastructure Planning & Development | Who This Is For | 1 | Clubs and academies | Clubs and academies | **MATCH** |
| Sport Infrastructure Planning & Development | Who This Is For | 2 | Schools and universities | Schools and universities | **MATCH** |
| Sport Infrastructure Planning & Development | Who This Is For | 3 | Government institutions | Government institutions | **MATCH** |
| Sport Infrastructure Planning & Development | Who This Is For | 4 | Federations and associations | Federations and associations | **MATCH** |
| Sport Infrastructure Planning & Development | Who This Is For | 5 | Private facility owners and developers | Private facility owners and developers | **MATCH** |
| Sport Infrastructure Planning & Development | Who This Is For | 6 | Foundations, funders and investors | Foundations, funders and investors | **MATCH** |
| Sport Infrastructure Planning & Development | Expertise We May Assemble | 1 | Depending on the assignment, the project team may include architects, engineers, quantity surveyors, facility specialists, sport administrators, project managers, safety professionals and other relevant technical experts. | Depending on the assignment, the project team may include architects, engineers, quantity surveyors, facility specialists, sport administrators, project managers, safety professionals and other relevant technical experts. | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 1 | Physical condition review | Physical condition review | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 2 | Safety and risk observations | Safety and risk observations | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 3 | Accessibility review | Accessibility review | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 4 | Sporting functionality assessment | Sporting functionality assessment | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 5 | Operations and maintenance review | Operations and maintenance review | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 6 | User flow and facility use assessment | User flow and facility use assessment | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 7 | Improvement prioritisation | Improvement prioritisation | **MATCH** |
| Sport Facility Auditing & Improvement | Scope of Work | 8 | Rehabilitation and upgrade planning | Rehabilitation and upgrade planning | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 1 | Facility audit report | Facility audit report | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 2 | Condition and risk register | Condition and risk register | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 3 | Priority improvement schedule | Priority improvement schedule | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 4 | Maintenance recommendations | Maintenance recommendations | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 5 | Accessibility observations | Accessibility observations | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 6 | Operational improvement recommendations | Operational improvement recommendations | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 7 | Phased rehabilitation roadmap | Phased rehabilitation roadmap | **MATCH** |
| Sport Facility Auditing & Improvement | Typical Deliverables | 8 | Indicative action plan | Indicative action plan | **MATCH** |
| Sport Facility Auditing & Improvement | How We Work | 1 | Define the purpose and scope of the audit | Define the purpose and scope of the audit | **MATCH** |
| Sport Facility Auditing & Improvement | How We Work | 2 | Review available facility information | Review available facility information | **MATCH** |
| Sport Facility Auditing & Improvement | How We Work | 3 | Conduct site assessment | Conduct site assessment | **MATCH** |
| Sport Facility Auditing & Improvement | How We Work | 4 | Document findings and priority issues | Document findings and priority issues | **MATCH** |
| Sport Facility Auditing & Improvement | How We Work | 5 | Develop practical improvement recommendations | Develop practical improvement recommendations | **MATCH** |
| Sport Facility Auditing & Improvement | How We Work | 6 | Present priorities and next steps | Present priorities and next steps | **MATCH** |
| Sport Facility Auditing & Improvement | Who This Is For | 1 | Schools and universities | Schools and universities | **MATCH** |
| Sport Facility Auditing & Improvement | Who This Is For | 2 | Clubs and academies | Clubs and academies | **MATCH** |
| Sport Facility Auditing & Improvement | Who This Is For | 3 | Government facility owners | Government facility owners | **MATCH** |
| Sport Facility Auditing & Improvement | Who This Is For | 4 | Private sport facility operators | Private sport facility operators | **MATCH** |
| Sport Facility Auditing & Improvement | Who This Is For | 5 | Associations and federations | Associations and federations | **MATCH** |
| Sport Facility Auditing & Improvement | Who This Is For | 6 | Funders considering facility improvement | Funders considering facility improvement | **MATCH** |
| Sport Facility Auditing & Improvement | Expertise We May Assemble | 1 | Assignments may require facility auditors, architects, engineers, safety specialists, accessibility professionals, operations specialists, sport administrators and project managers. | Assignments may require facility auditors, architects, engineers, safety specialists, accessibility professionals, operations specialists, sport administrators and project managers. | **MATCH** |
| Sport Governance & Administration | Scope of Work | 1 | Governance reviews | Governance reviews | **MATCH** |
| Sport Governance & Administration | Scope of Work | 2 | Board and committee structure review | Board and committee structure review | **MATCH** |
| Sport Governance & Administration | Scope of Work | 3 | Policy development and review | Policy development and review | **MATCH** |
| Sport Governance & Administration | Scope of Work | 4 | Administrative systems and workflows | Administrative systems and workflows | **MATCH** |
| Sport Governance & Administration | Scope of Work | 5 | Roles, responsibilities and decision rights | Roles, responsibilities and decision rights | **MATCH** |
| Sport Governance & Administration | Scope of Work | 6 | Operating procedures | Operating procedures | **MATCH** |
| Sport Governance & Administration | Scope of Work | 7 | Institutional documentation | Institutional documentation | **MATCH** |
| Sport Governance & Administration | Scope of Work | 8 | Governance and administrative strengthening | Governance and administrative strengthening | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 1 | Governance review report | Governance review report | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 2 | Governance framework | Governance framework | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 3 | Policy suite or policy recommendations | Policy suite or policy recommendations | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 4 | Board and committee terms of reference | Board and committee terms of reference | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 5 | Decision rights framework | Decision rights framework | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 6 | Administrative process maps | Administrative process maps | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 7 | Standard operating procedures | Standard operating procedures | **MATCH** |
| Sport Governance & Administration | Typical Deliverables | 8 | Institutional strengthening plan | Institutional strengthening plan | **MATCH** |
| Sport Governance & Administration | How We Work | 1 | Understand the organisation and its current operating structure | Understand the organisation and its current operating structure | **MATCH** |
| Sport Governance & Administration | How We Work | 2 | Review relevant policies, documents and decision processes | Review relevant policies, documents and decision processes | **MATCH** |
| Sport Governance & Administration | How We Work | 3 | Identify governance and administrative gaps | Identify governance and administrative gaps | **MATCH** |
| Sport Governance & Administration | How We Work | 4 | Develop practical structures and documentation | Develop practical structures and documentation | **MATCH** |
| Sport Governance & Administration | How We Work | 5 | Support adoption and implementation | Support adoption and implementation | **MATCH** |
| Sport Governance & Administration | How We Work | 6 | Review how the new systems are working | Review how the new systems are working | **MATCH** |
| Sport Governance & Administration | Who This Is For | 1 | Clubs and leagues | Clubs and leagues | **MATCH** |
| Sport Governance & Administration | Who This Is For | 2 | Associations and federations | Associations and federations | **MATCH** |
| Sport Governance & Administration | Who This Is For | 3 | Academies | Academies | **MATCH** |
| Sport Governance & Administration | Who This Is For | 4 | Schools and universities | Schools and universities | **MATCH** |
| Sport Governance & Administration | Who This Is For | 5 | Sport NGOs and development organisations | Sport NGOs and development organisations | **MATCH** |
| Sport Governance & Administration | Who This Is For | 6 | Public sport institutions | Public sport institutions | **MATCH** |
| Sport Governance & Administration | Expertise We May Assemble | 1 | Assignments may involve sport administrators, governance specialists, legal professionals where required, policy specialists, organisational development practitioners and other relevant experts. | Assignments may involve sport administrators, governance specialists, legal professionals where required, policy specialists, organisational development practitioners and other relevant experts. | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 1 | Strategic planning | Strategic planning | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 2 | Organisational review | Organisational review | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 3 | Operating model development | Operating model development | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 4 | Institutional growth planning | Institutional growth planning | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 5 | Reform and restructuring support | Reform and restructuring support | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 6 | Programme and portfolio prioritisation | Programme and portfolio prioritisation | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 7 | Implementation planning | Implementation planning | **MATCH** |
| Strategy & Institutional Development | Scope of Work | 8 | Monitoring and review frameworks | Monitoring and review frameworks | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 1 | Strategic plan | Strategic plan | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 2 | Organisational diagnostic | Organisational diagnostic | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 3 | Operating model | Operating model | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 4 | Growth or reform roadmap | Growth or reform roadmap | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 5 | Priority action plan | Priority action plan | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 6 | Implementation framework | Implementation framework | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 7 | Performance and monitoring framework | Performance and monitoring framework | **MATCH** |
| Strategy & Institutional Development | Typical Deliverables | 8 | Institutional development plan | Institutional development plan | **MATCH** |
| Strategy & Institutional Development | How We Work | 1 | Establish the current position and desired future state | Establish the current position and desired future state | **MATCH** |
| Strategy & Institutional Development | How We Work | 2 | Assess institutional capacity and constraints | Assess institutional capacity and constraints | **MATCH** |
| Strategy & Institutional Development | How We Work | 3 | Identify strategic choices and priorities | Identify strategic choices and priorities | **MATCH** |
| Strategy & Institutional Development | How We Work | 4 | Design the operating and implementation model | Design the operating and implementation model | **MATCH** |
| Strategy & Institutional Development | How We Work | 5 | Assign responsibilities, milestones and measures | Assign responsibilities, milestones and measures | **MATCH** |
| Strategy & Institutional Development | How We Work | 6 | Support implementation and periodic review | Support implementation and periodic review | **MATCH** |
| Strategy & Institutional Development | Who This Is For | 1 | Federations and associations | Federations and associations | **MATCH** |
| Strategy & Institutional Development | Who This Is For | 2 | Clubs and leagues | Clubs and leagues | **MATCH** |
| Strategy & Institutional Development | Who This Is For | 3 | Schools and universities | Schools and universities | **MATCH** |
| Strategy & Institutional Development | Who This Is For | 4 | Government agencies | Government agencies | **MATCH** |
| Strategy & Institutional Development | Who This Is For | 5 | Sport development organisations | Sport development organisations | **MATCH** |
| Strategy & Institutional Development | Who This Is For | 6 | Private sport organisations and investors | Private sport organisations and investors | **MATCH** |
| Strategy & Institutional Development | Expertise We May Assemble | 1 | Depending on the assignment, we may assemble strategy professionals, sport administrators, organisational development specialists, researchers, finance professionals, governance specialists and subject matter experts. | Depending on the assignment, we may assemble strategy professionals, sport administrators, organisational development specialists, researchers, finance professionals, governance specialists and subject matter experts. | **MATCH** |
| Competition & Event Management | Scope of Work | 1 | Competition concept and format design | Competition concept and format design | **MATCH** |
| Competition & Event Management | Scope of Work | 2 | Rules and competition regulations support | Rules and competition regulations support | **MATCH** |
| Competition & Event Management | Scope of Work | 3 | Scheduling and operational planning | Scheduling and operational planning | **MATCH** |
| Competition & Event Management | Scope of Work | 4 | Venue and facility coordination | Venue and facility coordination | **MATCH** |
| Competition & Event Management | Scope of Work | 5 | Participant and stakeholder coordination | Participant and stakeholder coordination | **MATCH** |
| Competition & Event Management | Scope of Work | 6 | Competition administration | Competition administration | **MATCH** |
| Competition & Event Management | Scope of Work | 7 | Event delivery planning | Event delivery planning | **MATCH** |
| Competition & Event Management | Scope of Work | 8 | Post event review and reporting | Post event review and reporting | **MATCH** |
| Competition & Event Management | Typical Deliverables | 1 | Competition framework | Competition framework | **MATCH** |
| Competition & Event Management | Typical Deliverables | 2 | Competition regulations or operational handbook | Competition regulations or operational handbook | **MATCH** |
| Competition & Event Management | Typical Deliverables | 3 | Schedule and delivery plan | Schedule and delivery plan | **MATCH** |
| Competition & Event Management | Typical Deliverables | 4 | Roles and responsibility matrix | Roles and responsibility matrix | **MATCH** |
| Competition & Event Management | Typical Deliverables | 5 | Venue and logistics plan | Venue and logistics plan | **MATCH** |
| Competition & Event Management | Typical Deliverables | 6 | Stakeholder communication plan | Stakeholder communication plan | **MATCH** |
| Competition & Event Management | Typical Deliverables | 7 | Risk and issue register | Risk and issue register | **MATCH** |
| Competition & Event Management | Typical Deliverables | 8 | Post event report | Post event report | **MATCH** |
| Competition & Event Management | How We Work | 1 | Clarify the purpose, participants and competition model | Clarify the purpose, participants and competition model | **MATCH** |
| Competition & Event Management | How We Work | 2 | Design the format and operating framework | Design the format and operating framework | **MATCH** |
| Competition & Event Management | How We Work | 3 | Develop regulations, schedules and responsibilities | Develop regulations, schedules and responsibilities | **MATCH** |
| Competition & Event Management | How We Work | 4 | Coordinate venues, stakeholders and delivery teams | Coordinate venues, stakeholders and delivery teams | **MATCH** |
| Competition & Event Management | How We Work | 5 | Support competition delivery | Support competition delivery | **MATCH** |
| Competition & Event Management | How We Work | 6 | Review outcomes and lessons | Review outcomes and lessons | **MATCH** |
| Competition & Event Management | Who This Is For | 1 | Leagues and clubs | Leagues and clubs | **MATCH** |
| Competition & Event Management | Who This Is For | 2 | Associations and federations | Associations and federations | **MATCH** |
| Competition & Event Management | Who This Is For | 3 | Schools and universities | Schools and universities | **MATCH** |
| Competition & Event Management | Who This Is For | 4 | Government sport programmes | Government sport programmes | **MATCH** |
| Competition & Event Management | Who This Is For | 5 | Corporate and institutional sport organisers | Corporate and institutional sport organisers | **MATCH** |
| Competition & Event Management | Who This Is For | 6 | Development organisations | Development organisations | **MATCH** |
| Competition & Event Management | Expertise We May Assemble | 1 | Assignments may involve competition managers, sport administrators, event professionals, venue specialists, safeguarding and safety professionals, communications specialists, officials and other technical personnel. | Assignments may involve competition managers, sport administrators, event professionals, venue specialists, safeguarding and safety professionals, communications specialists, officials and other technical personnel. | **MATCH** |
| Sport Project Development & Management | Scope of Work | 1 | Project concept development | Project concept development | **MATCH** |
| Sport Project Development & Management | Scope of Work | 2 | Project scoping and structuring | Project scoping and structuring | **MATCH** |
| Sport Project Development & Management | Scope of Work | 3 | Stakeholder mapping and coordination | Stakeholder mapping and coordination | **MATCH** |
| Sport Project Development & Management | Scope of Work | 4 | Technical team assembly | Technical team assembly | **MATCH** |
| Sport Project Development & Management | Scope of Work | 5 | Implementation planning | Implementation planning | **MATCH** |
| Sport Project Development & Management | Scope of Work | 6 | Project management support | Project management support | **MATCH** |
| Sport Project Development & Management | Scope of Work | 7 | Progress monitoring and reporting | Progress monitoring and reporting | **MATCH** |
| Sport Project Development & Management | Scope of Work | 8 | Evaluation and close out | Evaluation and close out | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 1 | Project concept note | Project concept note | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 2 | Project charter or scope | Project charter or scope | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 3 | Stakeholder map | Stakeholder map | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 4 | Implementation plan | Implementation plan | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 5 | Roles and responsibility matrix | Roles and responsibility matrix | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 6 | Project schedule | Project schedule | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 7 | Progress reports | Progress reports | **MATCH** |
| Sport Project Development & Management | Typical Deliverables | 8 | Evaluation or close out report | Evaluation or close out report | **MATCH** |
| Sport Project Development & Management | How We Work | 1 | Define the problem and intended outcome | Define the problem and intended outcome | **MATCH** |
| Sport Project Development & Management | How We Work | 2 | Structure the project and scope | Structure the project and scope | **MATCH** |
| Sport Project Development & Management | How We Work | 3 | Identify stakeholders and required expertise | Identify stakeholders and required expertise | **MATCH** |
| Sport Project Development & Management | How We Work | 4 | Assemble the project team | Assemble the project team | **MATCH** |
| Sport Project Development & Management | How We Work | 5 | Coordinate implementation and reporting | Coordinate implementation and reporting | **MATCH** |
| Sport Project Development & Management | How We Work | 6 | Evaluate progress, outcomes and lessons | Evaluate progress, outcomes and lessons | **MATCH** |
| Sport Project Development & Management | Who This Is For | 1 | Government institutions | Government institutions | **MATCH** |
| Sport Project Development & Management | Who This Is For | 2 | Federations and associations | Federations and associations | **MATCH** |
| Sport Project Development & Management | Who This Is For | 3 | Universities and schools | Universities and schools | **MATCH** |
| Sport Project Development & Management | Who This Is For | 4 | Clubs and leagues | Clubs and leagues | **MATCH** |
| Sport Project Development & Management | Who This Is For | 5 | Foundations and NGOs | Foundations and NGOs | **MATCH** |
| Sport Project Development & Management | Who This Is For | 6 | Investors and private organisations | Investors and private organisations | **MATCH** |
| Sport Project Development & Management | Expertise We May Assemble | 1 | The team may include project managers, sport administrators, technical specialists, researchers, finance professionals, monitoring and evaluation specialists, communications professionals and other experts required by the project. | The team may include project managers, sport administrators, technical specialists, researchers, finance professionals, monitoring and evaluation specialists, communications professionals and other experts required by the project. | **MATCH** |

### Service Template Rendering Verification (`src/app/services/[slug]/page.tsx`)

Verification of template rendering for all eight required sections across all six service slugs (`infrastructure`, `auditing`, `governance`, `strategy`, `competitions`, `project-management`):

| Section Number | Required Section | Render Status | Component / Code Location | Heading / Element Status |
|:---:|---|:---:|---|---|
| 1 | **Intro** | **RENDERS** | `src/app/services/[slug]/page.tsx:57-59` | Renders `service.heroIntro` under `PRACTICE AREA` / `{service.title}` |
| 2 | **Problem** | **RENDERS** | `src/app/services/[slug]/page.tsx:73-86` | Renders `service.problem` under heading `The Challenge We Address` |
| 3 | **Scope of Work** | **RENDERS** | `src/app/services/[slug]/page.tsx:93-113` | Renders all 8 `service.scopeOfWork` items under heading `Scope of Work` |
| 4 | **Typical Deliverables** | **RENDERS** | `src/app/services/[slug]/page.tsx:116-136` | Renders all 8 `service.deliverables` items under heading `Typical Deliverables` |
| 5 | **How We Work (Process)** | **RENDERS** | `src/app/services/[slug]/page.tsx:142-176` | Renders all 6 `service.howWeWork` steps under heading `How We Work` |
| 6 | **Who This Is For (Audiences)** | **RENDERS** | `src/app/services/[slug]/page.tsx:183-206` | Renders all 6 `service.whoThisIsFor` items under heading `Who This Is For` |
| 7 | **Expertise We May Assemble** | **RENDERS** | `src/app/services/[slug]/page.tsx:209-223` | Renders `service.expertiseWeAssemble` paragraph under heading `Expertise We May Assemble` |
| 8 | **CTA Button** | **RENDERS** | `src/app/services/[slug]/page.tsx:229-258` | Renders CTA button `Discuss This Service` linking to `/discuss-a-project?service=${service.slug}` |

**Findings:** All 8 required sections are explicitly defined in `src/lib/service-details.ts` and actively rendered on every service route in `src/app/services/[slug]/page.tsx`. No section exists in data that is unrendered, and no heading renders empty.
