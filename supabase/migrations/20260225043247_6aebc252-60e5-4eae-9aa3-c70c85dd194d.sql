
CREATE TABLE public.tender_analyses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tender_url TEXT,
  tender_text TEXT NOT NULL,
  risk_score INTEGER NOT NULL DEFAULT 0,
  risk_level TEXT NOT NULL DEFAULT 'low',
  summary TEXT,
  recommendation TEXT,
  flags JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.tender_analyses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read analyses"
  ON public.tender_analyses FOR SELECT
  USING (true);

CREATE POLICY "Anyone can insert analyses"
  ON public.tender_analyses FOR INSERT
  WITH CHECK (true);

CREATE INDEX idx_tender_analyses_created_at ON public.tender_analyses (created_at DESC);
