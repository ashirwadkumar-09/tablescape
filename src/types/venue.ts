export type VenueType = 
  | 'cafe' 
  | 'restaurant' 
  | 'bakery' 
  | 'lounge' 
  | 'dessert' 
  | 'bistro' 
  | 'fine_dining'
  | 'rooftop';

export interface MenuItem {
  id: string;
  name: string;
  category: 'Specialty Coffee' | 'Small Plates' | 'Mains' | 'Bakery & Dessert' | 'Beverages';
  price: number;
  description?: string;
  isVeg: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  isChefSpecial?: boolean;
}

export interface VenueReview {
  id: string;
  author: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  userType?: 'Verified Diner' | 'Local Guide' | 'Foodie';
  photos?: string[];
  helpfulCount?: number;
}

export interface VenueAmenities {
  wifi: boolean;
  powerOutlets: boolean;
  outdoorSeating: boolean;
  petFriendly: boolean;
  airConditioning: boolean;
  valetParking: boolean;
  reservations: boolean;
  liveMusic: boolean;
  wheelchairAccessible: boolean;
  privateDining: boolean;
}

export interface VenueDietary {
  vegetarian: boolean;
  vegan: boolean;
  jain: boolean;
  glutenFree: boolean;
  halal: boolean;
}

export interface Venue {
  id: string;
  name: string;
  slug: string;
  venueType: VenueType;
  tagline: string;
  description: string;
  knownFor: string[];
  cuisineTypes: string[];
  
  // Location
  address: string;
  locality: string;
  city: string;
  landmark?: string;
  latitude: number;
  longitude: number;
  distanceKm?: number; // dynamic relative to user position

  // Pricing & Metrics
  rating: number; // e.g. 4.7
  reviewCount: number;
  priceLevel: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  estimatedCostForTwo: number; // e.g. 650

  // Status & Timings
  openingHours: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  currentOpenStatus: 'open' | 'closed' | 'closing_soon';
  timingNote?: string;

  // Visuals
  coverImage: string;
  galleryImages: string[];

  // Features
  amenities: VenueAmenities;
  dietaryOptions: VenueDietary;
  ambienceTags: string[]; // e.g. ['Aesthetic', 'Cozy', 'Romantic', 'Rooftop', 'Work-Friendly']
  occasionTags: string[]; // e.g. ['Date Night', 'Solo Time', 'Catch-up', 'Celebrations', 'Brunch']
  badges: string[]; // e.g. ['Editor\'s Pick', 'Listed on District', 'Trending', 'Hidden Gem']

  // Verified External Links
  officialWebsite?: string;
  instagramUrl?: string;
  phone?: string;
  districtListingUrl?: string;
  reservationUrl?: string;
  externalMenuUrl?: string;

  // Menu items
  menuItems: MenuItem[];

  // Reviews
  reviews: VenueReview[];

  // Metadata
  dataSource: 'District Verified' | 'Editorial Team' | 'Partner Direct' | 'Sample Data';
  isVerified: boolean;
  lastVerifiedAt: string;
}

export interface UserCollection {
  id: string;
  name: string;
  description?: string;
  venueIds: string[];
  createdDate: string;
  isPublic?: boolean;
  coverImage?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  city: string;
  savedVenueIds: string[];
  collections: UserCollection[];
  preferences: {
    dietary: string[];
    maxBudgetForTwo: number;
    preferredAmbience: string[];
  };
}

export interface DiningOffer {
  id: string;
  title: string;
  venueId: string;
  venueName: string;
  locality: string;
  discountType: 'Percentage' | 'Complimentary' | 'Special Set Menu' | 'Happy Hour';
  description: string;
  terms: string;
  validDays: string;
  validTill: string;
  image: string;
  bookingUrl?: string;
  isFeatured?: boolean;
}

export interface FoodTrailStop {
  stopOrder: number;
  timeSlot: string;
  venueId: string;
  recommendedCategory: string;
  durationMinutes: number;
  suggestedItems: string[];
  estimatedSpend: number;
  walkingTimeToNextMin?: number;
}

export interface FoodTrail {
  id: string;
  title: string;
  tagline: string;
  city: string;
  locality: string;
  totalBudget: number;
  totalDurationHours: number;
  stops: FoodTrailStop[];
  vibe: string;
  coverImage: string;
}

export interface EditorialGuide {
  id: string;
  title: string;
  subtitle: string;
  author: string;
  readTime: string;
  date: string;
  city: string;
  coverImage: string;
  featuredVenueIds: string[];
  summary: string;
  content: string[];
}
