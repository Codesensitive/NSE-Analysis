/**
 * Core functional algorithms for the stock leaderboard ranking.
 */

export interface StockReport {
  revenue: number
  netProfit: number
  yoyGrowth: number
}

export interface StockCandidate {
  symbol: string
  report: StockReport
}

/**
 * Calculates a blended fundamental score for a stock based on its financial report.
 * Higher is better.
 *
 * @param report The financial metrics of the stock.
 * @returns The calculated composite score.
 */
export const calculateScore = (report: StockReport): number => {
  // Simple heuristic: Weighting growth heavily, and giving scaled importance to base numbers.
  const growthWeight = 2.0;
  const profitMargin = report.revenue > 0 ? (report.netProfit / report.revenue) : 0;
  
  // Score = YoY% * 2 + ProfitMargin * 100 + log(Revenue)
  const revenueScore = report.revenue > 0 ? Math.log10(report.revenue) : 0;
  
  return (report.yoyGrowth * growthWeight) + (profitMargin * 100) + revenueScore;
}

/**
 * Pure function to rank an array of stock candidates based on their reports.
 * 
 * @param candidates Array of stocks and their latest financial data.
 * @returns A new array of candidates sorted from best to worst.
 */
export const rankStocks = (candidates: StockCandidate[]): StockCandidate[] => {
  // Functional sort (preventing mutation of original array)
  return [...candidates].sort((a, b) => {
    return calculateScore(b.report) - calculateScore(a.report);
  });
}
