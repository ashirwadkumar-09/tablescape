import React, { useState } from 'react';
import { Wallet, ArrowRight, Check } from 'lucide-react';
import { Venue } from '../../types/venue';

interface BudgetPickerProps {
  venues: Venue[];
  onSelectBudget: (maxBudget: number) => void;
}

export const BudgetPicker: React.FC<BudgetPickerProps> = ({ venues, onSelectBudget }) => {
  const [selectedBand, setSelectedBand] = useState<number>(600);

  const bands = [
    { label: 'Under ₹300', max: 300, desc: 'Chai joints, student bakeries & street spots' },
    { label: '₹300 – ₹600', max: 600, desc: 'Casual specialty cafes, breakfast & bowls' },
    { label: '₹600 – ₹1,000', max: 1000, desc: 'Artisanal bistros, craft brews & weekend brunch' },
    { label: 'Above ₹1,000', max: 3000, desc: 'Fine dining, romantic courtyards & degustation' }
  ];

  // Count venues in this city matching the budget
  const matchCount = venues.filter(v => v.estimatedCostForTwo <= selectedBand).length;

  return (
    <section className="py-14 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              Budget Fit
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-editorial text-stone-900 mt-1">
              Best Spots for Your Budget
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md">
            All prices are estimated averages for two people based on actual menu averages.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bands.map((band) => {
            const isSelected = selectedBand === band.max;
            return (
              <button
                key={band.max}
                onClick={() => {
                  setSelectedBand(band.max);
                  onSelectBudget(band.max);
                }}
                className={`p-5 rounded-2xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md'
                    : 'bg-white hover:bg-stone-50 text-stone-900 border-stone-200/90 shadow-2xs'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs uppercase tracking-wider font-semibold opacity-75">
                      Estimated for 2
                    </span>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#E76F3C] flex items-center justify-center text-white text-xs">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-bold tabular-nums font-editorial">
                    {band.label}
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed ${isSelected ? 'text-stone-300' : 'text-stone-600'}`}>
                    {band.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-current/10 flex items-center justify-between text-xs font-semibold">
                  <span>Explore this bracket</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
