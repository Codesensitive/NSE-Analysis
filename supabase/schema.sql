-- Supabase Schema for NSE Leaderboard

CREATE TABLE IF NOT EXISTS public.stocks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    symbol VARCHAR(50) UNIQUE NOT NULL,
    company_name TEXT NOT NULL,
    listing_date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.financial_reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    quarter VARCHAR(10) NOT NULL, -- e.g., 'Q1', 'Q2'
    year INTEGER NOT NULL,
    revenue NUMERIC,
    net_profit NUMERIC,
    eps NUMERIC,
    yoy_growth_percentage NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(stock_id, quarter, year)
);

CREATE TABLE IF NOT EXISTS public.news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    headline TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    sentiment_score NUMERIC, -- Could be -1 to 1 or 0 to 100
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.analysis (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    stock_id UUID REFERENCES public.stocks(id) ON DELETE CASCADE,
    generated_summary TEXT,
    rationale TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Row Level Security (RLS)
ALTER TABLE public.stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analysis ENABLE ROW LEVEL SECURITY;

-- Allow public read access (assuming a public dashboard)
CREATE POLICY "Allow public read access on stocks" ON public.stocks FOR SELECT USING (true);
CREATE POLICY "Allow public read access on financial_reports" ON public.financial_reports FOR SELECT USING (true);
CREATE POLICY "Allow public read access on news" ON public.news FOR SELECT USING (true);
CREATE POLICY "Allow public read access on analysis" ON public.analysis FOR SELECT USING (true);
