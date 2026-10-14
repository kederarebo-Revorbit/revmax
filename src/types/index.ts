export type PropertyType = 
  | 'Hotels' 
  | 'Apartments' 
  | 'Guesthouses' 
  | 'Resorts' 
  | 'Lodges' 
  | 'Independent Property Owners';

export type ServiceCategoryId = 
  | 'ota-setup'
  | 'ota-management'
  | 'revenue-management'
  | 'distribution-management'
  | 'hotel-consulting'
  | 'reputation-management'
  | 'branding-digital'
  | 'digital-marketing'
  | 'audits'
  | 'training-coaching';

export interface ServiceItem {
  id: ServiceCategoryId;
  number: number;
  title: string;
  category: 'OTA & Distribution' | 'Revenue Strategy' | 'Consulting & Brand' | 'Audits & Training';
  tagline: string;
  description: string;
  subServices: string[];
  benefits: string[];
  deliverables: string[];
  iconName: string;
}

export interface TransformationCase {
  id: string;
  propertyName: string;
  propertyType: string;
  location: string;
  challenge: string;
  solution: string;
  beforeStats: {
    adr: string;
    occupancy: string;
    revpar: string;
    otaRating: string;
  };
  afterStats: {
    adr: string;
    occupancy: string;
    revpar: string;
    otaRating: string;
  };
  keyTakeaway: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  property: string;
  location: string;
  avatarUrl: string;
  rating: number;
  quote: string;
  highlight: string;
}

export interface ContactInquiry {
  fullName: string;
  phone: string;
  email: string;
  propertyName: string;
  propertyType: string;
  roomCount: string;
  serviceInterest: string;
  message: string;
  preferredContactMethod: 'whatsapp' | 'telegram' | 'phone' | 'email';
}
