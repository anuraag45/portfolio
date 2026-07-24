import React, { useState, useEffect } from 'react';

export const TelemetryFooter: React.FC = () => {
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setUptime((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-hardware)',
        backgroundColor: '#07090C',
        padding: '2rem 1.5rem',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.75rem',
        color: 'var(--text-dim)',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ color: 'var(--phosphor-amber)' }}>ANURAAG SHARMA // 2026</span>
          <span>SYSTEM_UPTIME: {uptime}s</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <span>HEAP_MEM: 32.4 MB</span>
          <span>GPU_ACCEL: ON</span>
          <span style={{ color: 'var(--oscilloscope-cyan)' }}>PORT: 3000 [VITE]</span>
        </div>

        <div style={{ color: 'var(--text-muted)' }}>
          SILICON PCB VISUAL LANGUAGE // NO GRADIENT SLOP
        </div>
      </div>
    </footer>
  );
};
