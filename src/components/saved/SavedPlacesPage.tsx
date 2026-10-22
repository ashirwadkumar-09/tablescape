import React, { useState } from 'react';
import { Venue, UserCollection } from '../../types/venue';
import { VenueCard } from '../common/VenueCard';
import { Heart, Plus, FolderHeart, Trash2, Share2, Compass } from 'lucide-react';
import { StorageService } from '../../services/storage';

interface SavedPlacesPageProps {
  venues: Venue[];
  savedVenueIds: string[];
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  onSelectVenue: (slug: string) => void;
  onExploreClick: () => void;
}

export const SavedPlacesPage: React.FC<SavedPlacesPageProps> = ({
  venues,
  savedVenueIds,
  onToggleSave,
  onSelectVenue,
  onExploreClick
}) => {
  const [collections, setCollections] = useState<UserCollection[]>(StorageService.getCollections());
  const [activeTab, setActiveTab] = useState<'all' | string>('all');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);

  const savedVenues = venues.filter(v => savedVenueIds.includes(v.id));

  const activeCollection = collections.find(c => c.id === activeTab);
  const displayedVenues = activeTab === 'all'
    ? savedVenues
    : venues.filter(v => activeCollection?.venueIds.includes(v.id));

  const handleCreateCollection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCollectionName.trim()) return;

    const updated = StorageService.createCollection(newCollectionName.trim());
    setCollections(updated);
    setNewCollectionName('');
    setShowCreateModal(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-stone-200 gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 mb-2">
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>Saved Spots & Wishlists</span>
          </div>
          <h1 className="text-3xl font-bold font-editorial text-stone-900">
            My Curated Collections
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Keep track of places you want to visit and organize your custom lists.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors shadow-2xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Collection</span>
        </button>
      </div>

      {/* Collections Tabs Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-8">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
            activeTab === 'all'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
          }`}
        >
          All Saved Spots ({savedVenues.length})
        </button>

        {collections.map((col) => (
          <button
            key={col.id}
            onClick={() => setActiveTab(col.id)}
            className={`px-4 py-2 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === col.id
                ? 'bg-stone-900 text-white shadow-xs'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
            }`}
          >
            <FolderHeart className="w-3.5 h-3.5" />
            <span>{col.name} ({col.venueIds.length})</span>
          </button>
        ))}
      </div>

      {/* Grid of Saved Venues */}
      {displayedVenues.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedVenues.map((venue) => (
            <VenueCard
              key={venue.id}
              venue={venue}
              isSaved={savedVenueIds.includes(venue.id)}
              onToggleSave={onToggleSave}
              onSelect={onSelectVenue}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-stone-200/90 p-12 text-center max-w-md mx-auto my-12">
          <div className="w-14 h-14 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <Heart className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-stone-900 mb-1">
            No saved spots in this list yet
          </h3>
          <p className="text-xs text-stone-500 leading-relaxed mb-6">
            Tap the heart icon on any cafe or restaurant card while browsing to save it to your wishlist.
          </p>
          <button
            onClick={onExploreClick}
            className="px-6 py-2.5 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore Cafes & Spots</span>
          </button>
        </div>
      )}

      {/* Create Collection Modal */}
      {showCreateModal && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setShowCreateModal(false)}
        >
          <div 
            className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-base font-bold text-stone-900 mb-1">
              Create New Wishlist
            </h3>
            <p className="text-xs text-stone-500 mb-4">
              e.g., "Sunday Morning Coffee", "Must Try with Friends", "Birthday Venues"
            </p>

            <form onSubmit={handleCreateCollection} className="space-y-4">
              <input
                type="text"
                required
                autoFocus
                value={newCollectionName}
                onChange={(e) => setNewCollectionName(e.target.value)}
                placeholder="Collection name..."
                className="w-full px-3.5 py-2.5 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900"
              />

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-3.5 py-2 text-xs font-semibold text-stone-600 hover:bg-stone-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors"
                >
                  Create Wishlist
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
