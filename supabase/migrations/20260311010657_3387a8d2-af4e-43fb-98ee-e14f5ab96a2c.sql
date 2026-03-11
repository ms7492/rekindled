
-- Allow users to see rooms for events they've swiped right on
CREATE POLICY "Users can read rooms for liked events"
  ON public.rooms FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.swipes
      WHERE swipes.event_id = rooms.event_id
        AND swipes.user_id = auth.uid()
        AND swipes.direction = 'right'
    )
  );
