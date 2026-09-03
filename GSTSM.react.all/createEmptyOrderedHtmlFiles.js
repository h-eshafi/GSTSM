import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pagesHtmlDir = path.join(__dirname, 'pages-html');

// Reset pages-html folder
if (fs.existsSync(pagesHtmlDir)) {
  fs.rmSync(pagesHtmlDir, { recursive: true, force: true });
}
fs.mkdirSync(pagesHtmlDir, { recursive: true });

// Ordered list of all navbar pages & sub-menus
const orderedFileList = [
  '00_index.html',
  
  // 1. Le GST Souss-Massa
  '01_le-gst_qui-sommes-nous.html',
  '02_le-gst_mot-du-directeur-general.html',
  '03_le-gst_missions-vision-valeurs.html',
  '04_le-gst_chiffres-cles.html',

  // 2. Patients et proches
  '05_patients-et-proches_urgences-et-samu.html',
  '06_patients-et-proches_quand-appeler-le-samu.html',
  '07_patients-et-proches_prendre-un-rendez-vous.html',
  '08_patients-et-proches_preparer-sa-consultation.html',
  '09_patients-et-proches_preparer-son-hospitalisation.html',
  '10_patients-et-proches_pendant-l-hospitalisation.html',
  '11_patients-et-proches_sortie-et-continuite-des-soins.html',
  '12_patients-et-proches_hopital-de-jour.html',
  '13_patients-et-proches_droits-et-obligations-du-patient.html',
  '14_patients-et-proches_qualite-et-securite-du-patient.html',
  '15_patients-et-proches_satisfaction-et-experience-patient.html',
  '16_patients-et-proches_guides-et-brochures.html',

  // 3. Offre de soins
  '17_offre-de-soins_etablissements-de-soins-de-sante-primaires.html',
  '18_offre-de-soins_etablissements-medico-sociaux.html',
  '19_offre-de-soins_centres-de-sante-urbains-et-ruraux.html',
  '20_offre-de-soins_hopitaux-regionaux-et-provinciaux.html',
  '21_offre-de-soins_hopitaux-de-proximite.html',
  '22_offre-de-soins_espaces-et-districts-sanitaires.html',
  '23_offre-de-soins_chu-mohammed-vi-specialites.html',
  '24_offre-de-soins_chu-mohammed-vi-mere-enfant.html',
  '25_offre-de-soins_chu-mohammed-vi-oncologie.html',
  '26_offre-de-soins_chu-mohammed-vi-psychiatrie.html',

  // 4. Santé publique
  '27_sante-publique_prevention-et-promotion-de-la-sante.html',
  '28_sante-publique_programmes-de-sante-publique.html',
  '29_sante-publique_surveillance-et-securite-sanitaires.html',
  '30_sante-publique_mobilisation-communautaire.html',

  // 5. Espace professionnel
  '31_espace-professionnel_concours-et-resultats.html',
  '32_espace-professionnel_appels-a-candidature.html',
  '33_espace-professionnel_examens-d-aptitude-professionnelle.html',
  '34_espace-professionnel_stages-et-formation-pratique.html',
  '35_espace-professionnel_appels-d-offres.html',
  '36_espace-professionnel_avis-d-appel-a-concurrence.html',
  '37_espace-professionnel_consultations-et-resultats.html',
  '38_espace-professionnel_appels-a-projets.html',
  '39_espace-professionnel_publications-scientifiques.html',
  '40_espace-professionnel_cooperation-et-communication-scientifique.html',

  // 6. Actualités et médias
  '41_actualites-et-medias_toutes-les-actualites.html',
  '42_actualites-et-medias_actualite-formation-continue.html',
  '43_actualites-et-medias_actualite-offre-coordonnee.html',
  '44_actualites-et-medias_actualite-ouverture-hospitaliere.html',
  '45_actualites-et-medias_actualite-rencontres-sante.html',
  '46_actualites-et-medias_actualite-renforcement-accueil.html',
  '47_actualites-et-medias_actualite-vaccination-prevention.html',
  '48_actualites-et-medias_evenements.html',
  '49_actualites-et-medias_evenement-forum-prevention.html',
  '50_actualites-et-medias_evenement-journee-sensibilisation.html',
  '51_actualites-et-medias_evenement-rencontre-professionnels.html'
];

for (const fileName of orderedFileList) {
  const filePath = path.join(pagesHtmlDir, fileName);
  fs.writeFileSync(filePath, ''); // Completely empty (0 bytes)
}

console.log(`✓ Successfully created ${orderedFileList.length} empty HTML files strictly ordered by navbar in pages-html/`);
