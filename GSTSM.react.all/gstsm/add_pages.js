const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, 'src/data/posts.json');
let posts = [];
try {
  posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
} catch (e) {
  console.error("Error reading posts", e);
}

const newPages = [
  {
    id: "qui-sommes-nous",
    type: "page",
    kicker: "Le GST Souss-Massa",
    title: "Qui sommes-nous ?",
    excerpt: "Une organisation publique régionale qui réunit les établissements de santé de son territoire pour construire une offre de soins plus accessible, coordonnée et adaptée aux besoins de la population.",
    image: "gst-scene-2.png",
    content: `<div class="rich-content">
                <section style="margin-bottom:60px;">
                    <span class="section-kicker">Une gouvernance sanitaire régionale</span>
                    <h2 style="font-size:36px; color:var(--navy); margin-bottom:15px;">Un réseau unique au service de plus de trois millions d’habitants</h2>
                    <p style="font-size:18px; color:var(--muted); max-width:850px; line-height:1.7;">
                        Le Groupement Sanitaire Territorial de la Région Souss-Massa est un établissement public doté de la personnalité morale et de l’autonomie financière. Son ambition est de faire de la région une unité cohérente de planification, d’exécution et d’évaluation, dans laquelle chaque établissement devient un maillon d’un parcours intégré de soins.
                    </p>
                </section>
            </div>`,
    createdAt: new Date().toISOString()
  },
  {
    id: "mot-du-directeur-general",
    type: "page",
    kicker: "Direction Générale",
    title: "Mot du Directeur Général",
    excerpt: "M. Tarik El Harti a été nommé à cette fonction le 9 avril 2026.",
    image: "gst-logo.png",
    content: `
        <h2 style="color:var(--teal); font-size:20px; font-weight:600; margin-bottom:20px;">Directeur Général du Groupement Sanitaire Territorial de la Région Souss-Massa</h2>
        <blockquote style="border-left:4px solid var(--green); color:#405d54; background:#f3f9f5; padding:20px 24px; font-size:16px;">
            Le mot institutionnel du Directeur Général sera intégré ici après validation de sa version officielle.
        </blockquote>
    `,
    createdAt: new Date().toISOString()
  },
  {
    id: "missions-vision-valeurs",
    type: "page",
    kicker: "Gouvernance et statut du GST Souss-Massa",
    title: "Missions, vision et valeurs",
    excerpt: "Organiser la santé à l’échelle du territoire.",
    image: "gst-scene-3.png",
    content: `
        <p style="font-size:16px; color:var(--muted); margin-bottom:30px;">Le GST ne constitue pas seulement une nouvelle structure administrative. Il rapproche la décision des réalités locales et organise la complémentarité de l’ensemble du réseau de santé.</p>
        <div class="content-sections">
            <article>
                <i>01</i>
                <div>
                    <h2>Planifier l’offre régionale</h2>
                    <p>Adapter les ressources, les investissements et les filières de soins aux besoins réels de la population.</p>
                </div>
            </article>
            <article>
                <i>02</i>
                <div>
                    <h2>Coordonner les parcours</h2>
                    <p>Relier les soins de proximité, les hôpitaux provinciaux et régionaux et les hôpitaux universitaires.</p>
                </div>
            </article>
            <article>
                <i>03</i>
                <div>
                    <h2>Protéger la population</h2>
                    <p>Déployer la prévention, les programmes de santé publique, la veille épidémiologique et la gestion des risques sanitaires.</p>
                </div>
            </article>
            <article>
                <i>04</i>
                <div>
                    <h2>Améliorer la qualité</h2>
                    <p>Piloter la sécurité du patient, la performance, la recherche, l’innovation et la transformation numérique.</p>
                </div>
            </article>
        </div>
    `,
    createdAt: new Date().toISOString()
  },
  {
    id: "chiffres-cles",
    type: "page",
    kicker: "Le GST Souss-Massa",
    title: "Chiffres clés",
    excerpt: "Repères sur le territoire de la Région Souss-Massa.",
    image: "hospital.png",
    content: `
        <div class="gst-stats" style="margin-top:40px; padding:0;">
            <h2 style="font-size:20px; margin-bottom:20px; color:var(--teal);">Repères sur le territoire</h2>
            <div>
                <article><b>3 020 431</b><span>Population régionale · HCP 2024</span></article>
                <article><b>6</b><span>préfectures et provinces</span></article>
                <article><b>6</b><span>districts sanitaires</span></article>
                <article><b>3</b><span>niveaux de soins</span></article>
            </div>
        </div>
    `,
    createdAt: new Date().toISOString()
  }
];

// Remove existing ones to prevent duplicates during multiple script runs
posts = posts.filter(p => !newPages.map(np => np.id).includes(p.id));

posts.push(...newPages);

fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));
console.log('Successfully injected pages.');
