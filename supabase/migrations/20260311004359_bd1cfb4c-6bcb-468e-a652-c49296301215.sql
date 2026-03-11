
-- Rooms table (create first, RLS policy added after room_users exists)
CREATE TABLE public.rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id text NOT NULL,
  event_title text,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (event_id)
);

ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Room users table
CREATE TABLE public.room_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  joined_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (room_id, user_id)
);

ALTER TABLE public.room_users ENABLE ROW LEVEL SECURITY;

-- Now add rooms RLS (room_users exists)
CREATE POLICY "Room members can read rooms"
  ON public.rooms FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.room_users
      WHERE room_users.room_id = rooms.id
        AND room_users.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can read own room memberships"
  ON public.room_users FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can read co-members"
  ON public.room_users FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.room_users ru
      WHERE ru.room_id = room_users.room_id
        AND ru.user_id = auth.uid()
    )
  );
