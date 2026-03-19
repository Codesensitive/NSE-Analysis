import React from 'react'
import { Rocket } from 'lucide-react'
import { summarizeNewsSentiment } from '../lib/analysis'
import type { ScrapedNews } from '../lib/scraper'

export interface UpcomingStock {
  name: string
  prospectusNews: ScrapedNews[]
  expectedDate: string
}

export interface UpcomingStocksSectionProps {
  upcoming: UpcomingStock[]
}

/**
 * Renders the upcoming IPOs list, functionally mapping news sentiment to a predictive rating.
 */
export const UpcomingStocksSection: React.FC<UpcomingStocksSectionProps> = ({ upcoming }) => {
  return (
    <section>
      <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Rocket size={20} /> Upcoming Listings (IPOs)
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {upcoming.length === 0 ? <p className="text-secondary">No upcoming listings detected.</p> : null}
        
        {upcoming.map((stock, idx) => {
          // Dynamic calculation of the predictive rating leveraging functional sentiment analysis module
          const sentiment = summarizeNewsSentiment(stock.prospectusNews)
          // Map functional sentiment (-1 to 1) score to a 1 to 5 star predictive array.
          const rating = Math.max(1, Math.min(5, Math.round((sentiment.score + 1) * 2.5)))
          
          return (
            <div key={idx} className="glass-card animate-fade-in" style={{ padding: '20px' }}>
              <div className="flex-between" style={{ marginBottom: '12px' }}>
                <h4 className="text-gradient">{stock.name}</h4>
                <span className="text-secondary" style={{ fontSize: '0.8rem' }}>Exp: {stock.expectedDate}</span>
              </div>
              <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '16px', lineHeight: '1.5' }}>
                {sentiment.summary}
              </p>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '12px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Predictive Rating</span>
                <span style={{ color: 'var(--accent-color)', letterSpacing: '2px', fontSize: '1.2rem' }}>
                  {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
