import { describe, it, expect } from 'vitest'
import {
  parseListingFromHtml,
  parseFinancialsFromHtml,
  parseNewsFromHtml
} from './scraper'

describe('Scraper Parsers', () => {
  it('should extract listings from HTML payload', () => {
    const mockHtml = `
      <div class="listing-item" data-symbol="RELIANCE">
        <span class="company-name">Reliance Industries</span>
        <span class="listing-date">2023-10-01</span>
      </div>
      <div class="listing-item" data-symbol="TCS">
        <span class="company-name">Tata Consultancy</span>
        <span class="listing-date">2004-08-25</span>
      </div>
    `
    const results = parseListingFromHtml(mockHtml)
    expect(results).toHaveLength(2)
    expect(results[0].symbol).toBe('RELIANCE')
    expect(results[0].companyName).toBe('Reliance Industries')
    expect(results[1].symbol).toBe('TCS')
    expect(results[1].listingDate).toBe('2004-08-25')
  })

  it('should parse financial report metrics from HTML table', () => {
    const mockHtml = `
      <table id="financials">
        <tr data-quarter="Q1" data-year="2024">
          <td class="revenue">1500000</td>
          <td class="net-profit">120000</td>
          <td class="eps">12.5</td>
          <td class="yoy-growth">15.5</td>
        </tr>
      </table>
    `
    const financials = parseFinancialsFromHtml(mockHtml)
    expect(financials).toHaveLength(1)
    expect(financials[0].quarter).toBe('Q1')
    expect(financials[0].year).toBe(2024)
    expect(financials[0].revenue).toBe(1500000)
    expect(financials[0].netProfit).toBe(120000)
    expect(financials[0].eps).toBe(12.5)
    expect(financials[0].yoyGrowth).toBe(15.5)
  })

  it('should parse news articles for top 10 stocks', () => {
    const mockHtml = `
      <article class="news-item">
        <h3 class="headline">RELIANCE announces huge dividend</h3>
        <a class="url" href="https://example.com/rel-news">Read more</a>
        <time class="published-at" datetime="2024-03-20T10:00:00Z"></time>
      </article>
    `
    const news = parseNewsFromHtml(mockHtml)
    expect(news).toHaveLength(1)
    expect(news[0].headline).toBe('RELIANCE announces huge dividend')
    expect(news[0].url).toBe('https://example.com/rel-news')
    expect(news[0].publishedAt).toBe('2024-03-20T10:00:00Z')
  })
})
