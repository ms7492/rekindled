
-- Drop all existing restrictive SELECT policies on room_users
DROP POLICY IF EXISTS "Users can read co-members" ON public.room_users;
DROP POLICY IF EXISTS "Users can read members of liked event rooms" ON public.room_users;
DROP POLICY IF EXISTS "Users can read own room memberships" ON public.room_users;

-- Create a single permissive policy: authenticated users who swiped right on the event can see room members
CREATE POLICY "Users can read room members"
ON public.room_users
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM swipes s
    JOIN rooms r ON r.event_id = s.event_id
    WHERE r.id = room_users.room_id
      AND s.user_id = auth.uid()
      AND s.direction = 'right'
  )
);
