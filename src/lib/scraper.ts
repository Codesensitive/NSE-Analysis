/**
 * Provides functional parsing utility for HTML documents.
 * Isolates data extraction for test-driven development.
 */

export interface ScrapedListing {
  symbol: string
  companyName: string
  listingDate: string
}

export interface ScrapedFinancials {
  quarter: string
  year: number
  revenue: number
  netProfit: number
  eps: number
  yoyGrowth: number
}

export interface ScrapedNews {
  headline: string
  url: string
  publishedAt: string
}

/**
 * Extracts stock listing data from NSE mock HTML.
 * @param html String containing HTML representing NSE listings.
 * @returns Array of ScrapedListing detailing new listings.
 */
export const parseListingFromHtml = (html: string): ScrapedListing[] => {
  // Using basic regex/DOM parser for typical Node environment (cheerio/jsdom context).
  // For the sake of isomorphic execution in vitest/jsdom, we use a basic DOM parser approach.
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const listingNodes = doc.querySelectorAll('.listing-item')
  
  return Array.from(listingNodes).map((node) => ({
    symbol: node.getAttribute('data-symbol') || '',
    companyName: node.querySelector('.company-name')?.textContent?.trim() || '',
    listingDate: node.querySelector('.listing-date')?.textContent?.trim() || ''
  }))
}

/**
 * Parses financial metrics from a standard tabular HTML output.
 * @param html HTML string containing the tables for financial reports.
 * @returns Array of ScrapedFinancials.
 */
export const parseFinancialsFromHtml = (html: string): ScrapedFinancials[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const validRows = doc.querySelectorAll('tr[data-quarter]')

  return Array.from(validRows).map((row) => ({
    quarter: row.getAttribute('data-quarter') || '',
    year: parseInt(row.getAttribute('data-year') || '0', 10),
    revenue: parseFloat(row.querySelector('.revenue')?.textContent || '0'),
    netProfit: parseFloat(row.querySelector('.net-profit')?.textContent || '0'),
    eps: parseFloat(row.querySelector('.eps')?.textContent || '0'),
    yoyGrowth: parseFloat(row.querySelector('.yoy-growth')?.textContent || '0')
  }))
}

/**
 * Parses latest financial news articles from HTML.
 * @param html HTML string for news aggregate.
 * @returns Array of ScrapedNews.
 */
export const parseNewsFromHtml = (html: string): ScrapedNews[] => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const articleNodes = doc.querySelectorAll('.news-item')

  return Array.from(articleNodes).map((node) => ({
    headline: node.querySelector('.headline')?.textContent?.trim() || '',
    url: node.querySelector('.url')?.getAttribute('href') || '',
    publishedAt: node.querySelector('.published-at')?.getAttribute('datetime') || ''
  }))
}
