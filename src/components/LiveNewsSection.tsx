import React from 'react'
import type { ScrapedNews } from '../lib/scraper'
import { Newspaper } from 'lucide-react'

export interface LiveNewsSectionProps {
  newsItems: ScrapedNews[]
}

/**
 * Renders the aggregated live news stream corresponding to the Leaderboard.
 */
export const LiveNewsSection: React.FC<LiveNewsSectionProps> = ({ newsItems }) => {
  return (
    <section>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Newspaper size={20} /> Live Market News
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '75vh', overflowY: 'auto', paddingRight: '8px' }}>
        {newsItems.length === 0 ? <p className="text-secondary">No recent news available.</p> : null}
        {newsItems.map((news, idx) => (
          <div key={idx} className="glass-card animate-fade-in" style={{ padding: '20px' }}>
            <h4 style={{ marginBottom: '12px', lineHeight: '1.4' }}>{news.headline}</h4>
            <div className="flex-between">
              <span className="text-secondary" style={{ fontSize: '0.8rem' }}>
                {new Date(news.publishedAt).toLocaleDateString()}
              </span>
              <a href={news.url || '#'} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent-color)', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'none' }}>
                Read Article →
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
