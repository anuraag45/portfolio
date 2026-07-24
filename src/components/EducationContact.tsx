import React, { useState } from 'react';
import { Terminal, Send, Mail, MapPin, GraduationCap, Check, Copy } from 'lucide-react';
import { EDUCATION_DATA, CONTACT_DATA } from '../data/content';

export const EducationContact: React.FC = () => {
  const [signalText, setSignalText] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [sentStatus, setSentStatus] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(CONTACT_DATA.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTransmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signalText.trim()) return;

    const mailtoUrl = `mailto:${CONTACT_DATA.email}?subject=Portfolio%20Signal%20from%20${encodeURIComponent(senderEmail || 'Visitor')}&body=${encodeURIComponent(signalText)}`;
    window.location.href = mailtoUrl;

    setSentStatus('SIGNAL TRANSMITTED TO MAIL CLIENT OK');
    setTimeout(() => setSentStatus(null), 5000);
  };

  return (
    <section
      id="contact"
      style={{
        marginBottom: '4rem',
        paddingTop: '3rem',
        position: 'relative',
        zIndex: 1
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }} className="register-tag-cyan">
            <Terminal size={14} />
            <span>0x04: TRANSMIT SIGNAL & ACADEMIC REGISTERS</span>
          </div>
          <h2 style={{ fontSize: '2.5rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>
            Transmit Signal / Direct Contact
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px' }}>
            Send a direct signal to initiate architectural inquiries, technical audits, or engineering engagements.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}
          className="contact-grid"
        >
          <div
            className="hw-box hw-chamfer"
            style={{
              padding: '2rem',
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-amber)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-hardware)', paddingBottom: '0.75rem' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--phosphor-amber)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Terminal size={16} /> HARDWARE SIGNAL TERMINAL
              </div>
              <span className="spec-label" style={{ color: 'var(--oscilloscope-cyan)' }}>PORT 25 / MAILTO</span>
            </div>

            <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="spec-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
                  YOUR IDENTIFIER / EMAIL
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@organization.com"
                  value={senderEmail}
                  onChange={(e) => setSenderEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#07090B',
                    border: '1px solid var(--border-hardware-bright)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label className="spec-label" style={{ display: 'block', marginBottom: '0.4rem' }}>
                  SIGNAL PAYLOAD / MESSAGE
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe your system architecture, project scope, or technical audit requirements..."
                  value={signalText}
                  onChange={(e) => setSignalText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem',
                    backgroundColor: '#07090B',
                    border: '1px solid var(--border-hardware-bright)',
                    color: 'var(--text-main)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <button type="submit" className="hw-btn hw-btn-primary">
                  <Send size={15} />
                  <span>TRANSMIT SIGNAL</span>
                </button>

                {sentStatus && (
                  <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--signal-green)' }}>
                    {sentStatus}
                  </span>
                )}
              </div>
            </form>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="hw-box" style={{ padding: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
              <h3 style={{ fontSize: '1.1rem', color: '#FFF', marginBottom: '1rem', fontFamily: 'var(--font-heading)' }}>
                Direct Channels
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0.8rem', backgroundColor: '#07090B', border: '1px solid var(--border-hardware)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-main)' }}>
                    <Mail size={16} color="var(--phosphor-amber)" />
                    <span>{CONTACT_DATA.email}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    style={{ background: 'transparent', border: 'none', color: 'var(--oscilloscope-cyan)', cursor: 'pointer' }}
                    title="Copy Email"
                  >
                    {copied ? <Check size={16} color="var(--signal-green)" /> : <Copy size={16} />}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <a
                    href={CONTACT_DATA.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hw-btn"
                    style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                    <span>GITHUB</span>
                  </a>
                  <a
                    href={CONTACT_DATA.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hw-btn"
                    style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                    <span>LINKEDIN</span>
                  </a>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <MapPin size={14} color="var(--phosphor-amber)" />
                  <span>LOCATION: {CONTACT_DATA.location}</span>
                </div>
              </div>
            </div>

            <div className="hw-box hw-chamfer" style={{ padding: '1.25rem', backgroundColor: '#0C1014', borderColor: 'var(--border-hardware)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', color: 'var(--oscilloscope-cyan)', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <GraduationCap size={16} /> ACADEMIC REGISTERS // COMPACT SPEC
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {EDUCATION_DATA.map((edu) => (
                  <div key={edu.degree} style={{ fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#FFF' }}>
                      <span>{edu.degree}</span>
                      <span style={{ color: 'var(--phosphor-amber)', fontFamily: 'var(--font-mono)' }}>{edu.score}</span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {edu.institution} ({edu.period})
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
