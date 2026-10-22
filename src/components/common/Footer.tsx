import React from 'react';
import { Compass, Sparkles, Shield, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, filter?: string) => void;
  onOpenSuggestModal: () => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenSuggestModal,
  onOpenAdmin
}) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-24 lg:pb-16 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-stone-800">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <span className="text-2xl font-bold tracking-tight text-white font-editorial">
              TABLESCAPE
            </span>
            <p className="text-stone-400 text-sm max-w-sm leading-relaxed">
              Find your next favourite spot. A curated discovery platform celebrating exceptional cafes, bistros, bakeries, and unforgettable dining experiences.
            </p>
            <div className="text-xs text-stone-500 pt-2">
              <span>Curated across Bengaluru · Mumbai · Delhi NCR · Pune · Hyderabad</span>
            </div>
          </div>

          {/* Quick Discover */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Discover
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('cafes')} className="hover:text-white transition-colors">
                  Specialty Coffee Cafes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore', 'date-night')} className="hover:text-white transition-colors">
                  Date Night Bistros
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore', 'work-cafes')} className="hover:text-white transition-colors">
                  Work & Study Cafes
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore', 'rooftops')} className="hover:text-white transition-colors">
                  Rooftop Dining
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('explore', 'bakeries')} className="hover:text-white transition-colors">
                  Artisan Bakeries
                </button>
              </li>
            </ul>
          </div>

          {/* Experiences & Planner */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Experiences
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={() => onNavigate('trail-planner')} className="hover:text-white transition-colors">
                  Food Trail Planner
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-white transition-colors">
                  Interactive City Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('offers')} className="hover:text-white transition-colors">
                  Dining Perks & Offers
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('saved')} className="hover:text-white transition-colors">
                  Curated Collections
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-4">
              Community
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button onClick={onOpenSuggestModal} className="text-[#E76F3C] font-semibold hover:underline">
                  + Suggest a Hidden Gem
                </button>
              </li>
              <li>
                <button onClick={() => alert('Business claim verification: To claim or verify your cafe listing, email partners@tablescape.in or submit your official District listing link.')} className="hover:text-white transition-colors">
                  Claim Your Business
                </button>
              </li>
              <li>
                <button onClick={onOpenAdmin} className="hover:text-stone-300 transition-colors flex items-center gap-1">
                  <Shield className="w-3 h-3 text-stone-500" />
                  <span>Admin Console</span>
                </button>
              </li>
              <li>
                <span className="text-stone-600">Privacy & Terms</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 TABLESCAPE. Independent lifestyle discovery platform.</p>
          <div className="flex items-center gap-4">
            <span>Verified with District & Partner Networks</span>
            <span aria-hidden="true">·</span>
            <span>Zero Sponsored Rankings</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
