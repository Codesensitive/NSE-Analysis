import React, { useEffect, useState } from 'react'
import { LeaderboardItem } from './components/LeaderboardItem'
import { AnalysisCard } from './components/AnalysisCard'
import { LiveNewsSection } from './components/LiveNewsSection'
import { UpcomingStocksSection } from './components/UpcomingStocksSection'
import { rankStocks } from './lib/ranking'
import { generateDeepAnalysis } from './lib/analysis'
import type { StockCandidate } from './lib/ranking'
import type { DeepAnalysis } from './lib/analysis'
import type { ScrapedNews } from './lib/scraper'
import type { UpcomingStock } from './components/UpcomingStocksSection'
import { Activity } from 'lucide-react'

export default function App() {
  const [candidates, setCandidates] = useState<StockCandidate[]>([])
  const [liveNews, setLiveNews] = useState<ScrapedNews[]>([])
  const [upcoming, setUpcoming] = useState<UpcomingStock[]>([])
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null)
  const [analysis, setAnalysis] = useState<DeepAnalysis | null>(null)
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false)
  const [isDataLoading, setIsDataLoading] = useState(true)

  useEffect(() => {
    const fetchLiveData = async () => {
      try {
        const response = await fetch('/live_data.json')
        if (!response.ok) throw new Error('Live data generation failed or file missing.')
        const data = await response.json()
        
        setCandidates(rankStocks(data.stocks))
        setLiveNews(data.liveNews)
        setUpcoming(data.upcoming)
      } catch (err) {
        console.error('Failed to load NSE Leaderboard data', err)
      } finally {
        setIsDataLoading(false)
      }
    }
    fetchLiveData()
  }, [])

  const handleSelectStock = (symbol: string) => {
    setSelectedSymbol(symbol)
    setIsAnalysisLoading(true)
    
    setTimeout(() => {
      const stock = candidates.find(c => c.symbol === symbol)
      if (stock) {
        const stockNews = liveNews.filter(n => n.headline.includes(symbol))
        const generated = generateDeepAnalysis(stock.symbol, stock.report, stockNews)
        setAnalysis(generated)
      }
      setIsAnalysisLoading(false)
    }, 800)
  }

  if (isDataLoading) {
    return <div className="container"><p className="text-secondary" style={{ textAlign: 'center', marginTop: '20vh' }}>Synchronizing Live Market Data...</p></div>
  }

  return (
    <div className="container">
      <header className="flex-between" style={{ marginBottom: '40px' }}>
        <div>
          <h1 className="text-gradient" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Activity />
            NSE Analytics Dashboard
          </h1>
          <p className="text-secondary" style={{ marginTop: '8px' }}>Live Market Insights & Fundamentals (Powered by Yahoo Finance)</p>
        </div>
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start', position: 'relative' }}>
        
        {/* Section 1: Leaderboard */}
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
          </div>
        </section>

        {/* Section 2: Live News */}
        <LiveNewsSection newsItems={liveNews} />

        {/* Section 3: Upcoming IPOs */}
        <UpcomingStocksSection upcoming={upcoming} />

        {/* Floating Modal for Deep Analysis Spotlight */}
        {selectedSymbol && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '24px'
          }}>
            <div style={{ width: '100%', maxWidth: '600px' }} className="animate-fade-in">
              <AnalysisCard 
                symbol={selectedSymbol} 
                analysis={analysis} 
                isLoading={isAnalysisLoading}
                onClose={() => setSelectedSymbol(null)}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
