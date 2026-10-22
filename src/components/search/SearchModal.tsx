import React, { useState, useEffect, useRef } from 'react';
import { Search, X, MapPin, Star, Sparkles, ArrowRight } from 'lucide-react';
import { Venue } from '../../types/venue';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  venues: Venue[];
  onSelectVenue: (slug: string) => void;
  onSearchSubmit: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  venues,
  onSelectVenue,
  onSearchSubmit
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const trimmed = query.trim().toLowerCase();

  // Smart autocomplete search against name, cuisine, dishes, ambience, locality
  const matchingVenues = trimmed.length > 0 
    ? venues.filter(v => 
        v.name.toLowerCase().includes(trimmed) ||
        v.locality.toLowerCase().includes(trimmed) ||
        v.cuisineTypes.some(c => c.toLowerCase().includes(trimmed)) ||
        v.ambienceTags.some(a => a.toLowerCase().includes(trimmed)) ||
        v.menuItems.some(m => m.name.toLowerCase().includes(trimmed))
      ).slice(0, 5)
    : [];

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'Enter' && query.trim()) {
      onSearchSubmit(query.trim());
      onClose();
    }
  };

  const quickSuggestions = [
    'Work-Friendly with Wi-Fi',
    'Specialty Coffee',
    'Rooftop for Sunset',
    'Romantic Date Night',
    'Under ₹500 for two',
    'Sourdough Pizza'
  ];

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-stone-200 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-stone-100">
          <Search className="w-5 h-5 text-stone-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search cafes, restaurants, cuisines, dishes, or vibes..."
            className="w-full text-base bg-transparent text-stone-900 placeholder-stone-400 focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-stone-400 hover:text-stone-700 mr-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="px-2.5 py-1 text-xs font-semibold text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Quick suggestions if empty query */}
        {trimmed.length === 0 ? (
          <div className="p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-stone-400 block mb-3">
              Popular Searches
            </span>
            <div className="flex flex-wrap gap-2">
              {quickSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    onSearchSubmit(s);
                    onClose();
                  }}
                  className="px-3 py-1.5 text-xs font-medium bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-xl transition-colors text-left"
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Press Enter to explore all matching places</span>
              <span>Search covers menus, ambience & locations</span>
            </div>
          </div>
        ) : (
          <div className="py-2 max-h-96 overflow-y-auto">
            {matchingVenues.length > 0 ? (
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400 px-4 py-2 block">
                  Places ({matchingVenues.length})
                </span>
                {matchingVenues.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVenue(v.slug);
                      onClose();
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-stone-50 flex items-center justify-between transition-colors group border-b border-stone-50 last:border-b-0"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-11 h-11 rounded-lg overflow-hidden bg-stone-100 shrink-0">
                        <img
                          src={v.coverImage}
                          alt={v.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#E76F3C] transition-colors truncate">
                          {v.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-xs text-stone-500">
                          <span>{v.locality}</span>
                          <span aria-hidden="true">·</span>
                          <span>{v.cuisineTypes[0]}</span>
                          <span aria-hidden="true">·</span>
                          <span className="tabular-nums font-medium text-stone-700">₹{v.estimatedCostForTwo} for 2</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span className="flex items-center gap-0.5 text-xs font-bold text-stone-800 bg-amber-50 px-2 py-0.5 rounded-md">
                        <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                        {v.rating}
                      </span>
                      <ArrowRight className="w-4 h-4 text-stone-400 group-hover:text-stone-900 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </button>
                ))}

                <div className="p-3 bg-stone-50/70 border-t border-stone-100">
                  <button
                    onClick={() => {
                      onSearchSubmit(query.trim());
                      onClose();
                    }}
                    className="w-full py-2 text-center text-xs font-bold text-[#E76F3C] hover:text-[#C55729] transition-colors"
                  >
                    View all matching results for "{query}" →
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center">
                <p className="text-sm font-medium text-stone-700 mb-1">
                  No places matching "{query}"
                </p>
                <p className="text-xs text-stone-500">
                  Try searching for a neighborhood like "Indiranagar", a vibe like "Romantic", or a dish like "Sourdough".
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
