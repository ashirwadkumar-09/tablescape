import React, { useState } from 'react';
import { Venue } from '../../types/venue';
import { Star, MapPin, Navigation, ZoomIn, ZoomOut, Compass, ExternalLink } from 'lucide-react';
import { ImageWithFallback } from '../common/ImageWithFallback';

interface InteractiveMapProps {
  venues: Venue[];
  selectedVenue: Venue | null;
  onSelectVenue: (venue: Venue) => void;
  onViewDetails: (slug: string) => void;
  userCoords: { lat: number; lng: number } | null;
  radiusKm: number;
  onRadiusChange: (radius: number) => void;
  onDetectLocation: () => void;
  className?: string;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  onViewDetails,
  userCoords,
  radiusKm,
  onRadiusChange,
  onDetectLocation,
  className = ''
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);

  // Center coordinate calculation
  const centerLat = userCoords?.lat || (venues.length > 0 ? venues[0].latitude : 12.9716);
  const centerLng = userCoords?.lng || (venues.length > 0 ? venues[0].longitude : 77.5946);

  // Map viewport dimensions
  const mapWidth = 900;
  const mapHeight = 560;

  // Scale degrees to SVG canvas
  // 1 deg latitude ≈ 111 km. At zoom 1, let's span ~15 km horizontally
  const baseDegSpan = 0.12 / zoomLevel;
  const latSpan = baseDegSpan * (mapHeight / mapWidth);
  const lngSpan = baseDegSpan;

  const latToY = (lat: number) => {
    const diff = centerLat - lat;
    return (mapHeight / 2) + (diff / latSpan) * (mapHeight / 2);
  };

  const lngToX = (lng: number) => {
    const diff = lng - centerLng;
    return (mapWidth / 2) + (diff / lngSpan) * (mapWidth / 2);
  };

  // Radius circle in SVG units
  const radiusInDegrees = radiusKm / 111;
  const radiusPx = (radiusInDegrees / lngSpan) * (mapWidth / 2);

  return (
    <div className={`relative bg-[#F4EFEB] rounded-2xl overflow-hidden border border-stone-200 shadow-sm flex flex-col ${className}`}>
      {/* Top Map Controls Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Radius filter pills */}
        <div className="flex items-center gap-1.5 p-1 bg-white/90 backdrop-blur-md rounded-xl border border-stone-200/80 shadow-xs pointer-events-auto">
          <span className="text-xs font-semibold text-stone-500 px-2 flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-stone-600" />
            Radius:
          </span>
          {[1, 3, 5, 10].map(r => (
            <button
              key={r}
              onClick={() => onRadiusChange(r)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                radiusKm === r
                  ? 'bg-stone-900 text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              }`}
            >
              {r} km
            </button>
          ))}
        </div>

        {/* Location & Zoom controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onDetectLocation}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-800 bg-white/95 backdrop-blur-md border border-stone-200 rounded-xl shadow-xs hover:bg-stone-50 transition-colors"
            title="Detect my current location"
          >
            <Navigation className="w-3.5 h-3.5 text-[#E76F3C]" />
            <span>Near Me</span>
          </button>

          <div className="flex items-center bg-white/95 backdrop-blur-md border border-stone-200 rounded-xl shadow-xs overflow-hidden">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.3, 2.5))}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors border-r border-stone-100"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.3, 0.6))}
              className="p-1.5 text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SVG Canvas Map */}
      <div className="relative w-full h-[520px] overflow-hidden cursor-crosshair">
        <svg
          viewBox={`0 0 ${mapWidth} ${mapHeight}`}
          className="w-full h-full select-none"
        >
          {/* Aesthetic map background grid & roads */}
          <defs>
            <pattern id="mapGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E6E0D7" strokeWidth="0.75" />
            </pattern>
            {/* Subtle radial glow */}
            <radialGradient id="mapVignette" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FAF7F2" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ECE4D8" stopOpacity="1" />
            </radialGradient>
          </defs>

          <rect width={mapWidth} height={mapHeight} fill="url(#mapVignette)" />
          <rect width={mapWidth} height={mapHeight} fill="url(#mapGrid)" opacity="0.7" />

          {/* Stylized arterial boulevards and landmarks */}
          <path
            d={`M 0 ${mapHeight * 0.35} Q ${mapWidth * 0.3} ${mapHeight * 0.45}, ${mapWidth * 0.6} ${mapHeight * 0.3} T ${mapWidth} ${mapHeight * 0.4}`}
            fill="none"
            stroke="#DFD6C9"
            strokeWidth="12"
            strokeLinecap="round"
          />
          <path
            d={`M ${mapWidth * 0.25} 0 Q ${mapWidth * 0.35} ${mapHeight * 0.5}, ${mapWidth * 0.3} ${mapHeight}`}
            fill="none"
            stroke="#DFD6C9"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d={`M ${mapWidth * 0.7} 0 Q ${mapWidth * 0.65} ${mapHeight * 0.4}, ${mapWidth * 0.8} ${mapHeight}`}
            fill="none"
            stroke="#DFD6C9"
            strokeWidth="8"
            strokeLinecap="round"
          />

          {/* Radius perimeter ring */}
          {userCoords && (
            <g>
              <circle
                cx={lngToX(userCoords.lng)}
                cy={latToY(userCoords.lat)}
                r={Math.max(radiusPx, 20)}
                fill="#E76F3C"
                fillOpacity="0.06"
                stroke="#E76F3C"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {/* Center point marker */}
              <circle
                cx={lngToX(userCoords.lng)}
                cy={latToY(userCoords.lat)}
                r="7"
                fill="#202020"
                stroke="#FFFFFF"
                strokeWidth="2.5"
              />
            </g>
          )}

          {/* Venue Markers */}
          {venues.map((venue) => {
            const x = lngToX(venue.longitude);
            const y = latToY(venue.latitude);
            const isSelected = selectedVenue?.id === venue.id;

            // Keep within bounds
            if (x < -20 || x > mapWidth + 20 || y < -20 || y > mapHeight + 20) {
              return null;
            }

            return (
              <g
                key={venue.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectVenue(venue)}
                className="cursor-pointer group"
              >
                {/* Pin shadow */}
                <ellipse cx="0" cy="5" rx="10" ry="3.5" fill="#000000" fillOpacity="0.18" />

                {/* Animated pin body */}
                <path
                  d="M 0 0 C -12 -12, -12 -26, 0 -34 C 12 -26, 12 -12, 0 0 Z"
                  fill={isSelected ? '#E76F3C' : '#1C1A18'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="transition-transform duration-200 group-hover:-translate-y-1"
                />

                {/* Inside icon or rating dot */}
                <circle
                  cx="0"
                  cy="-20"
                  r="5"
                  fill="#FFFFFF"
                />

                {/* Price/Rating Tag Pill below pin */}
                <g transform="translate(0, -42)">
                  <rect
                    x="-28"
                    y="-10"
                    width="56"
                    height="18"
                    rx="9"
                    fill={isSelected ? '#E76F3C' : '#FFFFFF'}
                    stroke={isSelected ? '#E76F3C' : '#E5E0D8'}
                    strokeWidth="1"
                    filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.1))"
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : '#202020'}
                    fontSize="9.5"
                    fontWeight="600"
                    fontFamily="system-ui, sans-serif"
                  >
                    ★ {venue.rating}
                  </text>
                </g>
              </g>
            );
          })}
        </svg>

        {/* Selected Venue Compact Popup Card */}
        {selectedVenue && (
          <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:w-96 z-30 bg-white/98 backdrop-blur-md rounded-2xl border border-stone-200 shadow-xl p-3.5 transition-all animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex gap-3">
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-stone-100">
                <ImageWithFallback
                  src={selectedVenue.coverImage}
                  alt={selectedVenue.name}
                  fallbackTitle={selectedVenue.name}
                  fallbackCategory={selectedVenue.cuisineTypes[0]}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 min-w-0 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-0.5">
                    <span className="text-xs uppercase tracking-wider text-amber-800 font-semibold truncate">
                      {selectedVenue.cuisineTypes[0]}
                    </span>
                    <span className="flex items-center gap-0.5 text-xs font-bold text-stone-900 bg-amber-50 px-1.5 py-0.5 rounded-md">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      {selectedVenue.rating}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-stone-900 truncate">
                    {selectedVenue.name}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5 truncate">
                    <span>{selectedVenue.locality}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums font-medium text-stone-700">₹{selectedVenue.estimatedCostForTwo} for 2</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-2 pt-2 border-t border-stone-100 mt-2">
                  <span className={`text-[11px] font-medium ${
                    selectedVenue.currentOpenStatus === 'open' ? 'text-emerald-700' : 'text-stone-500'
                  }`}>
                    {selectedVenue.currentOpenStatus === 'open' ? 'Open Now' : 'Closed'}
                  </span>

                  <button
                    onClick={() => onViewDetails(selectedVenue.slug)}
                    className="flex items-center gap-1 px-3 py-1 bg-stone-900 hover:bg-[#E76F3C] text-white text-xs font-medium rounded-lg transition-colors whitespace-nowrap"
                  >
                    <span>View Spot</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 right-4 hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-200/80 text-[11px] text-stone-600 shadow-xs pointer-events-none">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-stone-900" />
            <span>Cafes & Venues</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E76F3C]" />
            <span>Active Spot</span>
          </div>
        </div>
      </div>
    </div>
  );
};
