import React, { useState } from 'react';
import { Cpu, FileText } from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';

export const DocFlowPipeline: React.FC = () => {
  const project = PROJECTS_DATA.find((p) => p.id === 'docflow')!;
  const [activeStage, setActiveStage] = useState<number>(2);

  const stages = [
    {
      id: 0,
      name: '01: INGEST',
      title: 'Document Upload & Payload Hashing',
      desc: 'Ingests PDF/Image shipment manifests, generates SHA-256 hash for deduplication.'
    },
    {
      id: 1,
      name: '02: QUEUE',
      title: 'Celery + Redis Async Worker Pool',
      desc: 'Dispatches heavy compute tasks to Celery worker queue to maintain sub-100ms API response.'
    },
    {
      id: 2,
      name: '03: OCR',
      title: 'PaddleOCR Vision Engine',
      desc: 'Extracts raw text coordinates, bounding boxes, and image features across Bills of Lading.'
    },
    {
      id: 3,
      name: '04: EXTRACT',
      title: 'Field Extraction Engine',
      desc: 'Maps OCR text blocks into structured invoice numbers, dates, weights, and line items.'
    },
    {
      id: 4,
      name: '05: VALIDATE',
      title: 'Rule Validation & Exception Trigger',
      desc: 'Evaluates field accuracy rules; flags missing fields or mathematical discrepancies.'
    },
    {
      id: 5,
      name: '06: INDEX',
      title: 'Full-Text & Vector Search Storage',
      desc: 'Indexes extracted data into PostgreSQL full-text search and vector embeddings.'
    }
  ];

  return (
    <div
      id="docflow"
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
              <FileText size={24} color="var(--oscilloscope-cyan)" />
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
          {project.description} Engineered as a 6-stage circuit trace pipeline processing Bills of Lading, invoices, and shipment receipts asynchronously.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.techStack.map((tech) => (
            <span key={tech} className="register-tag-cyan" style={{ fontSize: '0.75rem' }}>
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div
        className="hw-box hw-chamfer"
        style={{
          padding: '2rem',
          backgroundColor: '#0C1014',
          borderColor: 'var(--border-cyan)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-hardware)', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--oscilloscope-cyan)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Cpu size={18} /> INTERACTIVE 6-STAGE ASYNC CIRCUIT TRACE PIPELINE
          </div>
          <span className="spec-label" style={{ color: 'var(--oscilloscope-cyan)' }}>CLICK STAGE TO INSPECT</span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(6, 1fr)',
            gap: '0.75rem',
            marginBottom: '2rem'
          }}
          className="pipeline-grid"
        >
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(stage.id)}
                className="hw-box"
                style={{
                  padding: '1rem 0.75rem',
                  backgroundColor: isActive ? 'rgba(0, 229, 255, 0.12)' : 'var(--bg-surface)',
                  borderColor: isActive ? 'var(--oscilloscope-cyan)' : 'var(--border-hardware)',
                  color: isActive ? 'var(--oscilloscope-cyan)' : 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: isActive ? 'var(--oscilloscope-cyan)' : 'var(--text-dim)', marginBottom: '0.25rem' }}>
                  {stage.name}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.85rem', fontWeight: 700, lineHeight: 1.2 }}>
                  {stage.title.split(' ')[0]}
                </div>
              </button>
            );
          })}
        </div>

        <div
          style={{
            backgroundColor: '#07090B',
            border: '1px solid var(--border-cyan)',
            padding: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.5rem'
          }}
          className="hw-chamfer stage-detail-box"
        >
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--oscilloscope-cyan)', marginBottom: '0.35rem' }}>
              STAGE {stages[activeStage].name} DETAILS
            </div>
            <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>
              {stages[activeStage].title}
            </h4>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.5 }}>
              {stages[activeStage].desc}
            </p>
          </div>

          <div
            style={{
              padding: '0.75rem 1.25rem',
              backgroundColor: 'rgba(0, 229, 255, 0.08)',
              border: '1px solid var(--border-cyan)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--oscilloscope-cyan)',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}
          >
            STATUS: PIPELINE STAGE OK
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .pipeline-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 550px) {
          .pipeline-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stage-detail-box { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>
    </div>
  );
};
