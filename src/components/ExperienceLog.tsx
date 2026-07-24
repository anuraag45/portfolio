import React, { useState } from 'react';
import { Terminal, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE_DATA } from '../data/content';

export const ExperienceLog: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'freelance' | 'internship'>('all');

  const filteredData = EXPERIENCE_DATA.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section
      id="experience"
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
            <Terminal size={14} />
            <span>0x02: EXECUTION LOG & CLIENT ENGAGEMENTS</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
            System Log & Client Work
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px' }}>
            A chronologically indexed log of 3 production client engagements and 2 industrial engineering internships.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2rem' }}>
          <button
            onClick={() => setFilter('all')}
            className="hw-btn"
            style={{
              fontSize: '0.75rem',
              borderColor: filter === 'all' ? 'var(--phosphor-amber)' : 'var(--border-hardware)',
              color: filter === 'all' ? 'var(--phosphor-amber)' : 'var(--text-dim)'
            }}
          >
            ALL LOGS ({EXPERIENCE_DATA.length})
          </button>
          <button
            onClick={() => setFilter('freelance')}
            className="hw-btn"
            style={{
              fontSize: '0.75rem',
              borderColor: filter === 'freelance' ? 'var(--oscilloscope-cyan)' : 'var(--border-hardware)',
              color: filter === 'freelance' ? 'var(--oscilloscope-cyan)' : 'var(--text-dim)'
            }}
          >
            CLIENT ENGAGEMENTS (3)
          </button>
          <button
            onClick={() => setFilter('internship')}
            className="hw-btn"
            style={{
              fontSize: '0.75rem',
              borderColor: filter === 'internship' ? 'var(--signal-green)' : 'var(--border-hardware)',
              color: filter === 'internship' ? 'var(--signal-green)' : 'var(--text-dim)'
            }}
          >
            INDUSTRIAL INTERNSHIPS (2)
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: '19px',
              width: '2px',
              backgroundColor: 'var(--border-hardware)',
              zIndex: 0
            }}
          />

          {filteredData.map((item, index) => (
            <div
              key={item.id}
              className="hw-box hw-chamfer"
              style={{
                backgroundColor: 'var(--bg-surface)',
                borderColor: item.category === 'freelance' ? 'var(--border-amber)' : 'var(--border-cyan)',
                padding: '1.5rem 1.5rem 1.5rem 3.5rem',
                position: 'relative',
                zIndex: 1,
                marginLeft: '0px'
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: '12px',
                  top: '1.75rem',
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#0B0F12',
                  border: `2px solid ${item.category === 'freelance' ? 'var(--phosphor-amber)' : 'var(--oscilloscope-cyan)'}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: item.category === 'freelance' ? 'var(--phosphor-amber)' : 'var(--oscilloscope-cyan)',
                    borderRadius: '50%'
                  }}
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF' }}>{item.role}</h3>
                    <span
                      className="register-tag"
                      style={{
                        fontSize: '0.65rem',
                        borderColor: item.category === 'freelance' ? 'var(--border-amber)' : 'var(--border-cyan)',
                        color: item.category === 'freelance' ? 'var(--phosphor-amber)' : 'var(--oscilloscope-cyan)'
                      }}
                    >
                      LOG_0{index + 1} // {item.category.toUpperCase()}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {item.organization}
                  </div>
                </div>

                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Calendar size={13} color="var(--phosphor-amber)" /> {item.period}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <MapPin size={13} color="var(--oscilloscope-cyan)" /> {item.location}
                  </span>
                </div>
              </div>

              <ul style={{ paddingLeft: '1.2rem', marginBottom: '1.25rem', color: 'var(--text-main)', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', lineHeight: 1.5 }}>
                {item.deliverables.map((deliv, idx) => (
                  <li key={idx}>{deliv}</li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {item.stack.map((tech) => (
                  <span key={tech} className="spec-value" style={{ fontSize: '0.7rem', padding: '0.15rem 0.4rem', backgroundColor: '#090C0E', border: '1px solid var(--border-hardware)' }}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
