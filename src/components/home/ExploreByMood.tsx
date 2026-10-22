import React from 'react';
import { MOODS } from '../../data/mockVenues';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ExploreByMoodProps {
  onSelectMood: (moodId: string) => void;
}

export const ExploreByMood: React.FC<ExploreByMoodProps> = ({ onSelectMood }) => {
  return (
    <section className="py-14 bg-stone-100/70 border-y border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Atmosphere & Vibe
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
              Explore by How You Feel Today
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md">
            Whether you need solitary focus or a celebratory rooftop feast, find spaces matching your exact state of mind.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MOODS.map((m) => (
            <button
              key={m.id}
              onClick={() => onSelectMood(m.id)}
              className="group p-5 bg-white hover:bg-amber-50/40 rounded-2xl border border-stone-200/90 hover:border-amber-300/80 shadow-2xs hover:shadow-xs transition-all duration-200 text-left flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-stone-400 group-hover:text-amber-800 transition-colors uppercase tracking-wider">
                    {m.badge}
                  </span>
                  <Sparkles className="w-4 h-4 text-stone-300 group-hover:text-[#E76F3C] transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#E76F3C] transition-colors">
                  {m.title}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                  {m.subtitle}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-stone-700 group-hover:text-[#E76F3C] transition-colors">
                <span>View matching spots</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
