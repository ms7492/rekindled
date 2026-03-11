
-- Create messages table
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  sender_name text NOT NULL,
  content text NOT NULL,
  is_ai boolean NOT NULL DEFAULT false,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Room members can read messages
CREATE POLICY "Room members can read messages"
  ON public.messages FOR SELECT
  TO authenticated
  USING (public.user_is_room_member(auth.uid(), room_id));

-- Room members can insert messages
CREATE POLICY "Room members can insert messages"
  ON public.messages FOR INSERT
  TO authenticated
  WITH CHECK (public.user_is_room_member(auth.uid(), room_id) AND auth.uid() = user_id);

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
