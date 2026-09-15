'use client';

import React from 'react';

interface AfricaEmblemProps {
  className?: string;
  size?: number;
}

export function AfricaEmblem({ className = '', size = 32 }: AfricaEmblemProps) {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
      title="SportLead Africa - Pan-African Unity"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
      >
        <defs>
          {/* Gradients representing Pan-African flag vibrancy & life */}
          <linearGradient id="northFacet" x1="20" y1="15" x2="80" y2="35" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#147A3E" />
            <stop offset="100%" stopColor="#0D4A2B" />
          </linearGradient>

          <linearGradient id="westFacet" x1="10" y1="35" x2="50" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C8A951" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>

          <linearGradient id="eastFacet" x1="50" y1="30" x2="90" y2="55" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C8102E" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>

          <linearGradient id="centralFacet" x1="35" y1="45" x2="70" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0D4A2B" />
          </linearGradient>

          <linearGradient id="southFacet" x1="40" y1="65" x2="65" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C8A951" />
            <stop offset="50%" stopColor="#147A3E" />
            <stop offset="100%" stopColor="#0D4A2B" />
          </linearGradient>

          <linearGradient id="madagascarGrad" x1="82" y1="65" x2="92" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C8102E" />
            <stop offset="100%" stopColor="#C8A951" />
          </linearGradient>

          <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="100%" stopColor="#C8A951" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* ── Facets of Africa coming together into a whole ── */}
        
        {/* North Africa / Maghreb / Sahara Facet */}
        <polygon
          points="24,20 48,12 76,16 68,34 46,36 28,32"
          fill="url(#northFacet)"
          opacity="0.95"
        />

        {/* West Africa Facet */}
        <polygon
          points="24,20 28,32 14,38 12,50 32,54 46,36"
          fill="url(#westFacet)"
          opacity="0.92"
        />

        {/* Horn of Africa / East Africa Facet */}
        <polygon
          points="48,12 76,16 68,34 88,42 76,56 60,46 46,36"
          fill="url(#eastFacet)"
          opacity="0.95"
        />

        {/* Central Africa & Equatorial Facet */}
        <polygon
          points="32,54 46,36 60,46 68,64 48,68 34,62"
          fill="url(#centralFacet)"
          opacity="0.92"
        />

        {/* Southern Africa Facet */}
        <polygon
          points="34,62 48,68 68,64 62,82 52,94 44,82"
          fill="url(#southFacet)"
          opacity="0.95"
        />

        {/* Madagascar Island Shard */}
        <polygon
          points="84,66 88,64 90,78 85,82"
          fill="url(#madagascarGrad)"
          opacity="0.95"
        />

        {/* ── Structural / "Broken-down lines" assembling the continent ── */}
        <g stroke="#FAFAF8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          {/* Internal assembly lines */}
          <line x1="28" y1="32" x2="46" y2="36" />
          <line x1="46" y1="36" x2="68" y2="34" />
          <line x1="46" y1="36" x2="60" y2="46" />
          <line x1="46" y1="36" x2="32" y2="54" />
          <line x1="32" y1="54" x2="48" y2="68" />
          <line x1="60" y1="46" x2="68" y2="64" />
          <line x1="48" y1="68" x2="68" y2="64" />
          <line x1="48" y1="68" x2="52" y2="94" />
          <line x1="48" y1="12" x2="46" y2="36" />

          {/* Exterior unified silhouette outline */}
          <polyline points="24,20 48,12 76,16 68,34 88,42 76,56 68,64 62,82 52,94 44,82 34,62 32,54 12,50 14,38 24,20" />
          <polygon points="84,66 88,64 90,78 85,82" />
        </g>

        {/* Dynamic accent lines extending energy outward */}
        <g stroke="#C8A951" strokeWidth="0.8" strokeDasharray="2 2" opacity="0.7">
          <line x1="76" y1="56" x2="84" y2="66" />
          <line x1="88" y1="42" x2="94" y2="40" />
          <line x1="12" y1="50" x2="6" y2="54" />
        </g>

        {/* ── Intersecting Unity Nodes (Luminous Vertices) ── */}
        <circle cx="48" cy="12" r="2.2" fill="#FFFFFF" />
        <circle cx="24" cy="20" r="1.8" fill="#147A3E" />
        <circle cx="76" cy="16" r="2" fill="#C8102E" />
        <circle cx="46" cy="36" r="2.8" fill="#FFFFFF" />
        <circle cx="88" cy="42" r="2.2" fill="#C8102E" />
        <circle cx="12" cy="50" r="2.2" fill="#EAB308" />
        <circle cx="32" cy="54" r="2" fill="#C8A951" />
        <circle cx="60" cy="46" r="2.2" fill="#0284C7" />
        <circle cx="48" cy="68" r="2.5" fill="#FFFFFF" />
        <circle cx="68" cy="64" r="2" fill="#147A3E" />
        <circle cx="52" cy="94" r="2.4" fill="#C8A951" />
        <circle cx="87" cy="74" r="1.8" fill="#FFFFFF" />
      </svg>
    </div>
  );
}
