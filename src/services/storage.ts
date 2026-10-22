import { Venue, UserCollection, DiningOffer, FoodTrail, VenueReview } from '../types/venue';
import { INITIAL_VENUES } from '../data/mockVenues';
import { INITIAL_OFFERS } from '../data/mockOffers';

const STORAGE_KEYS = {
  VENUES: 'tablescape_venues_v1',
  SAVED_VENUES: 'tablescape_saved_venue_ids_v1',
  COLLECTIONS: 'tablescape_collections_v1',
  SUGGESTED: 'tablescape_suggested_places_v1',
  USER_TRAILS: 'tablescape_saved_trails_v1',
  OFFERS: 'tablescape_offers_v1',
  ACTIVE_CITY: 'tablescape_active_city_v1',
  USER_COORDINATES: 'tablescape_user_coordinates_v1'
};

export interface SuggestedPlace {
  id: string;
  name: string;
  venueType: string;
  city: string;
  locality: string;
  address: string;
  suggestedBy: string;
  sourceLink?: string;
  notes?: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export const StorageService = {
  getVenues(): Venue[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VENUES);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    return INITIAL_VENUES;
  },

  saveVenues(venues: Venue[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(venues));
    } catch (e) {
      console.error('Failed to save venues to localStorage', e);
    }
  },

  getVenueBySlug(slug: string): Venue | undefined {
    const venues = this.getVenues();
    return venues.find(v => v.slug === slug || v.id === slug);
  },

  getSavedVenueIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAVED_VENUES);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return ['tablescape-v1', 'tablescape-v4'];
  },

  toggleSaveVenue(venueId: string): string[] {
    const current = this.getSavedVenueIds();
    const updated = current.includes(venueId) 
      ? current.filter(id => id !== venueId)
      : [...current, venueId];
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED_VENUES, JSON.stringify(updated));
    } catch {
      // fallback
    }
    return updated;
  },

  isVenueSaved(venueId: string): boolean {
    return this.getSavedVenueIds().includes(venueId);
  },

  getCollections(): UserCollection[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COLLECTIONS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [
      {
        id: 'col-1',
        name: 'Date Night Wishlist',
        description: 'Atmospheric spots with candlelit corners and quiet acoustics',
        venueIds: ['tablescape-v2', 'tablescape-v5'],
        createdDate: 'October 2026',
        coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'col-2',
        name: 'Productive Work Cafes',
        description: 'Verified fast Wi-Fi, abundant plugs, and top-tier flat whites',
        venueIds: ['tablescape-v1', 'tablescape-v3', 'tablescape-v10'],
        createdDate: 'October 2026',
        coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80'
      },
      {
        id: 'col-3',
        name: 'Sunday Morning Coffee & Pastries',
        description: 'Flaky croissants, pour-overs, and open-air courtyards',
        venueIds: ['tablescape-v4', 'tablescape-v6'],
        createdDate: 'October 2026',
        coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80'
      }
    ];
  },

  createCollection(name: string, description?: string): UserCollection[] {
    const collections = this.getCollections();
    const newCollection: UserCollection = {
      id: 'col-' + Date.now(),
      name,
      description,
      venueIds: [],
      createdDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    };
    const updated = [newCollection, ...collections];
    try {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(updated));
    } catch {
      // fallback
    }
    return updated;
  },

  addVenueToCollection(collectionId: string, venueId: string): UserCollection[] {
    const collections = this.getCollections();
    const updated = collections.map(col => {
      if (col.id === collectionId && !col.venueIds.includes(venueId)) {
        return { ...col, venueIds: [...col.venueIds, venueId] };
      }
      return col;
    });
    try {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(updated));
    } catch {
      // fallback
    }
    return updated;
  },

  removeVenueFromCollection(collectionId: string, venueId: string): UserCollection[] {
    const collections = this.getCollections();
    const updated = collections.map(col => {
      if (col.id === collectionId) {
        return { ...col, venueIds: col.venueIds.filter(id => id !== venueId) };
      }
      return col;
    });
    try {
      localStorage.setItem(STORAGE_KEYS.COLLECTIONS, JSON.stringify(updated));
    } catch {
      // fallback
    }
    return updated;
  },

  addReviewToVenue(venueId: string, review: Omit<VenueReview, 'id' | 'date'>): Venue[] {
    const venues = this.getVenues();
    const newReview: VenueReview = {
      ...review,
      id: 'rev-' + Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      userType: 'Verified Diner',
      helpfulCount: 0
    };

    const updated = venues.map(v => {
      if (v.id === venueId) {
        const newReviews = [newReview, ...v.reviews];
        const newRating = +(newReviews.reduce((sum, r) => sum + r.rating, 0) / newReviews.length).toFixed(1);
        return {
          ...v,
          rating: newRating,
          reviewCount: v.reviewCount + 1,
          reviews: newReviews
        };
      }
      return v;
    });

    this.saveVenues(updated);
    return updated;
  },

  // Suggested Places queue (moderated in Admin)
  getSuggestedPlaces(): SuggestedPlace[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SUGGESTED);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [
      {
        id: 'sug-1',
        name: 'The French Toast Co.',
        venueType: 'cafe',
        city: 'Bengaluru',
        locality: 'Koramangala 3rd Block',
        address: '14, 80 Feet Road, Near Maharaja Signal',
        suggestedBy: 'Rhea Sen',
        sourceLink: 'https://instagram.com/thefrenchtoastco',
        notes: 'Cozy basement cafe with brioche French toasts & artisan matchas.',
        submittedAt: '2026-10-21',
        status: 'pending'
      }
    ];
  },

  submitSuggestion(suggestion: Omit<SuggestedPlace, 'id' | 'submittedAt' | 'status'>): void {
    const current = this.getSuggestedPlaces();
    const newItem: SuggestedPlace = {
      ...suggestion,
      id: 'sug-' + Date.now(),
      submittedAt: new Date().toISOString().split('T')[0],
      status: 'pending'
    };
    try {
      localStorage.setItem(STORAGE_KEYS.SUGGESTED, JSON.stringify([newItem, ...current]));
    } catch {
      // fallback
    }
  },

  updateSuggestionStatus(id: string, status: 'approved' | 'rejected'): SuggestedPlace[] {
    const current = this.getSuggestedPlaces();
    const updated = current.map(item => item.id === id ? { ...item, status } : item);
    try {
      localStorage.setItem(STORAGE_KEYS.SUGGESTED, JSON.stringify(updated));
    } catch {
      // fallback
    }
    return updated;
  },

  getOffers(): DiningOffer[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.OFFERS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return INITIAL_OFFERS;
  },

  getUserTrails(): FoodTrail[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_TRAILS);
      if (data) return JSON.parse(data);
    } catch {
      // fallback
    }
    return [];
  },

  saveUserTrail(trail: FoodTrail): void {
    const trails = this.getUserTrails();
    const updated = [trail, ...trails];
    try {
      localStorage.setItem(STORAGE_KEYS.USER_TRAILS, JSON.stringify(updated));
    } catch {
      // fallback
    }
  },

  getActiveCity(): string {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_CITY) || 'Bengaluru';
  },

  setActiveCity(city: string): void {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_CITY, city);
  }
};

// Distance calculation using Haversine formula
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return +(R * c).toFixed(1);
}
