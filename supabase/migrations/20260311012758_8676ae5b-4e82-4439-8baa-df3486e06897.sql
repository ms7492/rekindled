
-- Drop restrictive profile policies and recreate as permissive
DROP POLICY IF EXISTS "Authenticated users can read all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Permissive read all profiles
CREATE POLICY "Authenticated users can read all profiles"
ON public.profiles FOR SELECT TO authenticated USING (true);

-- Permissive insert own
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Permissive update own
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
