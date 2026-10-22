import React from 'react';
import { DiningOffer, Venue } from '../../types/venue';
import { Tag, Calendar, Clock, ExternalLink, Sparkles, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface OffersPageProps {
  offers: DiningOffer[];
  venues: Venue[];
  onSelectVenue: (slug: string) => void;
}

export const OffersPage: React.FC<OffersPageProps> = ({
  offers,
  venues,
  onSelectVenue
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[70vh]">
      <div className="max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 mb-2">
          <Tag className="w-3.5 h-3.5 text-[#E76F3C]" />
          <span>Curated Dining Privileges</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 tracking-tight">
          Perks, Special Menus & Experiences
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          Verified perks, acoustic evenings, and tasting privileges directly from our partner cafes and restaurants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => {
          const venue = venues.find(v => v.id === offer.venueId);

          return (
            <div
              key={offer.id}
              className="bg-white rounded-3xl overflow-hidden border border-stone-200/90 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/9 bg-stone-100 overflow-hidden">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    fallbackCategory={offer.discountType}
                    fallbackTitle={offer.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-md">
                    {offer.discountType}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                    <button
                      onClick={() => venue && onSelectVenue(venue.slug)}
                      className="font-bold text-stone-900 hover:text-[#E76F3C] flex items-center gap-1 transition-colors text-left"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#E76F3C]" />
                      <span>{offer.venueName}</span>
                    </button>
                    <span>{offer.locality}</span>
                  </div>

                  <h3 className="text-lg font-bold text-stone-900 leading-snug">
                    {offer.title}
                  </h3>

                  <p className="text-xs text-stone-600 leading-relaxed mt-2">
                    {offer.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-100 space-y-1.5 text-xs text-stone-500">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      <span>Valid: {offer.validDays}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      <span>Offer expires on {offer.validTill}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 flex items-center justify-between gap-3">
                {venue && (
                  <button
                    onClick={() => onSelectVenue(venue.slug)}
                    className="text-xs font-bold text-stone-800 hover:text-[#E76F3C] transition-colors"
                  >
                    View Venue Spot →
                  </button>
                )}

                {offer.bookingUrl ? (
                  <a
                    href={offer.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Claim / Book</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                    Show at counter
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
