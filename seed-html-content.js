import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const pagesHtmlDir = path.join(__dirname, 'pages-html');

async function seedContent() {
  const folders = fs.readdirSync(pagesHtmlDir).filter(f => fs.statSync(path.join(pagesHtmlDir, f)).isDirectory());
  
  let records = [];

  for (const folder of folders) {
    const folderPath = path.join(pagesHtmlDir, folder);
    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.html'));

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const htmlContent = fs.readFileSync(filePath, 'utf-8');
      
      let extractedContent = htmlContent;

      const mainMatch = htmlContent.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
      
      if (mainMatch && mainMatch[1]) {
        extractedContent = mainMatch[1];
      }

      // Parse slug from filename: e.g. "1-1-1-qui-sommes-nous.html" -> "qui-sommes-nous"
      const parts = file.replace('.html', '').split('-');
      if (parts.length >= 4) {
        parts.shift(); // remove tab
        parts.shift(); // remove col
        parts.shift(); // remove page
      }
      const slug = parts.join('-');
      
      // We will parse the title from the h1 or h2 if it exists inside the content, or just format the slug.
      let title = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      
      const h1Match = extractedContent.match(/<h1[^>]*>(.*?)<\/h1>/is);
      const h2Match = extractedContent.match(/<h2[^>]*>(.*?)<\/h2>/is);
      if (h1Match && h1Match[1]) {
        title = h1Match[1].replace(/<[^>]+>/g, '').trim(); // strip html tags inside h1
      } else if (h2Match && h2Match[1]) {
        title = h2Match[1].replace(/<[^>]+>/g, '').trim();
      }

      records.push({
        id: slug,
        type: 'page',
        title: title,
        kicker: folder.replace(/^\d+_/, '').replace(/-/g, ' ').toUpperCase(),
        excerpt: 'Contenu migré depuis les fichiers HTML.',
        image: 'gst-scene-2.png',
        content: extractedContent.trim(),
        createdAt: new Date().toISOString()
      });
    }
  }

  console.log(`Found ${records.length} pages to migrate.`);
  
  // Deduplicate
  const uniqueRecordsMap = new Map();
  for (const r of records) {
    uniqueRecordsMap.set(r.id, r);
  }
  const uniqueRecords = Array.from(uniqueRecordsMap.values());
  console.log(`Deduplicated to ${uniqueRecords.length} unique pages.`);

  // Upsert to Supabase in chunks of 10
  const chunkSize = 10;
  for (let i = 0; i < uniqueRecords.length; i += chunkSize) {
    const chunk = uniqueRecords.slice(i, i + chunkSize);
    console.log(`Upserting chunk ${i / chunkSize + 1}...`);
    const { data, error } = await supabase
      .from('posts')
      .upsert(chunk, { onConflict: 'id' });
    
    if (error) {
      console.error('Error inserting chunk into Supabase:', error);
    }
  }

  console.log('Successfully finished seeding database with HTML content!');
}

seedContent();
