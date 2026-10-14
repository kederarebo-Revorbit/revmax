import { PropertyType } from '../types';

export interface PropertyAudience {
  type: PropertyType;
  tagline: string;
  description: string;
  commonChallenges: string[];
  revmaxSolutions: string[];
  expectedImpact: {
    metric: string;
    description: string;
  }[];
  accentColor: string;
}

export const WHO_WE_HELP_DATA: PropertyAudience[] = [
  {
    type: 'Hotels',
    tagline: 'Boutique, Business & Independent City Hotels',
    description: 'Hotels competing in crowded business hubs or tourist capitals need sharp pricing, seamless OTA distribution, and consistent 8.5+ guest scores to win premium corporate and leisure travelers.',
    commonChallenges: [
      'Stiff competition from international chain brands and aggregators',
      'High OTA commission payments eroding net operating income',
      'Unsold inventory during mid-week or Sunday night troughs',
      'Staff struggling to adjust rates dynamically in response to market demand'
    ],
    revmaxSolutions: [
      'Comprehensive OTA positioning and content score perfection',
      'Dynamic Length-of-Stay restrictions and peak date rate premiums',
      'Targeted corporate sales setup and rate parity preservation',
      'Front desk upselling systems to boost on-property spend'
    ],
    expectedImpact: [
      { metric: '+24% to +38%', description: 'RevPAR expansion within 90 days' },
      { metric: 'Top 5', description: 'Search ranking placement on Booking.com in your comp-set' },
      { metric: '100%', description: 'Rate parity consistency across all OTAs' }
    ],
    accentColor: '#d4af37'
  },
  {
    type: 'Apartments',
    tagline: 'Serviced Apartments & Extended-Stay Residences',
    description: 'Apartments require a tailored dual-strategy: securing profitable high-ADR short stays via Booking.com & Airbnb while maintaining high-base monthly occupancy from expatriates, diplomats, and corporate project teams.',
    commonChallenges: [
      'Severe calendar fragmentation with gaps between guest bookings',
      'Platform fee stacking across Airbnb and major OTAs',
      'Inconsistent monthly cashflow between high and low seasons',
      'Lack of formal hospitality branding and digital guest collateral'
    ],
    revmaxSolutions: [
      'Synchronized multi-calendar distribution (Airbnb Pro + Booking.com + Direct)',
      'Tiered pricing: short-stay premiums vs. attractive 7-day and 30-day corporate rates',
      'Digital guest guides and QR compendiums for effortless check-in experiences',
      'Direct extended-stay lead generation through local corporate networks'
    ],
    expectedImpact: [
      { metric: '82%+', description: 'Stabilized annual occupancy average' },
      { metric: '+30%', description: 'Net earnings versus traditional long-term leasing' },
      { metric: '0', description: 'Double-booking conflicts via live API synchronization' }
    ],
    accentColor: '#38bdf8'
  },
  {
    type: 'Guesthouses',
    tagline: 'Boutique B&Bs, Heritage Guesthouses & Urban Villas',
    description: 'Personalized hospitality that deserves global visibility. We help guesthouses capture international leisure travelers and cultural explorers who appreciate authentic, high-touch stays.',
    commonChallenges: [
      'Relying solely on word-of-mouth or outdated local directories',
      'No dedicated revenue manager or reservations specialist on payroll',
      'Low review count making prospective guests hesitant to book',
      'Price undercutting due to lack of competitive comp-set data'
    ],
    revmaxSolutions: [
      'Fast-track onboarding onto Booking.com, Agoda, and Airbnb',
      'Reputation acceleration system to safely generate authentic 5-star reviews',
      'Visual storytelling branding highlighting unique architecture and warmth',
      'Remote OTA daily desk handling inquiries, check-in instructions, and rates'
    ],
    expectedImpact: [
      { metric: '3.5x', description: 'Increase in international guest arrivals' },
      { metric: '9.2+', description: 'Average guest review rating target' },
      { metric: '20+ hrs', description: 'Weekly time saved for owner-operators' }
    ],
    accentColor: '#eab308'
  },
  {
    type: 'Resorts',
    tagline: 'Lakeside, Mountain & Luxury Wellness Retreats',
    description: 'Destination resorts must attract weekend getaways, wellness retreats, weddings, and international holidaymakers while monetizing on-site food, beverage, and experiential activities.',
    commonChallenges: [
      'Extreme seasonality with weekend sell-outs but empty mid-week days',
      'High fixed operational overheads requiring strong baseline ADR',
      'Under-monetized packages, excursions, and dining experiences',
      'Difficulty reaching international travel agencies and tour operators'
    ],
    revmaxSolutions: [
      'Staycation packages and curated mid-week retreat promotions',
      'Dynamic rate fences that protect premium weekend pricing',
      'High-impact social media advertising showcasing scenery and wellness',
      'Direct website engine conversion optimization with package add-ons'
    ],
    expectedImpact: [
      { metric: '+45%', description: 'Mid-week occupancy growth' },
      { metric: '+28%', description: 'Total guest spend including F&B and activities' },
      { metric: 'Global', description: 'Visibility across European and Middle East travel hubs' }
    ],
    accentColor: '#34d399'
  },
  {
    type: 'Lodges',
    tagline: 'Eco-Lodges, Safari Camps & Nature Sanctuaries',
    description: 'Unique wilderness accommodations that appeal to premium international eco-travelers, birdwatchers, and expedition groups seeking memorable, sustainable luxury.',
    commonChallenges: [
      'Complex high/low wildlife migration seasons',
      'Heavy dependence on high-commission third-party travel intermediaries',
      'Remote location logistics making direct digital marketing essential',
      'Incomplete listing setups on niche international booking channels'
    ],
    revmaxSolutions: [
      'Global listing setup across Agoda, Trip.com, Booking.com, and eco-specialists',
      'All-inclusive rate architecture with clear meal and excursion inclusions',
      'Compelling brand presentation focusing on conservation and authenticity',
      'Advance booking window optimization to secure bookings 4-8 months out'
    ],
    expectedImpact: [
      { metric: '+35%', description: 'Direct international inquiries' },
      { metric: '6-8 Mos', description: 'Extended forward-booking visibility' },
      { metric: '+20%', description: 'Average length of stay expansion' }
    ],
    accentColor: '#f97316'
  },
  {
    type: 'Independent Property Owners',
    tagline: 'Private Investors & Property Owners Entering Hospitality',
    description: 'Owners converting prime residential buildings or newly constructed properties into high-yielding hospitality businesses who need turn-key commercial management from day zero.',
    commonChallenges: [
      'No prior hospitality or revenue management experience',
      'Uncertainty about pricing, licensing, room configurations, and amenities',
      'Risk of low initial occupancy and negative early reviews',
      'No operational staff or extranet administration workflows'
    ],
    revmaxSolutions: [
      'End-to-end commercial feasibility and revenue projection review',
      'Turn-key setup of all OTA accounts, extranets, and pricing tiers',
      'Staff hiring support, SOP creation, and reservations coaching',
      'Ongoing daily OTA management and monthly performance reporting'
    ],
    expectedImpact: [
      { metric: 'Day 1', description: 'Market-ready listing with instant booking capability' },
      { metric: 'Turn-Key', description: 'Zero operational stress for the property owner' },
      { metric: 'Maximize', description: 'Realize 2x-3x higher returns than standard residential rent' }
    ],
    accentColor: '#a855f7'
  }
];
