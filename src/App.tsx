/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Venue, EditorialGuide, DiningOffer } from './types/venue';
import { StorageService } from './services/storage';
import { Header } from './components/common/Header';
import { MobileNav } from './components/common/MobileNav';
import { Footer } from './components/common/Footer';
import { HeroSection } from './components/home/HeroSection';
import { QuickCategories } from './components/home/QuickCategories';
import { ExploreByMood } from './components/home/ExploreByMood';
import { BudgetPicker } from './components/home/BudgetPicker';
import { EditorialSection } from './components/home/EditorialSection';
import { GuideModal } from './components/home/GuideModal';
import { VenueCard } from './components/common/VenueCard';
import { ExplorePage } from './components/explore/ExplorePage';
import { VenueDetailPage } from './components/venue/VenueDetailPage';
import { FoodTrailPlanner } from './components/trail/FoodTrailPlanner';
import { SavedPlacesPage } from './components/saved/SavedPlacesPage';
import { OffersPage } from './components/offers/OffersPage';
import { SearchModal } from './components/search/SearchModal';
import { SuggestPlaceModal } from './components/community/SuggestPlaceModal';
import { AdminDashboardModal } from './components/admin/AdminDashboardModal';
import { SmartRecommendationWizard } from './components/recommend/SmartRecommendationWizard';
import { Sparkles, ArrowRight, Compass, ShieldCheck } from 'lucide-react';

export default function App() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [savedVenueIds, setSavedVenueIds] = useState<string[]>([]);
  const [activeCity, setActiveCity] = useState<string>('Bengaluru');
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedVenueSlug, setSelectedVenueSlug] = useState<string | null>(null);
  const [initialCategoryFilter, setInitialCategoryFilter] = useState<string | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSuggestOpen, setIsSuggestOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [activeGuide, setActiveGuide] = useState<EditorialGuide | null>(null);

  // User Geolocation
  const [userCoords, setUserCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load initial data from StorageService
    const loadedVenues = StorageService.getVenues();
    setVenues(loadedVenues);

    const loadedSaved = StorageService.getSavedVenueIds();
    setSavedVenueIds(loadedSaved);

    const savedCity = StorageService.getActiveCity();
    if (savedCity) setActiveCity(savedCity);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleCityChange = (newCity: string) => {
    setActiveCity(newCity);
    StorageService.setActiveCity(newCity);
    showToast(`Switched city to ${newCity}`);
  };

  const handleToggleSave = (e: React.MouseEvent, venueId: string) => {
    e.stopPropagation();
    const updated = StorageService.toggleSaveVenue(venueId);
    setSavedVenueIds(updated);
    const wasSaved = updated.includes(venueId);
    showToast(wasSaved ? 'Saved to your wishlist' : 'Removed from wishlist');
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserCoords({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
        showToast('Location detected! Sorted by distance.');
      },
      () => {
        // Fallback gracefully to Bengaluru center if denied or unavailable
        setUserCoords({ lat: 12.9716, lng: 77.5946 });
        showToast('Using city center coordinates for distance estimates.');
      }
    );
  };

  const navigateTo = (view: string, filterParam?: string) => {
    setCurrentView(view);
    setSelectedVenueSlug(null);
    setInitialCategoryFilter(filterParam);
    if (view !== 'explore') {
      setSearchQuery('');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectVenue = (slug: string) => {
    setSelectedVenueSlug(slug);
    setCurrentView('venue-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    setCurrentView('explore');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSelectedVenue = selectedVenueSlug
    ? venues.find(v => v.slug === selectedVenueSlug || v.id === selectedVenueSlug)
    : null;

  // Venues in currently selected city
  const cityVenues = venues.filter(v => v.city.toLowerCase() === activeCity.toLowerCase());
  const displayPool = cityVenues.length > 0 ? cityVenues : venues;

  // Trending / Featured venues
  const trendingVenues = displayPool.slice(0, 4);

  // Hidden gems
  const hiddenGems = displayPool.filter(v => v.badges.includes('Hidden Gem') || v.estimatedCostForTwo <= 500).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-stone-900 flex flex-col selection:bg-amber-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-8 right-6 z-50 bg-stone-900 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-xl border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-150">
          {toastMessage}
        </div>
      )}

      {/* Main Header (Top Bar Contract Compliant) */}
      <Header
        currentView={currentView}
        onNavigate={navigateTo}
        activeCity={activeCity}
        onCityChange={handleCityChange}
        savedCount={savedVenueIds.length}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenSuggestModal={() => setIsSuggestOpen(true)}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              activeCity={activeCity}
              onSearchSubmit={handleSearchSubmit}
              onExploreClick={() => navigateTo('explore')}
              onMapClick={() => navigateTo('map')}
              onSelectCategory={(pill) => {
                setSearchQuery(pill);
                navigateTo('explore');
              }}
            />

            {/* Personalized Match Callout Banner */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
              <div className="bg-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-[#E76F3C] flex items-center justify-center shrink-0">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold font-editorial">
                      Indecisive about where to go today?
                    </h3>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Answer 4 quick questions about your mood and budget for a tailor-made ranked shortlist.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsWizardOpen(true)}
                  className="px-5 py-2.5 bg-[#E76F3C] hover:bg-[#C55729] text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap self-start sm:self-auto shrink-0 shadow-xs"
                >
                  Find My Match
                </button>
              </div>
            </div>

            {/* Quick Categories */}
            <QuickCategories
              onSelectCategory={(catId) => navigateTo('explore', catId)}
            />

            {/* Trending Around You */}
            <section className="py-14 bg-[#FAF8F4] border-t border-stone-200/60">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                      High Community Regard
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
                      Trending in {activeCity}
                    </h2>
                  </div>
                  <button
                    onClick={() => navigateTo('explore')}
                    className="text-xs sm:text-sm font-bold text-stone-900 hover:text-[#E76F3C] flex items-center gap-1 transition-colors"
                  >
                    <span>View all {displayPool.length} spots</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingVenues.map((venue) => (
                    <VenueCard
                      key={venue.id}
                      venue={venue}
                      isSaved={savedVenueIds.includes(venue.id)}
                      onToggleSave={handleToggleSave}
                      onSelect={handleSelectVenue}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Explore by Mood */}
            <ExploreByMood
              onSelectMood={(moodId) => navigateTo('explore', moodId)}
            />

            {/* Best Picks by Budget */}
            <BudgetPicker
              venues={displayPool}
              onSelectBudget={(max) => {
                navigateTo('explore');
              }}
            />

            {/* Local Hidden Gems */}
            {hiddenGems.length > 0 && (
              <section className="py-14 bg-stone-100/60 border-t border-stone-200/70">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                        Off the Beaten Path
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
                        Neighbourhood Hidden Gems
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-stone-500 max-w-md">
                      Quiet courtyards, independent family roasters, and serene reading spots.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {hiddenGems.map((venue) => (
                      <VenueCard
                        key={venue.id}
                        venue={venue}
                        isSaved={savedVenueIds.includes(venue.id)}
                        onToggleSave={handleToggleSave}
                        onSelect={handleSelectVenue}
                        priorityBadge="Hidden Gem"
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Curated Editorial Guides */}
            <EditorialSection
              onSelectGuide={(g) => setActiveGuide(g)}
            />
          </div>
        )}

        {currentView === 'explore' && (
          <ExplorePage
            venues={venues}
            activeCity={activeCity}
            initialFilter={initialCategoryFilter}
            searchQuery={searchQuery}
            savedVenueIds={savedVenueIds}
            onToggleSave={handleToggleSave}
            onSelectVenue={handleSelectVenue}
            userCoords={userCoords}
            onDetectLocation={handleDetectLocation}
          />
        )}

        {currentView === 'cafes' && (
          <ExplorePage
            venues={venues.filter(v => v.venueType === 'cafe')}
            activeCity={activeCity}
            savedVenueIds={savedVenueIds}
            onToggleSave={handleToggleSave}
            onSelectVenue={handleSelectVenue}
            userCoords={userCoords}
            onDetectLocation={handleDetectLocation}
          />
        )}

        {currentView === 'restaurants' && (
          <ExplorePage
            venues={venues.filter(v => ['restaurant', 'bistro', 'fine_dining'].includes(v.venueType))}
            activeCity={activeCity}
            savedVenueIds={savedVenueIds}
            onToggleSave={handleToggleSave}
            onSelectVenue={handleSelectVenue}
            userCoords={userCoords}
            onDetectLocation={handleDetectLocation}
          />
        )}

        {currentView === 'map' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <h1 className="text-3xl font-bold font-editorial text-stone-900">
                Interactive City Map — {activeCity}
              </h1>
              <p className="text-xs sm:text-sm text-stone-500 mt-1">
                Pinpoint cafes, roasteries, and bistros near your destination. Click any pin to preview.
              </p>
            </div>
            <ExplorePage
              venues={venues}
              activeCity={activeCity}
              savedVenueIds={savedVenueIds}
              onToggleSave={handleToggleSave}
              onSelectVenue={handleSelectVenue}
              userCoords={userCoords}
              onDetectLocation={handleDetectLocation}
            />
          </div>
        )}

        {currentView === 'venue-detail' && currentSelectedVenue && (
          <VenueDetailPage
            venue={currentSelectedVenue}
            allVenues={venues}
            isSaved={savedVenueIds.includes(currentSelectedVenue.id)}
            onToggleSave={handleToggleSave}
            onBack={() => setCurrentView('explore')}
            onSelectSimilar={handleSelectVenue}
            onReviewAdded={(updated) => setVenues(updated)}
          />
        )}

        {currentView === 'trail-planner' && (
          <FoodTrailPlanner
            venues={venues}
            activeCity={activeCity}
            onSelectVenue={handleSelectVenue}
          />
        )}

        {currentView === 'saved' && (
          <SavedPlacesPage
            venues={venues}
            savedVenueIds={savedVenueIds}
            onToggleSave={handleToggleSave}
            onSelectVenue={handleSelectVenue}
            onExploreClick={() => navigateTo('explore')}
          />
        )}

        {currentView === 'offers' && (
          <OffersPage
            offers={StorageService.getOffers()}
            venues={venues}
            onSelectVenue={handleSelectVenue}
          />
        )}
      </main>

      {/* Global Modals */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        venues={venues}
        onSelectVenue={handleSelectVenue}
        onSearchSubmit={handleSearchSubmit}
      />

      <SuggestPlaceModal
        isOpen={isSuggestOpen}
        onClose={() => setIsSuggestOpen(false)}
        activeCity={activeCity}
      />

      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        venues={venues}
        onVenuesUpdated={(updated) => setVenues(updated)}
      />

      <SmartRecommendationWizard
        isOpen={isWizardOpen}
        onClose={() => setIsWizardOpen(false)}
        venues={venues}
        activeCity={activeCity}
        onSelectVenue={handleSelectVenue}
      />

      <GuideModal
        guide={activeGuide}
        onClose={() => setActiveGuide(null)}
        venues={venues}
        onSelectVenue={handleSelectVenue}
      />

      {/* Footer */}
      <Footer
        onNavigate={navigateTo}
        onOpenSuggestModal={() => setIsSuggestOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Mobile Sticky Bottom Nav Bar */}
      <MobileNav
        currentView={currentView}
        onNavigate={navigateTo}
        savedCount={savedVenueIds.length}
      />
    </div>
  );
}
