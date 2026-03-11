
CREATE TABLE public.user_interests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  interest_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, interest_id)
);

ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can read interests
CREATE POLICY "Authenticated users can read interests"
ON public.user_interests FOR SELECT TO authenticated USING (true);

-- Users can insert their own interests
CREATE POLICY "Users can insert own interests"
ON public.user_interests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Users can delete their own interests
CREATE POLICY "Users can delete own interests"
ON public.user_interests FOR DELETE TO authenticated USING (auth.uid() = user_id);
