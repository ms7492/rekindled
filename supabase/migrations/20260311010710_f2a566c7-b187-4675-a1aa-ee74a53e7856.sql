
-- Allow users to read room_users for rooms of events they liked
CREATE POLICY "Users can read members of liked event rooms"
  ON public.room_users FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.rooms r
      JOIN public.swipes s ON s.event_id = r.event_id
      WHERE r.id = room_users.room_id
        AND s.user_id = auth.uid()
        AND s.direction = 'right'
    )
  );
