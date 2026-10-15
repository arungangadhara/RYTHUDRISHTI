/**
 * @file src/components/common/Logo.tsx
 * Custom SVG branding logo for RythuDrishti AI
 * Symbolizes 'Rythu' (Farmer Sprout) + 'Drishti' (Vision Eye / Optical Lens)
 */

import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 36 }) => {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform hover:scale-105 duration-200"
        aria-label="RythuDrishti AI Logo"
      >
        {/* Background shield/circle in deep emerald */}
        <rect width="48" height="48" rx="14" fill="#065F46" />
        
        {/* Subtle decorative field furrows */}
        <path
          d="M6 38C14 36 22 37 30 35C36 33 40 31 42 29"
          stroke="#10B981"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
        <path
          d="M6 42C16 40 24 41 34 38C38 37 40 36 42 35"
          stroke="#34D399"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />

        {/* Outer Drishti (Aperture / Vision lens) arcs */}
        <path
          d="M10 24C14 16 34 16 38 24C34 32 14 32 10 24Z"
          stroke="#A7F3D0"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="#047857"
          fillOpacity="0.3"
        />

        {/* Central Sprout emerging from fertile Telangana soil */}
        <path
          d="M24 32V18"
          stroke="#ECFDF5"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Left leaf (Cotton / Paddy seedling) */}
        <path
          d="M24 23C20 22 17 19 18 15C22 15 24 18 24 23Z"
          fill="#34D399"
          stroke="#ECFDF5"
          strokeWidth="1.2"
        />
        {/* Right leaf */}
        <path
          d="M24 20C28 19 31 16 30 12C26 12 24 15 24 20Z"
          fill="#6EE7B7"
          stroke="#ECFDF5"
          strokeWidth="1.2"
        />
        {/* Vision focus dot / morning sun */}
        <circle cx="24" cy="9" r="2.5" fill="#FBBF24" />
      </svg>
    </div>
  );
};
