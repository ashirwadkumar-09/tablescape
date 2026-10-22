import React, { useState } from 'react';
import { Search, MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface HeroSectionProps {
  activeCity: string;
  onSearchSubmit: (query: string) => void;
  onExploreClick: () => void;
  onMapClick: () => void;
  onSelectCategory: (category: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  activeCity,
  onSearchSubmit,
  onExploreClick,
  onMapClick,
  onSelectCategory
}) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchSubmit(searchInput.trim());
    } else {
      onExploreClick();
    }
  };

  const trendingPills = [
    'Work Cafes',
    'Date Night',
    'Rooftop Sundowner',
    'Under ₹500 for 2',
    'Artisan Sourdough'
  ];

  return (
    <section className="relative overflow-hidden bg-[#FAF8F4] pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-stone-200/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700">
              <span className="w-2 h-2 rounded-full bg-[#E76F3C]" />
              <span>Lifestyle & Dining Discovery in {activeCity}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-editorial text-stone-950 tracking-tight leading-[1.12] text-balance">
              Your next favourite place is closer than you think.
            </h1>

            <p className="text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed">
              Discover exceptional specialty cafes, candlelit bistros, hidden artisan bakeries, and memorable dining spots near your neighborhood.
            </p>

            {/* Prominent Search Bar */}
            <form onSubmit={handleSearch} className="max-w-xl">
              <div className="flex items-center bg-white p-1.5 rounded-2xl border border-stone-300 shadow-sm focus-within:border-stone-900 focus-within:ring-2 focus-within:ring-stone-900/10 transition-all">
                <div className="pl-3 pr-2 text-stone-400">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search cafes, restaurants, cuisines, or vibes..."
                  className="w-full py-2.5 pr-3 text-sm text-stone-900 bg-transparent placeholder-stone-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
                >
                  <span>Search</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>

            {/* Quick Trending Filter Pills */}
            <div className="flex items-center flex-wrap gap-2 pt-1 text-xs">
              <span className="text-stone-400 font-medium">Quick find:</span>
              {trendingPills.map((pill) => (
                <button
                  key={pill}
                  onClick={() => onSelectCategory(pill)}
                  className="px-3 py-1 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition-colors font-medium"
                >
                  {pill}
                </button>
              ))}
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="px-6 py-3 bg-stone-900 hover:bg-[#E76F3C] text-white text-sm font-bold rounded-xl shadow-xs transition-colors flex items-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Explore All Places</span>
              </button>
              <button
                onClick={onMapClick}
                className="px-6 py-3 bg-white hover:bg-stone-100 text-stone-800 text-sm font-semibold rounded-xl border border-stone-300 transition-colors flex items-center gap-2 shadow-2xs"
              >
                <MapPin className="w-4 h-4 text-[#E76F3C]" />
                <span>Explore on Map</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-stone-200 shadow-xl aspect-4/5 bg-stone-100">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80"
                alt="Aesthetic cafe interior"
                fallbackCategory="Artisanal Cafe"
                fallbackTitle="Specialty Brew Haven"
                className="w-full h-full object-cover"
              />

              {/* Floating Curated Spot Capsule */}
              <div className="absolute bottom-6 inset-x-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-stone-200/80 shadow-lg">
                <div className="flex items-center justify-between text-xs text-amber-700 font-semibold mb-1">
                  <span>FEATURED EDITORIAL PICK</span>
                  <span className="tabular-nums font-bold text-stone-900">★ 4.8</span>
                </div>
                <h4 className="text-base font-bold text-stone-900 line-clamp-1">
                  Araku Coffee & Roastery
                </h4>
                <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                  Indiranagar · Single-origin micro-lot pour-overs & brunch
                </p>
              </div>
            </div>

            {/* Decorative Subtle Accent Badge */}
            <div className="absolute -top-3 -right-3 hidden sm:flex items-center gap-2 bg-stone-900 text-white px-4 py-2 rounded-2xl shadow-lg text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#E76F3C]" />
              <span>District Partner Verified</span>
            </div>
          </div>
        </div>

        {/* Full-width Metric Strip below Hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-14 border-t border-stone-200/80 mt-14">
          <div>
            <div className="text-2xl font-bold font-editorial text-stone-900 tabular-nums">
              100%
            </div>
            <div className="text-xs font-medium text-stone-500 mt-0.5">
              Verified Menus & Prices
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-editorial text-stone-900 tabular-nums">
              5 Cities
            </div>
            <div className="text-xs font-medium text-stone-500 mt-0.5">
              Bengaluru, Mumbai, Delhi & more
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-editorial text-stone-900 tabular-nums">
              Zero
            </div>
            <div className="text-xs font-medium text-stone-500 mt-0.5">
              Fabricated Reviews or Placements
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold font-editorial text-stone-900 tabular-nums">
              District
            </div>
            <div className="text-xs font-medium text-stone-500 mt-0.5">
              Live Integration & Table Booking
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
