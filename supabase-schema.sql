-- Create the posts table to hold Actualités, Événements, and Pages
CREATE TABLE posts (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'actualite', 'evenement', or 'page'
  kicker TEXT,
  title TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  content TEXT,
  date TEXT,
  location TEXT,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Public profiles are viewable by everyone."
  ON posts FOR SELECT
  USING ( true );

-- For the admin dashboard, we need a way to insert/update. 
-- In a real app, this should be restricted to authenticated admin users:
-- CREATE POLICY "Admins can insert/update posts." ON posts FOR ALL USING (auth.uid() IN (SELECT user_id FROM admins));
-- For the sake of this prototype working immediately via the Anon key (since Auth isn't fully set up yet):
CREATE POLICY "Allow anonymous inserts for prototype"
  ON posts FOR ALL
  USING ( true )
  WITH CHECK ( true );
