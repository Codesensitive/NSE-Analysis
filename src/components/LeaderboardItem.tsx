import React from 'react'
import type { StockReport } from '../lib/ranking'
import { formatPercent, formatINRInCr } from '../lib/utils'

export interface LeaderboardItemProps {
  rank: number
  symbol: string
  companyName: string
  report: StockReport
  onClick: (symbol: string) => void
}

/**
 * Functional component to display a single stock in the leaderboard.
 * Utilizes generic glass-card styling from index.css.
 */
export const LeaderboardItem: React.FC<LeaderboardItemProps> = ({ rank, symbol, companyName, report, onClick }) => {
  const isPositiveGrowth = report.yoyGrowth >= 0
  
  return (
    <div className="glass-card flex-between animate-fade-in" style={{ cursor: 'pointer', marginBottom: '16px' }} onClick={() => onClick(symbol)}>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <h2 className="text-secondary" style={{ width: '40px', textAlign: 'center' }}>#{rank}</h2>
        <div>
          <h3 className="text-gradient" style={{ margin: 0 }}>{symbol}</h3>
          <p className="text-secondary" style={{ fontSize: '0.85rem' }}>{companyName}</p>
        </div>
      </div>
      
      <div style={{ textAlign: 'right' }}>
        <p className={isPositiveGrowth ? 'text-success' : 'text-danger'} style={{ fontWeight: 600 }}>
          {formatPercent(report.yoyGrowth)} YoY
        </p>
        <p className="text-secondary" style={{ fontSize: '0.85rem' }}>
          Rev: {formatINRInCr(report.revenue)}
        </p>
      </div>
    </div>
  )
}
