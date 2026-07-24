import React, { useState } from 'react';
import { Terminal, Command, Menu, X } from 'lucide-react';

interface TelemetryHeaderProps {
  onOpenCommandPalette: () => void;
  activeSection: string;
}

export const TelemetryHeader: React.FC<TelemetryHeaderProps> = ({
  onOpenCommandPalette,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: '0x00:INIT', href: '#hero' },
    { id: 'projects', label: '0x01:SYSTEMS', href: '#projects' },
    { id: 'experience', label: '0x02:LOGS', href: '#experience' },
    { id: 'skills', label: '0x03:SPEC', href: '#skills' },
    { id: 'contact', label: '0x04:SIGNAL', href: '#contact' }
  ];

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--header-height)',
        backgroundColor: 'rgba(11, 15, 18, 0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--border-hardware)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        fontFamily: 'var(--font-mono)'
      }}
    >
      <a
        href="#hero"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          textDecoration: 'none',
          color: 'var(--text-main)'
        }}
      >
        <div
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-amber)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--phosphor-amber)'
          }}
          className="hw-chamfer"
        >
          <Terminal size={16} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: 700, letterSpacing: '0.05em' }}>
            ANURAAG SHARMA
          </span>
          <span style={{ fontSize: '0.65rem', color: 'var(--phosphor-amber)' }}>
            <span className="via-dot" style={{ marginRight: '0.35rem' }} />
            AI / FULL STACK ARCHITECT
          </span>
        </div>
      </a>

      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem'
        }}
        className="desktop-nav"
      >
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={item.href}
              style={{
                fontSize: '0.75rem',
                textDecoration: 'none',
                color: isActive ? 'var(--phosphor-amber)' : 'var(--text-muted)',
                padding: '0.35rem 0.6rem',
                borderBottom: isActive ? '2px solid var(--phosphor-amber)' : '2px solid transparent',
                transition: 'all 0.15s ease'
              }}
            >
              {item.label}
            </a>
          );
        })}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          onClick={onOpenCommandPalette}
          className="hw-btn"
          style={{
            fontSize: '0.75rem',
            padding: '0.4rem 0.8rem',
            borderColor: 'var(--border-amber)',
            color: 'var(--phosphor-amber)'
          }}
          title="Open Command Palette (Cmd+K)"
        >
          <Command size={14} />
          <span>CMD+K</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'transparent',
            border: '1px solid var(--border-hardware)',
            color: 'var(--text-main)',
            padding: '0.4rem',
            cursor: 'pointer',
            display: 'none'
          }}
          className="mobile-toggle"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>

      {mobileMenuOpen && (
        <div
          style={{
            position: 'absolute',
            top: 'var(--header-height)',
            left: 0,
            right: 0,
            backgroundColor: '#0B0F12',
            borderBottom: '1px solid var(--border-amber)',
            padding: '1rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            zIndex: 999
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '0.85rem',
                textDecoration: 'none',
                color: activeSection === item.id ? 'var(--phosphor-amber)' : 'var(--text-main)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span style={{ color: 'var(--phosphor-amber)' }}>&gt;</span>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
