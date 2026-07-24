import React from 'react';

export const TraceBackground: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: 0.25
      }}
    >
      <svg
        width="100%"
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <pattern id="pcb-trace-pattern" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Main horizontal/vertical right-angle traces */}
          <path d="M 0,40 L 80,40 L 120,80 L 200,80" fill="none" stroke="#3D3220" strokeWidth="1.5" />
          <path d="M 40,0 L 40,60 L 80,100 L 80,200" fill="none" stroke="#242D35" strokeWidth="1.5" />
          <path d="M 160,0 L 160,120 L 120,160 L 0,160" fill="none" stroke="#3D3220" strokeWidth="1.5" />
          
          {/* Via Dots */}
          <circle cx="80" cy="40" r="3" fill="#FFB000" />
          <circle cx="120" cy="80" r="2.5" fill="#00E5FF" />
          <circle cx="80" cy="100" r="2.5" fill="#334155" />
          <circle cx="160" cy="120" r="3" fill="#FFB000" />

          {/* Test pad shapes */}
          <rect x="36" y="56" width="8" height="8" fill="none" stroke="#7A5C1E" strokeWidth="1" />
          <rect x="116" y="156" width="8" height="8" fill="none" stroke="#00E5FF" strokeWidth="1" />
        </pattern>
        
        <rect width="100%" height="100%" fill="url(#pcb-trace-pattern)" />
      </svg>
    </div>
  );
};
