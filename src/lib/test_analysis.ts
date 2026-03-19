import { describe, it, expect } from 'vitest'
import { generateDeepAnalysis, summarizeNewsSentiment } from './analysis'
import type { ScrapedNews } from './scraper'
import type { StockReport } from './ranking'

describe('Deep Analysis Engine', () => {
  it('should calculate sentiment from news', () => {
    const mockNews: ScrapedNews[] = [
      { headline: 'RELIANCE reports record profits', url: '', publishedAt: '' },
      { headline: 'TCS faces minor delays in projects', url: '', publishedAt: '' }
    ]
    const sentiment = summarizeNewsSentiment(mockNews)
    expect(sentiment.score).toBeGreaterThan(0)
    expect(sentiment.summary).toContain('Positive')
  })

  it('should generate an array of 5 styled reasons combining financials and sentiment', () => {
    const report: StockReport = { revenue: 1000, netProfit: 200, yoyGrowth: 15 }
    const news: ScrapedNews[] = [
      { headline: 'Company X sees 15% growth', url: '', publishedAt: '' }
    ]
    const analysis = generateDeepAnalysis('COMP', report, news)
    expect(analysis.reasons).toHaveLength(5)
    expect(analysis.reasons[0]).toContain('+15.0%')
    expect(analysis.generatedSummary).toBeDefined()
  })
})
