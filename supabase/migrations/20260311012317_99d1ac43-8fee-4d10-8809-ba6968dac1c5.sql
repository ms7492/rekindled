
-- Allow authenticated users to read all profiles (for member lists)
CREATE POLICY "Authenticated users can read all profiles"
ON public.profiles
FOR SELECT
TO authenticated
USING (true);

-- Drop the restrictive own-profile-only read policy
DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
