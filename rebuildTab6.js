import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesHtmlDir = path.join(__dirname, 'pages-html');
const tab6Dir = path.join(pagesHtmlDir, '06_actualites-et-medias');

// Helper to create URL friendly filenames
function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/\s+/g, '-')           
      .replace(/[^\w\-]+/g, '')       
      .replace(/\-\-+/g, '-')         
      .replace(/^-+/, '')             
      .replace(/-+$/, '');            
}

const structureTab6 = [
  // Column 1: Actualités et agenda
  { col: 1, title: "Actualités et événements" },
  
  // Column 2: Presse et médias
  { col: 2, title: "Communiqués et dossiers de presse" },
  { col: 2, title: "Demandes médias" },
  
  // Column 3: Centre d'écoute
  { col: 3, title: "Présentation et missions" },
  { col: 3, title: "Contact et horaires" },
  { col: 3, title: "Questions fréquentes" }
];

// Reset directory for Tab 6
if (fs.existsSync(tab6Dir)) {
  fs.rmSync(tab6Dir, { recursive: true, force: true });
}
fs.mkdirSync(tab6Dir, { recursive: true });

const tabNum = 6;
let count = 0;
const colPageCounts = {};

for (const item of structureTab6) {
  if (!colPageCounts[item.col]) {
    colPageCounts[item.col] = 1;
  } else {
    colPageCounts[item.col]++;
  }

  const pageNum = colPageCounts[item.col];
  const slug = slugify(item.title);
  
  // Naming format: [tab]-[col]-[page]-[title].html
  const fileName = `${tabNum}-${item.col}-${pageNum}-${slug}.html`;
  
  fs.writeFileSync(path.join(tab6Dir, fileName), ''); // Completely empty (0 bytes)
  count++;
}

console.log(`✓ Successfully created ${count} empty HTML files for the 6th tab using [nav]-[col]-[page]-[title].html naming format.`);
