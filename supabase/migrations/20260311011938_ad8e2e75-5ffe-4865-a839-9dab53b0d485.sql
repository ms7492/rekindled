
-- Drop the recursive policies
DROP POLICY IF EXISTS "Room members can read rooms" ON public.rooms;
DROP POLICY IF EXISTS "Users can read members of liked event rooms" ON public.room_users;

-- Create security definer function to check room membership without RLS recursion
CREATE OR REPLACE FUNCTION public.user_is_room_member(_user_id uuid, _room_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM room_users
    WHERE user_id = _user_id AND room_id = _room_id
  )
$$;

-- Recreate rooms policy using the security definer function (no recursion)
CREATE POLICY "Room members can read rooms"
ON public.rooms
FOR SELECT
TO authenticated
USING (public.user_is_room_member(auth.uid(), id));

-- Recreate room_users policy joining swipes+rooms without triggering rooms RLS
CREATE POLICY "Users can read members of liked event rooms"
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
