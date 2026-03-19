import React from 'react'
import type { DeepAnalysis } from '../lib/analysis'

export interface AnalysisCardProps {
  symbol: string
  analysis: DeepAnalysis | null
  isLoading: boolean
  onClose: () => void
}

/**
 * Displays the in-depth analysis for a selected Top 10 stock.
 */
export const AnalysisCard: React.FC<AnalysisCardProps> = ({ symbol, analysis, isLoading, onClose }) => {
  if (!symbol) return null
  
  return (
    <div className="glass-panel animate-fade-in" style={{ marginTop: '24px', position: 'relative' }}>
      <button 
        onClick={onClose}
        style={{ position: 'absolute', top: '16px', right: '16px', background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '1.2rem' }}
      >
        ✕
      </button>
      
      <h2 style={{ marginBottom: '16px' }}>Deep Analysis: <span className="text-gradient">{symbol}</span></h2>
      
      {isLoading ? (
        <p className="text-secondary">Generating AI analysis...</p>
      ) : analysis ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4 className="text-secondary" style={{ marginBottom: '8px' }}>News Sentiment & Overview</h4>
            <p style={{ lineHeight: '1.6' }}>{analysis.generatedSummary}</p>
          </div>
          <div style={{ background: 'rgba(0,0,0,0.2)', padding: '20px', borderRadius: '12px' }}>
            <h4 className="text-gradient" style={{ marginBottom: '16px', fontSize: '1.1rem' }}>Top 5 Ranking Reasons</h4>
            <ul style={{ listStyleType: 'none', margin: 0, padding: 0 }}>
              {analysis.reasons.map((reason, idx) => (
                <li key={idx} style={{ marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ 
                    background: 'var(--accent-gradient)', 
                    color: 'white', 
                    borderRadius: '50%', 
                    width: '24px', 
                    height: '24px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    fontSize: '0.8rem',
                    fontWeight: 'bold',
                    flexShrink: 0
                  }}>{idx + 1}</span>
                  <span style={{ color: 'var(--text-primary)', lineHeight: '1.5' }}>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="text-danger">Failed to load analysis for this stock.</p>
      )}
    </div>
  )
}
