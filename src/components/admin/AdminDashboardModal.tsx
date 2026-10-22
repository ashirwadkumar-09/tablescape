import React, { useState } from 'react';
import { Venue } from '../../types/venue';
import { StorageService, SuggestedPlace } from '../../services/storage';
import { X, Shield, Plus, Check, Trash2, Edit2, CheckCircle2, Clock, MapPin } from 'lucide-react';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  venues: Venue[];
  onVenuesUpdated: (updatedVenues: Venue[]) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  venues,
  onVenuesUpdated
}) => {
  const [activeTab, setActiveTab] = useState<'venues' | 'suggestions' | 'add'>('venues');
  const [suggestedPlaces, setSuggestedPlaces] = useState<SuggestedPlace[]>(StorageService.getSuggestedPlaces());

  // Add venue form state
  const [newName, setNewName] = useState('');
  const [newVenueType, setNewVenueType] = useState('cafe');
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newLocality, setNewLocality] = useState('Indiranagar');
  const [newAddress, setNewAddress] = useState('');
  const [newCostForTwo, setNewCostForTwo] = useState(600);
  const [newTagline, setNewTagline] = useState('');
  const [newCoverImage, setNewCoverImage] = useState('');
  const [newDistrictUrl, setNewDistrictUrl] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);

  if (!isOpen) return null;

  const handleApproveSuggestion = (sug: SuggestedPlace) => {
    // 1. Create venue record from suggestion
    const slug = sug.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newVenue: Venue = {
      id: 'venue-' + Date.now(),
      name: sug.name,
      slug: `${slug}-${sug.locality.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      venueType: sug.venueType as any,
      tagline: sug.notes || 'Curated neighbourhood favourite.',
      description: `Discovered and verified by the community. ${sug.notes || ''}`,
      knownFor: ['Specialty Coffee', 'Warm Ambience'],
      cuisineTypes: [sug.venueType === 'cafe' ? 'Specialty Coffee' : 'Multi-cuisine'],
      address: sug.address,
      locality: sug.locality,
      city: sug.city,
      latitude: 12.9716 + (Math.random() - 0.5) * 0.05,
      longitude: 77.5946 + (Math.random() - 0.5) * 0.05,
      rating: 4.6,
      reviewCount: 1,
      priceLevel: '₹₹',
      estimatedCostForTwo: 600,
      openingHours: {
        monday: '9:00 AM - 10:30 PM',
        tuesday: '9:00 AM - 10:30 PM',
        wednesday: '9:00 AM - 10:30 PM',
        thursday: '9:00 AM - 10:30 PM',
        friday: '9:00 AM - 11:00 PM',
        saturday: '9:00 AM - 11:00 PM',
        sunday: '9:00 AM - 10:30 PM'
      },
      currentOpenStatus: 'open',
      coverImage: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      galleryImages: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80'],
      amenities: {
        wifi: true,
        powerOutlets: true,
        outdoorSeating: true,
        petFriendly: true,
        airConditioning: true,
        valetParking: false,
        reservations: false,
        liveMusic: false,
        wheelchairAccessible: true,
        privateDining: false
      },
      dietaryOptions: {
        vegetarian: true,
        vegan: true,
        jain: false,
        glutenFree: false,
        halal: true
      },
      ambienceTags: ['Aesthetic', 'Cozy'],
      occasionTags: ['Catch-up with friends', 'A slow morning'],
      badges: ['Newly Added', 'Community Pick'],
      officialWebsite: sug.sourceLink,
      districtListingUrl: `https://district.in/${sug.city.toLowerCase()}/${slug}`,
      menuItems: [
        { id: 'm-init-1', name: 'Signature House Cappuccino', category: 'Specialty Coffee', price: 210, isVeg: true },
        { id: 'm-init-2', name: 'Freshly Baked Croissant', category: 'Bakery & Dessert', price: 180, isVeg: true }
      ],
      reviews: [
        {
          id: 'rev-init',
          author: sug.suggestedBy,
          rating: 4.8,
          date: 'October 2026',
          comment: sug.notes || 'Incredible atmosphere and wonderful staff.'
        }
      ],
      dataSource: 'Editorial Team',
      isVerified: true,
      lastVerifiedAt: new Date().toISOString().split('T')[0]
    };

    const updatedVenues = [newVenue, ...venues];
    StorageService.saveVenues(updatedVenues);
    onVenuesUpdated(updatedVenues);

    const updatedSug = StorageService.updateSuggestionStatus(sug.id, 'approved');
    setSuggestedPlaces(updatedSug);
  };

  const handleRejectSuggestion = (id: string) => {
    const updated = StorageService.updateSuggestionStatus(id, 'rejected');
    setSuggestedPlaces(updated);
  };

  const handleDeleteVenue = (venueId: string) => {
    const updated = venues.filter(v => v.id !== venueId);
    StorageService.saveVenues(updated);
    onVenuesUpdated(updated);
  };

  const handleCreateVenue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAddress.trim()) return;

    const slug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const newVenue: Venue = {
      id: 'venue-' + Date.now(),
      name: newName.trim(),
      slug: `${slug}-${newLocality.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      venueType: newVenueType as any,
      tagline: newTagline.trim() || 'Exceptional dining and warm hospitality.',
      description: newTagline.trim() || 'A handpicked destination on Tablescape.',
      knownFor: ['Specialty Brew', 'Handcrafted Plates'],
      cuisineTypes: [newVenueType === 'cafe' ? 'Specialty Coffee' : 'Artisanal Dining'],
      address: newAddress.trim(),
      locality: newLocality,
      city: newCity,
      latitude: 12.9716 + (Math.random() - 0.5) * 0.04,
      longitude: 77.5946 + (Math.random() - 0.5) * 0.04,
      rating: 4.7,
      reviewCount: 12,
      priceLevel: newCostForTwo > 1200 ? '₹₹₹' : '₹₹',
      estimatedCostForTwo: newCostForTwo,
      openingHours: {
        monday: '9:00 AM - 11:00 PM',
        tuesday: '9:00 AM - 11:00 PM',
        wednesday: '9:00 AM - 11:00 PM',
        thursday: '9:00 AM - 11:00 PM',
        friday: '9:00 AM - 11:30 PM',
        saturday: '9:00 AM - 11:30 PM',
        sunday: '9:00 AM - 11:00 PM'
      },
      currentOpenStatus: 'open',
      coverImage: newCoverImage.trim() || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        newCoverImage.trim() || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80'
      ],
      amenities: {
        wifi: true,
        powerOutlets: true,
        outdoorSeating: true,
        petFriendly: true,
        airConditioning: true,
        valetParking: false,
        reservations: true,
        liveMusic: false,
        wheelchairAccessible: true,
        privateDining: false
      },
      dietaryOptions: {
        vegetarian: true,
        vegan: true,
        jain: true,
        glutenFree: false,
        halal: true
      },
      ambienceTags: ['Aesthetic', 'Cozy'],
      occasionTags: ['Catch-up with friends', 'Brunch'],
      badges: ['Newly Added', 'Editor Verified'],
      districtListingUrl: newDistrictUrl.trim() || undefined,
      menuItems: [
        { id: 'm-new-1', name: 'Artisan Flat White', category: 'Specialty Coffee', price: 230, isVeg: true },
        { id: 'm-new-2', name: 'Avocado Toast with Seeds', category: 'Small Plates', price: 340, isVeg: true }
      ],
      reviews: [
        {
          id: 'rev-new',
          author: 'Editorial Team',
          rating: 4.8,
          date: 'October 2026',
          comment: 'Verified listing with confirmed menu and active operational hours.'
        }
      ],
      dataSource: 'Partner Direct',
      isVerified: true,
      lastVerifiedAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newVenue, ...venues];
    StorageService.saveVenues(updated);
    onVenuesUpdated(updated);

    setAddSuccess(true);
    setNewName('');
    setNewAddress('');
    setNewTagline('');
    setNewCoverImage('');
    setNewDistrictUrl('');
    setTimeout(() => {
      setAddSuccess(false);
      setActiveTab('venues');
    }, 1500);
  };

  const pendingCount = suggestedPlaces.filter(s => s.status === 'pending').length;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-900 text-white">
          <div className="flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-[#E76F3C]" />
            <h2 className="text-base font-bold">
              Tablescape Admin & Editorial Console
            </h2>
          </div>
          <button onClick={onClose} className="p-1 hover:text-stone-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Console Nav Tabs */}
        <div className="px-6 pt-3 border-b border-stone-200 flex items-center gap-6 text-xs font-semibold text-stone-600 bg-stone-50">
          <button
            onClick={() => setActiveTab('venues')}
            className={`pb-3 border-b-2 transition-colors ${
              activeTab === 'venues' ? 'border-stone-900 text-stone-900 font-bold' : 'border-transparent hover:text-stone-900'
            }`}
          >
            Manage Venues ({venues.length})
          </button>
          <button
            onClick={() => setActiveTab('suggestions')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'suggestions' ? 'border-stone-900 text-stone-900 font-bold' : 'border-transparent hover:text-stone-900'
            }`}
          >
            <span>Moderation Queue</span>
            {pendingCount > 0 && (
              <span className="w-4 h-4 bg-[#E76F3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {pendingCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`pb-3 border-b-2 transition-colors flex items-center gap-1 ${
              activeTab === 'add' ? 'border-stone-900 text-stone-900 font-bold' : 'border-transparent hover:text-stone-900'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Venue Listing</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'venues' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-2 border-b border-stone-100">
                <span>Active Listings: {venues.length}</span>
                <span>District Partner Links: {venues.filter(v => v.districtListingUrl).length}</span>
              </div>

              <div className="space-y-3">
                {venues.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{v.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 capitalize font-medium">
                          {v.venueType}
                        </span>
                        {v.districtListingUrl && (
                          <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-semibold">
                            District Linked
                          </span>
                        )}
                      </div>
                      <p className="text-stone-500 mt-1">
                        {v.locality}, {v.city} · ₹{v.estimatedCostForTwo} for 2 · Rating: ★ {v.rating}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <button
                        onClick={() => handleDeleteVenue(v.id)}
                        className="p-2 text-stone-400 hover:text-red-600 bg-white border border-stone-200 rounded-xl transition-colors"
                        title="Remove listing"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Pending Community Suggestions ({suggestedPlaces.length})
              </h3>

              {suggestedPlaces.length === 0 ? (
                <div className="text-center py-12 text-xs text-stone-400">
                  No pending suggestions in queue.
                </div>
              ) : (
                suggestedPlaces.map((sug) => (
                  <div
                    key={sug.id}
                    className="p-4 bg-stone-50 rounded-2xl border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{sug.name}</span>
                        <span className="px-2 py-0.5 rounded-md bg-stone-200 text-stone-700 capitalize">
                          {sug.venueType}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                          sug.status === 'approved' ? 'bg-emerald-50 text-emerald-700' :
                          sug.status === 'rejected' ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'
                        }`}>
                          {sug.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-stone-600">{sug.address}</p>
                      {sug.notes && <p className="text-stone-500 italic">"{sug.notes}"</p>}
                      <p className="text-stone-400 text-[11px]">Suggested by: {sug.suggestedBy} on {sug.submittedAt}</p>
                    </div>

                    {sug.status === 'pending' && (
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleRejectSuggestion(sug.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white border border-stone-200 rounded-xl"
                        >
                          Reject
                        </button>
                        <button
                          onClick={() => handleApproveSuggestion(sug)}
                          className="px-3.5 py-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-emerald-600 rounded-xl transition-colors flex items-center gap-1"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve & Publish</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'add' && (
            <form onSubmit={handleCreateVenue} className="space-y-4 max-w-xl mx-auto">
              <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
                Publish a New Cafe or Restaurant
              </h3>

              {addSuccess && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-xl">
                  ✓ Listing published successfully!
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">Name *</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Maverick & Farmer Coffee"
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">Venue Type</label>
                  <select
                    value={newVenueType}
                    onChange={(e) => setNewVenueType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  >
                    <option value="cafe">Cafe</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bakery">Artisan Bakery</option>
                    <option value="bistro">Bistro</option>
                    <option value="lounge">Lounge / Rooftop</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">Locality</label>
                  <input
                    type="text"
                    required
                    value={newLocality}
                    onChange={(e) => setNewLocality(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">Full Address *</label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="Street, Building, Landmark..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">Approx Cost for Two (₹)</label>
                  <input
                    type="number"
                    value={newCostForTwo}
                    onChange={(e) => setNewCostForTwo(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none tabular-nums"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">District Listing URL</label>
                  <input
                    type="url"
                    value={newDistrictUrl}
                    onChange={(e) => setNewDistrictUrl(e.target.value)}
                    placeholder="https://district.in/..."
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={newCoverImage}
                  onChange={(e) => setNewCoverImage(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">Tagline / Key Appeal</label>
                <input
                  type="text"
                  value={newTagline}
                  onChange={(e) => setNewTagline(e.target.value)}
                  placeholder="e.g. Sunlit terrace with specialty cold brews and sourdough tartines."
                  className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
