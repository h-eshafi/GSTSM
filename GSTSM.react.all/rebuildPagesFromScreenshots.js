import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesHtmlDir = path.join(__dirname, 'pages-html');

// Helper to create URL friendly filenames
function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/[éèêë]/g, 'e')
      .replace(/[àâä]/g, 'a')
      .replace(/[îï]/g, 'i')
      .replace(/[ôö]/g, 'o')
      .replace(/[ùûü]/g, 'u')
      .replace(/[ç]/g, 'c')
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
}

// Exact structure based on screenshots provided by user
const structure = {
  '01_le-gst': [
    { col: 1, title: "Qui sommes-nous ?" },
    { col: 1, title: "Mot du Directeur Général" },
    { col: 1, title: "Missions, vision et valeurs" },
    { col: 1, title: "Chiffres clés" },
    
    { col: 2, title: "Conseil d'administration" },
    { col: 2, title: "Organigramme général" },
    
    { col: 3, title: "Plan d'action" },
    { col: 3, title: "Projets structurants" },
    { col: 3, title: "Qualité et sécurité du patient" },
    
    { col: 4, title: "Recherche et innovation" },
    { col: 4, title: "Publications scientifiques" },
    { col: 4, title: "Appels à projets" },
    { col: 4, title: "Contacts institutionnels" }
  ],
  '02_patients-et-proches': [
    { col: 1, title: "Urgences et aide médicale urgente" },
    { col: 1, title: "Quand appeler le SAMU ?" },
    
    { col: 2, title: "Prendre rendez-vous" },
    { col: 2, title: "Consultation & hospitalisation" },
    { col: 2, title: "Hôpital de jour" },
    
    { col: 3, title: "Droits et obligations du patient" },
    { col: 3, title: "Qualité et sécurité du patient" },
    { col: 3, title: "Satisfaction et expérience patient" },
    { col: 3, title: "Guides et brochures" }
  ],
  '03_offre-de-soins': [
    { col: 1, title: "Établissements de soins de santé primaires (ESSP)" },
    { col: 1, title: "Établissements médico-sociaux (EMS)" },
    { col: 1, title: "Centres de santé urbains et ruraux" },
    
    { col: 2, title: "Hôpitaux régionaux et provinciaux" },
    { col: 2, title: "Hôpitaux de proximité" },
    { col: 2, title: "Espaces et districts sanitaires" },
    
    { col: 3, title: "HU Mohammed VI des spécialités d'Agadir" },
    { col: 3, title: "HU Mohammed VI Mère-Enfant d'Agadir" },
    { col: 3, title: "HU Mohammed VI d'oncologie d'Agadir" },
    { col: 3, title: "HU Mohammed VI de psychiatrie d'Agadir" }
  ],
  '04_sante-publique': [
    { col: 1, title: "Prévention et promotion de la santé" },
    { col: 2, title: "Programmes de santé publique" },
    { col: 3, title: "Surveillance et sécurité sanitaires" },
    { col: 4, title: "Mobilisation communautaire" }
  ],
  '05_espace-professionnel': [
    { col: 1, title: "Concours et résultats" },
    { col: 1, title: "Appels à candidature" },
    { col: 1, title: "Examens d'aptitude professionnelle" },
    { col: 1, title: "Stages et formation pratique" },
    
    { col: 2, title: "Appels d'offres" },
    { col: 2, title: "Avis d'appel à concurrence" },
    { col: 2, title: "Consultations et résultats" },
    
    { col: 3, title: "Appels à projets" },
    { col: 3, title: "Publications scientifiques" },
    { col: 3, title: "Coopération et communication scientifique" }
  ],
  '06_actualites-et-medias': [
    { col: 1, title: "Toutes les actualités" },
    { col: 1, title: "Actualité formation continue" },
    { col: 1, title: "Actualité offre coordonnée" },
    { col: 1, title: "Actualité ouverture hospitalière" },
    { col: 1, title: "Actualité rencontres santé" },
    { col: 1, title: "Actualité renforcement accueil" },
    { col: 1, title: "Actualité vaccination prévention" },
    
    { col: 2, title: "Événements" },
    { col: 2, title: "Événement forum prévention" },
    { col: 2, title: "Événement journée sensibilisation" },
    { col: 2, title: "Événement rencontre professionnels" },
    
    { col: 3, title: "Communiqués de presse" },
    { col: 3, title: "Dossiers de presse" },
    { col: 3, title: "Revue de presse" }
  ]
};

// Reset directory
if (fs.existsSync(pagesHtmlDir)) {
  fs.rmSync(pagesHtmlDir, { recursive: true, force: true });
}
fs.mkdirSync(pagesHtmlDir, { recursive: true });

// Create root index file
fs.writeFileSync(path.join(pagesHtmlDir, '0-0-0-index.html'), '');
let count = 1; // including index

const folders = Object.keys(structure);
for (let tabIndex = 0; tabIndex < folders.length; tabIndex++) {
  const folderName = folders[tabIndex];
  const items = structure[folderName];
  
  const folderPath = path.join(pagesHtmlDir, folderName);
  fs.mkdirSync(folderPath, { recursive: true });

  const tabNum = tabIndex + 1;
  
  // To assign page number correctly per column, keep track of them
  const colPageCounts = {};

  for (const item of items) {
    if (!colPageCounts[item.col]) {
      colPageCounts[item.col] = 1;
    } else {
      colPageCounts[item.col]++;
    }

    const pageNum = colPageCounts[item.col];
    const slug = slugify(item.title);
    
    // Naming format: [tab]-[col]-[page]-[title].html
    const fileName = `${tabNum}-${item.col}-${pageNum}-${slug}.html`;
    
    fs.writeFileSync(path.join(folderPath, fileName), ''); // Completely empty (0 bytes)
    count++;
  }
}

console.log(`✓ Successfully created ${count} empty HTML files matching screenshot data using [nav]-[col]-[page]-[title].html naming format.`);
