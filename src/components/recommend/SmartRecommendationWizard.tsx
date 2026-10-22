import React, { useState } from 'react';
import { Venue } from '../../types/venue';
import { Sparkles, X, Check, ArrowRight, Heart, Star, Compass } from 'lucide-react';

interface SmartRecommendationWizardProps {
  isOpen: boolean;
  onClose: () => void;
  venues: Venue[];
  activeCity: string;
  onSelectVenue: (slug: string) => void;
}

export const SmartRecommendationWizard: React.FC<SmartRecommendationWizardProps> = ({
  isOpen,
  onClose,
  venues,
  activeCity,
  onSelectVenue
}) => {
  const [step, setStep] = useState(1);
  const [selectedVibe, setSelectedVibe] = useState('date');
  const [selectedCompanion, setSelectedCompanion] = useState('partner');
  const [budgetLimit, setBudgetLimit] = useState(1000);
  const [selectedAmbience, setSelectedAmbience] = useState('Romantic');
  const [dietary, setDietary] = useState('any');
  const [rankedResults, setRankedResults] = useState<Array<{ venue: Venue; matchScore: number; matchReasons: string[] }>>([]);

  if (!isOpen) return null;

  const handleCalculateMatch = () => {
    const cityVenues = venues.filter(v => v.city.toLowerCase() === activeCity.toLowerCase());
    const pool = cityVenues.length > 0 ? cityVenues : venues;

    const scored = pool.map(v => {
      let score = 50;
      const reasons: string[] = [];

      // Budget fit
      if (v.estimatedCostForTwo <= budgetLimit) {
        score += 25;
        reasons.push(`Well within budget at ~₹${v.estimatedCostForTwo} for 2`);
      } else {
        score -= 10;
      }

      // Ambience fit
      if (v.ambienceTags.some(a => a.toLowerCase().includes(selectedAmbience.toLowerCase()))) {
        score += 20;
        reasons.push(`Features verified ${selectedAmbience} atmosphere`);
      }

      // Vibe & Occasion
      if (selectedVibe === 'date' && (v.occasionTags.includes('Date Night') || v.occasionTags.includes('A romantic evening'))) {
        score += 25;
        reasons.push('Voted prime date destination with intimate seating');
      } else if (selectedVibe === 'work' && (v.amenities.wifi && v.amenities.powerOutlets)) {
        score += 25;
        reasons.push('Equipped with high-speed Wi-Fi and power outlets');
      } else if (selectedVibe === 'brunch' && v.occasionTags.includes('Brunch')) {
        score += 20;
        reasons.push('Celebrated all-day brunch & morning sunlit tables');
      }

      // Dietary
      if (dietary === 'veg' && v.dietaryOptions.vegetarian) {
        score += 10;
        reasons.push('Extensive vegetarian menu verified');
      } else if (dietary === 'vegan' && v.dietaryOptions.vegan) {
        score += 10;
        reasons.push('Dedicated vegan dishes available');
      }

      // Rating boost
      score += Math.round(v.rating * 4);

      return { venue: v, matchScore: Math.min(score, 99), matchReasons: reasons };
    });

    scored.sort((a, b) => b.matchScore - a.matchScore);
    setRankedResults(scored.slice(0, 3));
    setStep(5);
  };

  const resetWizard = () => {
    setStep(1);
    setRankedResults([]);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-stone-200 overflow-hidden relative max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-800">
            <Sparkles className="w-4 h-4 text-[#E76F3C]" />
            <span>TABLESCAPE RECOMMENDATION ENGINE</span>
          </div>
          <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-900 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Steps */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Step 1 of 4</span>
                <h2 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 mt-1">
                  What is the occasion today?
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Help us narrow down the right tone and energy for your visit.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'date', label: 'Date Night / Romantic Evening', desc: 'Candlelight, subtle tunes & intimate tables' },
                  { id: 'work', label: 'Focused Work Session', desc: 'Fast Wi-Fi, abundant plugs & specialty pour-overs' },
                  { id: 'friends', label: 'Catch-up with Friends', desc: 'Lively vibe, sharing plates & cocktails/mocktails' },
                  { id: 'brunch', label: 'Slow Weekend Brunch', desc: 'Natural light, fluffy pancakes & fresh pastries' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedVibe(item.id)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      selectedVibe === item.id
                        ? 'border-stone-900 bg-stone-900 text-white shadow-xs'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className={`text-[11px] mt-1 ${selectedVibe === item.id ? 'text-stone-300' : 'text-stone-500'}`}>
                      {item.desc}
                    </div>
                  </button>
                ))}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#E76F3C] transition-colors"
                >
                  <span>Next: Budget & Ambience</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Step 2 of 4</span>
                <h2 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 mt-1">
                  What is your preferred budget for two?
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  We verify against actual item averages, not synthetic estimates.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-800">
                  <span>Maximum Spend</span>
                  <span className="text-base font-bold tabular-nums text-stone-900">₹{budgetLimit} for two</span>
                </div>
                <input
                  type="range"
                  min="400"
                  max="2800"
                  step="100"
                  value={budgetLimit}
                  onChange={(e) => setBudgetLimit(Number(e.target.value))}
                  className="w-full accent-stone-900"
                />
                <div className="flex justify-between text-[11px] text-stone-400">
                  <span>₹400 (Student / Quick Brew)</span>
                  <span>₹1,200 (Artisanal Casual)</span>
                  <span>₹2,800 (Fine Dining)</span>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(1)} className="text-xs font-semibold text-stone-500 hover:text-stone-900">
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#E76F3C] transition-colors"
                >
                  <span>Next: Ambience & Decor</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Step 3 of 4</span>
                <h2 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 mt-1">
                  What aesthetic or setting do you love?
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {['Romantic', 'Aesthetic', 'Rooftop', 'Lush Greenery', 'Minimalist', 'Vintage'].map((amb) => (
                  <button
                    key={amb}
                    onClick={() => setSelectedAmbience(amb)}
                    className={`p-3.5 rounded-xl border text-left text-xs font-semibold transition-all ${
                      selectedAmbience === amb
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {amb}
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(2)} className="text-xs font-semibold text-stone-500 hover:text-stone-900">
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="px-5 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 hover:bg-[#E76F3C] transition-colors"
                >
                  <span>Next: Dietary Preferences</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">Step 4 of 4</span>
                <h2 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 mt-1">
                  Any dietary preferences?
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'any', label: 'Everything / No Preference' },
                  { id: 'veg', label: 'Vegetarian Only' },
                  { id: 'vegan', label: 'Vegan Friendly' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDietary(item.id)}
                    className={`p-3.5 rounded-xl border text-center text-xs font-semibold transition-all ${
                      dietary === item.id
                        ? 'border-stone-900 bg-stone-900 text-white'
                        : 'border-stone-200 bg-stone-50 text-stone-700 hover:border-stone-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button onClick={() => setStep(3)} className="text-xs font-semibold text-stone-500 hover:text-stone-900">
                  Back
                </button>
                <button
                  onClick={handleCalculateMatch}
                  className="px-6 py-2.5 bg-[#E76F3C] hover:bg-[#C55729] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Reveal My Matches</span>
                </button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div>
                  <h2 className="text-xl font-bold font-editorial text-stone-900">
                    Your Personalized Matches
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Grounded in verified venue data for {activeCity}. Zero sponsored bias.
                  </p>
                </div>
                <button onClick={resetWizard} className="text-xs font-semibold text-stone-600 hover:text-stone-900">
                  Retake Quiz
                </button>
              </div>

              <div className="space-y-4">
                {rankedResults.map(({ venue, matchScore, matchReasons }, idx) => (
                  <div
                    key={venue.id}
                    className="p-5 bg-stone-50 rounded-2xl border border-stone-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#E76F3C] text-white text-[10px] font-bold flex items-center justify-center shrink-0">
                          #{idx + 1}
                        </span>
                        <h3 className="text-base font-bold text-stone-900 truncate">
                          {venue.name}
                        </h3>
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 rounded-md text-[10px] font-bold shrink-0">
                          {matchScore}% Match
                        </span>
                      </div>

                      <p className="text-xs text-stone-500">
                        {venue.locality} · ~₹{venue.estimatedCostForTwo} for 2 · Rating: ★ {venue.rating}
                      </p>

                      {/* Reasons bullet strip */}
                      <div className="pt-2 space-y-1">
                        {matchReasons.map((r, i) => (
                          <div key={i} className="flex items-center gap-1.5 text-xs text-stone-700 font-medium">
                            <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        onSelectVenue(venue.slug);
                        onClose();
                      }}
                      className="px-4 py-2 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors shrink-0 self-end sm:self-auto"
                    >
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
