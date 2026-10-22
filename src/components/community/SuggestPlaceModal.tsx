import React, { useState } from 'react';
import { X, Send, Sparkles, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../../services/storage';

interface SuggestPlaceModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeCity: string;
}

export const SuggestPlaceModal: React.FC<SuggestPlaceModalProps> = ({
  isOpen,
  onClose,
  activeCity
}) => {
  const [name, setName] = useState('');
  const [venueType, setVenueType] = useState('cafe');
  const [city, setCity] = useState(activeCity);
  const [locality, setLocality] = useState('');
  const [address, setAddress] = useState('');
  const [suggestedBy, setSuggestedBy] = useState('');
  const [sourceLink, setSourceLink] = useState('');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !locality.trim()) return;

    StorageService.submitSuggestion({
      name: name.trim(),
      venueType,
      city,
      locality: locality.trim(),
      address: address.trim() || `${locality}, ${city}`,
      suggestedBy: suggestedBy.trim() || 'Anonymous Explorer',
      sourceLink: sourceLink.trim(),
      notes: notes.trim()
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-lg rounded-3xl p-6 sm:p-8 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 text-stone-400 hover:text-stone-900 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold font-editorial text-stone-900">
              Thank You for the Gem!
            </h3>
            <p className="text-xs text-stone-500 max-w-xs mx-auto leading-relaxed">
              Your suggestion for <strong>{name}</strong> has been submitted to the editorial verification queue. We will review its menu and coordinates shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[11px] font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Community Scouting</span>
              </div>
              <h2 className="text-xl font-bold font-editorial text-stone-900">
                Suggest a Hidden Gem
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Know a quiet specialty coffee spot, cozy date bistro, or family bakery that belongs on Tablescape?
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Place Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Subko Specialty Coffee, Sourdough Bar..."
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    Venue Type
                  </label>
                  <select
                    value={venueType}
                    onChange={(e) => setVenueType(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 capitalize cursor-pointer"
                  >
                    <option value="cafe">Cafe / Coffee</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="bakery">Artisan Bakery</option>
                    <option value="bistro">Bistro</option>
                    <option value="lounge">Rooftop / Lounge</option>
                    <option value="dessert">Dessert Spot</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-800 block mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Locality / Neighborhood *
                </label>
                <input
                  type="text"
                  required
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  placeholder="e.g. Indiranagar, Bandra West, Hauz Khas..."
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Instagram or Website Link (Optional)
                </label>
                <input
                  type="url"
                  value={sourceLink}
                  onChange={(e) => setSourceLink(e.target.value)}
                  placeholder="https://instagram.com/..."
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-800 block mb-1">
                  Why do you love this place?
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Best cinnamon buns, fast Wi-Fi and quiet garden..."
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 resize-none"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
              <span className="text-[11px] text-stone-400">
                Goes to editorial review before publishing.
              </span>
              <button
                type="submit"
                className="px-5 py-2.5 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Place</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
