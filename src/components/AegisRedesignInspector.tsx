import React, { useState } from 'react';
import { Layers, ShieldCheck, Sliders, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';

export const AegisRedesignInspector: React.FC = () => {
  const project = PROJECTS_DATA.find((p) => p.id === 'aegis-erp')!;
  const [viewMode, setViewMode] = useState<'structured' | 'legacy'>('structured');

  const semanticPalette = [
    { name: 'Primary Action', hex: '#1E3A8A', desc: 'Core System Submit & Nav' },
    { name: 'Success State', hex: '#059669', desc: 'Verified Ledger & OTP' },
    { name: 'Warning Trigger', hex: '#D97706', desc: 'Threshold Alert & Reorder' },
    { name: 'Critical Halt', hex: '#DC2626', desc: 'RBAC Access Denied' },
    { name: 'Neutral Structure', hex: '#0F172A', desc: 'High-Density Table Frame' }
  ];

  return (
    <div
      id="aegis-erp"
      style={{
        marginBottom: '6rem',
        paddingTop: '2rem'
      }}
    >
      <div
        className="hw-box hw-chamfer"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-hardware-bright)',
          padding: '2rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Layers size={24} color="var(--oscilloscope-cyan)" />
              <h2 style={{ fontSize: '2rem', color: '#FFFFFF' }}>{project.name}</h2>
              <span className="register-tag-cyan">{project.status}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--oscilloscope-cyan)' }}>
              {project.tagline}
            </p>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            DELIVERED: <span style={{ color: 'var(--text-main)' }}>{project.deliveryDate}</span>
          </div>
        </div>

        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '900px' }}>
          {project.description} Currently undergoing a major visual architecture transition off legacy glassmorphism toward a high-contrast Structured Navy design system.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.techStack.map((tech) => (
            <span key={tech} className="register-tag" style={{ fontSize: '0.75rem' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '2rem'
        }}
        className="aegis-grid"
      >
        <div className="hw-box" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--phosphor-amber)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ShieldCheck size={18} /> TWO-GATE UI REVIEW PROCESS & GOVERNANCE
          </h3>

          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            To prevent design regression across 8+ ERP modules, every visual change must clear a mandatory two-gate review sequence before shipping to production.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-amber)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
              className="hw-chamfer"
            >
              <div style={{ padding: '0.4rem 0.6rem', backgroundColor: 'var(--phosphor-amber)', color: '#000', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                GATE 1
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFF' }}>Gate 1: Architectural Compliance Check</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Validates RBAC route isolation, MFA triggers & database schema alignment.
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--text-dim)' }}>
              <ArrowRight size={16} style={{ transform: 'rotate(90deg)' }} />
            </div>

            <div
              style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-surface-elevated)',
                border: '1px solid var(--border-cyan)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
              className="hw-chamfer"
            >
              <div style={{ padding: '0.4rem 0.6rem', backgroundColor: 'var(--oscilloscope-cyan)', color: '#000', fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}>
                GATE 2
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#FFF' }}>Gate 2: UI Token & Usability Audit</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  Enforces 5-color semantic palette rules, high contrast & zero glassmorphism blur.
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-hardware)', paddingTop: '1.25rem' }}>
            <h4 style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              MODULE COVERAGE (8+ INTEGRATED MODULES)
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {['Inventory', 'CRM', 'Vendor Mgmt', 'HR', 'Attendance', 'Payroll', 'RBAC Admin', 'MFA Audit'].map((m) => (
                <span key={m} style={{ fontSize: '0.75rem', padding: '0.2rem 0.5rem', backgroundColor: '#090C0E', border: '1px solid var(--border-hardware)', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div
          className="hw-box hw-chamfer"
          style={{
            padding: '1.75rem',
            backgroundColor: '#0C1014',
            borderColor: 'var(--border-hardware-bright)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-hardware)', paddingBottom: '0.75rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--oscilloscope-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sliders size={14} /> VISUAL SYSTEM COMPARISON INSPECTOR
            </div>
            <div style={{ display: 'flex', gap: '0.25rem' }}>
              <button
                onClick={() => setViewMode('structured')}
                className="hw-btn"
                style={{
                  fontSize: '0.7rem',
                  padding: '0.25rem 0.5rem',
                  borderColor: viewMode === 'structured' ? 'var(--oscilloscope-cyan)' : 'var(--border-hardware)',
                  color: viewMode === 'structured' ? 'var(--oscilloscope-cyan)' : 'var(--text-dim)'
                }}
              >
                Structured Navy
              </button>
              <button
                onClick={() => setViewMode('legacy')}
                className="hw-btn"
                style={{
                  fontSize: '0.7rem',
                  padding: '0.25rem 0.5rem',
                  borderColor: viewMode === 'legacy' ? 'var(--signal-red)' : 'var(--border-hardware)',
                  color: viewMode === 'legacy' ? 'var(--signal-red)' : 'var(--text-dim)'
                }}
              >
                Legacy Glassmorphism
              </button>
            </div>
          </div>

          <div
            style={{
              padding: '1.5rem',
              borderRadius: viewMode === 'legacy' ? '16px' : '2px',
              backgroundColor: viewMode === 'structured' ? '#0F172A' : 'rgba(255, 255, 255, 0.05)',
              backdropFilter: viewMode === 'legacy' ? 'blur(16px)' : 'none',
              border: viewMode === 'structured' ? '1px solid #1E3A8A' : '1px solid rgba(255, 255, 255, 0.15)',
              boxShadow: viewMode === 'legacy' ? '0 8px 32px rgba(31, 38, 135, 0.37)' : 'none',
              marginBottom: '1.5rem',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', fontFamily: viewMode === 'structured' ? 'Space Mono' : 'sans-serif' }}>
                {viewMode === 'structured' ? 'ERP_MODULE: PAYROLL_APPROVAL' : 'Payroll Approval Card'}
              </span>
              <span
                style={{
                  fontSize: '0.7rem',
                  padding: '0.2rem 0.5rem',
                  backgroundColor: viewMode === 'structured' ? '#059669' : 'rgba(255, 255, 255, 0.2)',
                  color: '#FFF',
                  borderRadius: viewMode === 'legacy' ? '999px' : '0'
                }}
              >
                {viewMode === 'structured' ? 'VERIFIED // GATE 2 OK' : 'Pending Review'}
              </span>
            </div>

            <div style={{ fontSize: '0.8rem', color: viewMode === 'structured' ? '#94A3B8' : '#CBD5E1', marginBottom: '1rem', lineHeight: 1.4 }}>
              {viewMode === 'structured'
                ? 'High-contrast 5-color semantic palette enforcing clear visual hierarchy, 100% WCAG AAA contrast, and zero GPU blur overhead.'
                : 'Generic semi-transparent blurred backdrop with low text contrast and soft drop shadows.'}
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                style={{
                  padding: '0.4rem 0.8rem',
                  backgroundColor: viewMode === 'structured' ? '#1E3A8A' : '#8B5CF6',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: viewMode === 'legacy' ? '999px' : '2px',
                  fontFamily: viewMode === 'structured' ? 'Space Mono' : 'sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                APPROVE PAYROLL
              </button>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-hardware)', paddingTop: '1rem' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '0.75rem' }}>
              STRUCTURED NAVY 5-COLOR SEMANTIC ACTION PALETTE
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {semanticPalette.map((color) => (
                <div key={color.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <div style={{ width: '12px', height: '12px', backgroundColor: color.hex, border: '1px solid #FFF' }} />
                    <span style={{ color: '#FFF' }}>{color.name}</span>
                  </div>
                  <span style={{ color: 'var(--text-dim)' }}>{color.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .aegis-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
