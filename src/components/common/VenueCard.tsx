import React from 'react';
import { Venue } from '../../types/venue';
import { Star, Heart, MapPin, Sparkles, Compass } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

interface VenueCardProps {
  venue: Venue;
  isSaved?: boolean;
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  onSelect: (slug: string) => void;
  distanceKm?: number;
  priorityBadge?: string;
}

export const VenueCard: React.FC<VenueCardProps> = ({
  venue,
  isSaved = false,
  onToggleSave,
  onSelect,
  distanceKm,
  priorityBadge
}) => {
  const primaryBadge = priorityBadge || venue.badges[0];

  return (
    <article
      onClick={() => onSelect(venue.slug)}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-200/90 hover:border-stone-300 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Visual Cover Container */}
      <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
        <ImageWithFallback
          src={venue.coverImage}
          alt={venue.name}
          fallbackCategory={venue.cuisineTypes[0] || venue.venueType}
          fallbackTitle={venue.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
        />

        {/* Gradient scrim for top controls */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 pointer-events-none" />

        {/* Top Badges & Save Action */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {primaryBadge ? (
            <span className="text-[11px] font-semibold tracking-wide uppercase px-2.5 py-1 rounded-md bg-stone-900/80 backdrop-blur-md text-white border border-white/10 shadow-xs">
              {primaryBadge}
            </span>
          ) : <div />}

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(e, venue.id);
            }}
            aria-label={isSaved ? 'Remove from saved' : 'Save to favourites'}
            className="w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-stone-700 hover:text-red-500 hover:bg-white shadow-xs transition-colors"
          >
            <Heart
              className={`w-4 h-4 transition-transform active:scale-80 ${
                isSaved ? 'fill-red-500 text-red-500' : 'text-stone-700'
              }`}
            />
          </button>
        </div>

        {/* Bottom image overlay: Status & Price */}
        <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-xs text-white z-10">
          <div className="flex items-center gap-1.5 font-medium px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md">
            <span className={`w-1.5 h-1.5 rounded-full ${
              venue.currentOpenStatus === 'open' ? 'bg-emerald-400' : 'bg-stone-300'
            }`} />
            <span>{venue.currentOpenStatus === 'open' ? 'Open Now' : 'Closed'}</span>
          </div>

          <span className="tabular-nums font-semibold px-2 py-0.5 rounded-md bg-black/50 backdrop-blur-md">
            ₹{venue.estimatedCostForTwo} for 2
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header row: Name & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-base font-bold text-stone-900 group-hover:text-[#E76F3C] transition-colors line-clamp-1">
              {venue.name}
            </h3>

            <div className="flex items-center gap-1 shrink-0 px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200/60 text-stone-900 text-xs font-bold">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>{venue.rating}</span>
            </div>
          </div>

          {/* Subtitle / Cuisines (Zero-pill unboxed text with typographic dot separators) */}
          <div className="flex items-center flex-wrap gap-1.5 text-xs text-stone-500 mb-2">
            <span>{venue.cuisineTypes.slice(0, 2).join(', ')}</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{venue.venueType}</span>
          </div>

          {/* Tagline / Known For */}
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed mb-3">
            {venue.tagline}
          </p>
        </div>

        {/* Footer Meta Row: Locality, Distance, and Verified district tag */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span className="truncate">{venue.locality}</span>
            {distanceKm !== undefined && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-stone-700 font-medium whitespace-nowrap">
                  {distanceKm} km
                </span>
              </>
            )}
          </div>

          {venue.districtListingUrl && (
            <span className="text-[11px] font-medium text-stone-600 hover:text-[#E76F3C] whitespace-nowrap">
              District Partner
            </span>
          )}
        </div>
      </div>
    </article>
  );
};
