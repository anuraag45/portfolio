import React from 'react';
import { HERO_DATA } from '../data/content';
import { Terminal, Cpu, ArrowDownRight, Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        paddingTop: 'calc(var(--header-height) + 3rem)',
        paddingBottom: '4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 1.5rem' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.4rem 0.8rem',
            backgroundColor: 'rgba(255, 176, 0, 0.06)',
            border: '1px solid var(--border-amber)',
            marginBottom: '1.5rem'
          }}
          className="hw-chamfer"
        >
          <span className="via-dot" />
          <span className="spec-label" style={{ color: 'var(--phosphor-amber)' }}>
            {HERO_DATA.status}
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: '3rem',
            alignItems: 'start'
          }}
          className="hero-grid"
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '1.25rem',
                color: '#FFFFFF'
              }}
            >
              {HERO_DATA.name}
            </h1>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: 'var(--phosphor-amber)',
                fontWeight: 700,
                marginBottom: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Cpu size={22} color="var(--phosphor-amber)" />
              <span>{HERO_DATA.title}</span>
            </div>

            <p
              style={{
                fontSize: 'clamp(1rem, 1.25vw, 1.2rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.65,
                maxWidth: '680px',
                marginBottom: '2.5rem'
              }}
            >
              {HERO_DATA.tagline} Focused on conversational AI automation, adaptive LLM interview evaluation engines, asynchronous OCR pipelines, and resilient distributed architectures.
            </p>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
              <a href="#projects" className="hw-btn hw-btn-primary">
                <span>EXPLORE SYSTEMS [0x01]</span>
                <ArrowDownRight size={16} />
              </a>
              <a href="#contact" className="hw-btn hw-btn-cyan">
                <span>TRANSMIT SIGNAL [0x04]</span>
                <Terminal size={16} />
              </a>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1rem',
                borderTop: '1px solid var(--border-hardware)',
                paddingTop: '1.5rem'
              }}
              className="register-grid"
            >
              {HERO_DATA.coreRegisters.map((reg) => (
                <div
                  key={reg.code}
                  className="hw-box"
                  style={{
                    padding: '0.85rem 1rem',
                    backgroundColor: 'var(--bg-surface)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                    <span className="spec-label">{reg.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--phosphor-amber)' }}>
                      {reg.code}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {reg.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="hw-box hw-chamfer"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hardware-bright)',
              padding: '1.5rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid var(--border-hardware)',
                paddingBottom: '0.75rem',
                marginBottom: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--oscilloscope-cyan)' }}>
                <Activity size={16} />
                <span>SIGNAL_TELEMETRY // LIVE</span>
              </div>
              <span className="via-dot-cyan" />
            </div>

            <div style={{ height: '220px', width: '100%', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M 20 40 H 120 V 100 H 220 V 160 H 300" stroke="#3D3220" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M 300 40 H 200 V 80 H 100 V 140 H 20" stroke="#242D35" strokeWidth="2" />
                <path d="M 160 20 V 180" stroke="var(--oscilloscope-cyan)" strokeWidth="1.5" strokeOpacity="0.4" />

                <rect x="110" y="70" width="100" height="60" fill="#182026" stroke="var(--phosphor-amber)" strokeWidth="1.5" rx="2" />
                <text x="160" y="100" textAnchor="middle" fill="var(--phosphor-amber)" fontFamily="Space Mono" fontSize="10" fontWeight="bold">
                  LLM_GATE_v4
                </text>
                <text x="160" y="115" textAnchor="middle" fill="var(--text-dim)" fontFamily="Space Mono" fontSize="8">
                  SYS_CLOCK 100%
                </text>

                <circle cx="20" cy="40" r="4" fill="var(--phosphor-amber)" />
                <circle cx="120" cy="100" r="4" fill="var(--oscilloscope-cyan)" />
                <circle cx="220" cy="160" r="4" fill="var(--phosphor-amber)" />
                <circle cx="300" cy="40" r="4" fill="var(--signal-green)" />
              </svg>
            </div>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
                marginTop: '1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.35rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>LOC: {HERO_DATA.location}</span>
                <span style={{ color: 'var(--oscilloscope-cyan)' }}>PORT: 3000</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>ARCH: LLM + FULL STACK</span>
                <span style={{ color: 'var(--phosphor-amber)' }}>STATUS: OK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .hero-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 640px) {
          .register-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
