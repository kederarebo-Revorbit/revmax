import { ServiceItem } from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'ota-setup',
    number: 1,
    title: 'OTA Setup for New Properties',
    category: 'OTA & Distribution',
    tagline: 'Launch on top global distribution platforms with 100% verified listings.',
    description: 'Turn your new hotel or apartment into an active, bookable asset across the world’s leading travel channels. We handle technical onboarding, room mapping, policy creation, and photo tagging to ensure maximum day-one visibility.',
    subServices: [
      'Booking.com Setup & Onboarding',
      'Expedia Partner Central Setup',
      'Agoda YCS Configuration',
      'Trip.com Global Listing Setup',
      'Airbnb Pro Host Setup',
      'Property Listing & Photo Optimization'
    ],
    benefits: [
      'Avoid costly setup mistakes and commission tier penalties',
      'Reach international tourists and business travelers immediately',
      'Achieve 100% content completeness score on Booking.com & Expedia',
      'Seamless multi-channel inventory synchronization'
    ],
    deliverables: [
      'Channel Manager & Extranet connection configuration',
      'Room category & rate plan definitions (Standard, Deluxe, Suite)',
      'High-resolution photo tagging with amenities and room size specs',
      'Cancellation, payment, and child policy structuring',
      'Extranet security & banking payout verification assistance'
    ],
    iconName: 'Globe'
  },
  {
    id: 'ota-management',
    number: 2,
    title: 'OTA Management',
    category: 'OTA & Distribution',
    tagline: 'Daily hands-on extranet oversight so you never miss a booking or suffer overbooking.',
    description: 'We act as your dedicated remote OTA reservations and extranet desk. Our team proactively adjusts room inventories, updates rates, launches promotional campaigns, and monitors algorithmic search ranking daily.',
    subServices: [
      'Daily OTA Extranet Oversight',
      'Real-Time Rate Updates',
      'Availability & Stop-Sell Management',
      'Content & Amenity Optimization',
      'Campaign & Flash Promotion Setup',
      'Performance & Conversion Monitoring'
    ],
    benefits: [
      'Eliminate overbooking and double-booking risks',
      'Stay ranked on page 1 of city search results',
      'Capture last-minute bookings without cutting average rates',
      'Save dozens of management hours every week'
    ],
    deliverables: [
      'Daily morning extranet check & inventory reconciliation',
      'Targeted campaign setups (Genius, Member Rates, Mobile Discounts)',
      'Weekly conversion rate & search impression reports',
      'Extranet messaging & guest special request handling',
      'Competitive rate parity monitoring across portals'
    ],
    iconName: 'LayoutDashboard'
  },
  {
    id: 'revenue-management',
    number: 3,
    title: 'Revenue Management',
    category: 'Revenue Strategy',
    tagline: 'Maximize RevPAR and Gross Operating Profit through data-driven dynamic pricing.',
    description: 'Move away from static seasonal pricing. We analyze historical pickup, local event calendars, airport arrivals, and competitor rate behavior to dynamically price every room type for maximum yields.',
    subServices: [
      'Rate Configuration & Architecture',
      'Dynamic Pricing Strategy',
      'ADR (Average Daily Rate) Optimization',
      'Occupancy Analysis & Pace Tracking',
      'RevPAR & Yield Maximization',
      'Demand Forecasting & Trend Modeling',
      'Market & Comp-Set Assessment'
    ],
    benefits: [
      'Capture higher ADR during peak city conventions and holidays',
      'Protect base occupancy during shoulder and low seasons',
      'Systematic Length-of-Stay (LOS) restrictions to prevent dead dates',
      'Scientifically proven RevPAR uplifts between 15% and 35%'
    ],
    deliverables: [
      'Comprehensive Room Rate Hierarchy & BAR (Best Available Rate) Matrix',
      'Dynamic pricing rules tailored to occupancy pace thresholds',
      'Monthly Revenue Management Review & Strategy calls',
      'Competitor set rate benchmarking & positioning strategy',
      'Corporate & group rate ceilings and floors guidelines'
    ],
    iconName: 'TrendingUp'
  },
  {
    id: 'distribution-management',
    number: 4,
    title: 'Distribution Management',
    category: 'OTA & Distribution',
    tagline: 'Control your inventory mix, eliminate rate parity leaks, and protect net profits.',
    description: 'Distribute your rooms across the most profitable mix of OTAs, corporate channels, GDS, and direct booking engines without letting middlemen undercut your official direct price.',
    subServices: [
      'Multi-Channel Distribution Strategy',
      'OTA Inventory Allocation & Clamping',
      'Rate Parity Monitoring & Enforcement',
      'Channel Manager Configuration',
      'Distribution Cost Optimization',
      'Direct vs. Indirect Booking Ratio Strategy'
    ],
    benefits: [
      'Stop OTAs from displaying unauthorized discounts on metasearch',
      'Reduce average commission payout across all booking sources',
      'Optimize inventory allocations during high-demand festival periods',
      'Strengthen direct guest acquisition economics'
    ],
    deliverables: [
      'Comprehensive Channel Audit & Profitability Matrix',
      'Rate Parity violation alert system and remediation protocols',
      'Channel manager mapping audit for zero synchronization latency',
      'Direct booking engine incentive structuring (perks, flexible cancellation)'
    ],
    iconName: 'Network'
  },
  {
    id: 'hotel-consulting',
    number: 5,
    title: 'Hotel & Apartment Consulting',
    category: 'Consulting & Brand',
    tagline: 'Executive advisory to redefine your property’s commercial trajectory.',
    description: 'Holistic commercial advisory for property owners, developers, and general managers. We diagnose revenue bottlenecks, overhaul underperforming departments, and position your property for long-term dominance.',
    subServices: [
      'Business Performance & P&L Review',
      'Revenue Growth Roadmaps',
      'Commercial & Sales Planning',
      'Market Repositioning Strategy',
      'Business Concept Redefinition',
      'Operational Flow Improvement'
    ],
    benefits: [
      'Clear, unbiased evaluation of your property’s revenue leakage',
      'Actionable step-by-step 90-day turnaround blueprint',
      'Aligned front desk, reservations, and sales team incentives',
      'Higher enterprise valuation for property owners and investors'
    ],
    deliverables: [
      'Full Commercial Diagnostic Audit report',
      'Tailored 12-Month Revenue & Sales Commercial Masterplan',
      'On-site or virtual leadership advisory workshops',
      'Staff KPI scorecards and standard operating procedures (SOPs)'
    ],
    iconName: 'Compass'
  },
  {
    id: 'reputation-management',
    number: 6,
    title: 'Reputation Management',
    category: 'Consulting & Brand',
    tagline: 'Turn guest feedback into an algorithmic magnet for high-paying bookings.',
    description: 'OTAs prioritize properties with 8.5+ ratings and high response rates. We manage, monitor, and craft personalized, high-standard responses to all guest reviews on Google and Booking.com while solving operational complaints.',
    subServices: [
      'Multi-Platform Guest Review Monitoring',
      'Booking.com & Agoda Review Strategy',
      'Google Business Profile Review Growth',
      'OTA Algorithmic Reputation Optimization',
      'Professional Multilingual Response Management',
      'Complaint Pattern Analysis'
    ],
    benefits: [
      'Elevate Booking.com score to 8.5+ or 9.0+ preferred status',
      'Build immediate trust with prospective international guests',
      'Turn negative reviews into demonstrations of professional hospitality',
      'Identify recurring maintenance or housekeeping defects early'
    ],
    deliverables: [
      '24/7 review alerts and rapid response within 24 hours',
      'In-stay guest satisfaction feedback touchpoints',
      'Post-checkout automated review invitation protocols',
      'Monthly Sentiment & Operational Defect Analysis report'
    ],
    iconName: 'Award'
  },
  {
    id: 'branding-digital',
    number: 7,
    title: 'Branding & Digital Presence',
    category: 'Consulting & Brand',
    tagline: 'A distinctive, luxury identity that justifies higher room rates.',
    description: 'Elevate your property’s brand prestige. From visual identity, logos, and high-converting direct booking websites to branded digital menus and guest compendiums, we create an unforgettable guest journey.',
    subServices: [
      'Hotel & Resort Brand Identity Design',
      'Serviced Apartment Visual Branding',
      'Logo & Typography Development',
      'Direct Booking Website Development',
      'Official Social Media Profile Setup',
      'Digital QR Menu & Guest Directory Creation'
    ],
    benefits: [
      'Justify 15-30% premium pricing with refined aesthetic credibility',
      'Convert direct website visitors into commission-free reservations',
      'Modern contactless digital menus for hotel restaurants and room service',
      'Consistent, cohesive identity across all touchpoints'
    ],
    deliverables: [
      'Brand Identity Guidelines (color palette, typography, tone of voice)',
      'Vector logo files, stationary, and door hanger/key card designs',
      'Mobile-optimized direct booking web application',
      'Digital QR room service menus and guest compendium setup'
    ],
    iconName: 'Sparkles'
  },
  {
    id: 'digital-marketing',
    number: 8,
    title: 'Digital Marketing',
    category: 'Consulting & Brand',
    tagline: 'Targeted hospitality campaigns that attract high-value guests.',
    description: 'Reach high-intent business executives, embassy personnel, diaspora visitors, and holiday travelers. We execute hyper-targeted social media marketing and optimize your local Google presence.',
    subServices: [
      'Hospitality Social Media Management',
      'Targeted Meta & Google Advertising',
      'Local & Corporate Hospitality Marketing',
      'Google Business Profile (GBP) Optimization',
      'Seasonal Staycation & Long-Stay Campaigns',
      'Content Photography Direction'
    ],
    benefits: [
      'Rank in the top 3 on Google Maps for local hotel searches',
      'Capture corporate travel managers and event bookers',
      'Drive weekend staycation bookings to smooth weekday troughs',
      'Measurable return on advertising spend (ROAS)'
    ],
    deliverables: [
      'Monthly social media content calendar & aesthetic creatives',
      'Google Maps listing complete overhaul (photos, 360 virtual tour, services)',
      'Targeted sponsored ad campaigns (Meta / Google Search)',
      'Monthly digital marketing ROI and guest acquisition report'
    ],
    iconName: 'Megaphone'
  },
  {
    id: 'audits',
    number: 9,
    title: 'Hospitality Audits',
    category: 'Audits & Training',
    tagline: 'Uncover the hidden revenue leaks holding your property back.',
    description: 'A deep-dive, forensic inspection of your digital footprint, distribution contracts, rate parity, and extranet setup. We highlight immediate quick wins and revenue vulnerabilities.',
    subServices: [
      'Full OTA Listing & Extranet Audit',
      'Historical Revenue & Pace Audit',
      'Digital Footprint & Website Audit',
      'Distribution & Channel Parity Audit',
      'Guest Reputation & Sentiment Audit'
    ],
    benefits: [
      'Know your exact parity leak rate and commission loss',
      'Identify missing photo tags, room amenities, and search filters',
      'Benchmark your performance against 5 direct competitors',
      'Receive actionable recommendations you can implement right away'
    ],
    deliverables: [
      '40-Point Comprehensive Hospitality Diagnostic Scorecard',
      'Competitor Benchmarking & Rate Gap analysis',
      'High-Priority Quick-Win Checklist (first 14 days)',
      '60-minute executive presentation with RevMax specialists'
    ],
    iconName: 'FileSearch'
  },
  {
    id: 'training-coaching',
    number: 10,
    title: 'Training & Coaching',
    category: 'Audits & Training',
    tagline: 'Empower your internal team with modern commercial hospitality skills.',
    description: 'Transform your front desk, reservations, and sales staff into revenue-generating professionals. We deliver practical, real-world workshops on extranet systems, upselling, and dynamic yield.',
    subServices: [
      'Revenue Management Mastery Training',
      'OTA Extranet Operations Training',
      'Reservations & Front Desk Upselling Training',
      'Commercial Sales & Corporate Negotiation',
      'Guest Relations & Review Handling Coaching'
    ],
    benefits: [
      'Turn front desk agents into confident room up-sellers',
      'Prevent costly reservation and rate input mistakes',
      'Standardize response scripts for guest inquiries and corporate quotes',
      'Create a sustainable revenue culture across your entire property'
    ],
    deliverables: [
      'Customized training manuals and quick-reference cheat sheets',
      'Interactive on-site or virtual coaching sessions',
      'Role-playing exercises (reservation phone handling, walk-in upselling)',
      'Post-training assessment and certification'
    ],
    iconName: 'GraduationCap'
  }
];
