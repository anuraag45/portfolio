import React from 'react';
import { Database, Shield, Lock, ArrowRightLeft } from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';

export const CoreInventoryLedgerSpec: React.FC = () => {
  const project = PROJECTS_DATA.find((p) => p.id === 'core-inventory')!;

  return (
    <div
      id="core-inventory"
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
              <Database size={24} color="var(--phosphor-amber)" />
              <h2 style={{ fontSize: '2rem', color: '#FFFFFF' }}>{project.name}</h2>
              <span className="register-tag">{project.status}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--phosphor-amber)' }}>
              {project.tagline}
            </p>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            DELIVERED: <span style={{ color: 'var(--text-main)' }}>{project.deliveryDate}</span>
          </div>
        </div>

        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '900px' }}>
          {project.description} Engineered around a transaction-based stock ledger architecture ensuring 100% auditability across multi-warehouse operations.
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
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.5rem'
        }}
        className="inventory-grid"
      >
        <div className="hw-box" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--phosphor-amber)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            <ArrowRightLeft size={18} /> DOUBLE-ENTRY STOCK LEDGER
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Every item transfer, check-in, or dispatch generates an immutable ledger record rather than simple count overwrites, preserving full audit history.
          </p>
        </div>

        <div className="hw-box" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--oscilloscope-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            <Shield size={18} /> PER-USER DATA ISOLATION
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Strict tenant barriers separating multi-warehouse inventory data through database queries scoped to verified user contexts.
          </p>
        </div>

        <div className="hw-box" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--signal-green)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            <Lock size={18} /> OTP AUTH & RECOVERY
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            Integrates email OTP validation for account registration, critical ledger overrides, and secure password recovery.
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .inventory-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
