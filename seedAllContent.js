import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SUPABASE_URL = 'https://eiekmthzsjinhchsvafb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gXDHogGC4HySSFLVDHlz2A_MHbchyf1';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const rootDir = path.join(__dirname, '..');

// Helper to clean HTML text
function cleanText(str) {
  return str ? str.replace(/<[^>]*>/g, '').trim() : '';
}

async function seedAll() {
  const postsMap = new Map();

  // 1. First load from gstsm/src/data/posts.json if exists
  const jsonPath = path.join(rootDir, 'gstsm', 'src', 'data', 'posts.json');
  if (fs.existsSync(jsonPath)) {
    try {
      const postsJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
      for (const p of postsJson) {
        postsMap.set(p.id, p);
        if (p.id.startsWith('actualite-')) {
          postsMap.set(p.id.replace('actualite-', ''), p);
        } else {
          postsMap.set(`actualite-${p.id}`, p);
        }
        if (p.id.startsWith('evenement-')) {
          postsMap.set(p.id.replace('evenement-', ''), p);
        } else {
          postsMap.set(`evenement-${p.id}`, p);
        }
      }
      console.log(`Loaded ${postsJson.length} posts from posts.json`);
    } catch (e) {
      console.error('Error reading posts.json', e);
    }
  }

  // 2. Scan all .html files in root directory
  const htmlFiles = fs.readdirSync(rootDir).filter(f => f.endsWith('.html'));

  for (const file of htmlFiles) {
    const filePath = path.join(rootDir, file);
    const content = fs.readFileSync(filePath, 'utf8');

    let id = file.replace('.html', '');
    let type = 'page';
    if (file.startsWith('actualite-') || file === 'actualites.html') {
      type = 'actualite';
    } else if (file.startsWith('evenement-')) {
      type = 'evenement';
    }

    // Extract title
    let title = '';
    const h1Match = content.match(/<h1>([\s\S]*?)<\/h1>/i);
    if (h1Match) title = cleanText(h1Match[1]);

    // Extract kicker
    let kicker = '';
    const spanMatch = content.match(/<section class="(?:page-hero|content-hero|who-hero)">[\s\S]*?<span>([\s\S]*?)<\/span>/i);
    if (spanMatch) kicker = cleanText(spanMatch[1]);

    // Extract excerpt
    let excerpt = '';
    const pMatch = content.match(/<section class="(?:page-hero|content-hero|who-hero)">[\s\S]*?<p>([\s\S]*?)<\/p>/i);
    if (pMatch) excerpt = cleanText(pMatch[1]);

    // Extract image
    let image = '';
    const imgMatch = content.match(/background-image:\s*url\((.*?)\)/i) || content.match(/<img[^>]+src=["']([^"']+)["']/i);
    if (imgMatch) {
      image = imgMatch[1].replace(/^\/|\.\.\//g, '');
    }

    // Extract rich content
    let richContent = '';
    const richMatch = content.match(/<div class="rich-content">([\s\S]*?)<\/div>\s*<\/main>/i) ||
                      content.match(/<main>([\s\S]*?)<\/main>/i);

    if (richMatch) {
      richContent = richMatch[1].trim();
      // Remove trailing back button wrapper if present
      richContent = richContent.replace(/<div style="margin-top:30px;">[\s\S]*?<button class="content-back">[\s\S]*?<\/button>[\s\S]*?<\/div>/gi, '');
    }

    if (title && richContent) {
      const postObj = {
        id,
        type,
        kicker: kicker || 'GST Souss-Massa',
        title,
        excerpt: excerpt || '',
        image: image || '/hospital.png',
        content: richContent,
        createdAt: new Date().toISOString()
      };

      postsMap.set(id, postObj);

      // Also set aliases
      if (id.startsWith('actualite-')) {
        const shortId = id.replace('actualite-', '');
        postsMap.set(shortId, { ...postObj, id: shortId });
      }
      if (id.startsWith('evenement-')) {
        const shortId = id.replace('evenement-', '');
        postsMap.set(shortId, { ...postObj, id: shortId });
      }
    }
  }

  // 3. Upsert all gathered posts to Supabase
  console.log(`Upserting ${postsMap.size} total items (including aliases) into Supabase...`);
  for (const [id, post] of postsMap.entries()) {
    const { error } = await supabase.from('posts').upsert({
      id: post.id,
      type: post.type,
      kicker: post.kicker,
      title: post.title,
      excerpt: post.excerpt,
      image: post.image,
      content: post.content,
      createdAt: post.createdAt || new Date().toISOString()
    });

    if (error) {
      console.error(`Failed to upsert ${post.id}:`, error.message);
    } else {
      console.log(`✓ Seeded: ${post.id} (${post.type})`);
    }
  }

  console.log('Seeding complete!');
}

seedAll();
