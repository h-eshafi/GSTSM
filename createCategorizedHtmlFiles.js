import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseDir = path.join(__dirname, 'content-to-migrate');

const structure = {
  'le-gst': [
    { id: 'qui-sommes-nous', title: 'Qui sommes-nous ?', kicker: 'Le GST Souss-Massa', img: '/gst-scene-2.png' },
    { id: 'mot-du-directeur-general', title: 'Mot du Directeur Général', kicker: 'Direction Générale', img: '/gst-logo.png' },
    { id: 'missions-vision-valeurs', title: 'Missions, vision et valeurs', kicker: 'Gouvernance et statut', img: '/gst-scene-3.png' },
    { id: 'chiffres-cles', title: 'Chiffres clés', kicker: 'Repères sur le territoire', img: '/hospital.png' }
  ],
  'patients-et-proches': [
    { id: 'urgences-samu', title: 'Urgences et aide médicale urgente', kicker: 'SAMU Régional', img: '/hospital.png' },
    { id: 'quand-appeler-le-samu', title: 'Quand appeler le SAMU ?', kicker: 'Aide médicale urgente', img: '/hospital.png' },
    { id: 'prendre-un-rendez-vous', title: 'Prendre un rendez-vous', kicker: 'Consultations et examens', img: '/prevention.png' },
    { id: 'preparer-sa-consultation', title: 'Préparer sa consultation', kicker: 'Consultations et examens', img: '/prevention.png' },
    { id: 'preparer-son-hospitalisation', title: 'Préparer son hospitalisation', kicker: 'Hospitalisation', img: '/gst-scene-3.png' },
    { id: 'pendant-l-hospitalisation', title: 'Pendant l’hospitalisation', kicker: 'Hospitalisation', img: '/gst-scene-3.png' },
    { id: 'sortie-et-continuite-des-soins', title: 'Sortie et continuité des soins', kicker: 'Hospitalisation', img: '/gst-scene-3.png' },
    { id: 'hopital-de-jour', title: 'Hôpital de jour', kicker: 'Hospitalisation', img: '/hospital.png' },
    { id: 'droits-et-obligations-du-patient', title: 'Droits et obligations du patient', kicker: 'Droits et qualité', img: '/prevention.png' },
    { id: 'qualite-et-securite-du-patient', title: 'Qualité et sécurité du patient', kicker: 'Droits et qualité', img: '/prevention.png' },
    { id: 'satisfaction-et-experience-patient', title: 'Satisfaction et expérience patient', kicker: 'Droits et qualité', img: '/prevention.png' },
    { id: 'guides-et-brochures', title: 'Guides et brochures', kicker: 'Droits et qualité', img: '/prevention.png' }
  ],
  'offre-de-soins': [
    { id: 'etablissements-de-soins-de-sante-primaires', title: 'Établissements de soins de santé primaires (ESSP)', kicker: 'Soins de proximité', img: '/hospital.png' },
    { id: 'etablissements-medico-sociaux', title: 'Établissements médico-sociaux (EMS)', kicker: 'Soins de proximité', img: '/hospital.png' },
    { id: 'centres-de-sante-urbains-et-ruraux', title: 'Centres de santé urbains et ruraux', kicker: 'Soins de proximité', img: '/hospital.png' },
    { id: 'hopitaux-regionaux-et-provinciaux', title: 'Hôpitaux régionaux et provinciaux', kicker: 'Soins hospitaliers', img: '/hospital.png' },
    { id: 'hopitaux-de-proximite', title: 'Hôpitaux de proximité', kicker: 'Soins hospitaliers', img: '/hospital.png' },
    { id: 'espaces-et-districts-sanitaires', title: 'Espaces et districts sanitaires', kicker: 'Soins hospitaliers', img: '/hospital.png' },
    { id: 'chu-mohammed-vi-specialites', title: 'CHU Mohammed VI des spécialités d’Agadir', kicker: 'Soins hospitalo-universitaires', img: '/hospital.png' },
    { id: 'chu-mohammed-vi-mere-enfant', title: 'CHU Mohammed VI Mère-Enfant d’Agadir', kicker: 'Soins hospitalo-universitaires', img: '/hospital.png' },
    { id: 'chu-mohammed-vi-oncologie', title: 'CHU Mohammed VI d’oncologie d’Agadir', kicker: 'Soins hospitalo-universitaires', img: '/hospital.png' },
    { id: 'chu-mohammed-vi-psychiatrie', title: 'CHU Mohammed VI de psychiatrie d’Agadir', kicker: 'Soins hospitalo-universitaires', img: '/hospital.png' }
  ],
  'sante-publique': [
    { id: 'prevention-et-promotion-de-la-sante', title: 'Prévention et promotion de la santé', kicker: 'Prévenir et protéger', img: '/prevention.png' },
    { id: 'programmes-de-sante-publique', title: 'Programmes de santé publique', kicker: 'Prévenir et protéger', img: '/prevention.png' },
    { id: 'surveillance-et-securite-sanitaires', title: 'Surveillance et sécurité sanitaires', kicker: 'Prévenir et protéger', img: '/prevention.png' },
    { id: 'mobilisation-communautaire', title: 'Mobilisation communautaire', kicker: 'Prévenir et protéger', img: '/prevention.png' }
  ],
  'espace-professionnel': [
    { id: 'concours-et-resultats', title: 'Concours et résultats', kicker: 'Recrutement et carrière', img: '/gst-scene-2.png' },
    { id: 'appels-a-candidature', title: 'Appels à candidature', kicker: 'Recrutement et carrière', img: '/gst-scene-2.png' },
    { id: 'examens-d-aptitude-professionnelle', title: 'Examens d’aptitude professionnelle', kicker: 'Recrutement et carrière', img: '/gst-scene-2.png' },
    { id: 'stages-et-formation-pratique', title: 'Stages et formation pratique', kicker: 'Recrutement et carrière', img: '/gst-scene-2.png' },
    { id: 'appels-d-offres', title: 'Appels d’offres', kicker: 'Fournisseurs et prestataires', img: '/gst-scene-2.png' },
    { id: 'avis-d-appel-a-concurrence', title: 'Avis d’appel à concurrence', kicker: 'Fournisseurs et prestataires', img: '/gst-scene-2.png' },
    { id: 'consultations-et-resultats', title: 'Consultations et résultats', kicker: 'Fournisseurs et prestataires', img: '/gst-scene-2.png' },
    { id: 'appels-a-projets', title: 'Appels à projets', kicker: 'Recherche et innovation', img: '/gst-scene-2.png' },
    { id: 'publications-scientifiques', title: 'Publications scientifiques', kicker: 'Recherche et innovation', img: '/gst-scene-2.png' },
    { id: 'cooperation-et-communication-scientifique', title: 'Coopération et communication scientifique', kicker: 'Recherche et innovation', img: '/gst-scene-2.png' }
  ],
  'actualites-et-medias': [
    { id: 'toutes-les-actualites', title: 'Toutes les actualités', kicker: 'Actualités et médias', img: '/event.png' },
    { id: 'campagnes-et-initiatives', title: 'Campagnes et initiatives', kicker: 'Actualités', img: '/event.png' },
    { id: 'actualites-des-etablissements', title: 'Actualités des établissements', kicker: 'Actualités', img: '/event.png' },
    { id: 'evenements', title: 'Événements', kicker: 'Agenda régional', img: '/event.png' },
    { id: 'colloques-seminaires-et-conferences', title: 'Colloques, séminaires et conférences', kicker: 'Agenda régional', img: '/event.png' },
    { id: 'journees-nationales-et-mondiales', title: 'Journées nationales et mondiales', kicker: 'Agenda régional', img: '/event.png' },
    { id: 'communiques-de-presse', title: 'Communiqués de presse', kicker: 'Espace presse', img: '/event.png' },
    { id: 'dossiers-de-presse', title: 'Dossiers de presse', kicker: 'Espace presse', img: '/event.png' },
    { id: 'revue-de-presse', title: 'Revue de presse', kicker: 'Espace presse', img: '/event.png' },
    { id: 'accreditation-et-demandes-medias', title: 'Accréditation et demandes médias', kicker: 'Espace presse', img: '/event.png' },
    { id: 'interviews-et-reportages', title: 'Interviews et reportages', kicker: 'Espace presse', img: '/event.png' }
  ]
};

function generatePageHtml(category, page) {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <title>${page.title} - Groupement Sanitaire Territorial Souss-Massa</title>
    <meta name="description" content="${page.title} - GST Souss-Massa"/>
    <link rel="icon" href="/favicon.svg"/>
    <link rel="stylesheet" href="/assets/index-DsSqZW0z.css"/>
</head>
<body>
    <div class="app">
        <header>
            <a href="/" class="logo">
                <img src="/gst-logo.png" alt="Groupement Sanitaire Territorial de la Région Souss-Massa"/>
            </a>
            <button class="mobile-menu-toggle" aria-expanded="false" aria-label="Ouvrir le menu"><i></i><i></i><i></i></button>
            <nav>
                <a href="/le-gst/qui-sommes-nous.html">Le GST Souss-Massa<b aria-hidden="true">›</b></a>
                <a href="/patients-et-proches/urgences-samu.html">Patients et proches<b aria-hidden="true">›</b></a>
                <a href="/offre-de-soins/etablissements-de-soins-de-sante-primaires.html">Offre de soins<b aria-hidden="true">›</b></a>
                <a href="/sante-publique/prevention-et-promotion-de-la-sante.html">Santé publique<b aria-hidden="true">›</b></a>
                <a href="/espace-professionnel/concours-et-resultats.html">Espace professionnel<b aria-hidden="true">›</b></a>
                <a href="/actualites-et-medias/toutes-les-actualites.html">Actualités et médias<b aria-hidden="true">›</b></a>
            </nav>
            <div class="site-search">
                <input aria-label="Rechercher sur le site" placeholder="Rechercher un service, un établissement…"/>
                <button aria-label="Ouvrir la recherche"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.4"></circle><path d="m16 16 4.2 4.2"></path></svg></button>
            </div>
        </header>

        <main>
            <section class="content-hero">
                <div>
                    <span>${page.kicker}</span>
                    <h1>${page.title}</h1>
                    <p>Information officielle et organisation des services dans la Région Souss-Massa.</p>
                </div>
                <div class="page-symbol" style="background-image:url(${page.img});"></div>
            </section>

            <div class="rich-content">
                <article class="content-card">
                    <p style="font-size:18px; font-weight:700; color:var(--navy); margin-bottom:20px;">
                        ${page.title} — GST Souss-Massa
                    </p>
                    <p>
                        Le Groupement Sanitaire Territorial de la Région Souss-Massa assure la coordination, la planification et la mise en œuvre de la politique régionale de santé.
                    </p>
                    <div class="content-sections" style="margin-top:30px;">
                        <article>
                            <i>01</i>
                            <div>
                                <h2>Organisation et missions</h2>
                                <p>Présentation détaillée des objectifs, des services et des équipes mobilisées sur le territoire régional.</p>
                            </div>
                        </article>
                        <article>
                            <i>02</i>
                            <div>
                                <h2>Accès et démarche</h2>
                                <p>Modalités d'accès, démarches usagers et orientation pour bénéficier pleinement des prestations du GST.</p>
                            </div>
                        </article>
                    </div>
                </article>

                <div class="legal-note" style="margin-top:40px;">
                    <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                        <b>Référence institutionnelle</b>
                        <span>Groupement Sanitaire Territorial de la Région Souss-Massa · Direction Générale.</span>
                    </div>
                </div>

                <div style="margin-top:30px;">
                    <a href="/"><button class="content-back">← Retour à l’accueil</button></a>
                </div>
            </div>
        </main>

        <footer class="site-footer">
            <div class="footer-links">
                <div><b>Votre parcours</b><a href="/patients-et-proches/urgences-samu.html">Urgence & SAMU</a></div>
                <div><b>Le GST vous informe</b><a href="/actualites-et-medias/toutes-les-actualites.html">Actualités</a></div>
                <div><b>Professionnels</b><a href="/espace-professionnel/concours-et-resultats.html">Recrutement</a></div>
            </div>
            <div class="footer-signature">
                <p>© 2026 Groupement Sanitaire Territorial de la Région Souss-Massa</p>
            </div>
        </footer>
    </div>
</body>
</html>`;
}

let count = 0;
for (const [folder, pages] of Object.entries(structure)) {
  const folderPath = path.join(baseDir, folder);
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }

  for (const page of pages) {
    const filePath = path.join(folderPath, `${page.id}.html`);
    fs.writeFileSync(filePath, generatePageHtml(folder, page));
    count++;
  }
}

console.log(`Successfully generated ${count} HTML pages organized into ${Object.keys(structure).length} subfolders.`);
