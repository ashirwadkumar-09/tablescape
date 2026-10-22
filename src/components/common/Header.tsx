import React, { useState } from 'react';
import { MapPin, Heart, Search, User, ChevronDown, Compass, Menu, X } from 'lucide-react';
import { CITIES } from '../../data/mockVenues';

interface HeaderProps {
  currentView: string;
  onNavigate: (view: string, filterParam?: string) => void;
  activeCity: string;
  onCityChange: (city: string) => void;
  savedCount: number;
  onOpenSearch: () => void;
  onOpenSuggestModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  activeCity,
  onCityChange,
  savedCount,
  onOpenSearch,
  onOpenSuggestModal
}) => {
  const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F4]/90 backdrop-blur-md border-b border-stone-200/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark (Single text element in editorial serif) */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => onNavigate('home')}
              className="text-2xl font-bold tracking-tight text-stone-900 font-editorial hover:opacity-90 transition-opacity whitespace-nowrap text-left"
            >
              TABLESCAPE
            </button>

            {/* City Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setCityDropdownOpen(!cityDropdownOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200/80 rounded-xl transition-colors whitespace-nowrap"
              >
                <MapPin className="w-3.5 h-3.5 text-[#E76F3C]" />
                <span>{activeCity}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {cityDropdownOpen && (
                <div 
                  className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-stone-200 py-1.5 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setCityDropdownOpen(false)}
                >
                  <div className="px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-stone-400">
                    Select Your City
                  </div>
                  {CITIES.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        onCityChange(c.name);
                        setCityDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        activeCity === c.name 
                          ? 'bg-amber-50 text-stone-900 font-bold' 
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      <span>{c.name}</span>
                      {activeCity === c.name && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E76F3C]" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Zone 2: 4-5 single-line clean text nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-stone-600">
            <button
              onClick={() => onNavigate('explore')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'explore' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Explore All
            </button>
            <button
              onClick={() => onNavigate('cafes')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'cafes' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Cafes
            </button>
            <button
              onClick={() => onNavigate('restaurants')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'restaurants' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Restaurants
            </button>
            <button
              onClick={() => onNavigate('map')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'map' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Interactive Map
            </button>
            <button
              onClick={() => onNavigate('trail-planner')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'trail-planner' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Trail Planner
            </button>
            <button
              onClick={() => onNavigate('offers')}
              className={`hover:text-stone-900 transition-colors whitespace-nowrap shrink-0 ${
                currentView === 'offers' ? 'text-stone-950 font-bold' : ''
              }`}
            >
              Perks & Offers
            </button>
          </nav>

          {/* Zone 3: Primary Action controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-xl transition-colors"
              title="Search places, dishes & vibes"
              aria-label="Open search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              type="button"
              onClick={() => onNavigate('saved')}
              className="relative p-2 text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 rounded-xl transition-colors"
              title="Saved places & collections"
              aria-label="View saved places"
            >
              <Heart className="w-5 h-5" />
              {savedCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#E76F3C] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenSuggestModal}
              className="hidden sm:inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-white bg-stone-900 hover:bg-[#E76F3C] rounded-xl transition-colors whitespace-nowrap"
            >
              Suggest a Place
            </button>

            {/* Mobile hamburger toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-stone-700 hover:text-stone-900 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F4] border-b border-stone-200 px-4 py-4 space-y-3 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200/80">
            <span className="text-xs font-semibold uppercase text-stone-400">Current City</span>
            <div className="flex items-center gap-1.5">
              {CITIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => onCityChange(c.name)}
                  className={`px-2 py-1 text-xs rounded-lg ${
                    activeCity === c.name
                      ? 'bg-stone-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => { onNavigate('explore'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
            >
              Explore All
            </button>
            <button
              onClick={() => { onNavigate('cafes'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
            >
              Cafes & Coffee
            </button>
            <button
              onClick={() => { onNavigate('restaurants'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
            >
              Restaurants
            </button>
            <button
              onClick={() => { onNavigate('map'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
            >
              Interactive Map
            </button>
            <button
              onClick={() => { onNavigate('trail-planner'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
            >
              Trail Planner
            </button>
            <button
              onClick={() => { onNavigate('offers'); setMobileMenuOpen(false); }}
              className="text-left px-3 py-2 rounded-lg hover:bg-stone-100 text-stone-800"
            >
              Perks & Offers
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={() => { onOpenSuggestModal(); setMobileMenuOpen(false); }}
              className="w-full py-2 text-center text-xs font-semibold bg-stone-900 text-white rounded-xl"
            >
              + Suggest a Hidden Gem
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
