export interface ServiceCommitment {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  commitment: string;
  iconName: string;
}

export const SERVICE_COMMITMENTS: ServiceCommitment[] = [
  {
    id: 'comm-1',
    title: 'Daily Active Extranet Oversight',
    subtitle: 'Hands-on Daily Management',
    description: 'We do not set up your listings and disappear. Our team monitors your extranet portals daily, making rate adjustments, verifying inventory, and tracking booking pickups.',
    commitment: 'Daily Morning Inventory & Rate Check',
    iconName: 'Clock'
  },
  {
    id: 'comm-2',
    title: 'Zero Double-Booking Guarantee',
    subtitle: 'Synchronized Channel Mapping',
    description: 'Through rigorous channel manager architecture and real-time API synchronization, we ensure your room calendar is aligned across all platforms simultaneously.',
    commitment: 'Real-Time Multi-Channel Synchronization',
    iconName: 'ShieldCheck'
  },
  {
    id: 'comm-3',
    title: 'Rate Parity Enforcement',
    subtitle: 'Direct Profit Protection',
    description: 'We proactively audit Booking.com, Expedia, Agoda, and metasearch engines to stop unauthorized wholesale discounting that erodes your direct bookings.',
    commitment: 'Continuous Rate Parity Monitoring',
    iconName: 'Scale'
  },
  {
    id: 'comm-4',
    title: 'Addis Ababa Local Desk in Kazanchis',
    subtitle: 'Accessible Commercial Team',
    description: 'Headquartered on Tito Street, Kazanchis, our specialists are accessible via direct phone, WhatsApp, Telegram, or scheduled in-person consultations.',
    commitment: 'Direct Rapid-Response Desk (<2 Hours)',
    iconName: 'MapPin'
  }
];

export const WHY_CHOOSE_PILLARS = [
  {
    title: 'Hospitality Focused',
    description: 'Exclusively built for lodging businesses: hotels, serviced apartments, guesthouses, and lodges. We focus on room inventory, length of stay, and yield economics.',
    iconName: 'Building2',
  },
  {
    title: 'OTA Experts',
    description: 'Deep technical proficiency in Booking.com Partner Hub, Expedia Partner Central, Agoda YCS, Airbnb Pro, and Trip.com algorithms to maximize visibility.',
    iconName: 'Cpu',
  },
  {
    title: 'Revenue Driven',
    description: 'We focus on RevPAR, Average Daily Rate (ADR), and net profitability rather than vanity traffic or superficial marketing impressions.',
    iconName: 'TrendingUp',
  },
  {
    title: 'Practical Solutions',
    description: 'Executable workflows customized for your property’s room count, operational bandwidth, and staffing capacity. Practical, sustainable results.',
    iconName: 'ShieldCheck',
  },
  {
    title: 'Local and International Experience',
    description: 'Based in Kazanchis, Addis Ababa with an acute understanding of the local market, currency dynamics, and regional traveler flows, blended with global OTA standards.',
    iconName: 'Globe2',
  }
];
