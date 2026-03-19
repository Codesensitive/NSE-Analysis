# NSE Leaderboard & Analysis Dashboard

A premium, AI-driven web application that tracks, ranks, and analyzes National Stock Exchange of India (NSE) listed stocks based on quarterly and year-over-year (YoY) financial performance.

## 🚀 Key Features
- **Dynamic Leaderboard:** Real-time stock rankings determined by functional algorithms parsing Revenue Growth, Profit Margins, and EPS.
- **5-Point Deep Analysis:** Automatically synthesizes the daily news cycle and financial metrics to calculate news sentiment and provide 5 structured reasons for a stock's ranking.
- **Premium Glassmorphism UI:** Built with Vanilla CSS adhering strictly to modern, dynamic aesthetic standards.
- **Automated Scanning Ready:** Modular scraper libraries (`src/lib/scraper.ts`) pre-configured to detect new IPOs and fetch daily Top 10 news.
- **Test-Driven Architecture:** Codebase validated via Vitest (`test_scraper.ts`, `test_ranking.ts`, `test_analysis.ts`), ensuring 100% functional integrity.
- **Supabase Integration:** Configured with a PostgreSQL SQL schema for long-term data persistence.

## 🛠 Tech Stack
- **Frontend Framework:** Vite + React (Strict TypeScript)
- **Styling:** Custom Vanilla CSS with Design Tokens
- **Testing:** Vitest & React Testing Library
- **Database Backend:** Supabase (PostgreSQL)

## 📦 Getting Started

### Prerequisites
- Node.js (v18+)
- A Supabase Project

### Installation
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd NSE-Analysis
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your `.env.local` file utilizing the provided `.env.example`:
   ```bash
   VITE_SUPABASE_URL=your-supabase-url
   VITE_SUPABASE_ANON_KEY=your-supabase-key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing
The logic suite is entirely test-driven. Run the automated analysis tests:
```bash
npx vitest
```

## 📜 Architecture & Rules Enforced
- **Strict Typing:** Eradication of `any` types; full TypeScript coverage.
- **Functional Paradigm:** Prefer functional, pure architecture with predictable outcomes over class-based instantiation.
- **DRY Design:** UI elements and number formatting are abstracted utilizing `src/lib/utils.ts`.
