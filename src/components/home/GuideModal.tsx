import React from 'react';
import { EditorialGuide, Venue } from '../../types/venue';
import { X, Clock, ArrowRight, Star, MapPin } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface GuideModalProps {
  guide: EditorialGuide | null;
  onClose: () => void;
  venues: Venue[];
  onSelectVenue: (slug: string) => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  guide,
  onClose,
  venues,
  onSelectVenue
}) => {
  if (!guide) return null;

  const featuredVenues = venues.filter(v => guide.featuredVenueIds.includes(v.id));

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Cover */}
        <div className="relative aspect-21/9 bg-stone-100 overflow-hidden shrink-0">
          <ImageWithFallback
            src={guide.coverImage}
            alt={guide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/30" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 inset-x-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-300 uppercase tracking-wider mb-1">
              <span>{guide.city} Editorial</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {guide.readTime}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-editorial leading-tight">
              {guide.title}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-stone-100 text-xs text-stone-500">
            <span>Written by {guide.author}</span>
            <span>Published {guide.date}</span>
          </div>

          <p className="text-base font-medium text-stone-800 leading-relaxed italic border-l-2 border-[#E76F3C] pl-4">
            {guide.subtitle}
          </p>

          <div className="space-y-4 text-sm text-stone-700 leading-relaxed">
            {guide.content.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Featured Venues In this Article */}
          {featuredVenues.length > 0 && (
            <div className="pt-6 border-t border-stone-100">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                Featured Places in This Story
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {featuredVenues.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectVenue(v.slug);
                      onClose();
                    }}
                    className="p-3 bg-stone-50 hover:bg-stone-100 rounded-xl border border-stone-200/80 text-left flex items-center justify-between group transition-colors"
                  >
                    <div className="min-w-0 pr-2">
                      <h4 className="text-xs font-bold text-stone-900 group-hover:text-[#E76F3C] truncate">
                        {v.name}
                      </h4>
                      <p className="text-[11px] text-stone-500 truncate">
                        {v.locality} · ₹{v.estimatedCostForTwo} for 2
                      </p>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-stone-800 bg-white px-2 py-1 rounded-md shrink-0 shadow-2xs">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>{v.rating}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
