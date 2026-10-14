export interface TransformationStep {
  step: number;
  title: string;
  category: string;
  timeline: string;
  description: string;
  coreDeliverables: string[];
  businessImpact: string;
  iconName: string;
}

export const TRANSFORMATION_STEPS: TransformationStep[] = [
  {
    step: 1,
    title: 'Forensic OTA & Extranet Audit',
    category: 'Diagnostic Phase',
    timeline: 'Days 1 - 7',
    description: 'We conduct a comprehensive 40-point diagnostic of your current booking channels, photo completeness scores, room categories, and competitor rate structures.',
    coreDeliverables: [
      'Comprehensive OTA Content & Room Tagging Audit',
      'Rate Parity & Leakage Assessment across all channels',
      'Competitor Set (Comp-Set) Rate Benchmarking',
      'Initial High-Priority Action Checklist'
    ],
    businessImpact: 'Uncovers immediate revenue leaks and hidden listing bottlenecks.',
    iconName: 'Search'
  },
  {
    step: 2,
    title: 'Channel Setup & Inventory Alignment',
    category: 'Distribution Engineering',
    timeline: 'Days 8 - 20',
    description: 'We connect, re-map, or set up your property across Booking.com, Expedia, Agoda, Trip.com, and Airbnb with 100% content completeness and zero sync conflicts.',
    coreDeliverables: [
      'Extranet setup or complete overhaul on major OTAs',
      'Unified room categories & rate plans (BAR, Non-refundable, Extended stay)',
      'High-resolution photo tagging with amenities and room size specs',
      'Channel manager mapping & stop-sell synchronization'
    ],
    businessImpact: 'Ensures page-one search eligibility and prevents costly double-bookings.',
    iconName: 'Network'
  },
  {
    step: 3,
    title: 'Dynamic Pricing & Rate Fencing',
    category: 'Revenue Architecture',
    timeline: 'Days 21 - 35',
    description: 'Replace static seasonal flat-rates with data-driven dynamic pricing that adjusts according to local demand, city conventions, occupancy thresholds, and lead time.',
    coreDeliverables: [
      'Custom Rate Matrix with clear floors and ceiling prices',
      'Length-of-Stay (LOS) restrictions to eliminate dead dates',
      'Weekday vs. weekend rate differentials',
      'Last-minute mobile & geo-targeted promotional fences'
    ],
    businessImpact: 'Maximizes Average Daily Rate (ADR) during peaks and protects base occupancy.',
    iconName: 'TrendingUp'
  },
  {
    step: 4,
    title: 'Reputation & Algorithmic Optimization',
    category: 'Visibility Engine',
    timeline: 'Days 36 - 60',
    description: 'Implement structured front desk review collection systems and professional multilingual review response protocols to elevate your verified scores above 8.5+.',
    coreDeliverables: [
      'Front desk review prompt protocols at check-out',
      '24-hour response turnaround on Google and Booking.com',
      'OTA algorithmic ranking optimization',
      'Complaint root-cause defect reporting'
    ],
    businessImpact: 'High review scores unlock higher conversion rates and Preferred partner badges.',
    iconName: 'Award'
  },
  {
    step: 5,
    title: 'Daily Active Extranet Desk & Yielding',
    category: 'Ongoing Growth',
    timeline: 'Ongoing Daily',
    description: 'Our dedicated desk manages your extranets daily: adjusting rates in real time, monitoring rate parity, launching flash campaigns, and reporting monthly performance.',
    coreDeliverables: [
      'Daily morning inventory reconciliation & rate adjustments',
      'Active campaign monitoring (Genius, Member deals, Flash sales)',
      'Monthly commercial review and forward-demand forecasting',
      'Direct contact desk available via WhatsApp & Telegram'
    ],
    businessImpact: 'Continuous commercial expansion without requiring a full-time in-house revenue team.',
    iconName: 'ShieldCheck'
  }
];

export const TRANSFORMATION_METRIC_PILLARS = [
  {
    title: 'OTA Search Visibility',
    description: 'Elevate your property to page-one placement on Booking.com, Expedia, and Agoda through 100% content completeness and optimized availability.',
    target: 'Page 1 Tier',
    label: 'Search Placement Target'
  },
  {
    title: 'Verified Review Standards',
    description: 'Proactive front desk workflows and 24-hour response standards engineered to achieve and sustain top-tier guest sentiment.',
    target: '8.5+ to 9.0+',
    label: 'Target Score Tier'
  },
  {
    title: 'RevPAR & Yield Expansion',
    description: 'Balance ADR and Occupancy dynamically so every available room produces maximum gross operating profit rather than discounted volume.',
    target: 'Yield Optimized',
    label: 'Strategic Goal'
  },
  {
    title: '100% Rate Parity Integrity',
    description: 'Protect your brand from unauthorized OTA discounting, maintaining price consistency across all public booking channels.',
    target: 'Zero Leakage',
    label: 'Parity Standard'
  }
];
