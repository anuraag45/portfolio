import React, { useState, useEffect } from 'react';
import { GitBranch, Star, Activity } from 'lucide-react';

interface GitHubRepo {
  name: string;
  description: string;
  stars: number;
  forks: number;
  language: string;
  url: string;
}

export const GitHubActivityFeed: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [status, setStatus] = useState<'LIVE' | 'CACHED'>('CACHED');
  const [loading, setLoading] = useState<boolean>(true);

  const fallbackRepos: GitHubRepo[] = [
    {
      name: 'WhatsApp-Automation-Engine',
      description: 'Production conversational AI webhook pipeline using WhatsApp Cloud API and Gemini.',
      stars: 18,
      forks: 5,
      language: 'TypeScript',
      url: 'https://github.com/anuraag45'
    },
    {
      name: 'ILoveInterviews-Platform',
      description: 'AI-driven adaptive mock interview platform with real-time rubric scoring.',
      stars: 24,
      forks: 6,
      language: 'TypeScript',
      url: 'https://github.com/anuraag45/I-love-Interviews'
    },
    {
      name: 'DocFlow-OCR',
      description: 'Async OCR document extraction pipeline backed by Celery and Redis.',
      stars: 15,
      forks: 4,
      language: 'Python',
      url: 'https://github.com/anuraag45'
    }
  ];

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/anuraag45/repos?sort=updated&per_page=4');
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            const formatted = data.map((r: any) => ({
              name: r.name,
              description: r.description || 'Public repository project.',
              stars: r.stargazers_count,
              forks: r.forks_count,
              language: r.language || 'TypeScript',
              url: r.html_url
            }));
            setRepos(formatted);
            setStatus('LIVE');
          } else {
            setRepos(fallbackRepos);
            setStatus('CACHED');
          }
        } else {
          setRepos(fallbackRepos);
          setStatus('CACHED');
        }
      } catch (err) {
        setRepos(fallbackRepos);
        setStatus('CACHED');
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <div
      className="hw-box hw-chamfer"
      style={{
        padding: '1.5rem',
        backgroundColor: '#0C1014',
        borderColor: status === 'LIVE' ? 'var(--signal-green)' : 'var(--border-amber)',
        marginTop: '2.5rem'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-hardware)', paddingBottom: '0.75rem' }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--phosphor-amber)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Activity size={16} /> LIVE GITHUB PUBLIC TELEMETRY (@anuraag45)
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: status === 'LIVE' ? 'var(--signal-green)' : 'var(--phosphor-amber)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span className={status === 'LIVE' ? 'via-dot-cyan' : 'via-dot'} />
          <span>{status === 'LIVE' ? 'TELEMETRY STATUS: LIVE PUBLIC API' : 'TELEMETRY STATUS: CACHED SNAPSHOT [2026-07-21]'}</span>
        </div>
      </div>

      {loading ? (
        <div style={{ padding: '1rem', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-dim)' }}>
          Fetching public repository telemetry from api.github.com...
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem'
          }}
          className="repo-grid"
        >
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hw-box"
              style={{
                padding: '1rem',
                backgroundColor: 'var(--bg-surface)',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <GitBranch size={14} color="var(--phosphor-amber)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#FFF', fontFamily: 'var(--font-heading)' }}>
                    {repo.name}
                  </span>
                </div>
                <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', lineHeight: 1.4, marginBottom: '1rem' }}>
                  {repo.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: 'var(--text-dim)', borderTop: '1px solid var(--border-hardware)', paddingTop: '0.5rem' }}>
                <span style={{ color: 'var(--oscilloscope-cyan)' }}>{repo.language}</span>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                    <Star size={11} color="var(--phosphor-amber)" /> {repo.stars}
                  </span>
                  <span>Forks: {repo.forks}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 800px) {
          .repo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};
