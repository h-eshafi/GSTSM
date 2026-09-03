import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, 'pages-html');

// Reset directory
if (fs.existsSync(baseDir)) {
  fs.rmSync(baseDir, { recursive: true, force: true });
}
fs.mkdirSync(baseDir, { recursive: true });

// Copy assets & images to pages-html so opening files directly in browser works 100%
const rootDir = path.join(__dirname, '..');

const assetsSource = path.join(rootDir, 'assets');
const assetsTarget = path.join(baseDir, 'assets');
if (fs.existsSync(assetsSource)) {
  fs.cpSync(assetsSource, assetsTarget, { recursive: true });
}

const images = [
  'gst-logo.png', 'gst-hero.png', 'gst-hero-film-v2.mp4', 'hospital.png',
  'prevention.png', 'event.png', 'gst-scene-2.png', 'gst-scene-3.png', 'favicon.svg'
];
for (const img of images) {
  const src = path.join(rootDir, img);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(baseDir, img));
  }
}

const pagesStructure = {
  'le-gst': [
    { id: 'qui-sommes-nous', title: 'Qui sommes-nous ?', category: 'Le GST Souss-Massa' },
    { id: 'mot-du-directeur-general', title: 'Mot du Directeur Général', category: 'Direction Générale' },
    { id: 'missions-vision-valeurs', title: 'Missions, vision et valeurs', category: 'Gouvernance et statut' },
    { id: 'chiffres-cles', title: 'Chiffres clés', category: 'Repères sur le territoire' }
  ],
  'patients-et-proches': [
    { id: 'urgences-samu', title: 'Urgences et aide médicale urgente', category: 'SAMU Régional' },
    { id: 'quand-appeler-le-samu', title: 'Quand appeler le SAMU ?', category: 'Aide médicale urgente' },
    { id: 'prendre-un-rendez-vous', title: 'Prendre un rendez-vous', category: 'Consultations et examens' },
    { id: 'preparer-sa-consultation', title: 'Préparer sa consultation', category: 'Consultations et examens' },
    { id: 'preparer-son-hospitalisation', title: 'Préparer son hospitalisation', category: 'Hospitalisation' },
    { id: 'pendant-l-hospitalisation', title: 'Pendant l’hospitalisation', category: 'Hospitalisation' },
    { id: 'sortie-et-continuite-des-soins', title: 'Sortie et continuité des soins', category: 'Hospitalisation' },
    { id: 'hopital-de-jour', title: 'Hôpital de jour', category: 'Hospitalisation' },
    { id: 'droits-et-obligations-du-patient', title: 'Droits et obligations du patient', category: 'Droits et qualité' },
    { id: 'qualite-et-securite-du-patient', title: 'Qualité et sécurité du patient', category: 'Droits et qualité' },
    { id: 'satisfaction-et-experience-patient', title: 'Satisfaction et expérience patient', category: 'Droits et qualité' },
    { id: 'guides-et-brochures', title: 'Guides et brochures', category: 'Droits et qualité' }
  ],
  'offre-de-soins': [
    { id: 'etablissements-de-soins-de-sante-primaires', title: 'Établissements de soins de santé primaires (ESSP)', category: 'Soins de proximité' },
    { id: 'etablissements-medico-sociaux', title: 'Établissements médico-sociaux (EMS)', category: 'Soins de proximité' },
    { id: 'centres-de-sante-urbains-et-ruraux', title: 'Centres de santé urbains et ruraux', category: 'Soins de proximité' },
    { id: 'hopitaux-regionaux-et-provinciaux', title: 'Hôpitaux régionaux et provinciaux', category: 'Soins hospitaliers' },
    { id: 'hopitaux-de-proximite', title: 'Hôpitaux de proximité', category: 'Soins hospitaliers' },
    { id: 'espaces-et-districts-sanitaires', title: 'Espaces et districts sanitaires', category: 'Soins hospitaliers' },
    { id: 'chu-mohammed-vi-specialites', title: 'CHU Mohammed VI des spécialités d’Agadir', category: 'Soins hospitalo-universitaires' },
    { id: 'chu-mohammed-vi-mere-enfant', title: 'CHU Mohammed VI Mère-Enfant d’Agadir', category: 'Soins hospitalo-universitaires' },
    { id: 'chu-mohammed-vi-oncologie', title: 'CHU Mohammed VI d’oncologie d’Agadir', category: 'Soins hospitalo-universitaires' },
    { id: 'chu-mohammed-vi-psychiatrie', title: 'CHU Mohammed VI de psychiatrie d’Agadir', category: 'Soins hospitalo-universitaires' }
  ],
  'sante-publique': [
    { id: 'prevention-et-promotion-de-la-sante', title: 'Prévention et promotion de la santé', category: 'Prévenir et protéger' },
    { id: 'programmes-de-sante-publique', title: 'Programmes de santé publique', category: 'Prévenir et protéger' },
    { id: 'surveillance-et-securite-sanitaires', title: 'Surveillance et sécurité sanitaires', category: 'Prévenir et protéger' },
    { id: 'mobilisation-communautaire', title: 'Mobilisation communautaire', category: 'Prévenir et protéger' }
  ],
  'espace-professionnel': [
    { id: 'concours-et-resultats', title: 'Concours et résultats', category: 'Recrutement et carrière' },
    { id: 'appels-a-candidature', title: 'Appels à candidature', category: 'Recrutement et carrière' },
    { id: 'examens-d-aptitude-professionnelle', title: 'Examens d’aptitude professionnelle', category: 'Recrutement et carrière' },
    { id: 'stages-et-formation-pratique', title: 'Stages et formation pratique', category: 'Recrutement et carrière' },
    { id: 'appels-d-offres', title: 'Appels d’offres', category: 'Fournisseurs et prestataires' },
    { id: 'avis-d-appel-a-concurrence', title: 'Avis d’appel à concurrence', category: 'Fournisseurs et prestataires' },
    { id: 'consultations-et-resultats', title: 'Consultations et résultats', category: 'Fournisseurs et prestataires' },
    { id: 'appels-a-projets', title: 'Appels à projets', category: 'Recherche et innovation' },
    { id: 'publications-scientifiques', title: 'Publications scientifiques', category: 'Recherche et innovation' },
    { id: 'cooperation-et-communication-scientifique', title: 'Coopération et communication scientifique', category: 'Recherche et innovation' }
  ],
  'actualites-et-medias': [
    { id: 'toutes-les-actualites', title: 'Toutes les actualités', category: 'Actualités et médias' },
    { id: 'formation-continue', title: 'Formation continue des équipes de santé', category: 'Actualité régionale' },
    { id: 'offre-coordonnee', title: 'Une offre de soins coordonnée au service du territoire', category: 'Actualité régionale' },
    { id: 'ouverture-hospitaliere', title: 'Ouverture et développement de l’offre hospitalière régionale', category: 'Actualité régionale' },
    { id: 'rencontres-sante', title: 'Rencontres régionales de la santé Souss-Massa', category: 'Actualité régionale' },
    { id: 'renforcement-accueil', title: 'Renforcement de l’accueil dans les structures de proximité', category: 'Actualité régionale' },
    { id: 'vaccination-prevention', title: 'Campagne régionale de vaccination et de prévention', category: 'Actualité régionale' },
    { id: 'evenements', title: 'Événements et agenda régional', category: 'Agenda régional' },
    { id: 'forum-prevention', title: 'Forum territorial de la prévention', category: 'Événement' },
    { id: 'journee-sensibilisation', title: 'Journée régionale de sensibilisation', category: 'Événement' },
    { id: 'rencontre-professionnels', title: 'Rencontre des professionnels de santé', category: 'Événement' }
  ]
};

function generateTemplate(page, folder) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${page.title} - Groupement Sanitaire Territorial Souss-Massa</title>
    <meta name="description" content="${page.title} - GST Souss-Massa"/>
    <link rel="icon" href="../favicon.svg"/>
    <link rel="stylesheet" href="../assets/index-DsSqZW0z.css"/>
</head>
<body>
    <div class="app">
        <header>
            <a href="../index.html" class="logo">
                <img src="../gst-logo.png" alt="Groupement Sanitaire Territorial de la Région Souss-Massa"/>
            </a>
            <button class="mobile-menu-toggle" aria-expanded="false" aria-label="Ouvrir le menu"><i></i><i></i><i></i></button>
            <nav>
                <a href="../le-gst/qui-sommes-nous.html">Le GST Souss-Massa<b aria-hidden="true">›</b></a>
                <a href="../patients-et-proches/urgences-samu.html">Patients et proches<b aria-hidden="true">›</b></a>
                <a href="../offre-de-soins/etablissements-de-soins-de-sante-primaires.html">Offre de soins<b aria-hidden="true">›</b></a>
                <a href="../sante-publique/prevention-et-promotion-de-la-sante.html">Santé publique<b aria-hidden="true">›</b></a>
                <a href="../espace-professionnel/concours-et-resultats.html">Espace professionnel<b aria-hidden="true">›</b></a>
                <a href="../actualites-et-medias/toutes-les-actualites.html">Actualités et médias<b aria-hidden="true">›</b></a>
            </nav>
            <div class="site-search">
                <input aria-label="Rechercher sur le site" placeholder="Rechercher un service, un établissement…"/>
                <button aria-label="Ouvrir la recherche"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4"></circle><path d="m16 16 4.2 4.2"></path></svg></button>
            </div>
        </header>

        <aside class="side-rail" aria-label="Accès rapides">
            <button class="samu" onclick="location.href='../patients-et-proches/urgences-samu.html'" aria-label="Urgences et SAMU"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 18v-6a5 5 0 0 1 10 0v6M5 18h14M9 22h6M12 2v2M4.2 5.2l1.5 1.5M19.8 5.2l-1.5 1.5"></path></svg></i><span><b>Urgences / SAMU</b><small>Aide médicale urgente</small></span></button>
            <button class="rdv" onclick="location.href='../patients-et-proches/prendre-un-rendez-vous.html'" aria-label="Prendre rendez-vous"><i><svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"></rect><path d="M8 3v4M16 3v4M3 10h18M8 14h3M13 14h3M8 18h3"></path></svg></i><span><b>Rendez-vous</b><small>Préparer ma venue</small></span></button>
            <button class="ecoute" onclick="location.href='../patients-et-proches/guides-et-brochures.html'" aria-label="Centre d’écoute"><i><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v-7H4ZM20 13a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v-7h2ZM18 20c-1 2-3 2-5 2"></path></svg></i><span><b>Centre d’écoute</b><small>Information et orientation</small></span></button>
        </aside>

        <div class="chatbot">
            <button class="chat-launch" aria-label="Ouvrir l’assistant"><i>✦</i><span><b>Besoin d’aide ?</b><small>Assistant GST</small></span></button>
        </div>

        <main>
            <section class="content-hero">
                <div>
                    <span>${page.category}</span>
                    <h1>${page.title}</h1>
                    <p>Saisissez le sous-titre ou l'introduction de cette page ici...</p>
                </div>
                <div class="page-symbol" style="background-image:url(../hospital.png);"></div>
            </section>

            <div class="rich-content">
                <article class="content-card">
                    <!-- INSÉREZ LE CONTENU DE LA PAGE ICI -->
                    <p style="font-size:18px; font-weight:700; color:var(--navy); margin-bottom:20px;">
                        ${page.title} — Groupement Sanitaire Territorial Souss-Massa
                    </p>
                    <p>
                        Collez le texte et la mise en page HTML spécifique à cette page dans cette section.
                    </p>
                </article>

                <div style="margin-top:30px;">
                    <button class="content-back" onclick="location.href='../index.html'">← Retour à l’accueil</button>
                </div>
            </div>
        </main>

        <footer class="site-footer">
            <div class="footer-links">
                <div><b>Votre parcours</b><a href="../patients-et-proches/urgences-samu.html">Urgence & SAMU</a></div>
                <div><b>Le GST vous informe</b><a href="../actualites-et-medias/toutes-les-actualites.html">Actualités</a></div>
                <div><b>Professionnels</b><a href="../espace-professionnel/concours-et-resultats.html">Recrutement</a></div>
            </div>
            <div class="footer-signature">
                <p>© 2026 Groupement Sanitaire Territorial de la Région Souss-Massa</p>
            </div>
        </footer>
    </div>
    <script src="../assets/site-interactive.js"></script>
</body>
</html>`;
}

let fileCount = 0;
for (const [folder, pages] of Object.entries(pagesStructure)) {
  const folderPath = path.join(baseDir, folder);
  fs.mkdirSync(folderPath, { recursive: true });

  for (const page of pages) {
    const filePath = path.join(folderPath, `${page.id}.html`);
    fs.writeFileSync(filePath, generateTemplate(page, folder));
    fileCount++;
  }
}

console.log(`✓ Successfully generated ${fileCount} clean HTML template files organized inside pages-html/`);
