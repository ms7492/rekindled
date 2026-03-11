
-- Allow all authenticated users to read swipes (needed for "going" counts)
DROP POLICY IF EXISTS "Users can read own swipes" ON public.swipes;

CREATE POLICY "Authenticated users can read all swipes"
  ON public.swipes FOR SELECT TO authenticated
  USING (true);
