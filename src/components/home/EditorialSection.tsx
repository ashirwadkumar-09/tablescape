import React from 'react';
import { EDITORIAL_GUIDES } from '../../data/mockOffers';
import { EditorialGuide } from '../../types/venue';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface EditorialSectionProps {
  onSelectGuide: (guide: EditorialGuide) => void;
}

export const EditorialSection: React.FC<EditorialSectionProps> = ({ onSelectGuide }) => {
  return (
    <section className="py-16 bg-[#FAF8F4] border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Tablescape Journal
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
              Curated Guides & Local Notes
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md">
            Field-tested recommendations written by local food writers and passionate coffee drinkers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDITORIAL_GUIDES.map((guide) => (
            <article
              key={guide.id}
              onClick={() => onSelectGuide(guide)}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative aspect-16/10 bg-stone-100 overflow-hidden">
                <ImageWithFallback
                  src={guide.coverImage}
                  alt={guide.title}
                  fallbackCategory="Journal Guide"
                  fallbackTitle={guide.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104"
                />
                <div className="absolute top-3 left-3 bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md">
                  {guide.city}
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-stone-400 mb-2">
                    <span>By {guide.author}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {guide.readTime}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-stone-900 group-hover:text-[#E76F3C] transition-colors leading-snug">
                    {guide.title}
                  </h3>

                  <p className="text-xs text-stone-600 mt-2 line-clamp-2 leading-relaxed">
                    {guide.summary}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-800 group-hover:text-[#E76F3C] transition-colors">
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
