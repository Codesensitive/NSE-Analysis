# Product Requirements Document (PRD)
**Project Name:** NSE Stock Leaderboard & Analysis Dashboard
**Target User:** Retail investors, analysts looking for fundamentally strong NSE stocks.

## 1. Executive Summary
A web-based dashboard and automated analysis engine that tracks, ranks, and analyzes National Stock Exchange of India (NSE) listed stocks. The core value proposition is dynamically ranking stocks based on their quarterly and year-over-year (YoY) financial performance. A daily background engine scans for new listings, aggregates news for the Top 10 ranked stocks, and provides an algorithmic or AI-assisted deep analysis of these top holders. Data persistence and backend operations are powered by Supabase.

## 2. Platform Features

### 2.1 Dynamic Functional Leaderboard
- **Ranking Engine:** Algorithms rank stocks based on quarterly and annual financial metrics (e.g., Revenue Growth, Profit Margin, EPS YoY Growth).
- **Dashboard Interface:** Displays current rank, stock symbol, company name, latest price, and the specific metrics that determined the ranking.

### 2.2 Automated Daily Discovery Engine (Web Scanner)
- **New Listing Detection:** Scans NSE and financial news sources for newly listed companies and injects them into the evaluation pipeline.
- **News Aggregation:** Scrapes the latest news articles, press releases, and market sentiment specifically for the Top 10 stocks on the leaderboard.
- **Financial Report Updates:** Automates the ingestion of newly released quarterly/annual reports to update the rankings.

### 2.3 Top 10 Deep Analysis Spotlight
- **Detailed Profiles:** Interactive modal or page for the Top 10 stocks.
- **Insight Generation:** 
  - Summarized breakdown of recent news sentiment.
  - Deep-dive into quarterly/yearly financial health.
  - Transparency on the ranking ("Why is it ranked here?").

### 2.4 Supabase Backend Architecture
- **PostgreSQL Database:** Relational tables targeting `stocks`, `financial_reports`, `scraped_news`, and `leaderboard_rankings`.
- **Background Jobs:** Cron-triggered edge functions or GitHub Actions for scraping logic.

## 3. Engineering Constraints & Rules (Strict Enforcement)
- **Architecture Integrity:** Implementation Plan and Task List approved before any code execution.
- **Language/Paradigm:** Strict TypeScript with functional programming preference.
- **Code Modularity (DRY):** Reusable utilities grouped in `/lib` or `/utils`.
- **Documentation:** Every exported function requires TSDoc/JSDoc detailing parameters, returns, and intent.
- **Testing Standard:** Test-driven execution required. New features must be covered by `test_*.ts` files before completion. Browser validation (visual walkthrough) is mandatory for UI changes.
- **Safety:** Terminal actions involving modification/destruction require user confirmation.
