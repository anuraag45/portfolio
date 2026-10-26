import React, { useState } from 'react';
import { Bot, UserCheck, Award, CheckCircle2, RefreshCw } from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';

interface InterviewTrack {
  id: string;
  category: string;
  role: string;
  question: string;
  candidateSnippet: string;
  adaptiveFollowup: string;
  recommendation: 'STRONG HIRE' | 'HIRE' | 'BORDERLINE';
  overallScore: number;
  rubric: {
    name: string;
    score: number;
    evaluation: string;
  }[];
  strengths: string[];
  risksFlagged: string[];
  telemetryJson: Record<string, any>;
}

export const ILoveInterviewsEngine: React.FC = () => {
  const project = PROJECTS_DATA.find((p) => p.id === 'i-love-interviews')!;

  const tracks: InterviewTrack[] = [
    {
      id: 'system-design',
      category: '01: DISTRIBUTED SYSTEMS',
      role: 'Senior Backend Architect',
      question: 'Design an in-memory distributed cache cluster supporting sub-millisecond reads, write-through invalidation, and protection against thundering herd effects.',
      candidateSnippet: 'I deploy a Redis cluster partitioned with consistent hashing and virtual nodes to balance key distribution. Reads hit local memory replicas with sliding TTLs. On updates, writes hit the relational DB first, broadcasting eviction events over a Kafka topic. To stop thundering herds, we implement distributed mutex locks with randomized jitter backoffs.',
      adaptiveFollowup: 'Solid grasp of consistent hashing and Kafka broadcast. When millions of requests query non-existent keys concurrently (cache penetration), how do you prevent DB saturation without crashing worker nodes?',
      recommendation: 'STRONG HIRE',
      overallScore: 94,
      rubric: [
        { name: 'System Architecture & Sharding', score: 96, evaluation: 'Accurate use of consistent hashing, virtual nodes, and replication.' },
        { name: 'Concurrency & Herd Mitigation', score: 92, evaluation: 'Distributed mutex locks and randomized backoff successfully identified.' },
        { name: 'Cache Invalidation Strategy', score: 95, evaluation: 'Event-driven Kafka bus avoids dual-write race conditions.' },
        { name: 'Communication & Problem Framing', score: 93, evaluation: 'Clear, structured reasoning with minimal hesitation.' }
      ],
      strengths: [
        'Precise understanding of partition tolerance and virtual nodes',
        'Proactively addressed herd stampedes with mutex locks',
        'Identified asynchronous event broadcast over Kafka'
      ],
      risksFlagged: [
        'Needs to incorporate Bloom filters for non-existent key lookups'
      ],
      telemetryJson: {
        trackId: 'SYS_DESIGN_CACHE_01',
        evaluationModel: 'gemini-1.5-pro-preview',
        rubricAdherenceScore: 0.99,
        evalDecision: 'STRONG_HIRE',
        confidenceScore: 0.94,
        keyStrengthsCount: 3,
        suggestedNextProbe: 'Bloom filter implementation & negative caching TTLs'
      }
    },
    {
      id: 'llm-pipelines',
      category: '02: LLM ORCHESTRATION',
      role: 'Staff AI Systems Engineer',
      question: 'How do you build a resilient production LLM gateway supporting multi-provider fallback (OpenAI, Gemini, Claude), prompt injection guards, and deterministic JSON schemas?',
      candidateSnippet: 'I implement an API gateway adapter utilizing circuit breakers with token-bucket rate limiting. Inbound user inputs pass an isolation gate enforcing zero-shot delimiter encapsulation. If Gemini latency exceeds 1200ms or returns a 5xx error, the gateway fails over to Anthropic Claude while enforcing our strict Pydantic/Zod dataclass schemas to guarantee valid downstream JSON.',
      adaptiveFollowup: 'Good circuit breaker and delimiter defense. If the fallback LLM stream suffers partial token truncation mid-JSON payload, how does your dataclass parser recover without breaking the client stream?',
      recommendation: 'STRONG HIRE',
      overallScore: 95,
      rubric: [
        { name: 'LLM Orchestration & Failover', score: 98, evaluation: 'Multi-provider circuit breaker and token buckets well architected.' },
        { name: 'Prompt Security & Injection Defense', score: 94, evaluation: 'Delimiter encapsulation and sanitization pipeline specified.' },
        { name: 'Schema Enforcement & Reliability', score: 95, evaluation: 'Dataclass parsers prevent hallucinated keys.' },
        { name: 'Technical Depth & Clarity', score: 93, evaluation: 'Concise architectural trade-offs explained under 3 minutes.' }
      ],
      strengths: [
        'Multi-provider circuit breaker pattern prevents cascading outages',
        'Strict schema validation over raw regex string matching',
        'Clear understanding of input delimiter boundaries'
      ],
      risksFlagged: [
        'Explore partial JSON AST streaming reconstructors'
      ],
      telemetryJson: {
        trackId: 'AI_LLM_GATEWAY_02',
        evaluationModel: 'gemini-1.5-pro-preview',
        rubricAdherenceScore: 1.0,
        evalDecision: 'STRONG_HIRE',
        confidenceScore: 0.95,
        keyStrengthsCount: 3,
        suggestedNextProbe: 'Partial JSON AST streaming reconstructor evaluation'
      }
    },
    {
      id: 'incident-leadership',
      category: '03: PRODUCTION TRIAGE',
      role: 'Lead Infrastructure Engineer',
      question: 'Walk me through a high-severity production outage you managed. How did you coordinate the resolution, mitigate customer blast radius, and execute the blameless post-mortem?',
      candidateSnippet: 'During a peak traffic deployment, an unindexed foreign key migration triggered row locks that exhausted PostgreSQL connection pools within 90 seconds. I immediately initiated a rollback, routed read traffic to unburdened standby replicas, and restored service in 11 minutes. In the post-mortem, we established automated query EXPLAIN PLAN audits in our CI/CD pipeline.',
      adaptiveFollowup: 'Decisive rollback and recovery speed. To ensure future migrations with large tables never cause locking, what automated canary migration or shadow verification steps did you bake into staging?',
      recommendation: 'STRONG HIRE',
      overallScore: 93,
      rubric: [
        { name: 'Crisis Triage & Rollback Speed', score: 97, evaluation: 'Under-12-minute MTTR with immediate replica read routing.' },
        { name: 'Root Cause Diagnostics', score: 92, evaluation: 'Identified unindexed foreign key lock contention rapidly.' },
        { name: 'Blameless Post-Mortem Culture', score: 95, evaluation: 'Actionable CI/CD prevention rule instituted across engineering.' },
        { name: 'Executive & Team Communication', score: 89, evaluation: 'Calm, structured incident command process demonstrated.' }
      ],
      strengths: [
        'Prioritized immediate customer availability via replica routing',
        'Actionable preventative tooling (automated EXPLAIN PLAN checks in CI)',
        'Championed psychological safety in blameless retro'
      ],
      risksFlagged: [
        'Follow-up needed on blue-green schema migration automation'
      ],
      telemetryJson: {
        trackId: 'INCIDENT_LEADERSHIP_03',
        evaluationModel: 'gemini-1.5-pro-preview',
        rubricAdherenceScore: 0.98,
        evalDecision: 'STRONG_HIRE',
        confidenceScore: 0.93,
        keyStrengthsCount: 3,
        suggestedNextProbe: 'Blue-green schema migration automation strategy'
      }
    }
  ];

  const [activeTrack, setActiveTrack] = useState<InterviewTrack>(tracks[0]);
  const [activeTab, setActiveTab] = useState<'rubric' | 'telemetry'>('rubric');
  const [evaluating, setEvaluating] = useState(false);

  const handleReevaluate = () => {
    setEvaluating(true);
    setTimeout(() => {
      setEvaluating(false);
    }, 400);
  };

  return (
    <div
      id="i-love-interviews"
      style={{
        marginBottom: '6rem',
        paddingTop: '2rem'
      }}
    >
      {/* Flagship Header Card */}
      <div
        className="hw-box hw-chamfer"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--oscilloscope-cyan)',
          padding: '2rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <Bot size={24} color="var(--oscilloscope-cyan)" />
              <h2 style={{ fontSize: '2rem', color: '#FFFFFF' }}>{project.name}</h2>
              <span className="register-tag-cyan">FLAGSHIP // {project.status}</span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--oscilloscope-cyan)' }}>
              {project.tagline}
            </p>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            DEPLOYED: <span style={{ color: 'var(--text-main)' }}>{project.deliveryDate}</span>
          </div>
        </div>

        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '900px' }}>
          {project.description} Engineered as an intelligent mock interview platform running adaptive questioning loops, multi-criteria rubric scoring, and instant recruiter-ready debriefs powered by Google Gemini and OpenAI.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.techStack.map((tech) => (
            <span key={tech} className="register-tag-cyan" style={{ fontSize: '0.75rem' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Rubric & Probing Engine */}
      <div
        className="hw-box hw-chamfer"
        style={{
          padding: '2rem',
          backgroundColor: '#0C1014',
          borderColor: 'var(--border-hardware-bright)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-hardware)', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--oscilloscope-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Award size={18} /> INTERACTIVE ADAPTIVE INTERVIEW &amp; RUBRIC EVALUATION MATRIX
          </div>
          <span className="spec-label" style={{ color: 'var(--oscilloscope-cyan)' }}>
            REAL-TIME RUBRIC ENGINE
          </span>
        </div>

        {/* Track Switchers */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}
          className="track-grid"
        >
          {tracks.map((track) => {
            const isSelected = activeTrack.id === track.id;
            return (
              <button
                key={track.id}
                onClick={() => {
                  setActiveTrack(track);
                  handleReevaluate();
                }}
                className="hw-box"
                style={{
                  padding: '1rem',
                  backgroundColor: isSelected ? 'rgba(0, 229, 255, 0.08)' : 'var(--bg-surface)',
                  borderColor: isSelected ? 'var(--oscilloscope-cyan)' : 'var(--border-hardware)',
                  color: isSelected ? 'var(--oscilloscope-cyan)' : 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: isSelected ? 'var(--oscilloscope-cyan)' : 'var(--text-dim)', marginBottom: '0.35rem' }}>
                  {track.category}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.25 }}>
                  {track.role}
                </div>
              </button>
            );
          })}
        </div>

        {/* Split Screen: Left Interview Stream / Right Rubric Scoring */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 1fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}
          className="interview-split-grid"
        >
          {/* Left Side: Mock Interview Dialogue Stream */}
          <div
            className="hw-box hw-chamfer"
            style={{
              backgroundColor: '#07090C',
              borderColor: 'var(--border-hardware)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '400px'
            }}
          >
            <div>
              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-hardware)',
                  marginBottom: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <UserCheck size={16} color="var(--oscilloscope-cyan)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#FFF' }}>
                    LIVE MOCK INTERVIEW TRANSCRIPT
                  </span>
                </div>
                <button
                  onClick={handleReevaluate}
                  title="Re-run assessment probe"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-hardware)',
                    color: 'var(--text-dim)',
                    padding: '0.25rem 0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem'
                  }}
                >
                  <RefreshCw size={12} className={evaluating ? 'spin-anim' : ''} />
                  <span>RE-EVALUATE</span>
                </button>
              </div>

              {/* Dialogue Transcript */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* 1. Interviewer Question */}
                <div
                  style={{
                    padding: '0.85rem',
                    backgroundColor: 'rgba(0, 229, 255, 0.05)',
                    border: '1px solid rgba(0, 229, 255, 0.25)',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--oscilloscope-cyan)', marginBottom: '0.35rem' }}>
                    AI INTERVIEWER // CORE TECHNICAL PROMPT
                  </div>
                  <div style={{ fontSize: '0.88rem', color: '#FFFFFF', lineHeight: 1.45 }}>
                    "{activeTrack.question}"
                  </div>
                </div>

                {/* 2. Candidate Response */}
                <div
                  style={{
                    padding: '0.85rem',
                    backgroundColor: '#0D1318',
                    border: '1px solid #1E293B',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginBottom: '0.35rem' }}>
                    CANDIDATE RESPONSE // AUDIO STREAM CAPTURE
                  </div>
                  <div style={{ fontSize: '0.83rem', color: '#CBD5E1', lineHeight: 1.5, fontStyle: 'italic' }}>
                    "{activeTrack.candidateSnippet}"
                  </div>
                </div>

                {/* 3. AI Adaptive Probe */}
                <div
                  style={{
                    padding: '0.85rem',
                    backgroundColor: 'rgba(255, 176, 0, 0.06)',
                    border: '1px solid var(--border-amber)',
                    borderRadius: '4px'
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--phosphor-amber)', marginBottom: '0.35rem' }}>
                    AI ADAPTIVE PROBE // EDGE CASE CHALLENGE
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#FEF08A', lineHeight: 1.45 }}>
                    "{activeTrack.adaptiveFollowup}"
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div
              style={{
                marginTop: '1.25rem',
                borderTop: '1px solid var(--border-hardware)',
                paddingTop: '0.65rem',
                display: 'flex',
                justifyContent: 'space-between',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-dim)'
              }}
            >
              <span>MODEL: GEMINI 1.5 PRO + JSON EVAL GATE</span>
              <span style={{ color: 'var(--signal-green)' }}>EVALUATION: PASS</span>
            </div>
          </div>

          {/* Right Side: Scorecard & Multi-Criteria Rubric */}
          <div
            className="hw-box hw-chamfer"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hardware-bright)',
              padding: '1.25rem'
            }}
          >
            {/* Tabs */}
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
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setActiveTab('rubric')}
                  className="hw-btn"
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.3rem 0.6rem',
                    borderColor: activeTab === 'rubric' ? 'var(--oscilloscope-cyan)' : 'var(--border-hardware)',
                    color: activeTab === 'rubric' ? 'var(--oscilloscope-cyan)' : 'var(--text-dim)'
                  }}
                >
                  RUBRIC SCORECARD
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  className="hw-btn"
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.3rem 0.6rem',
                    borderColor: activeTab === 'telemetry' ? 'var(--oscilloscope-cyan)' : 'var(--border-hardware)',
                    color: activeTab === 'telemetry' ? 'var(--oscilloscope-cyan)' : 'var(--text-dim)'
                  }}
                >
                  DECISION TELEMETRY
                </button>
              </div>

              {/* Overall Score Pill */}
              <div
                style={{
                  padding: '0.25rem 0.65rem',
                  backgroundColor: 'rgba(0, 229, 255, 0.1)',
                  border: '1px solid var(--oscilloscope-cyan)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--oscilloscope-cyan)',
                  fontWeight: 700
                }}
              >
                COMPOSITE: {activeTrack.overallScore}/100
              </div>
            </div>

            {activeTab === 'rubric' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                {/* Rubric Bars */}
                {activeTrack.rubric.map((item) => (
                  <div key={item.name} style={{ backgroundColor: '#07090B', padding: '0.65rem 0.85rem', border: '1px solid var(--border-hardware)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#FFF' }}>
                        {item.name}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--oscilloscope-cyan)' }}>
                        {item.score}%
                      </span>
                    </div>

                    <div style={{ height: '4px', backgroundColor: '#1A232A', width: '100%', marginBottom: '0.4rem', borderRadius: '2px', overflow: 'hidden' }}>
                      <div
                        style={{
                          height: '100%',
                          width: `${item.score}%`,
                          backgroundColor: item.score >= 90 ? 'var(--oscilloscope-cyan)' : 'var(--phosphor-amber)',
                          transition: 'width 0.4s ease'
                        }}
                      />
                    </div>

                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.35 }}>
                      {item.evaluation}
                    </div>
                  </div>
                ))}

                {/* Candidate Recommendation Callout */}
                <div
                  style={{
                    padding: '0.75rem',
                    backgroundColor: 'rgba(0, 255, 102, 0.08)',
                    border: '1px solid var(--signal-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CheckCircle2 size={16} color="var(--signal-green)" />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFF' }}>
                      HIRING RECOMMENDATION
                    </span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--signal-green)' }}>
                    {activeTrack.recommendation}
                  </span>
                </div>
              </div>
            ) : (
              /* Telemetry JSON View */
              <div
                style={{
                  backgroundColor: '#07090B',
                  border: '1px solid var(--border-hardware)',
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--oscilloscope-cyan)',
                  maxHeight: '270px',
                  overflowY: 'auto',
                  lineHeight: 1.45
                }}
              >
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(
                    {
                      ...activeTrack.telemetryJson,
                      strengths: activeTrack.strengths,
                      risksFlagged: activeTrack.risksFlagged,
                      rubricScores: activeTrack.rubric.map((r) => ({ axis: r.name, score: r.score }))
                    },
                    null,
                    2
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* 3 Architecture Pillar Callouts */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            borderTop: '1px solid var(--border-hardware)',
            paddingTop: '1.5rem'
          }}
          className="pillar-grid"
        >
          <div className="hw-box" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--oscilloscope-cyan)', marginBottom: '0.4rem' }}>
              01 // ADAPTIVE PROBING
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.35rem' }}>
              Dynamic Edge-Case Follow-ups
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Analyzes candidate answers in real time to generate sharp, non-scripted architectural probes targeting unaddressed edge cases.
            </p>
          </div>

          <div className="hw-box" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--phosphor-amber)', marginBottom: '0.4rem' }}>
              02 // OBJECTIVE RUBRICS
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.35rem' }}>
              Multi-Axis Criteria Evaluation
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Standardizes technical assessment across sharding, concurrency, failover, and communication to eliminate interviewer grading bias.
            </p>
          </div>

          <div className="hw-box" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--signal-green)', marginBottom: '0.4rem' }}>
              03 // RECRUITER ANALYTICS
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.35rem' }}>
              Structured Scorecards &amp; Debriefs
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Exports cryptographically verifiable evaluation summaries, audio/transcript alignments, and hiring signals in seconds.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .track-grid { grid-template-columns: 1fr !important; }
          .interview-split-grid { grid-template-columns: 1fr !important; }
          .pillar-grid { grid-template-columns: 1fr !important; }
        }
        .spin-anim {
          animation: spin 0.4s linear;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
