/**
 * Functional engine to synthesize raw news and financial data into comprehensive analysis.
 */
import type { ScrapedNews } from './scraper'
import type { StockReport } from './ranking'
import { formatINR, formatPercent } from './utils'

export interface SentimentResult {
  score: number // -1.0 to 1.0
  summary: string
}

export interface DeepAnalysis {
  generatedSummary: string
  reasons: string[]
}

/**
 * Heuristically evaluates news sentiment based on keywords.
 * @param news Array of news items.
 * @returns SentimentResult containing the aggregate score and a brief summary.
 */
export const summarizeNewsSentiment = (news: ScrapedNews[]): SentimentResult => {
  if (news.length === 0) return { score: 0, summary: 'No recent news available.' }
  
  const positiveWords = ['record', 'profit', 'growth', 'dividend', 'success', 'launch', 'wins']
  const negativeWords = ['delays', 'loss', 'decline', 'sued', 'resigns', 'probe', 'scandal']
  
  let score = 0
  const allText = news.map(n => n.headline.toLowerCase()).join(' ')
  
  positiveWords.forEach(word => { if (allText.includes(word)) score += 0.5 })
  negativeWords.forEach(word => { if (allText.includes(word)) score -= 0.5 })
  
  // Cap between -1 and 1
  score = Math.max(-1, Math.min(1, score))
  
  const summary = score > 0 ? 'Overall Positive Sentiment' 
                : score < 0 ? 'Overall Negative Sentiment' 
                : 'Neutral Sentiment'
                
  return { score, summary }
}

/**
 * Generates an automated deep analysis profile based on fundamentals and daily news.
 * @param symbol The NSE symbol.
 * @param report The latest financial report.
 * @param news The scraped news articles for this stock.
 * @returns DeepAnalysis payload containing 5 structured ranking reasons.
 */
export const generateDeepAnalysis = (symbol: string, report: StockReport, news: ScrapedNews[]): DeepAnalysis => {
  const sentiment = summarizeNewsSentiment(news)
  const margin = report.revenue > 0 ? (report.netProfit / report.revenue) * 100 : 0
  
  const reasons = [
    `Achieved a Year-over-Year (YoY) growth rate of ${formatPercent(report.yoyGrowth)}, signaling strong market expansion.`,
    `Generated total revenue of ${formatINR(report.revenue)}, demonstrating robust top-line performance.`,
    `Maintained a healthy net profit margin of ${margin.toFixed(2)}% (${formatINR(report.netProfit)}), reflecting an efficient bottom-line.`,
    `Current news cycle indicates ${sentiment.summary.toLowerCase()}, driving positive investor confidence and volume.`,
    `Consistent quarterly structural performance solidifies ${symbol}'s competitive edge in its respective sector.`
  ]
  
  const generatedSummary = `${symbol} is currently showing ${sentiment.summary.toLowerCase()} in the news cycle. Financials indicate a strong top-line revenue of ${formatINR(report.revenue)}.`
  
  return {
    generatedSummary,
    reasons
  }
}
