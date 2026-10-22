import React, { useState } from 'react';
import { Coffee, Utensils, Sparkles } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackCategory?: string;
  fallbackTitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Venue image',
  className = '',
  fallbackCategory = 'Cafe & Dining',
  fallbackTitle = '',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  if (hasError || !src) {
    return (
      <div 
        className={`bg-stone-100 flex flex-col items-center justify-center p-6 text-stone-600 relative overflow-hidden select-none ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-200/60 via-stone-100 to-amber-50/40 pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center text-center max-w-[85%]">
          <div className="w-10 h-10 rounded-full bg-white/80 shadow-xs flex items-center justify-center text-stone-700 mb-2">
            {fallbackCategory.toLowerCase().includes('coffee') ? (
              <Coffee className="w-5 h-5 text-amber-700" />
            ) : fallbackCategory.toLowerCase().includes('fine') ? (
              <Sparkles className="w-5 h-5 text-amber-600" />
            ) : (
              <Utensils className="w-5 h-5 text-stone-700" />
            )}
          </div>
          <span className="text-xs uppercase tracking-wider font-semibold text-stone-500 mb-0.5">
            {fallbackCategory}
          </span>
          {fallbackTitle && (
            <span className="text-sm font-medium text-stone-800 line-clamp-1">
              {fallbackTitle}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-stone-100 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...props}
      />
    </div>
  );
};
