import React, { useState, useMemo } from 'react';
import { Venue } from '../../types/venue';
import { VenueCard } from '../common/VenueCard';
import { InteractiveMap } from '../map/InteractiveMap';
import { 
  Filter, X, SlidersHorizontal, Map as MapIcon, Grid, 
  RotateCcw, Check, ChevronDown, Search, Compass, Navigation 
} from 'lucide-react';
import { calculateDistanceKm } from '../../services/storage';

interface ExplorePageProps {
  venues: Venue[];
  activeCity: string;
  initialFilter?: string;
  searchQuery?: string;
  savedVenueIds: string[];
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  onSelectVenue: (slug: string) => void;
  userCoords: { lat: number; lng: number } | null;
  onDetectLocation: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  venues,
  activeCity,
  initialFilter,
  searchQuery = '',
  savedVenueIds,
  onToggleSave,
  onSelectVenue,
  userCoords,
  onDetectLocation
}) => {
  // Filter States
  const [selectedVenueTypes, setSelectedVenueTypes] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedAmbience, setSelectedAmbience] = useState<string[]>([]);
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialFilter ? [initialFilter] : []
  );
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [maxBudget, setMaxBudget] = useState<number>(3000);
  const [minRating, setMinRating] = useState<number>(0);
  const [onlyOpenNow, setOnlyOpenNow] = useState<boolean>(false);
  const [radiusKm, setRadiusKm] = useState<number>(5);
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'split' | 'map'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [selectedMapVenue, setSelectedMapVenue] = useState<Venue | null>(null);

  // Available options derived from data
  const venueTypes = ['cafe', 'restaurant', 'bakery', 'lounge', 'fine_dining', 'bistro'];
  const cuisines = ['Specialty Coffee', 'European', 'Italian', 'Mediterranean', 'Healthy Organic', 'Artisan Bakery', 'Tapas', 'Microbrewery', 'Seafood'];
  const ambiences = ['Aesthetic', 'Cozy', 'Romantic', 'Rooftop', 'Minimalist', 'Work-Friendly', 'Lush Greenery', 'Vintage', 'Outdoor'];
  const occasions = ['Date Night', 'Solo time', 'Work mode', 'A slow morning', 'Catch-up with friends', 'Celebrations', 'Brunch'];
  const facilitiesList = [
    { id: 'wifi', label: 'Fast Wi-Fi' },
    { id: 'powerOutlets', label: 'Power Outlets' },
    { id: 'outdoorSeating', label: 'Outdoor Seating' },
    { id: 'petFriendly', label: 'Pet Friendly' },
    { id: 'reservations', label: 'Table Reservations' },
    { id: 'valetParking', label: 'Valet Parking' }
  ];
  const dietaryList = [
    { id: 'vegetarian', label: 'Pure Veg / Options' },
    { id: 'vegan', label: 'Vegan Friendly' },
    { id: 'jain', label: 'Jain Options' },
    { id: 'glutenFree', label: 'Gluten-Free' }
  ];

  // Helper toggle
  const toggleArrayItem = (setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => {
    setter(prev => prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]);
  };

  const clearAllFilters = () => {
    setSelectedVenueTypes([]);
    setSelectedCuisines([]);
    setSelectedAmbience([]);
    setSelectedOccasions([]);
    setSelectedFacilities([]);
    setSelectedDietary([]);
    setMaxBudget(3000);
    setMinRating(0);
    setOnlyOpenNow(false);
  };

  const activeFilterCount = 
    selectedVenueTypes.length +
    selectedCuisines.length +
    selectedAmbience.length +
    selectedOccasions.length +
    selectedFacilities.length +
    selectedDietary.length +
    (maxBudget < 3000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (onlyOpenNow ? 1 : 0);

  // Filter & Sort Logic
  const filteredVenues = useMemo(() => {
    return venues.filter(venue => {
      // City check
      if (venue.city.toLowerCase() !== activeCity.toLowerCase()) {
        // If query is present, allow cross-city fallback if matches
        if (!searchQuery) return false;
      }

      // Search query check
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchesName = venue.name.toLowerCase().includes(q);
        const matchesLocality = venue.locality.toLowerCase().includes(q);
        const matchesCuisine = venue.cuisineTypes.some(c => c.toLowerCase().includes(q));
        const matchesAmbience = venue.ambienceTags.some(a => a.toLowerCase().includes(q));
        const matchesDish = venue.menuItems.some(m => m.name.toLowerCase().includes(q));
        if (!matchesName && !matchesLocality && !matchesCuisine && !matchesAmbience && !matchesDish) {
          return false;
        }
      }

      // Venue Types
      if (selectedVenueTypes.length > 0 && !selectedVenueTypes.includes(venue.venueType)) {
        return false;
      }

      // Cuisines
      if (selectedCuisines.length > 0 && !venue.cuisineTypes.some(c => selectedCuisines.includes(c))) {
        return false;
      }

      // Ambience
      if (selectedAmbience.length > 0 && !venue.ambienceTags.some(a => selectedAmbience.includes(a))) {
        return false;
      }

      // Occasions
      if (selectedOccasions.length > 0 && !venue.occasionTags.some(o => selectedOccasions.includes(o))) {
        return false;
      }

      // Facilities
      for (const fac of selectedFacilities) {
        if (!venue.amenities[fac as keyof typeof venue.amenities]) {
          return false;
        }
      }

      // Dietary
      for (const diet of selectedDietary) {
        if (!venue.dietaryOptions[diet as keyof typeof venue.dietaryOptions]) {
          return false;
        }
      }

      // Budget
      if (venue.estimatedCostForTwo > maxBudget) {
        return false;
      }

      // Rating
      if (minRating > 0 && venue.rating < minRating) {
        return false;
      }

      // Open now
      if (onlyOpenNow && venue.currentOpenStatus !== 'open') {
        return false;
      }

      // Distance radius filter if user coordinates provided
      if (userCoords) {
        const dist = calculateDistanceKm(userCoords.lat, userCoords.lng, venue.latitude, venue.longitude);
        if (dist > radiusKm) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_asc') return a.estimatedCostForTwo - b.estimatedCostForTwo;
      if (sortBy === 'price_desc') return b.estimatedCostForTwo - a.estimatedCostForTwo;
      if (sortBy === 'distance' && userCoords) {
        const distA = calculateDistanceKm(userCoords.lat, userCoords.lng, a.latitude, a.longitude);
        const distB = calculateDistanceKm(userCoords.lat, userCoords.lng, b.latitude, b.longitude);
        return distA - distB;
      }
      return b.reviewCount - a.reviewCount; // recommended
    });
  }, [
    venues, activeCity, searchQuery, selectedVenueTypes, selectedCuisines, 
    selectedAmbience, selectedOccasions, selectedFacilities, selectedDietary, 
    maxBudget, minRating, onlyOpenNow, userCoords, radiusKm, sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-stone-200 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900">
            {searchQuery ? `Places for "${searchQuery}"` : `Discover Spots in ${activeCity}`}
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Showing <span className="tabular-nums font-semibold text-stone-900">{filteredVenues.length}</span> verified venues matching your criteria.
          </p>
        </div>

        {/* View Toggle & Sorting */}
        <div className="flex items-center flex-wrap gap-3">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-stone-800 bg-white border border-stone-300 rounded-xl shadow-2xs"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-[#E76F3C] text-white text-[10px] flex items-center justify-center font-bold">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-stone-600 bg-white px-3 py-2 rounded-xl border border-stone-200 shadow-2xs">
            <span className="font-medium text-stone-400">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent font-semibold text-stone-900 focus:outline-none cursor-pointer"
            >
              <option value="recommended">Recommended</option>
              <option value="rating">Rating: High to Low</option>
              <option value="price_asc">Cost: Low to High</option>
              <option value="price_desc">Cost: High to Low</option>
              {userCoords && <option value="distance">Distance: Nearest First</option>}
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="hidden sm:flex items-center p-1 bg-stone-100 rounded-xl border border-stone-200">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Grid View"
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('split')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'split' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Split Map & List"
            >
              <div className="flex items-center gap-1">
                <Grid className="w-3.5 h-3.5" />
                <MapIcon className="w-3.5 h-3.5" />
              </div>
            </button>
            <button
              onClick={() => setViewMode('map')}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                viewMode === 'map' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Interactive Map Only"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filter Chips Bar */}
      {activeFilterCount > 0 && (
        <div className="flex items-center flex-wrap gap-2 pt-4 pb-2">
          <span className="text-xs font-medium text-stone-400">Active filters:</span>
          {selectedVenueTypes.map(vt => (
            <span key={vt} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium capitalize">
              {vt}
              <button onClick={() => toggleArrayItem(setSelectedVenueTypes, vt)}><X className="w-3 h-3 hover:text-red-500" /></button>
            </span>
          ))}
          {selectedCuisines.map(c => (
            <span key={c} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium">
              {c}
              <button onClick={() => toggleArrayItem(setSelectedCuisines, c)}><X className="w-3 h-3 hover:text-red-500" /></button>
            </span>
          ))}
          {selectedOccasions.map(o => (
            <span key={o} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium">
              {o}
              <button onClick={() => toggleArrayItem(setSelectedOccasions, o)}><X className="w-3 h-3 hover:text-red-500" /></button>
            </span>
          ))}
          {selectedFacilities.map(f => (
            <span key={f} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium">
              {facilitiesList.find(item => item.id === f)?.label || f}
              <button onClick={() => toggleArrayItem(setSelectedFacilities, f)}><X className="w-3 h-3 hover:text-red-500" /></button>
            </span>
          ))}
          {maxBudget < 3000 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium tabular-nums">
              Max ₹{maxBudget}
              <button onClick={() => setMaxBudget(3000)}><X className="w-3 h-3 hover:text-red-500" /></button>
            </span>
          )}
          {minRating > 0 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-stone-100 text-stone-800 text-xs font-medium">
              ★ {minRating}+
              <button onClick={() => setMinRating(0)}><X className="w-3 h-3 hover:text-red-500" /></button>
            </span>
          )}
          {onlyOpenNow && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-xs font-medium">
              Open Now
              <button onClick={() => setOnlyOpenNow(false)}><X className="w-3 h-3 hover:text-red-500" /></button>
            </span>
          )}
          <button
            onClick={clearAllFilters}
            className="text-xs font-bold text-[#E76F3C] hover:underline ml-2"
          >
            Clear all
          </button>
        </div>
      )}

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs sticky top-24">
          <div className="flex items-center justify-between pb-3 border-b border-stone-100">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-stone-700" />
              <span>Refine Search</span>
            </h3>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-stone-500 hover:text-stone-900 font-medium"
              >
                Reset
              </button>
            )}
          </div>

          {/* Quick Availability Toggle */}
          <div className="pt-1">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-semibold text-stone-800">Open Right Now</span>
              <input
                type="checkbox"
                checked={onlyOpenNow}
                onChange={(e) => setOnlyOpenNow(e.target.checked)}
                className="w-4 h-4 rounded text-stone-900 focus:ring-0 cursor-pointer accent-stone-900"
              />
            </label>
          </div>

          {/* Budget for Two Slider */}
          <div className="pt-3 border-t border-stone-100">
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
              <span>Max Budget (for two)</span>
              <span className="tabular-nums font-bold text-stone-900">₹{maxBudget}</span>
            </div>
            <input
              type="range"
              min="300"
              max="3000"
              step="100"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-stone-900 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹300</span>
              <span>₹1,500</span>
              <span>₹3,000+</span>
            </div>
          </div>

          {/* Minimum Rating */}
          <div className="pt-3 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-800 block mb-2">Minimum Rating</span>
            <div className="grid grid-cols-4 gap-1.5">
              {[0, 4.0, 4.5, 4.8].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setMinRating(rate)}
                  className={`py-1 text-xs font-semibold rounded-lg border transition-colors ${
                    minRating === rate
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-white text-stone-600 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {rate === 0 ? 'All' : `${rate}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Venue Category */}
          <div className="pt-3 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-800 block mb-2">Venue Type</span>
            <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
              {venueTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer capitalize hover:text-stone-900">
                  <input
                    type="checkbox"
                    checked={selectedVenueTypes.includes(type)}
                    onChange={() => toggleArrayItem(setSelectedVenueTypes, type)}
                    className="w-3.5 h-3.5 rounded text-stone-900 accent-stone-900"
                  />
                  <span>{type.replace('_', ' ')}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Facilities */}
          <div className="pt-3 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-800 block mb-2">Amenities & Facilities</span>
            <div className="space-y-1.5">
              {facilitiesList.map((fac) => (
                <label key={fac.id} className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer hover:text-stone-900">
                  <input
                    type="checkbox"
                    checked={selectedFacilities.includes(fac.id)}
                    onChange={() => toggleArrayItem(setSelectedFacilities, fac.id)}
                    className="w-3.5 h-3.5 rounded text-stone-900 accent-stone-900"
                  />
                  <span>{fac.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Dietary */}
          <div className="pt-3 border-t border-stone-100">
            <span className="text-xs font-semibold text-stone-800 block mb-2">Dietary Options</span>
            <div className="space-y-1.5">
              {dietaryList.map((diet) => (
                <label key={diet.id} className="flex items-center gap-2 text-xs text-stone-600 cursor-pointer hover:text-stone-900">
                  <input
                    type="checkbox"
                    checked={selectedDietary.includes(diet.id)}
                    onChange={() => toggleArrayItem(setSelectedDietary, diet.id)}
                    className="w-3.5 h-3.5 rounded text-stone-900 accent-stone-900"
                  />
                  <span>{diet.label}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Content Area: Grid, Split, or Map */}
        <main className={`w-full ${viewMode === 'map' ? 'lg:col-span-3' : 'lg:col-span-3'}`}>
          {viewMode === 'map' ? (
            <InteractiveMap
              venues={filteredVenues}
              selectedVenue={selectedMapVenue}
              onSelectVenue={(v) => setSelectedMapVenue(v)}
              onViewDetails={onSelectVenue}
              userCoords={userCoords}
              radiusKm={radiusKm}
              onRadiusChange={(r) => setRadiusKm(r)}
              onDetectLocation={onDetectLocation}
              className="w-full h-[680px]"
            />
          ) : viewMode === 'split' ? (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
              <div className="space-y-4 max-h-[750px] overflow-y-auto pr-2">
                {filteredVenues.length === 0 ? (
                  <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center">
                    <p className="text-stone-700 font-bold mb-1">No spots found matching your filters</p>
                    <p className="text-xs text-stone-500 mb-4">Try clearing one or two constraints to see more recommendations.</p>
                    <button onClick={clearAllFilters} className="px-4 py-2 bg-stone-900 text-white text-xs font-semibold rounded-xl">
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredVenues.map(venue => {
                    const dist = userCoords 
                      ? calculateDistanceKm(userCoords.lat, userCoords.lng, venue.latitude, venue.longitude)
                      : undefined;
                    return (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        isSaved={savedVenueIds.includes(venue.id)}
                        onToggleSave={onToggleSave}
                        onSelect={onSelectVenue}
                        distanceKm={dist}
                      />
                    );
                  })
                )}
              </div>

              <div className="sticky top-24">
                <InteractiveMap
                  venues={filteredVenues}
                  selectedVenue={selectedMapVenue}
                  onSelectVenue={(v) => setSelectedMapVenue(v)}
                  onViewDetails={onSelectVenue}
                  userCoords={userCoords}
                  radiusKm={radiusKm}
                  onRadiusChange={(r) => setRadiusKm(r)}
                  onDetectLocation={onDetectLocation}
                  className="w-full h-[600px]"
                />
              </div>
            </div>
          ) : (
            <div>
              {filteredVenues.length === 0 ? (
                <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto my-8">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-600">
                    <Compass className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">
                    No spots found for these filters
                  </h3>
                  <p className="text-xs text-stone-500 mb-6 leading-relaxed">
                    Try expanding your radius, adjusting your budget slider, or removing specific dietary requirements.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredVenues.map(venue => {
                    const dist = userCoords 
                      ? calculateDistanceKm(userCoords.lat, userCoords.lng, venue.latitude, venue.longitude)
                      : undefined;
                    return (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        isSaved={savedVenueIds.includes(venue.id)}
                        onToggleSave={onToggleSave}
                        onSelect={onSelectVenue}
                        distanceKm={dist}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center animate-in fade-in duration-150"
          onClick={() => setMobileFilterOpen(false)}
        >
          <div 
            className="bg-white w-full sm:max-w-md max-h-[85vh] rounded-t-3xl sm:rounded-3xl p-6 overflow-y-auto space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-stone-400 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Availability */}
            <div>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-semibold text-stone-800">Open Right Now</span>
                <input
                  type="checkbox"
                  checked={onlyOpenNow}
                  onChange={(e) => setOnlyOpenNow(e.target.checked)}
                  className="w-4 h-4 rounded text-stone-900 accent-stone-900"
                />
              </label>
            </div>

            {/* Budget */}
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
                <span>Max Budget (for two)</span>
                <span className="tabular-nums font-bold">₹{maxBudget}</span>
              </div>
              <input
                type="range"
                min="300"
                max="3000"
                step="100"
                value={maxBudget}
                onChange={(e) => setMaxBudget(Number(e.target.value))}
                className="w-full accent-stone-900"
              />
            </div>

            {/* Venue Types */}
            <div>
              <span className="text-xs font-semibold text-stone-800 block mb-2">Venue Type</span>
              <div className="grid grid-cols-2 gap-2">
                {venueTypes.map(t => (
                  <button
                    key={t}
                    onClick={() => toggleArrayItem(setSelectedVenueTypes, t)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border text-left capitalize ${
                      selectedVenueTypes.includes(t)
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {t.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <span className="text-xs font-semibold text-stone-800 block mb-2">Facilities</span>
              <div className="grid grid-cols-2 gap-2">
                {facilitiesList.map(f => (
                  <button
                    key={f.id}
                    onClick={() => toggleArrayItem(setSelectedFacilities, f.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-lg border text-left ${
                      selectedFacilities.includes(f.id)
                        ? 'bg-stone-900 text-white border-stone-900'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
              <button
                onClick={clearAllFilters}
                className="w-1/3 py-2.5 text-xs font-bold text-stone-600 bg-stone-100 rounded-xl"
              >
                Reset
              </button>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-2/3 py-2.5 text-xs font-bold text-white bg-stone-900 rounded-xl"
              >
                Apply ({filteredVenues.length} spots)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
