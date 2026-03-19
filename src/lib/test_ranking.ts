import { describe, it, expect } from 'vitest'
import { rankStocks, calculateScore } from './ranking'

describe('Ranking Algorithm', () => {
  it('should calculate score linearly based on revenue, profit and growth', () => {
    const report1 = { revenue: 1000, netProfit: 100, yoyGrowth: 10 }
    const report2 = { revenue: 2000, netProfit: 200, yoyGrowth: 20 }
    
    expect(calculateScore(report2)).toBeGreaterThan(calculateScore(report1))
  })

  it('should rank an array of stocks correctly in descending order', () => {
    const stocksWithReports = [
      { symbol: 'A', report: { revenue: 1000, netProfit: 100, yoyGrowth: 10 } },
      { symbol: 'B', report: { revenue: 5000, netProfit: 500, yoyGrowth: 25 } },
      { symbol: 'C', report: { revenue: 200, netProfit: 10, yoyGrowth: -5 } }
    ]

    const ranked = rankStocks(stocksWithReports)
    expect(ranked[0].symbol).toBe('B')
    expect(ranked[1].symbol).toBe('A')
    expect(ranked[2].symbol).toBe('C')
  })
})
