import React, { useEffect, useState } from 'react'
import { LeaderboardItem } from './components/LeaderboardItem'
import { AnalysisCard } from './components/AnalysisCard'
import { supabase } from './lib/supabase'
import { rankStocks } from './lib/ranking'
import { generateDeepAnalysis } from './lib/analysis'
import type { StockCandidate } from './lib/ranking'
import type { DeepAnalysis } from './lib/analysis'
import { Activity } from 'lucide-react'

const MOCK_DATA: StockCandidate[] = [
  { symbol: 'RELIANCE', report: { revenue: 230000000, netProfit: 21000000, yoyGrowth: 18.5 } },
  { symbol: 'HDFCBANK', report: { revenue: 115000000, netProfit: 16000000, yoyGrowth: 21.0 } },
  { symbol: 'TCS', report: { revenue: 59000000, netProfit: 11000000, yoyGrowth: 15.2 } },
  { symbol: 'INFY', report: { revenue: 38000000, netProfit: 6000000, yoyGrowth: 12.1 } },
  { symbol: 'ICICIBANK', report: { revenue: 95000000, netProfit: 10000000, yoyGrowth: -2.0 } },
]

export default function App() {
  const [candidates, setCandidates] = useState<StockCandidate[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<DeepAnalysis | null>(null)
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false)

  // Initialization: fetch from Supabase (fallback to mocked ranking for preview)
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Here we'd do: const { data } = await supabase.from('financial_reports').select(...)
        const ranked = rankStocks(MOCK_DATA)
        setCandidates(ranked)
      } catch (err) {
        console.error('Failed to load leaderboard', err)
      }
    }
    fetchLeaderboard()
  }, [])

  const handleSelectStock = (symbol: string) => {
    setSelectedSymbol(symbol)
    setIsAnalysisLoading(true)
    
    // Simulate fetching news and generating analysis via AI
    setTimeout(() => {
      const stock = candidates.find(c => c.symbol === symbol)
      if (stock) {
        const generated = generateDeepAnalysis(stock.symbol, stock.report, [
          { headline: `${symbol} hits 52-week high after robust earnings`, url: '', publishedAt: '' }
        ])
        setAnalysis(generated)
      }
      setIsAnalysisLoading(false)
    }, 800)
  }

  return (
    <div className="container">
      <header className="flex-between" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity />
            NSE Leaderboard
          </h1>
          <p className="text-secondary" style={{ marginTop: '8px' }}>AI-Driven Fundamental Analysis</p>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)', gap: '32px' }}>
        {/* Leaderboard Column */}
        <section>
          <h3 style={{ marginBottom: '20px', color: 'var(--text-secondary)' }}>Top Ranked Equities</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {candidates.map((stock, index) => (
              <LeaderboardItem 
                key={stock.symbol}
                rank={index + 1}
                symbol={stock.symbol}
                companyName={`${stock.symbol} Ltd`}
                report={stock.report}
                onClick={handleSelectStock}
              />
            ))}
            {candidates.length === 0 && <p>Loading market data...</p>}
          </div>
        </section>

        {/* Analysis Spotlight Column */}
        <section>
          <div style={{ position: 'sticky', top: '40px' }}>
            {selectedSymbol ? (
              <AnalysisCard 
                symbol={selectedSymbol} 
                analysis={analysis} 
                isLoading={isAnalysisLoading}
                onClose={() => setSelectedSymbol(null)}
              />
            ) : (
              <div className="glass-panel" style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-secondary)' }}>
                <h3>Select a stock from the leaderboard</h3>
                <p style={{ marginTop: '12px' }}>View deep fundamental insights and daily news sentiment.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
