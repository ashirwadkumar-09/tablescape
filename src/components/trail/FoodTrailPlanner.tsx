import React, { useState } from 'react';
import { Venue, FoodTrail, FoodTrailStop } from '../../types/venue';
import { Route, Clock, Wallet, MapPin, Footprints, Car, Sparkles, Share2, Bookmark, Check, ArrowRight } from 'lucide-react';
import { calculateDistanceKm, StorageService } from '../../services/storage';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface FoodTrailPlannerProps {
  venues: Venue[];
  activeCity: string;
  onSelectVenue: (slug: string) => void;
}

export const FoodTrailPlanner: React.FC<FoodTrailPlannerProps> = ({
  venues,
  activeCity,
  onSelectVenue
}) => {
  const [selectedLocality, setSelectedLocality] = useState<string>('Indiranagar');
  const [totalBudget, setTotalBudget] = useState<number>(1200);
  const [stopCount, setStopCount] = useState<number>(3);
  const [timeAvailableHours, setTimeAvailableHours] = useState<number>(4);
  const [travelMode, setTravelMode] = useState<'walking' | 'cab'>('walking');
  const [generatedTrail, setGeneratedTrail] = useState<FoodTrail | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Filter venues in active city
  const cityVenues = venues.filter(v => v.city.toLowerCase() === activeCity.toLowerCase());
  const localities = Array.from(new Set(cityVenues.map(v => v.locality)));

  const handleGenerateTrail = () => {
    // 1. Pick anchor venue near selected locality
    const localityCandidates = cityVenues.filter(v => v.locality === selectedLocality);
    const pool = localityCandidates.length > 0 ? localityCandidates : cityVenues;

    if (pool.length === 0) return;

    // Pick diverse sequence: e.g. Cafe -> Food/Bistro -> Dessert/Bakery/Lounge
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, stopCount);

    let budgetAccumulator = 0;
    const timeSlots = ['11:00 AM', '1:30 PM', '4:30 PM', '7:30 PM'];

    const stops: FoodTrailStop[] = selected.map((v, idx) => {
      const estimatedCost = Math.round(v.estimatedCostForTwo / 2);
      budgetAccumulator += estimatedCost;

      const nextVenue = selected[idx + 1];
      const distToNext = nextVenue
        ? calculateDistanceKm(v.latitude, v.longitude, nextVenue.latitude, nextVenue.longitude)
        : 0;

      const walkingMin = travelMode === 'walking' 
        ? Math.round(distToNext * 14) // ~14 mins per km
        : Math.round(distToNext * 4 + 5);

      return {
        stopOrder: idx + 1,
        timeSlot: timeSlots[idx] || `${12 + idx}:00 PM`,
        venueId: v.id,
        recommendedCategory: v.cuisineTypes[0] || v.venueType,
        durationMinutes: idx === 0 ? 60 : 75,
        suggestedItems: v.menuItems.slice(0, 2).map(m => m.name),
        estimatedSpend: estimatedCost,
        walkingTimeToNextMin: nextVenue ? Math.max(walkingMin, 5) : undefined
      };
    });

    const trail: FoodTrail = {
      id: 'trail-' + Date.now(),
      title: `${selectedLocality} Weekend Taste Crawl`,
      tagline: `${stopCount} curated spots: Specialty brew, savory bites & sweet treats`,
      city: activeCity,
      locality: selectedLocality,
      totalBudget: budgetAccumulator,
      totalDurationHours: timeAvailableHours,
      stops,
      vibe: travelMode === 'walking' ? 'Pedestrian Crawl' : 'Neighborhood Tour',
      coverImage: selected[0]?.coverImage || 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80'
    };

    setGeneratedTrail(trail);
  };

  const handleSaveTrail = () => {
    if (generatedTrail) {
      StorageService.saveUserTrail(generatedTrail);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2500);
    }
  };

  const handleShareTrail = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Header */}
      <div className="max-w-2xl mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 mb-3">
          <Route className="w-3.5 h-3.5 text-[#E76F3C]" />
          <span>Smart Food Trail Planner</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold font-editorial text-stone-900 tracking-tight">
          Plan My Perfect Food Trail
        </h1>
        <p className="text-sm sm:text-base text-stone-600 mt-2 leading-relaxed">
          Create a realistic, sequenced food and cafe crawl tailored to your budget, time, and favorite neighbourhood.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Trail Builder Controls (5 Cols) */}
        <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-3xl border border-stone-200/90 shadow-xs space-y-6">
          <h2 className="text-base font-bold text-stone-900 pb-3 border-b border-stone-100 flex items-center justify-between">
            <span>Trail Preferences</span>
            <span className="text-xs text-stone-400 font-normal">{activeCity}</span>
          </h2>

          {/* Locality Selector */}
          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-2">
              Starting Locality
            </label>
            <div className="flex flex-wrap gap-2">
              {localities.slice(0, 5).map((loc) => (
                <button
                  key={loc}
                  onClick={() => setSelectedLocality(loc)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xl border transition-colors ${
                    selectedLocality === loc
                      ? 'bg-stone-900 text-white border-stone-900 font-semibold'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Number of Stops */}
          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-2">
              Number of Stops
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { count: 2, label: '2 Stops', desc: 'Coffee + Sweet' },
                { count: 3, label: '3 Stops', desc: 'Brew, Lunch & Dessert' },
                { count: 4, label: '4 Stops', desc: 'Full Day Trail' }
              ].map((s) => (
                <button
                  key={s.count}
                  onClick={() => setStopCount(s.count)}
                  className={`p-2.5 rounded-xl border text-center transition-colors ${
                    stopCount === s.count
                      ? 'bg-stone-900 text-white border-stone-900'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="text-xs font-bold">{s.label}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{s.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Budget Limit */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-stone-800 mb-2">
              <span>Target Budget for Trail</span>
              <span className="tabular-nums font-bold text-stone-900">₹{totalBudget}</span>
            </div>
            <input
              type="range"
              min="500"
              max="3500"
              step="100"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value))}
              className="w-full accent-stone-900"
            />
            <div className="flex justify-between text-[10px] text-stone-400 mt-1">
              <span>₹500 (Budget)</span>
              <span>₹1,500 (Moderate)</span>
              <span>₹3,500 (Premium)</span>
            </div>
          </div>

          {/* Travel Mode */}
          <div>
            <label className="text-xs font-semibold text-stone-800 block mb-2">
              Transit Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTravelMode('walking')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors ${
                  travelMode === 'walking'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                <Footprints className="w-4 h-4" />
                <span>Walking Crawl (&lt; 15 min walk)</span>
              </button>

              <button
                onClick={() => setTravelMode('cab')}
                className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-colors ${
                  travelMode === 'cab'
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-stone-50 text-stone-700 border-stone-200'
                }`}
              >
                <Car className="w-4 h-4" />
                <span>Short Cab / Drive</span>
              </button>
            </div>
          </div>

          <button
            onClick={handleGenerateTrail}
            className="w-full py-3 bg-[#E76F3C] hover:bg-[#C55729] text-white text-xs font-bold rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate Itinerary</span>
          </button>
        </div>

        {/* Trail Output & Sequence (7 Cols) */}
        <div className="lg:col-span-7">
          {generatedTrail ? (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Trail Overview Header */}
              <div className="bg-white p-6 rounded-3xl border border-stone-200/90 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E76F3C]">
                    {generatedTrail.vibe}
                  </span>
                  <h3 className="text-xl font-bold font-editorial text-stone-900 mt-0.5">
                    {generatedTrail.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {generatedTrail.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleShareTrail}
                    className="p-2 text-stone-600 hover:text-stone-900 bg-stone-100 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    title="Share Trail"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{copiedShare ? 'Copied' : 'Share'}</span>
                  </button>

                  <button
                    onClick={handleSaveTrail}
                    className="px-3.5 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 hover:bg-[#E76F3C] transition-colors"
                  >
                    {savedSuccess ? <Check className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    <span>{savedSuccess ? 'Saved' : 'Save Trail'}</span>
                  </button>
                </div>
              </div>

              {/* Sequential Stops */}
              <div className="space-y-4">
                {generatedTrail.stops.map((stop, idx) => {
                  const venue = cityVenues.find(v => v.id === stop.venueId);
                  if (!venue) return null;

                  return (
                    <div key={stop.stopOrder} className="relative">
                      {/* Connecting Line if not last stop */}
                      {stop.walkingTimeToNextMin !== undefined && (
                        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-stone-200 -z-10" />
                      )}

                      <div className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs">
                        <div className="flex items-start gap-4">
                          {/* Order Number Badge */}
                          <div className="w-9 h-9 rounded-full bg-stone-900 text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-xs">
                            {stop.stopOrder}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between text-xs text-stone-400 mb-1">
                              <span className="font-semibold text-[#E76F3C]">
                                {stop.timeSlot} · {stop.durationMinutes} mins
                              </span>
                              <span className="tabular-nums font-bold text-stone-900">
                                ~₹{stop.estimatedSpend}
                              </span>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                              <h4 
                                onClick={() => onSelectVenue(venue.slug)}
                                className="text-base font-bold text-stone-900 hover:text-[#E76F3C] cursor-pointer transition-colors truncate"
                              >
                                {venue.name}
                              </h4>
                              <button
                                onClick={() => onSelectVenue(venue.slug)}
                                className="text-xs font-semibold text-[#E76F3C] hover:underline shrink-0"
                              >
                                View Spot →
                              </button>
                            </div>

                            <p className="text-xs text-stone-500 mt-0.5 truncate">
                              {venue.address}
                            </p>

                            {/* Suggested items to order */}
                            {stop.suggestedItems.length > 0 && (
                              <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-600">
                                <span className="font-semibold text-stone-800">Must Try:</span>
                                <span className="truncate">{stop.suggestedItems.join(' · ')}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Walking leg banner */}
                        {stop.walkingTimeToNextMin !== undefined && (
                          <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-2 text-xs text-stone-500 bg-stone-50 -mx-5 -mb-5 px-5 py-2.5 rounded-b-2xl">
                            {travelMode === 'walking' ? (
                              <Footprints className="w-3.5 h-3.5 text-stone-600" />
                            ) : (
                              <Car className="w-3.5 h-3.5 text-stone-600" />
                            )}
                            <span>
                              {travelMode === 'walking' 
                                ? `~${stop.walkingTimeToNextMin} min stroll to next spot` 
                                : `~${stop.walkingTimeToNextMin} min cab ride to next spot`}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total Pacing & Summary */}
              <div className="p-5 bg-stone-100 rounded-2xl flex items-center justify-between text-xs text-stone-700 font-medium">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-stone-600" />
                  <span>Total Estimated Spend for Trail:</span>
                </div>
                <span className="tabular-nums font-bold text-sm text-stone-900">
                  ₹{generatedTrail.totalBudget}
                </span>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl border border-stone-200/90 p-12 text-center flex flex-col items-center justify-center min-h-[420px]">
              <div className="w-14 h-14 rounded-full bg-amber-50 flex items-center justify-center text-[#E76F3C] mb-4">
                <Route className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold text-stone-900 mb-1">
                Customize & Click "Generate Itinerary"
              </h3>
              <p className="text-xs text-stone-500 max-w-sm leading-relaxed mb-6">
                We'll calculate optimal distances, opening hours, and budget pacing across your chosen neighborhood.
              </p>
              <button
                onClick={handleGenerateTrail}
                className="px-6 py-2.5 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors"
              >
                Generate Weekend Trail
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
