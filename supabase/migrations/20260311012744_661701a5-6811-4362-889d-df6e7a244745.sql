
-- Drop existing restrictive rooms policies
DROP POLICY IF EXISTS "Room members can read rooms" ON public.rooms;
DROP POLICY IF EXISTS "Users can read rooms for liked events" ON public.rooms;

-- Create single permissive policy for rooms
CREATE POLICY "Users can read rooms for liked events"
ON public.rooms
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM swipes
    WHERE swipes.event_id = rooms.event_id
      AND swipes.user_id = auth.uid()
      AND swipes.direction = 'right'
  )
);
