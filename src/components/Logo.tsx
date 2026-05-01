import React from 'react';

export function VegaLogo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="vegaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#fbbf24" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Outer Orbital Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="40" 
        stroke="currentColor" 
        strokeWidth="1.5" 
        strokeDasharray="4 8" 
        className="text-brand-indigo/30"
      />
      
      {/* Main Star Shape (Vega) */}
      <path 
        d="M50 15L56 44L85 50L56 56L50 85L44 56L15 50L44 44L50 15Z" 
        fill="url(#vegaGrad)"
        filter="url(#glow)"
        className="drop-shadow-lg"
      />
      
      {/* Internal Detail */}
      <circle cx="50" cy="50" r="4" fill="white" className="animate-pulse" />
      
      {/* Abstract "V" in the bottom half */}
      <path 
        d="M35 70L50 85L65 70" 
        stroke="white" 
        strokeWidth="3" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="opacity-80"
      />
    </svg>
  );
}
