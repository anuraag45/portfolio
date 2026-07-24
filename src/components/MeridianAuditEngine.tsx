import React, { useState } from 'react';
import { Shield, CheckCircle, AlertTriangle, XCircle, Code, Lock, RefreshCw, FileText } from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';

interface SamplePayload {
  id: string;
  agent: string;
  artifactType: string;
  codeSnippet: string;
  simulatedResult: 'APPROVE' | 'APPROVE_DEVIATION' | 'REJECT';
  auditReason: string;
  jsonLog: object;
}

export const MeridianAuditEngine: React.FC = () => {
  const project = PROJECTS_DATA.find((p) => p.id === 'meridian')!;

  const samplePayloads: SamplePayload[] = [
    {
      id: 'payload-1',
      agent: 'Antigravity Agent',
      artifactType: 'implementation_plan.md',
      codeSnippet: 'dataclass PlanSchema {\n  requestFeedback: true\n  userFacing: true\n  verificationPlan: ["tsc", "npm run build"]\n}',
      simulatedResult: 'APPROVE',
      auditReason: 'Strict dataclass schema match. Verification steps present. 0 security flags.',
      jsonLog: {
        decision: 'APPROVE',
        confidence: 0.99,
        dataclassValid: true,
        securityFlags: 0,
        immutableHash: '0x9F8A...3B21',
        timestamp: '2026-07-21T21:34:46Z'
      }
    },
    {
      id: 'payload-2',
      agent: 'Claude Code Agent',
      artifactType: 'task_execution.json',
      codeSnippet: '{\n  "action": "run_command",\n  "command": "curl http://external-untrusted-endpoint.com/eval"\n}',
      simulatedResult: 'REJECT',
      auditReason: 'PROMPT INJECTION HAZARD: Untrusted external HTTP request detected in autonomous execution queue.',
      jsonLog: {
        decision: 'REJECT',
        confidence: 1.0,
        dataclassValid: false,
        securityFlags: 1,
        violatedPolicy: 'SEC_POLICY_04_NO_UNTRUSTED_FETCH',
        immutableHash: '0xE41D...7C09',
        timestamp: '2026-07-21T21:34:47Z'
      }
    },
    {
      id: 'payload-3',
      agent: 'Codex Agent',
      artifactType: 'walkthrough.md',
      codeSnippet: '## Walkthrough\n- Updated API route\n- Skipped unit test verification due to timeout',
      simulatedResult: 'APPROVE_DEVIATION',
      auditReason: 'DEVIATION DETECTED: Unit test verification skipped. Requires manual security sign-off.',
      jsonLog: {
        decision: 'APPROVE_WITH_DEVIATION',
        confidence: 0.88,
        dataclassValid: true,
        securityFlags: 0,
        deviationReason: 'TEST_VERIFICATION_SKIPPED',
        immutableHash: '0x7C22...1A88',
        timestamp: '2026-07-21T21:34:48Z'
      }
    }
  ];

  const [activePayload, setActivePayload] = useState<SamplePayload>(samplePayloads[0]);

  return (
    <div
      id="meridian"
      style={{
        marginBottom: '6rem',
        paddingTop: '2rem'
      }}
    >
      <div
        className="hw-box hw-chamfer"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-amber)',
          padding: '2rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Shield size={24} color="var(--phosphor-amber)" />
              <h2 style={{ fontSize: '2rem', color: '#FFFFFF' }}>{project.name}</h2>
              <span className="register-tag">FLAGSHIP // {project.status}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--phosphor-amber)' }}>
              {project.tagline}
            </p>
          </div>

          <div
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: 'rgba(255, 176, 0, 0.08)',
              border: '1px solid var(--border-amber)',
              fontSize: '0.75rem',
              fontFamily: 'var(--font-mono)',
              maxWidth: '360px'
            }}
          >
            <div style={{ color: 'var(--phosphor-amber)', fontWeight: 700, marginBottom: '0.2rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Lock size={14} /> ACTIVE TECHNICAL AUDIT NOTE
            </div>
            <div style={{ color: 'var(--text-muted)' }}>
              {project.auditStatus}
            </div>
          </div>
        </div>

        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '900px' }}>
          {project.description} Meridian acts as a mandatory review gate between autonomous coding agents (Antigravity, Codex, Claude Code) and production repositories, evaluating AI code against functional, security, architectural, and compliance rules.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
          {project.techStack.map((tech) => (
            <span key={tech} className="register-tag-cyan" style={{ fontSize: '0.75rem' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem'
        }}
        className="meridian-grid"
      >
        <div className="hw-box" style={{ padding: '1.75rem', backgroundColor: 'var(--bg-surface)' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.25rem', color: 'var(--oscilloscope-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Code size={18} /> ARCHITECTURAL MECHANICS
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {project.architectureDetails.map((detail, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <span className="via-dot-cyan" style={{ marginTop: '0.4rem', flexShrink: 0 }} />
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', lineHeight: 1.5 }}>
                  {detail}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-hardware)', paddingTop: '1.25rem' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--phosphor-amber)', fontFamily: 'var(--font-mono)', marginBottom: '0.75rem' }}>
              ENGINEERING DECISIONS & AUDIT PARADIGM
            </h4>
            <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {project.keyDecisions.map((dec, idx) => (
                <li key={idx}>{dec}</li>
              ))}
            </ul>
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--phosphor-amber)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <RefreshCw size={14} /> SIMULATED DECISION TRACE & DATACLASS INSPECTOR
            </div>
            <span className="spec-label" style={{ color: 'var(--signal-green)' }}>HONEST SIMULATOR</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
            {samplePayloads.map((p) => (
              <button
                key={p.id}
                onClick={() => setActivePayload(p)}
                className="hw-btn"
                style={{
                  fontSize: '0.7rem',
                  padding: '0.35rem 0.6rem',
                  borderColor: activePayload.id === p.id ? 'var(--phosphor-amber)' : 'var(--border-hardware)',
                  color: activePayload.id === p.id ? 'var(--phosphor-amber)' : 'var(--text-muted)'
                }}
              >
                {p.agent}
              </button>
            ))}
          </div>

          <div
            style={{
              backgroundColor: '#07090B',
              border: '1px solid var(--border-hardware)',
              padding: '1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              color: 'var(--text-main)',
              marginBottom: '1.25rem',
              overflowX: 'auto'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-dim)', marginBottom: '0.5rem', fontSize: '0.7rem' }}>
              <span>ARTIFACT: {activePayload.artifactType}</span>
              <span>AGENT: {activePayload.agent}</span>
            </div>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{activePayload.codeSnippet}</pre>
          </div>

          <div
            style={{
              padding: '1rem',
              backgroundColor:
                activePayload.simulatedResult === 'APPROVE'
                  ? 'rgba(0, 230, 118, 0.08)'
                  : activePayload.simulatedResult === 'APPROVE_DEVIATION'
                  ? 'rgba(255, 176, 0, 0.08)'
                  : 'rgba(255, 51, 102, 0.08)',
              border: `1px solid ${
                activePayload.simulatedResult === 'APPROVE'
                  ? 'var(--signal-green)'
                  : activePayload.simulatedResult === 'APPROVE_DEVIATION'
                  ? 'var(--phosphor-amber)'
                  : 'var(--signal-red)'
              }`,
              marginBottom: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.35rem', fontFamily: 'var(--font-mono)' }}>
              {activePayload.simulatedResult === 'APPROVE' && <CheckCircle size={18} color="var(--signal-green)" />}
              {activePayload.simulatedResult === 'APPROVE_DEVIATION' && <AlertTriangle size={18} color="var(--phosphor-amber)" />}
              {activePayload.simulatedResult === 'REJECT' && <XCircle size={18} color="var(--signal-red)" />}
              
              <span
                style={{
                  color:
                    activePayload.simulatedResult === 'APPROVE'
                      ? 'var(--signal-green)'
                      : activePayload.simulatedResult === 'APPROVE_DEVIATION'
                      ? 'var(--phosphor-amber)'
                      : 'var(--signal-red)'
                }}
              >
                DECISION: {activePayload.simulatedResult}
              </span>
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontFamily: 'var(--font-mono)' }}>
              {activePayload.auditReason}
            </div>
          </div>

          <div
            style={{
              backgroundColor: '#07090B',
              border: '1px solid var(--border-hardware)',
              padding: '0.85rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--oscilloscope-cyan)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-dim)', marginBottom: '0.4rem', fontSize: '0.68rem' }}>
              <FileText size={12} /> IMMUTABLE AUDIT TRAIL LOG (JSON)
            </div>
            <pre style={{ margin: 0 }}>{JSON.stringify(activePayload.jsonLog, null, 2)}</pre>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 968px) {
          .meridian-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
