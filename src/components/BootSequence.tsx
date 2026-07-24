import React, { useState, useEffect, useRef } from 'react';
import { Cpu, CheckCircle } from 'lucide-react';

interface BootSequenceProps {
  onComplete: () => void;
}

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const bootLines = [
    'ANURAAG_OS v4.16 BIOS INIT...',
    'CPU: ANURAAG CORE i9 @ 3.60GHz (8 CORES DETECTED)',
    'MEMORY REGISTER: 32768 MB OK',
    'CHECKING SUBSYSTEMS...',
    '-> AI_ENGINE: OK (OPENAI / ANTHROPIC / GEMINI READY)',
    '-> BACKEND_STACK: OK (NODE / FASTAPI / POSTGRES READY)',
    '-> HARDWARE_INTERFACE: OK (PCB TRACE MAPPING 100%)',
    'SIGNAL LOCK CONFIRMED. POWERING ON INTERFACE...'
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onCompleteRef.current();
      return;
    }

    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < bootLines.length) {
        setLogs((prev) => [...prev, bootLines[currentIndex]]);
        currentIndex++;
      } else {
        clearInterval(interval);
        timer1 = setTimeout(() => {
          setIsDone(true);
          timer2 = setTimeout(() => {
            onCompleteRef.current();
          }, 400);
        }, 300);
      }
    }, 140);

    const handleSkip = () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      setIsDone(true);
      onCompleteRef.current();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearInterval(interval);
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#07090C',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        opacity: isDone ? 0 : 1,
        pointerEvents: isDone ? 'none' : 'auto',
        transition: 'opacity 0.4s ease',
        fontFamily: 'var(--font-mono)'
      }}
    >
      <div
        className="hw-box hw-chamfer"
        style={{
          maxWidth: '680px',
          width: '100%',
          backgroundColor: '#0B0F12',
          borderColor: 'var(--phosphor-amber)',
          padding: '1.5rem',
          boxShadow: '0 0 30px rgba(255, 176, 0, 0.15)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-hardware)',
            paddingBottom: '0.75rem',
            marginBottom: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--phosphor-amber)' }}>
            <Cpu size={18} />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.1em' }}>
              ANURAAG SHARMA // POST INITIALIZATION
            </span>
          </div>
          <button
            onClick={() => {
              setIsDone(true);
              onCompleteRef.current();
            }}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-hardware-bright)',
              color: 'var(--text-dim)',
              fontSize: '0.7rem',
              fontFamily: 'var(--font-mono)',
              padding: '0.2rem 0.5rem',
              cursor: 'pointer'
            }}
          >
            SKIP POST [ESC]
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            minHeight: '200px',
            fontSize: '0.8rem',
            color: 'var(--text-main)'
          }}
        >
          {logs.map((line, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--phosphor-amber)' }}>&gt;</span>
              <span style={{ color: line.includes('OK') ? 'var(--oscilloscope-cyan)' : 'var(--text-main)' }}>
                {line}
              </span>
            </div>
          ))}
          {logs.length < bootLines.length && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
              <span style={{ color: 'var(--phosphor-amber)' }}>■</span>
              <span style={{ color: 'var(--text-dim)' }}>Initializing hardware bus...</span>
            </div>
          )}
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            borderTop: '1px solid var(--border-hardware)',
            paddingTop: '0.75rem',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.75rem',
            color: 'var(--text-dim)'
          }}
        >
          <span>ADDRESS: 0x7FFF8A90</span>
          <span>MEM: OK</span>
          <span style={{ color: 'var(--signal-green)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <CheckCircle size={12} /> READY
          </span>
        </div>
      </div>
    </div>
  );
};

