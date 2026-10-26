import React, { useState } from 'react';
import { MessageSquare, Bot, ShieldCheck, Zap, CheckCheck, RefreshCw, Clock, Send } from 'lucide-react';
import { PROJECTS_DATA } from '../data/content';

interface Scenario {
  id: string;
  name: string;
  customerQuery: string;
  timestamp: string;
  botReply: string;
  intent: string;
  confidence: number;
  toolCall?: {
    name: string;
    params: Record<string, any>;
    result: Record<string, any>;
  };
  hmacVerified: boolean;
  latencyMs: {
    webhook: number;
    llm: number;
    tool: number;
    total: number;
  };
  statusBadge: string;
  escalated: boolean;
}

export const WhatsAppAutomationSimulator: React.FC = () => {
  const project = PROJECTS_DATA.find((p) => p.id === 'custom-whatsapp-automation')!;

  const scenarios: Scenario[] = [
    {
      id: 'order-tracking',
      name: '01: ORDER STATUS & DISPATCH TRACKING',
      customerQuery: 'Hi! Can you check the current delivery status for order #WA-9041?',
      timestamp: '14:23:05',
      botReply: 'Hello Vikram! Your order #WA-9041 (Industrial Sensor Pack) is currently OUT FOR DELIVERY via DTDC Express (Tracking: DTDC-883921). Estimated delivery is today by 4:30 PM IST.',
      intent: 'ORDER_STATUS_LOOKUP',
      confidence: 0.99,
      toolCall: {
        name: 'fetchOrderDeliveryStatus',
        params: { orderId: 'WA-9041', customerPhone: '+91-98765-XXXXX' },
        result: { status: 'OUT_FOR_DELIVERY', courier: 'DTDC Express', trackingId: 'DTDC-883921', eta: 'Today, 16:30 IST' }
      },
      hmacVerified: true,
      latencyMs: { webhook: 14, llm: 285, tool: 38, total: 337 },
      statusBadge: 'DISPATCHED // ON TRACK',
      escalated: false
    },
    {
      id: 'catalog-pricing',
      name: '02: PRODUCT CATALOG & BULK DISCOUNT',
      customerQuery: 'Do you have wholesale pricing for 50 units of the IoT Gateway Controller?',
      timestamp: '14:24:12',
      botReply: 'Yes! For 50 units of the IoT Gateway Controller (SKU: IOT-GW-50), Tier-2 bulk pricing is ₹3,200/unit (18% discount applied, total ₹1,60,000 + GST). Stock is ready for immediate dispatch from our Ahmedabad warehouse. Would you like me to generate a pro-forma invoice?',
      intent: 'CATALOG_WHOLESALE_QUERY',
      confidence: 0.97,
      toolCall: {
        name: 'queryInventoryCatalog',
        params: { sku: 'IOT-GW-50', quantity: 50, pricingTier: 'WHOLESALE' },
        result: { inStock: 120, unitPrice: 3200, discountPct: 18, warehouse: 'Ahmedabad Central' }
      },
      hmacVerified: true,
      latencyMs: { webhook: 12, llm: 310, tool: 45, total: 367 },
      statusBadge: 'IN_STOCK // QUOTE_READY',
      escalated: false
    },
    {
      id: 'human-escalation',
      name: '03: CRITICAL HUMAN ESCALATION',
      customerQuery: 'This is urgent! The shipment crate arrived cracked open and our assembly line is halted! Call me right away!',
      timestamp: '14:25:40',
      botReply: 'I deeply apologize for this damaged shipment. I have marked this issue as P1 CRITICAL and escalated your ticket (INC-7812) directly to our Senior Logistics Dispatch Manager. An engineer is dialing your registered number right now.',
      intent: 'ESCALATION_DAMAGED_CARGO',
      confidence: 0.99,
      toolCall: {
        name: 'escalateToHumanDesk',
        params: { priority: 'P1_URGENT', reason: 'DAMAGED_CRATE_LINE_HALT', ticketId: 'INC-7812' },
        result: { assignedDesk: 'LOGISTICS_OPS_ESCALATION', agentNotified: true, slaMinutes: 5 }
      },
      hmacVerified: true,
      latencyMs: { webhook: 11, llm: 240, tool: 25, total: 276 },
      statusBadge: 'ESCALATED // AGENT DISPATCHED',
      escalated: true
    }
  ];

  const [activeScenario, setActiveScenario] = useState<Scenario>(scenarios[0]);
  const [activeTab, setActiveTab] = useState<'pipeline' | 'json'>('pipeline');
  const [simulating, setSimulating] = useState(false);

  const handleSimulate = () => {
    setSimulating(true);
    setTimeout(() => {
      setSimulating(false);
    }, 400);
  };

  return (
    <div
      id="custom-whatsapp-automation"
      style={{
        marginBottom: '6rem',
        paddingTop: '2rem'
      }}
    >
      {/* Flagship Header Box */}
      <div
        className="hw-box hw-chamfer"
        style={{
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--signal-green)',
          padding: '2rem',
          marginBottom: '2rem'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <MessageSquare size={24} color="var(--signal-green)" />
              <h2 style={{ fontSize: '2rem', color: '#FFFFFF' }}>{project.name}</h2>
              <span className="register-tag" style={{ borderColor: 'var(--signal-green)', color: 'var(--signal-green)' }}>
                FLAGSHIP // {project.status}
              </span>
            </div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--signal-green)' }}>
              {project.tagline}
            </p>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
            DELIVERED: <span style={{ color: 'var(--text-main)' }}>{project.deliveryDate}</span>
          </div>
        </div>

        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem', maxWidth: '900px' }}>
          {project.description} Engineered as a production-grade webhook ingestion platform and multi-tenant conversational agent, providing real-time catalog queries, order tracking, and intelligent human agent routing over the WhatsApp Cloud API.
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="register-tag"
              style={{ fontSize: '0.75rem', borderColor: 'rgba(0, 255, 102, 0.3)', color: 'var(--signal-green)' }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Simulator Card */}
      <div
        className="hw-box hw-chamfer"
        style={{
          padding: '2rem',
          backgroundColor: '#0C1014',
          borderColor: 'var(--border-hardware-bright)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-hardware)', paddingBottom: '0.75rem' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--signal-green)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Zap size={18} /> INTERACTIVE WEBHOOK &amp; CONVERSATIONAL PIPELINE TRACE
          </div>
          <span className="spec-label" style={{ color: 'var(--signal-green)' }}>
            LIVE SIMULATOR // REPLAY READY
          </span>
        </div>

        {/* Scenario Selectors */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2rem'
          }}
          className="scenario-grid"
        >
          {scenarios.map((sc) => {
            const isSelected = activeScenario.id === sc.id;
            return (
              <button
                key={sc.id}
                onClick={() => {
                  setActiveScenario(sc);
                  handleSimulate();
                }}
                className="hw-box"
                style={{
                  padding: '1rem',
                  backgroundColor: isSelected ? 'rgba(0, 255, 102, 0.08)' : 'var(--bg-surface)',
                  borderColor: isSelected ? 'var(--signal-green)' : 'var(--border-hardware)',
                  color: isSelected ? 'var(--signal-green)' : 'var(--text-main)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: isSelected ? 'var(--signal-green)' : 'var(--text-dim)', marginBottom: '0.35rem' }}>
                  SCENARIO {sc.name.split(':')[0]}
                </div>
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '0.88rem', fontWeight: 700, lineHeight: 1.25 }}>
                  {sc.name.split(':')[1]?.trim()}
                </div>
              </button>
            );
          })}
        </div>

        {/* Main Simulator Split Screen */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.15fr',
            gap: '2rem',
            marginBottom: '2rem'
          }}
          className="sim-split-grid"
        >
          {/* Left Side: WhatsApp Phone/Terminal Simulator */}
          <div
            className="hw-box hw-chamfer"
            style={{
              backgroundColor: '#07090C',
              borderColor: 'var(--border-hardware)',
              padding: '1.25rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '380px'
            }}
          >
            <div>
              {/* Simulated WhatsApp Chat Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingBottom: '0.75rem',
                  borderBottom: '1px solid var(--border-hardware)',
                  marginBottom: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 255, 102, 0.15)',
                      border: '1px solid var(--signal-green)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Bot size={18} color="var(--signal-green)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF' }}>
                      Enterprise Automation Bot
                    </div>
                    <div style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--signal-green)' }}>
                      ● WA Business Cloud API Active
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSimulate}
                  title="Re-run message trace"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--border-hardware)',
                    color: 'var(--text-dim)',
                    padding: '0.3rem 0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem'
                  }}
                >
                  <RefreshCw size={12} className={simulating ? 'spin-anim' : ''} />
                  <span>REPLAY</span>
                </button>
              </div>

              {/* Chat Message Bubble Stream */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* User Message */}
                <div style={{ alignSelf: 'flex-end', maxWidth: '85%' }}>
                  <div
                    style={{
                      backgroundColor: '#1E293B',
                      border: '1px solid #334155',
                      padding: '0.75rem 1rem',
                      borderRadius: '8px 8px 0px 8px',
                      color: '#F8FAFC',
                      fontSize: '0.85rem',
                      lineHeight: 1.45
                    }}
                  >
                    {activeScenario.customerQuery}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '0.35rem', marginTop: '0.25rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                    <span>{activeScenario.timestamp}</span>
                    <CheckCheck size={13} color="var(--oscilloscope-cyan)" />
                  </div>
                </div>

                {/* Bot Response Message */}
                <div style={{ alignSelf: 'flex-start', maxWidth: '90%' }}>
                  <div
                    style={{
                      backgroundColor: activeScenario.escalated ? 'rgba(239, 68, 68, 0.12)' : 'rgba(0, 255, 102, 0.08)',
                      border: `1px solid ${activeScenario.escalated ? 'var(--alert-red)' : 'rgba(0, 255, 102, 0.3)'}`,
                      padding: '0.85rem 1rem',
                      borderRadius: '8px 8px 8px 0px',
                      color: '#FFFFFF',
                      fontSize: '0.85rem',
                      lineHeight: 1.5
                    }}
                  >
                    {activeScenario.botReply}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.35rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                    <span>Gemini 1.5 + Function Call</span>
                    <span style={{ color: activeScenario.escalated ? 'var(--alert-red)' : 'var(--signal-green)' }}>
                      [{activeScenario.statusBadge}]
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Simulated Chat Input Bar */}
            <div
              style={{
                marginTop: '1.5rem',
                borderTop: '1px solid var(--border-hardware)',
                paddingTop: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem'
              }}
            >
              <div
                style={{
                  flex: 1,
                  padding: '0.5rem 0.75rem',
                  backgroundColor: '#090D11',
                  border: '1px solid var(--border-hardware)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--text-dim)'
                }}
              >
                Simulated webhook stream active...
              </div>
              <div
                style={{
                  padding: '0.5rem 0.75rem',
                  backgroundColor: 'rgba(0, 255, 102, 0.15)',
                  border: '1px solid var(--signal-green)',
                  color: 'var(--signal-green)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Send size={14} />
              </div>
            </div>
          </div>

          {/* Right Side: Webhook Ingest, Tool Call & Telemetry Inspector */}
          <div
            className="hw-box hw-chamfer"
            style={{
              backgroundColor: 'var(--bg-surface)',
              borderColor: 'var(--border-hardware-bright)',
              padding: '1.25rem'
            }}
          >
            {/* Tab Bar */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderBottom: '1px solid var(--border-hardware)',
                paddingBottom: '0.75rem',
                marginBottom: '1.25rem'
              }}
            >
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setActiveTab('pipeline')}
                  className="hw-btn"
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.3rem 0.6rem',
                    borderColor: activeTab === 'pipeline' ? 'var(--signal-green)' : 'var(--border-hardware)',
                    color: activeTab === 'pipeline' ? 'var(--signal-green)' : 'var(--text-dim)'
                  }}
                >
                  PIPELINE EXECUTION
                </button>
                <button
                  onClick={() => setActiveTab('json')}
                  className="hw-btn"
                  style={{
                    fontSize: '0.7rem',
                    padding: '0.3rem 0.6rem',
                    borderColor: activeTab === 'json' ? 'var(--signal-green)' : 'var(--border-hardware)',
                    color: activeTab === 'json' ? 'var(--signal-green)' : 'var(--text-dim)'
                  }}
                >
                  RAW JSON PAYLOAD
                </button>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--signal-green)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={12} />
                <span>TOTAL: {activeScenario.latencyMs.total}ms</span>
              </div>
            </div>

            {activeTab === 'pipeline' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {/* Inbound Webhook & Auth Security */}
                <div
                  style={{
                    padding: '0.85rem',
                    backgroundColor: '#07090B',
                    border: '1px solid var(--border-hardware)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--oscilloscope-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <ShieldCheck size={14} /> HMAC-SHA256 SIGNATURE GATE
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--signal-green)' }}>
                      STATUS: VERIFIED (100%)
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-dim)' }}>
                    Payload signature validated against META_APP_SECRET. Idempotency key cached in Redis to prevent replay.
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    <span>Webhook Ingest: {activeScenario.latencyMs.webhook}ms</span>
                    <span>Session: REDIS_ACTIVE [TTL: 24h]</span>
                  </div>
                </div>

                {/* Intent & Tool Invocation */}
                <div
                  style={{
                    padding: '0.85rem',
                    backgroundColor: '#07090B',
                    border: '1px solid var(--border-hardware)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--phosphor-amber)' }}>
                      INTENT: {activeScenario.intent}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--phosphor-amber)' }}>
                      CONF: {(activeScenario.confidence * 100).toFixed(0)}%
                    </span>
                  </div>

                  {activeScenario.toolCall && (
                    <div style={{ backgroundColor: '#0C1014', padding: '0.6rem', border: '1px solid #1E293B', fontFamily: 'var(--font-mono)', fontSize: '0.72rem' }}>
                      <div style={{ color: 'var(--signal-green)', marginBottom: '0.2rem' }}>
                        &gt; Tool Executed: {activeScenario.toolCall.name}()
                      </div>
                      <div style={{ color: 'var(--text-muted)' }}>
                        Params: {JSON.stringify(activeScenario.toolCall.params)}
                      </div>
                      <div style={{ color: 'var(--oscilloscope-cyan)', marginTop: '0.2rem' }}>
                        Result: {JSON.stringify(activeScenario.toolCall.result)}
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)' }}>
                    <span>LLM Latency: {activeScenario.latencyMs.llm}ms</span>
                    <span>Tool Exec: {activeScenario.latencyMs.tool}ms</span>
                  </div>
                </div>

                {/* Outgoing WhatsApp Dispatch */}
                <div
                  style={{
                    padding: '0.85rem',
                    backgroundColor: '#07090B',
                    border: '1px solid var(--border-hardware)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#FFF', marginBottom: '0.2rem' }}>
                      OUTGOING CLOUD API DISPATCH
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                      Template: TEXT_INTERACTIVE // Message ID: wamid.HBgMOTE5...
                    </div>
                  </div>
                  <div
                    style={{
                      padding: '0.35rem 0.65rem',
                      backgroundColor: 'rgba(0, 255, 102, 0.1)',
                      border: '1px solid var(--signal-green)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--signal-green)'
                    }}
                  >
                    200 OK DISPATCHED
                  </div>
                </div>
              </div>
            ) : (
              /* Raw JSON Tab */
              <div
                style={{
                  backgroundColor: '#07090B',
                  border: '1px solid var(--border-hardware)',
                  padding: '1rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--signal-green)',
                  maxHeight: '260px',
                  overflowY: 'auto',
                  lineHeight: 1.45
                }}
              >
                <pre style={{ margin: 0 }}>
                  {JSON.stringify(
                    {
                      webhookEvent: 'whatsapp_message_inbound',
                      security: {
                        hmacVerified: activeScenario.hmacVerified,
                        signatureHeader: 'sha256=3e18a9b2fc7701da...',
                        replayCheckPassed: true
                      },
                      intentAnalysis: {
                        detectedIntent: activeScenario.intent,
                        confidence: activeScenario.confidence,
                        escalationTriggered: activeScenario.escalated
                      },
                      toolCall: activeScenario.toolCall,
                      benchmarks: activeScenario.latencyMs
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
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--signal-green)', marginBottom: '0.4rem' }}>
              01 // WEBHOOK SECURITY
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.35rem' }}>
              HMAC Signature &amp; Replay Gate
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Validates raw request payloads against Meta app secrets using SHA-256 HMAC and timestamps to neutralize replay attacks.
            </p>
          </div>

          <div className="hw-box" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--oscilloscope-cyan)', marginBottom: '0.4rem' }}>
              02 // STATE &amp; PERSISTENCE
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.35rem' }}>
              Redis Session &amp; Idempotency
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Sliding-window rate limiters and message deduplication keys ensure duplicate provider retries never double-process orders.
            </p>
          </div>

          <div className="hw-box" style={{ padding: '1rem', backgroundColor: 'var(--bg-surface)' }}>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--phosphor-amber)', marginBottom: '0.4rem' }}>
              03 // AGENT ORCHESTRATION
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFF', marginBottom: '0.35rem' }}>
              Gemini JSON Tool Calling
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.45 }}>
              Schema-enforced tool calling interfaces with CRM, inventory, and ticketing systems with graceful fallback to human live queues.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .scenario-grid { grid-template-columns: 1fr !important; }
          .sim-split-grid { grid-template-columns: 1fr !important; }
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
