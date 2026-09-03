require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://eiekmthzsjinhchsvafb.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const filePath = path.join(__dirname, 'content-to-migrate', 'All the website.html');
  const content = fs.readFileSync(filePath, 'utf8');

  // Extract everything inside <main>...</main>
  const mainMatch = content.match(/<main>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.error("Could not find <main> tags in the file.");
    return;
  }

  let htmlContent = mainMatch[1].trim();

  // Remove the hardcoded "Retour à l'accueil" button from the HTML since GenericPage handles it
  htmlContent = htmlContent.replace(/<div class="back">[\s\S]*?<\/div>/, '');

  console.log("Extracted HTML length:", htmlContent.length);

  const postData = {
    id: 'qui-sommes-nous',
    type: 'page',
    title: 'Qui sommes-nous ?',
    kicker: 'Le GST Souss-Massa',
    excerpt: 'Une organisation publique régionale qui réunit les établissements de santé de son territoire pour construire une offre de soins plus accessible, coordonnée et adaptée aux besoins de la population.',
    content: htmlContent,
    image: null,
    createdAt: new Date().toISOString()
  };

  const { data, error } = await supabase.from('posts').upsert(postData).select();
  
  if (error) {
    console.error("Error inserting to Supabase:", error);
  } else {
    console.log("Successfully imported qui-sommes-nous to Supabase!", data);
  }
}

run();
