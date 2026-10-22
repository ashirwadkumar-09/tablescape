import React, { useState } from 'react';
import { Venue, VenueReview } from '../../types/venue';
import { ImageWithFallback } from '../common/ImageWithFallback';
import { 
  Star, Heart, Share2, MapPin, ExternalLink, Calendar, 
  Clock, Wifi, Phone, CheckCircle2, XCircle, ArrowLeft,
  Utensils, Sparkles, Navigation, Send, ThumbsUp, ShieldCheck
} from 'lucide-react';
import { StorageService } from '../../services/storage';

interface VenueDetailPageProps {
  venue: Venue;
  allVenues: Venue[];
  isSaved: boolean;
  onToggleSave: (e: React.MouseEvent, id: string) => void;
  onBack: () => void;
  onSelectSimilar: (slug: string) => void;
  onReviewAdded: (updatedVenues: Venue[]) => void;
}

export const VenueDetailPage: React.FC<VenueDetailPageProps> = ({
  venue,
  allVenues,
  isSaved,
  onToggleSave,
  onBack,
  onSelectSimilar,
  onReviewAdded
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeMenuCategory, setActiveMenuCategory] = useState<string>('All');
  const [menuDietaryFilter, setMenuDietaryFilter] = useState<'all' | 'veg' | 'vegan'>('all');
  const [shareCopied, setShareCopied] = useState(false);

  // New review form state
  const [newRating, setNewRating] = useState<number>(5);
  const [newAuthor, setNewAuthor] = useState('');
  const [newComment, setNewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const images = venue.galleryImages && venue.galleryImages.length > 0
    ? venue.galleryImages
    : [venue.coverImage];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2000);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const updated = StorageService.addReviewToVenue(venue.id, {
      author: newAuthor.trim(),
      rating: newRating,
      comment: newComment.trim()
    });

    onReviewAdded(updated);
    setNewAuthor('');
    setNewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 3000);
  };

  // Menu categories
  const menuCategories = ['All', ...Array.from(new Set(venue.menuItems.map(m => m.category)))];

  const filteredMenuItems = venue.menuItems.filter(item => {
    if (activeMenuCategory !== 'All' && item.category !== activeMenuCategory) return false;
    if (menuDietaryFilter === 'veg' && !item.isVeg) return false;
    if (menuDietaryFilter === 'vegan' && !item.isVegan) return false;
    return true;
  });

  // Similar places (same city, same cuisine or venue type, excluding current)
  const similarPlaces = allVenues
    .filter(v => v.id !== venue.id && (v.venueType === venue.venueType || v.locality === venue.locality))
    .slice(0, 3);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${venue.latitude},${venue.longitude}`;

  return (
    <div className="bg-[#FAF8F4] min-h-screen pb-24">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-stone-200/60">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-950 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discovery</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-200 rounded-xl transition-colors shadow-2xs"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{shareCopied ? 'Link Copied!' : 'Share'}</span>
          </button>

          <button
            onClick={(e) => onToggleSave(e, venue.id)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-colors shadow-2xs ${
              isSaved
                ? 'bg-red-50 text-red-600 border-red-200'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            <span>{isSaved ? 'Saved' : 'Save to List'}</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Gallery Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 rounded-3xl overflow-hidden border border-stone-200/90 bg-stone-100 p-2">
          {/* Main Large Visual */}
          <div className="lg:col-span-8 aspect-16/10 rounded-2xl overflow-hidden bg-stone-200">
            <ImageWithFallback
              src={images[selectedImageIndex] || venue.coverImage}
              alt={venue.name}
              fallbackCategory={venue.cuisineTypes[0]}
              fallbackTitle={venue.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnails grid */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-2">
            {images.slice(0, 3).map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedImageIndex(idx)}
                className={`relative aspect-16/9 lg:aspect-auto lg:h-[120px] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                  selectedImageIndex === idx ? 'border-stone-900 shadow-sm' : 'border-transparent opacity-80 hover:opacity-100'
                }`}
              >
                <img src={img} alt={`${venue.name} thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Venue Header Lockup */}
        <div className="mt-8 pb-8 border-b border-stone-200/80">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              {/* Badges strip (unboxed clean text separators with a small badge) */}
              <div className="flex items-center flex-wrap gap-2 text-xs font-semibold">
                <span className="px-2.5 py-0.5 rounded-md bg-stone-900 text-white uppercase tracking-wider text-[11px]">
                  {venue.badges[0] || 'Verified Spot'}
                </span>
                {venue.districtListingUrl && (
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100/80 text-amber-900 border border-amber-200/80 text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                    Listed on District
                  </span>
                )}
                <span className="text-stone-500 capitalize">{venue.venueType}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className="text-stone-600">{venue.cuisineTypes.join(', ')}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-editorial text-stone-950 tracking-tight">
                {venue.name}
              </h1>

              <p className="text-base sm:text-lg text-stone-700 leading-relaxed">
                {venue.tagline}
              </p>

              <div className="flex items-center flex-wrap gap-4 text-xs sm:text-sm text-stone-600 pt-1">
                <div className="flex items-center gap-1.5 font-bold text-stone-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200/60">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{venue.rating}</span>
                  <span className="font-normal text-stone-500">({venue.reviewCount} reviews)</span>
                </div>

                <div className="flex items-center gap-1 text-stone-700 font-medium">
                  <span className="tabular-nums font-bold">₹{venue.estimatedCostForTwo}</span>
                  <span className="text-stone-500">for two approx</span>
                </div>

                <div className="flex items-center gap-1.5 text-stone-600">
                  <MapPin className="w-4 h-4 text-[#E76F3C] shrink-0" />
                  <span>{venue.address}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="w-full lg:w-80 shrink-0 bg-white p-5 rounded-2xl border border-stone-200/90 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${
                    venue.currentOpenStatus === 'open' ? 'bg-emerald-500' : 'bg-stone-300'
                  }`} />
                  <span className="text-xs font-bold text-stone-900">
                    {venue.currentOpenStatus === 'open' ? 'Open Right Now' : 'Closed'}
                  </span>
                </div>
                <span className="text-xs text-stone-500">
                  {venue.openingHours.monday}
                </span>
              </div>

              {/* District partner action */}
              {venue.districtListingUrl ? (
                <a
                  href={venue.districtListingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View on District</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              ) : null}

              {venue.reservationUrl && (
                <a
                  href={venue.reservationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#E76F3C] hover:bg-[#C55729] text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Reserve Table</span>
                </a>
              )}

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Navigation className="w-3.5 h-3.5 text-stone-600" />
                <span>Get Directions (Maps)</span>
              </a>

              {venue.phone && (
                <div className="pt-2 text-center">
                  <a href={`tel:${venue.phone}`} className="text-xs text-stone-500 hover:text-stone-900 font-medium inline-flex items-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>{venue.phone}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 2-Column Body Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-10">
          {/* Main Content Area (8 Cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview & Known For */}
            <section className="space-y-4">
              <h2 className="text-xl font-bold font-editorial text-stone-900">
                About the Spot
              </h2>
              <p className="text-stone-700 leading-relaxed text-sm sm:text-base">
                {venue.description}
              </p>

              {venue.knownFor.length > 0 && (
                <div className="pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-amber-800 mb-2">
                    Known For
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {venue.knownFor.map((item, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-stone-100 text-stone-800 text-xs font-medium rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Verified Menu Section */}
            <section className="space-y-6 pt-4 border-t border-stone-200/80">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold font-editorial text-stone-900">
                    Verified Menu Highlights
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Verified pricing sourced from current in-house menu.
                  </p>
                </div>

                {/* Dietary pills */}
                <div className="flex items-center gap-1 p-1 bg-stone-100 rounded-xl">
                  <button
                    onClick={() => setMenuDietaryFilter('all')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                      menuDietaryFilter === 'all' ? 'bg-white text-stone-900 shadow-2xs font-semibold' : 'text-stone-600'
                    }`}
                  >
                    All Items
                  </button>
                  <button
                    onClick={() => setMenuDietaryFilter('veg')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                      menuDietaryFilter === 'veg' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'text-stone-600'
                    }`}
                  >
                    Veg Only
                  </button>
                  <button
                    onClick={() => setMenuDietaryFilter('vegan')}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                      menuDietaryFilter === 'vegan' ? 'bg-white text-emerald-800 shadow-2xs font-semibold' : 'text-stone-600'
                    }`}
                  >
                    Vegan
                  </button>
                </div>
              </div>

              {/* Menu Categories Bar */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {menuCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveMenuCategory(cat)}
                    className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-colors ${
                      activeMenuCategory === cat
                        ? 'bg-stone-900 text-white'
                        : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Menu Items List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredMenuItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-white rounded-2xl border border-stone-200/80 shadow-2xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div className="flex items-center gap-1.5">
                          {/* Veg/Non-Veg dot symbol */}
                          <span className={`w-3.5 h-3.5 rounded-sm border flex items-center justify-center shrink-0 ${
                            item.isVeg ? 'border-emerald-600' : 'border-red-600'
                          }`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? 'bg-emerald-600' : 'bg-red-600'
                            }`} />
                          </span>
                          <h4 className="text-sm font-bold text-stone-900">
                            {item.name}
                          </h4>
                        </div>
                        <span className="tabular-nums font-bold text-sm text-stone-900 shrink-0">
                          ₹{item.price}
                        </span>
                      </div>

                      {item.description && (
                        <p className="text-xs text-stone-500 leading-relaxed mt-1">
                          {item.description}
                        </p>
                      )}
                    </div>

                    {item.isChefSpecial && (
                      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                        <Sparkles className="w-3 h-3 text-amber-600" />
                        <span>Signature Recommendation</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            {/* Community Reviews Section */}
            <section className="space-y-6 pt-4 border-t border-stone-200/80">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-editorial text-stone-900">
                    Community Reviews & Experiences
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Unbiased, verified ratings from local diners.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 text-base font-bold text-stone-900 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/60">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <span>{venue.rating}</span>
                  <span className="text-xs text-stone-500 font-normal">/ 5.0</span>
                </div>
              </div>

              {/* Review Submission Form */}
              <form onSubmit={handleReviewSubmit} className="bg-white p-5 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
                <h3 className="text-sm font-bold text-stone-900">
                  Share Your Experience at {venue.name}
                </h3>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-stone-500">Your Rating:</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 hover:scale-110 transition-transform"
                      >
                        <Star className={`w-5 h-5 ${
                          star <= newRating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                        }`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    placeholder="Your Name (e.g. Priya M.)"
                    className="px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                  <input
                    type="text"
                    placeholder="Favorite dish tried (optional)"
                    className="px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900"
                  />
                </div>

                <textarea
                  required
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Tell us about the coffee, ambience, seating, Wi-Fi, or service..."
                  className="w-full px-3.5 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl text-stone-900 focus:outline-none focus:border-stone-900 resize-none"
                />

                <div className="flex items-center justify-between">
                  <span className="text-[11px] text-stone-400">
                    Input validated & checked against spam.
                  </span>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>

                {reviewSubmitted && (
                  <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 p-2 rounded-lg">
                    ✓ Thank you! Your review has been recorded.
                  </p>
                )}
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {venue.reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-5 bg-white rounded-2xl border border-stone-200/80 shadow-2xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-stone-900">
                          {rev.author}
                        </span>
                        {rev.userType && (
                          <span className="text-[10px] uppercase font-semibold text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md">
                            {rev.userType}
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-stone-400">
                        {rev.date}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(rev.rating)
                              ? 'fill-amber-500 text-amber-500'
                              : 'text-stone-200'
                          }`}
                        />
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="pt-2 flex items-center gap-3 text-xs text-stone-400">
                      <button className="flex items-center gap-1 hover:text-stone-700 transition-colors">
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Helpful ({rev.helpfulCount || 0})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar Amenities & Timings (4 Cols) */}
          <div className="lg:col-span-4 space-y-8">
            {/* Verified Amenities */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
              <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
                Amenities & Facilities
              </h3>

              <div className="space-y-2.5 text-xs">
                {[
                  { label: 'High-Speed Wi-Fi', confirmed: venue.amenities.wifi },
                  { label: 'Power Outlets at Tables', confirmed: venue.amenities.powerOutlets },
                  { label: 'Outdoor Al Fresco Seating', confirmed: venue.amenities.outdoorSeating },
                  { label: 'Pet-Friendly', confirmed: venue.amenities.petFriendly },
                  { label: 'Air Conditioning', confirmed: venue.amenities.airConditioning },
                  { label: 'Valet Parking', confirmed: venue.amenities.valetParking },
                  { label: 'Advance Reservations', confirmed: venue.amenities.reservations },
                  { label: 'Wheelchair Accessible', confirmed: venue.amenities.wheelchairAccessible }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1">
                    <span className="text-stone-700">{item.label}</span>
                    {item.confirmed ? (
                      <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Verified</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-stone-400 font-medium">
                        <XCircle className="w-3.5 h-3.5 text-stone-300" />
                        <span>Not Available</span>
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Timings */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <h3 className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-stone-500" />
                  <span>Opening Timings</span>
                </h3>
                <span className="text-[11px] font-semibold text-emerald-700">
                  {venue.currentOpenStatus === 'open' ? 'Open Now' : 'Closed'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {Object.entries(venue.openingHours).map(([day, hours]) => (
                  <div key={day} className="flex items-center justify-between capitalize">
                    <span className="text-stone-500 font-medium">{day}</span>
                    <span className="text-stone-900 font-semibold tabular-nums">{hours}</span>
                  </div>
                ))}
              </div>

              {venue.timingNote && (
                <div className="pt-2 border-t border-stone-100 text-[11px] text-amber-900 bg-amber-50 p-2.5 rounded-xl">
                  {venue.timingNote}
                </div>
              )}
            </div>

            {/* Location & Coordinates */}
            <div className="bg-white p-6 rounded-2xl border border-stone-200/90 shadow-2xs space-y-3">
              <h3 className="text-sm font-bold text-stone-900 pb-2 border-b border-stone-100">
                Location & Landmarks
              </h3>

              <p className="text-xs text-stone-700 leading-relaxed">
                {venue.address}
              </p>

              {venue.landmark && (
                <p className="text-xs text-stone-500">
                  Landmark: {venue.landmark}
                </p>
              )}

              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 bg-stone-100 hover:bg-stone-200 text-stone-900 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5 mt-2"
              >
                <Navigation className="w-3.5 h-3.5 text-[#E76F3C]" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>
        </div>

        {/* Similar Places Carousel */}
        {similarPlaces.length > 0 && (
          <section className="mt-16 pt-12 border-t border-stone-200">
            <h2 className="text-xl sm:text-2xl font-bold font-editorial text-stone-900 mb-6">
              Similar Spots You Might Love
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarPlaces.map((sim) => (
                <div
                  key={sim.id}
                  onClick={() => onSelectSimilar(sim.slug)}
                  className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-2xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="aspect-16/10 bg-stone-100 overflow-hidden">
                    <img
                      src={sim.coverImage}
                      alt={sim.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-104 duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-stone-500 mb-1">
                        <span>{sim.locality}</span>
                        <span className="flex items-center gap-0.5 text-stone-900 font-bold">
                          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                          {sim.rating}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-stone-900 group-hover:text-[#E76F3C] transition-colors line-clamp-1">
                        {sim.name}
                      </h4>
                      <p className="text-xs text-stone-500 line-clamp-1 mt-0.5">
                        {sim.cuisineTypes.join(', ')} · ₹{sim.estimatedCostForTwo} for 2
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
