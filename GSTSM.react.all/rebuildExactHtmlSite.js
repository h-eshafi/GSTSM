import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const targetDir = path.join(__dirname, 'content-to-migrate');
const sourceDir = path.join(__dirname, '..');

// Step 1: Clean target directory completely
if (fs.existsSync(targetDir)) {
  fs.rmSync(targetDir, { recursive: true, force: true });
}
fs.mkdirSync(targetDir, { recursive: true });

// Read source HTML files from root
const htmlSourceMap = {};
const files = fs.readdirSync(sourceDir);
for (const file of files) {
  if (file.endsWith('.html')) {
    htmlSourceMap[file] = fs.readFileSync(path.join(sourceDir, file), 'utf8');
  }
}

// Structure definition
const siteStructure = {
  'le-gst': [
    { id: 'qui-sommes-nous', title: 'Qui sommes-nous ?', sourceFile: 'le-gst.html' },
    { id: 'mot-du-directeur-general', title: 'Mot du Directeur Général', sourceFile: 'le-gst.html' },
    { id: 'missions-vision-valeurs', title: 'Missions, vision et valeurs', sourceFile: 'le-gst.html' },
    { id: 'chiffres-cles', title: 'Chiffres clés', sourceFile: 'le-gst.html' }
  ],
  'patients-et-proches': [
    { id: 'urgences-samu', title: 'Urgences et aide médicale urgente', sourceFile: 'urgences.html' },
    { id: 'quand-appeler-le-samu', title: 'Quand appeler le SAMU ?', sourceFile: 'urgences.html' },
    { id: 'prendre-un-rendez-vous', title: 'Prendre un rendez-vous', sourceFile: 'rendez-vous.html' },
    { id: 'preparer-sa-consultation', title: 'Préparer sa consultation', sourceFile: 'rendez-vous.html' },
    { id: 'preparer-son-hospitalisation', title: 'Préparer son hospitalisation', sourceFile: 'patients-proches.html' },
    { id: 'pendant-l-hospitalisation', title: 'Pendant l’hospitalisation', sourceFile: 'patients-proches.html' },
    { id: 'sortie-et-continuite-des-soins', title: 'Sortie et continuité des soins', sourceFile: 'patients-proches.html' },
    { id: 'hopital-de-jour', title: 'Hôpital de jour', sourceFile: 'patients-proches.html' },
    { id: 'droits-et-obligations-du-patient', title: 'Droits et obligations du patient', sourceFile: 'patients-proches.html' },
    { id: 'qualite-et-securite-du-patient', title: 'Qualité et sécurité du patient', sourceFile: 'patients-proches.html' },
    { id: 'satisfaction-et-experience-patient', title: 'Satisfaction et expérience patient', sourceFile: 'patients-proches.html' },
    { id: 'guides-et-brochures', title: 'Guides et brochures', sourceFile: 'patients-proches.html' }
  ],
  'offre-de-soins': [
    { id: 'etablissements-de-soins-de-sante-primaires', title: 'Établissements de soins de santé primaires (ESSP)', sourceFile: 'offre-de-soins.html' },
    { id: 'etablissements-medico-sociaux', title: 'Établissements médico-sociaux (EMS)', sourceFile: 'offre-de-soins.html' },
    { id: 'centres-de-sante-urbains-et-ruraux', title: 'Centres de santé urbains et ruraux', sourceFile: 'offre-de-soins.html' },
    { id: 'hopitaux-regionaux-et-provinciaux', title: 'Hôpitaux régionaux et provinciaux', sourceFile: 'offre-de-soins.html' },
    { id: 'hopitaux-de-proximite', title: 'Hôpitaux de proximité', sourceFile: 'offre-de-soins.html' },
    { id: 'espaces-et-districts-sanitaires', title: 'Espaces et districts sanitaires', sourceFile: 'offre-de-soins.html' },
    { id: 'chu-mohammed-vi-specialites', title: 'CHU Mohammed VI des spécialités d’Agadir', sourceFile: 'offre-de-soins.html' },
    { id: 'chu-mohammed-vi-mere-enfant', title: 'CHU Mohammed VI Mère-Enfant d’Agadir', sourceFile: 'offre-de-soins.html' },
    { id: 'chu-mohammed-vi-oncologie', title: 'CHU Mohammed VI d’oncologie d’Agadir', sourceFile: 'offre-de-soins.html' },
    { id: 'chu-mohammed-vi-psychiatrie', title: 'CHU Mohammed VI de psychiatrie d’Agadir', sourceFile: 'offre-de-soins.html' }
  ],
  'sante-publique': [
    { id: 'prevention-et-promotion-de-la-sante', title: 'Prévention et promotion de la santé', sourceFile: 'sante-publique.html' },
    { id: 'programmes-de-sante-publique', title: 'Programmes de santé publique', sourceFile: 'sante-publique.html' },
    { id: 'surveillance-et-securite-sanitaires', title: 'Surveillance et sécurité sanitaires', sourceFile: 'sante-publique.html' },
    { id: 'mobilisation-communautaire', title: 'Mobilisation communautaire', sourceFile: 'sante-publique.html' }
  ],
  'espace-professionnel': [
    { id: 'concours-et-resultats', title: 'Concours et résultats', sourceFile: 'espace-professionnel.html' },
    { id: 'appels-a-candidature', title: 'Appels à candidature', sourceFile: 'espace-professionnel.html' },
    { id: 'examens-d-aptitude-professionnelle', title: 'Examens d’aptitude professionnelle', sourceFile: 'espace-professionnel.html' },
    { id: 'stages-et-formation-pratique', title: 'Stages et formation pratique', sourceFile: 'espace-professionnel.html' },
    { id: 'appels-d-offres', title: 'Appels d’offres', sourceFile: 'espace-professionnel.html' },
    { id: 'avis-d-appel-a-concurrence', title: 'Avis d’appel à concurrence', sourceFile: 'espace-professionnel.html' },
    { id: 'consultations-et-resultats', title: 'Consultations et résultats', sourceFile: 'espace-professionnel.html' },
    { id: 'appels-a-projets', title: 'Appels à projets', sourceFile: 'espace-professionnel.html' },
    { id: 'publications-scientifiques', title: 'Publications scientifiques', sourceFile: 'espace-professionnel.html' },
    { id: 'cooperation-et-communication-scientifique', title: 'Coopération et communication scientifique', sourceFile: 'espace-professionnel.html' }
  ],
  'actualites-et-medias': [
    { id: 'toutes-les-actualites', title: 'Toutes les actualités', sourceFile: 'actualites.html' },
    { id: 'formation-continue', title: 'Formation continue des équipes de santé', sourceFile: 'actualite-formation-continue.html' },
    { id: 'offre-coordonnee', title: 'Une offre de soins coordonnée', sourceFile: 'actualite-offre-coordonnee.html' },
    { id: 'ouverture-hospitaliere', title: 'Ouverture et développement hospitalier', sourceFile: 'actualite-ouverture-hospitaliere.html' },
    { id: 'rencontres-sante', title: 'Rencontres régionales de la santé', sourceFile: 'actualite-rencontres-sante.html' },
    { id: 'renforcement-accueil', title: 'Renforcement de l’accueil', sourceFile: 'actualite-renforcement-accueil.html' },
    { id: 'vaccination-prevention', title: 'Campagne de vaccination et prévention', sourceFile: 'actualite-vaccination-prevention.html' },
    { id: 'evenements', title: 'Événements', sourceFile: 'actualites.html' },
    { id: 'forum-prevention', title: 'Forum territorial de la prévention', sourceFile: 'evenement-forum-prevention.html' },
    { id: 'journee-sensibilisation', title: 'Journee régionale de sensibilisation', sourceFile: 'evenement-journee-sensibilisation.html' },
    { id: 'rencontre-professionnels', title: 'Rencontre des professionnels de santé', sourceFile: 'evenement-rencontre-professionnels.html' }
  ]
};

// Helper function to replace asset paths and interlink buttons
function processHtml(html, depth = 0) {
  const prefix = depth === 0 ? '' : '../';

  let processed = html;

  // 1. Fix CSS stylesheet link
  processed = processed.replace(/href=["'](?:\/)?assets\/index-DsSqZW0z\.css["']/g, `href="${prefix}assets/index-DsSqZW0z.css"`);
  processed = processed.replace(/href=["']assets\/index-DsSqZW0z\.css["']/g, `href="${prefix}assets/index-DsSqZW0z.css"`);

  // 2. Fix Images
  processed = processed.replace(/src=["'](?:\/)?gst-logo\.png["']/g, `src="${prefix}gst-logo.png"`);
  processed = processed.replace(/src=["'](?:\/)?gst-hero\.png["']/g, `src="${prefix}gst-hero.png"`);
  processed = processed.replace(/src=["'](?:\/)?hospital\.png["']/g, `src="${prefix}hospital.png"`);
  processed = processed.replace(/src=["'](?:\/)?prevention\.png["']/g, `src="${prefix}prevention.png"`);
  processed = processed.replace(/src=["'](?:\/)?event\.png["']/g, `src="${prefix}event.png"`);
  processed = processed.replace(/src=["'](?:\/)?gst-scene-2\.png["']/g, `src="${prefix}gst-scene-2.png"`);
  processed = processed.replace(/src=["'](?:\/)?gst-scene-3\.png["']/g, `src="${prefix}gst-scene-3.png"`);
  processed = processed.replace(/src=["'](?:\/)?favicon\.svg["']/g, `src="${prefix}favicon.svg"`);
  processed = processed.replace(/poster=["'](?:\/)?gst-hero\.png["']/g, `poster="${prefix}gst-hero.png"`);
  processed = processed.replace(/src=["'](?:\/)?gst-hero-film-v2\.mp4["']/g, `src="${prefix}gst-hero-film-v2.mp4"`);

  // 3. Interlink Header Logo
  processed = processed.replace(/class=["']logo["'][^>]*>/g, `class="logo" href="${prefix}index.html">`);

  // 4. Interlink Navigation links
  processed = processed.replace(/<button([^>]*)>Le GST Souss-Massa<b/g, `<a href="${prefix}le-gst/qui-sommes-nous.html"$1>Le GST Souss-Massa<b`);
  processed = processed.replace(/<button([^>]*)>Patients et proches<b/g, `<a href="${prefix}patients-et-proches/urgences-samu.html"$1>Patients et proches<b`);
  processed = processed.replace(/<button([^>]*)>Offre de soins<b/g, `<a href="${prefix}offre-de-soins/etablissements-de-soins-de-sante-primaires.html"$1>Offre de soins<b`);
  processed = processed.replace(/<button([^>]*)>Santé publique<b/g, `<a href="${prefix}sante-publique/prevention-et-promotion-de-la-sante.html"$1>Santé publique<b`);
  processed = processed.replace(/<button([^>]*)>Espace professionnel<b/g, `<a href="${prefix}espace-professionnel/concours-et-resultats.html"$1>Espace professionnel<b`);
  processed = processed.replace(/<button([^>]*)>Actualités et médias<b/g, `<a href="${prefix}actualites-et-medias/toutes-les-actualites.html"$1>Actualités et médias<b`);

  // 5. Interlink Side Rail buttons
  processed = processed.replace(/class=["']samu["']/g, `class="samu" onclick="location.href='${prefix}patients-et-proches/urgences-samu.html'"`);
  processed = processed.replace(/class=["']rdv["']/g, `class="rdv" onclick="location.href='${prefix}patients-et-proches/prendre-un-rendez-vous.html'"`);
  processed = processed.replace(/class=["']ecoute["']/g, `class="ecoute" onclick="location.href='${prefix}patients-et-proches/guides-et-brochures.html'"`);

  // 6. Interlink Back button
  processed = processed.replace(/class=["']content-back["']>([\s\S]*?)<\/button>/g, `class="content-back" onclick="location.href='${prefix}index.html'">$1</button>`);

  return processed;
}

// Write Root index.html
const rootIndexContent = processHtml(htmlSourceMap['index.html'] || htmlSourceMap['le-gst.html'], 0);
fs.writeFileSync(path.join(targetDir, 'index.html'), rootIndexContent);
console.log('✓ Created content-to-migrate/index.html');

let totalCount = 1;

// Process each subfolder & html page
for (const [folderName, pages] of Object.entries(siteStructure)) {
  const folderPath = path.join(targetDir, folderName);
  fs.mkdirSync(folderPath, { recursive: true });

  for (const page of pages) {
    const rawContent = htmlSourceMap[page.sourceFile] || htmlSourceMap['le-gst.html'];
    const pageHtml = processHtml(rawContent, 1);
    const pagePath = path.join(folderPath, `${page.id}.html`);
    fs.writeFileSync(pagePath, pageHtml);
    totalCount++;
  }
}

console.log(`✓ Successfully generated ${totalCount} fully interlinked HTML pages inside content-to-migrate/`);
