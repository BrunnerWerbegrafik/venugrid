import { useState } from 'react';

interface Props {
  src: string;
  alt: string;
  placeholderGradient: string;
  fallbackLabel?: string;
  className?: string;
  imgClassName?: string;
}

/**
 * Image with a dark CSS-gradient fallback and an optional uppercase label
 * displayed as long as the image has not loaded. Once the real image loads
 * successfully, the fallback disappears.
 */
export function PlaceholderImage({
  src,
  alt,
  placeholderGradient,
  fallbackLabel,
  className = '',
  imgClassName = '',
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  const showFallback = !loaded || errored;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: placeholderGradient,
      }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${
          showFallback ? 'opacity-0' : 'opacity-100'
        } ${imgClassName}`}
      />
      {showFallback && fallbackLabel && (
        <div className="pointer-events-none absolute inset-0 flex items-end p-4">
          <span
            className="text-[10px] uppercase"
            style={{
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            {fallbackLabel}
          </span>
        </div>
      )}
    </div>
  );
}
