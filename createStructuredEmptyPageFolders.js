import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesHtmlDir = path.join(__dirname, 'pages-html');

// Reset directory
if (fs.existsSync(pagesHtmlDir)) {
  fs.rmSync(pagesHtmlDir, { recursive: true, force: true });
}
fs.mkdirSync(pagesHtmlDir, { recursive: true });

// Define structure with columns and pages
const structure = {
  '01_le-gst': [
    { col: 1, page: 1, id: '1-1-1-qui-sommes-nous.html' },
    { col: 1, page: 2, id: '1-1-2-mot-du-directeur-general.html' },
    { col: 1, page: 3, id: '1-1-3-missions-vision-valeurs.html' },
    { col: 1, page: 4, id: '1-1-4-chiffres-cles.html' }
  ],
  '02_patients-et-proches': [
    // Column 1: Urgences & Accessibilité
    { col: 1, page: 1, id: '2-1-1-urgences-et-samu.html' },
    { col: 1, page: 2, id: '2-1-2-quand-appeler-le-samu.html' },
    { col: 1, page: 3, id: '2-1-3-prendre-un-rendez-vous.html' },
    { col: 1, page: 4, id: '2-1-4-preparer-sa-consultation.html' },
    // Column 2: Parcours d'Hospitalisation
    { col: 2, page: 1, id: '2-2-1-preparer-son-hospitalisation.html' },
    { col: 2, page: 2, id: '2-2-2-pendant-l-hospitalisation.html' },
    { col: 2, page: 3, id: '2-2-3-sortie-et-continuite-des-soins.html' },
    { col: 2, page: 4, id: '2-2-4-hopital-de-jour.html' },
    // Column 3: Droits & Qualité
    { col: 3, page: 1, id: '2-3-1-droits-et-obligations-du-patient.html' },
    { col: 3, page: 2, id: '2-3-2-qualite-et-securite-du-patient.html' },
    { col: 3, page: 3, id: '2-3-3-satisfaction-et-experience-patient.html' },
    { col: 3, page: 4, id: '2-3-4-guides-et-brochures.html' }
  ],
  '03_offre-de-soins': [
    // Column 1: Soins de Proximité
    { col: 1, page: 1, id: '3-1-1-etablissements-de-soins-de-sante-primaires.html' },
    { col: 1, page: 2, id: '3-1-2-etablissements-medico-sociaux.html' },
    { col: 1, page: 3, id: '3-1-3-centres-de-sante-urbains-et-ruraux.html' },
    // Column 2: Soins Hospitaliers
    { col: 2, page: 1, id: '3-2-1-hopitaux-regionaux-et-provinciaux.html' },
    { col: 2, page: 2, id: '3-2-2-hopitaux-de-proximite.html' },
    { col: 2, page: 3, id: '3-2-3-espaces-et-districts-sanitaires.html' },
    // Column 3: CHU (Tertiaire)
    { col: 3, page: 1, id: '3-3-1-chu-mohammed-vi-specialites.html' },
    { col: 3, page: 2, id: '3-3-2-chu-mohammed-vi-mere-enfant.html' },
    { col: 3, page: 3, id: '3-3-3-chu-mohammed-vi-oncologie.html' },
    { col: 3, page: 4, id: '3-3-4-chu-mohammed-vi-psychiatrie.html' }
  ],
  '04_sante-publique': [
    // Column 1: Prévention & Protection
    { col: 1, page: 1, id: '4-1-1-prevention-et-promotion-de-la-sante.html' },
    { col: 1, page: 2, id: '4-1-2-programmes-de-sante-publique.html' },
    { col: 1, page: 3, id: '4-1-3-surveillance-et-securite-sanitaires.html' },
    { col: 1, page: 4, id: '4-1-4-mobilisation-communautaire.html' }
  ],
  '05_espace-professionnel': [
    // Column 1: Recrutement
    { col: 1, page: 1, id: '5-1-1-concours-et-resultats.html' },
    { col: 1, page: 2, id: '5-1-2-appels-a-candidature.html' },
    { col: 1, page: 3, id: '5-1-3-examens-d-aptitude-professionnelle.html' },
    { col: 1, page: 4, id: '5-1-4-stages-et-formation-pratique.html' },
    // Column 2: Fournisseurs
    { col: 2, page: 1, id: '5-2-1-appels-d-offres.html' },
    { col: 2, page: 2, id: '5-2-2-avis-d-appel-a-concurrence.html' },
    { col: 2, page: 3, id: '5-2-3-consultations-et-resultats.html' },
    // Column 3: Recherche
    { col: 3, page: 1, id: '5-3-1-appels-a-projets.html' },
    { col: 3, page: 2, id: '5-3-2-publications-scientifiques.html' },
    { col: 3, page: 3, id: '5-3-3-cooperation-et-communication-scientifique.html' }
  ],
  '06_actualites-et-medias': [
    // Column 1: Actualités
    { col: 1, page: 1, id: '6-1-1-toutes-les-actualites.html' },
    { col: 1, page: 2, id: '6-1-2-actualite-formation-continue.html' },
    { col: 1, page: 3, id: '6-1-3-actualite-offre-coordonnee.html' },
    { col: 1, page: 4, id: '6-1-4-actualite-ouverture-hospitaliere.html' },
    { col: 1, page: 5, id: '6-1-5-actualite-rencontres-sante.html' },
    { col: 1, page: 6, id: '6-1-6-actualite-renforcement-accueil.html' },
    { col: 1, page: 7, id: '6-1-7-actualite-vaccination-prevention.html' },
    // Column 2: Événements
    { col: 2, page: 1, id: '6-2-1-evenements.html' },
    { col: 2, page: 2, id: '6-2-2-evenement-forum-prevention.html' },
    { col: 2, page: 3, id: '6-2-3-evenement-journee-sensibilisation.html' },
    { col: 2, page: 4, id: '6-2-4-evenement-rencontre-professionnels.html' },
    // Column 3: Espace Presse
    { col: 3, page: 1, id: '6-3-1-communiques-de-presse.html' },
    { col: 3, page: 2, id: '6-3-2-dossiers-de-presse.html' },
    { col: 3, page: 3, id: '6-3-3-revue-de-presse.html' }
  ]
};

// Create root index file
fs.writeFileSync(path.join(pagesHtmlDir, '0-0-0-index.html'), '');
let count = 1;

for (const [folderName, files] of Object.entries(structure)) {
  const folderPath = path.join(pagesHtmlDir, folderName);
  fs.mkdirSync(folderPath, { recursive: true });

  for (const fileObj of files) {
    fs.writeFileSync(path.join(folderPath, fileObj.id), ''); // Completely empty (0 bytes)
    count++;
  }
}

console.log(`✓ Successfully created ${count} empty HTML files organized into navbar folders using [nav]-[col]-[page]-[title].html naming format.`);
