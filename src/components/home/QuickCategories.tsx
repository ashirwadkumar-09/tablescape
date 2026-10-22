import React from 'react';
import { CATEGORIES } from '../../data/mockVenues';
import { 
  Coffee, Heart, Laptop, Sparkles, Cake, Sunset, 
  Wallet, Sun, Moon, Dog, Leaf, Compass 
} from 'lucide-react';

interface QuickCategoriesProps {
  onSelectCategory: (categoryId: string) => void;
}

export const QuickCategories: React.FC<QuickCategoriesProps> = ({ onSelectCategory }) => {
  const iconMap: Record<string, React.ElementType> = {
    Coffee,
    Heart,
    Laptop,
    Sparkles,
    Cake,
    Sunset,
    Wallet,
    Sun,
    Moon,
    Dog,
    Leaf,
    Compass
  };

  return (
    <section className="py-14 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Curated Discovery
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
              Explore by Experience
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md">
            Handpicked spaces designed for your exact occasion, vibe, or craving.
          </p>
        </div>

        {/* 12 Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.icon] || Coffee;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group p-4 bg-white hover:bg-stone-50 rounded-2xl border border-stone-200/80 hover:border-stone-300 shadow-2xs hover:shadow-xs transition-all duration-200 flex flex-col items-start text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-stone-100 group-hover:bg-amber-100/70 text-stone-800 group-hover:text-amber-900 flex items-center justify-center mb-3 transition-colors">
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                </div>
                <h3 className="text-sm font-bold text-stone-900 group-hover:text-[#E76F3C] transition-colors line-clamp-1">
                  {cat.label}
                </h3>
                <span className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">
                  {cat.tag}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
