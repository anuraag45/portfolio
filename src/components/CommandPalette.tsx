import React, { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { Search, ArrowRight, CornerDownLeft, X, MessageSquare, Bot, FileText, Cpu, Mail } from 'lucide-react';
import { CONTACT_DATA } from '../data/content';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(5, 7, 9, 0.88)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '6rem',
        paddingLeft: '1rem',
        paddingRight: '1rem'
      }}
      onClick={onClose}
    >
      <div
        className="hw-box hw-chamfer"
        style={{
          maxWidth: '640px',
          width: '100%',
          backgroundColor: '#0F1418',
          borderColor: 'var(--border-amber)',
          boxShadow: '0 0 40px rgba(255, 176, 0, 0.25)',
          overflow: 'hidden'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Command
          label="PCB Hardware Command Terminal"
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          {/* Input Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '1rem 1.25rem',
              borderBottom: '1px solid var(--border-hardware)',
              backgroundColor: '#090C0E'
            }}
          >
            <Search size={18} color="var(--phosphor-amber)" />
            <Command.Input
              value={query}
              onValueChange={setQuery}
              placeholder="Type a command or jump to section..."
              style={{
                flex: 1,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: 'var(--text-main)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem'
              }}
            />
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--text-dim)',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Command Items List */}
          <Command.List style={{ maxHeight: '340px', overflowY: 'auto', padding: '0.5rem 0' }}>
            <Command.Empty
              style={{
                padding: '2rem',
                textAlign: 'center',
                color: 'var(--text-dim)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem'
              }}
            >
              NO HARDWARE COMMAND REGISTERED FOR "{query.toUpperCase()}"
            </Command.Empty>

            <Command.Group heading="Flagship Systems" style={{ padding: '0.5rem 1.25rem 0.25rem 1.25rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--phosphor-amber)', textTransform: 'uppercase' }}>
              <Command.Item
                onSelect={() => {
                  window.location.hash = 'custom-whatsapp-automation';
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  margin: '0.2rem 0',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <MessageSquare size={16} color="var(--signal-green)" />
                  <span>Custom WhatsApp Conversational Automation Platform</span>
                </div>
                <CornerDownLeft size={12} color="var(--text-dim)" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.location.hash = 'i-love-interviews';
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  margin: '0.2rem 0',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Bot size={16} color="var(--phosphor-amber)" />
                  <span>I Love Interviews AI Assessment &amp; Mock Engine</span>
                </div>
                <CornerDownLeft size={12} color="var(--text-dim)" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.location.hash = 'docflow';
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  margin: '0.2rem 0',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={16} color="var(--oscilloscope-cyan)" />
                  <span>DocFlow Logistics 6-Stage OCR Pipeline</span>
                </div>
                <CornerDownLeft size={12} color="var(--text-dim)" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.location.hash = 'core-inventory';
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  margin: '0.2rem 0',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Cpu size={16} color="var(--text-dim)" />
                  <span>CoreInventory Stock Ledger Spec Sheet</span>
                </div>
                <CornerDownLeft size={12} color="var(--text-dim)" />
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Navigation & Contacts" style={{ padding: '0.75rem 1.25rem 0.25rem 1.25rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--oscilloscope-cyan)', textTransform: 'uppercase' }}>
              <Command.Item
                onSelect={() => {
                  window.location.hash = 'experience';
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <span>Execution Log & Client Work (3 Clients + 2 Internships)</span>
                <CornerDownLeft size={12} color="var(--text-dim)" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  navigator.clipboard.writeText(CONTACT_DATA.email);
                  alert('Email copied: ' + CONTACT_DATA.email);
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  color: 'var(--signal-green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Mail size={16} />
                  <span>Copy Direct Email ({CONTACT_DATA.email})</span>
                </div>
                <CornerDownLeft size={12} color="var(--text-dim)" />
              </Command.Item>

              <Command.Item
                onSelect={() => {
                  window.open(CONTACT_DATA.github, '_blank');
                  onClose();
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.75rem 0.85rem',
                  cursor: 'pointer',
                  borderRadius: '2px',
                  color: 'var(--text-main)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <ArrowRight size={16} />
                  <span>Open GitHub Profile (anuraag45)</span>
                </div>
                <CornerDownLeft size={12} color="var(--text-dim)" />
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer Info */}
          <div
            style={{
              padding: '0.5rem 1.25rem',
              borderTop: '1px solid var(--border-hardware)',
              backgroundColor: '#090C0E',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-dim)'
            }}
          >
            <span>ENGINE: CMDK UNSTYLED TERMINAL</span>
            <span>NAV: [↑/↓]</span>
            <span>DISMISS: [ESC]</span>
          </div>
        </Command>
      </div>
    </div>
  );
};
