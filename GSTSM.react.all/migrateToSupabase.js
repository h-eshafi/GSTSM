import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Use the credentials from your .env
const SUPABASE_URL = 'https://eiekmthzsjinhchsvafb.supabase.co';
// WARNING: To insert data using this script, you MUST use the SUPABASE_SECRET_KEY, 
// because the Anon key will be blocked if RLS is not completely open.
// Since you provided the anon key, we will try with it, but if RLS blocks it, you need to use the Secret Key.
const SUPABASE_KEY = 'sb_publishable_gXDHogGC4HySSFLVDHlz2A_MHbchyf1';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function migrateData() {
  console.log('Reading local posts.json...');
  const dataPath = path.join(__dirname, 'src', 'data', 'posts.json');
  
  if (!fs.existsSync(dataPath)) {
    console.error('posts.json not found! Please ensure it is inside src/data/');
    return;
  }

  const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  console.log(`Found ${posts.length} records. Migrating to Supabase...`);

  for (const post of posts) {
    const { data, error } = await supabase
      .from('posts')
      .upsert({
        id: post.id,
        type: post.type,
        kicker: post.kicker || null,
        title: post.title,
        excerpt: post.excerpt || null,
        image: post.image || null,
        content: post.content || null,
        date: post.date || null,
        location: post.location || null,
        createdAt: post.createdAt || new Date().toISOString()
      });

    if (error) {
      console.error(`Error migrating post ${post.id}:`, error.message);
    } else {
      console.log(`Successfully migrated: ${post.id}`);
    }
  }
  console.log('Migration complete!');
}

migrateData();
