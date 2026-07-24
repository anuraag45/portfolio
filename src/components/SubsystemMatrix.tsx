import React from 'react';
import { Cpu } from 'lucide-react';
import { SKILLS_SUBSYSTEMS } from '../data/content';
import { GitHubActivityFeed } from './GitHubActivityFeed';

export const SubsystemMatrix: React.FC = () => {
  return (
    <section
      id="skills"
      style={{
        marginBottom: '6rem',
        paddingTop: '3rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }} className="register-tag">
            <Cpu size={14} />
            <span>0x03: TECHNICAL SUBSYSTEM SPEC SHEET</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Hardware Subsystem Matrix
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '700px' }}>
            A subsystem spec sheet mapping core proficiencies across LLM prompt engineering, high-throughput backend APIs, custom UI components, and infrastructure.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.75rem'
          }}
          className="subsystem-grid"
        >
          {SKILLS_SUBSYSTEMS.map((subsystem) => (
            <div
              key={subsystem.subsystemCode}
              className="hw-box hw-chamfer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: 'var(--border-hardware-bright)',
                padding: '1.75rem'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-hardware)', paddingBottom: '0.75rem', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Cpu size={18} color="var(--phosphor-amber)" />
                  <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF' }}>{subsystem.title}</h3>
                </div>
                <span className="register-tag" style={{ fontSize: '0.65rem' }}>
                  {subsystem.subsystemCode}
                </span>
              </div>

              <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', marginBottom: '1.25rem' }}>
                {subsystem.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {subsystem.items.map((item) => (
                  <div
                    key={item.name}
                    style={{
                      padding: '0.35rem 0.65rem',
                      backgroundColor: '#07090B',
                      border: '1px solid var(--border-hardware)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontFamily: 'var(--font-display)' }}>
                      {item.name}
                    </span>
                    {item.tag && (
                      <span className="spec-label" style={{ fontSize: '0.6rem', color: 'var(--oscilloscope-cyan)' }}>
                        [{item.tag}]
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <GitHubActivityFeed />
      </div>

      <style>{`
        @media (max-width: 900px) {
          .subsystem-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
