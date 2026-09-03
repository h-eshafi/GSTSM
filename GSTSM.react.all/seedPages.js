import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eiekmthzsjinhchsvafb.supabase.co';
const SUPABASE_KEY = 'sb_publishable_gXDHogGC4HySSFLVDHlz2A_MHbchyf1';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const pages = [
  {
    id: 'qui-sommes-nous',
    type: 'page',
    kicker: 'Le GST Souss-Massa',
    title: 'Qui sommes-nous ?',
    excerpt: 'Une organisation publique régionale qui réunit les établissements de santé de son territoire pour construire une offre de soins plus accessible, coordonnée et adaptée aux besoins de la population.',
    image: '/gst-scene-2.png',
    content: `
      <section class="who-hero">
          <div><span>Le GST Souss-Massa</span>
              <h1>Qui sommes-nous&nbsp;?</h1>
              <p>Une organisation publique régionale qui réunit les établissements de santé de son territoire pour
                  construire une offre de soins plus accessible, coordonnée et adaptée aux besoins de la
                  population.</p><button>Nos missions et nos valeurs <b>→</b></button>
          </div><img alt="Professionnels de santé du réseau régional Souss-Massa" src="/gst-scene-2.png">
      </section>
      <section class="who-intro">
          <div><span class="section-kicker">Une gouvernance sanitaire régionale</span>
              <h2>Un réseau unique au service de plus de trois millions d’habitants</h2>
          </div>
          <div>
              <p>Le Groupement Sanitaire Territorial de la Région Souss-Massa est un établissement public doté de
                  la personnalité morale et de l’autonomie financière. Il met en œuvre la politique de l’État en
                  matière de santé à l’échelle régionale et regroupe les établissements publics de santé relevant
                  de son ressort territorial.</p>
              <p>Son ambition est de faire de la région une unité cohérente de planification, d’exécution et
                  d’évaluation, dans laquelle chaque établissement devient un maillon d’un parcours intégré de
                  soins.</p>
          </div>
      </section>
      <section class="who-facts" aria-label="Repères sur le territoire">
          <article><b>3&nbsp;020&nbsp;431</b><span>habitants</span><small>Population régionale · HCP 2024</small>
          </article>
          <article><b>6</b><span>préfectures et provinces</span><small>Agadir Ida-Outanane, Inezgane-Aït Melloul,
                  Chtouka-Aït Baha, Taroudant, Tiznit et Tata</small></article>
          <article><b>6</b><span>districts sanitaires</span><small>Organisation territoriale du réseau</small>
          </article>
          <article><b>3</b><span>niveaux de soins</span><small>Primaire, secondaire et tertiaire</small></article>
      </section>
      <section class="who-role">
          <div class="who-heading"><span class="section-kicker">Notre rôle</span>
              <h2>Organiser la santé à l’échelle du territoire</h2>
              <p>Le GST ne constitue pas seulement une nouvelle structure administrative. Il rapproche la décision
                  des réalités locales et organise la complémentarité de l’ensemble du réseau de santé.</p>
          </div>
          <div class="who-role-grid">
              <article><i>01</i>
                  <h3>Planifier l’offre régionale</h3>
                  <p>Adapter les ressources, les investissements et les filières de soins aux besoins réels de la
                      population.</p>
              </article>
              <article><i>02</i>
                  <h3>Coordonner les parcours</h3>
                  <p>Relier les soins de proximité, les hôpitaux provinciaux et régionaux et les hôpitaux
                      universitaires.</p>
              </article>
              <article><i>03</i>
                  <h3>Protéger la population</h3>
                  <p>Déployer la prévention, les programmes de santé publique, la veille épidémiologique et la
                      gestion des risques sanitaires.</p>
              </article>
              <article><i>04</i>
                  <h3>Améliorer la qualité</h3>
                  <p>Piloter la sécurité du patient, la performance, la recherche, l’innovation et la
                      transformation numérique.</p>
              </article>
          </div>
      </section>
      <section class="who-network">
          <div class="who-network-image"><img alt="Établissement de santé de la Région Souss-Massa"
                  src="/hospital.png"><span>Un parcours intégré de soins</span></div>
          <div><span class="section-kicker">Une région, un réseau</span>
              <h2>Le bon soin, au bon niveau, au bon moment</h2>
              <p>La branche sanitaire du GST articule trois niveaux complémentaires. L’objectif est d’améliorer
                  l’orientation, de limiter les déplacements inutiles et d’assurer la continuité de la prise en
                  charge.</p><button><i>1</i><span><b>Soins primaires</b><small>Le premier point d’entrée :
                          prévention, médecine de famille et
                          proximité.</small></span><strong>→</strong></button><button><i>2</i><span><b>Soins
                          secondaires</b><small>Hôpitaux de proximité, provinciaux et régionaux organisés par
                          territoire.</small></span><strong>→</strong></button><button><i>3</i><span><b>Soins
                          tertiaires</b><small>Expertise universitaire, soins spécialisés, enseignement et
                          recherche.</small></span><strong>→</strong></button>
          </div>
      </section>
      <section class="who-practical">
          <div><span class="section-kicker">Ce que cela change pour vous</span>
              <h2>Un parcours plus simple et plus lisible</h2>
          </div>
          <ul>
              <li><b>Une meilleure orientation</b><span>La médecine de famille et les structures de proximité
                      deviennent le point d’entrée privilégié du parcours.</span></li>
              <li><b>Une prise en charge coordonnée</b><span>Les structures communiquent et organisent les relais
                      entre les niveaux de soins.</span></li>
              <li><b>Une offre adaptée au territoire</b><span>La planification tient compte des besoins
                      démographiques, sanitaires et géographiques de chaque province.</span></li>
              <li><b>Une attention continue à la qualité</b><span>La sécurité du patient, l’expérience de l’usager
                      et la performance font l’objet d’un pilotage régional.</span></li>
          </ul>
      </section>
      <section class="who-governance">
          <div><span class="section-kicker">Comprendre notre organisation</span>
              <h2>Une gouvernance intégrée</h2>
              <p>Le GST s’appuie sur un Conseil d’administration, une Direction générale, un pôle de pilotage, une
                  branche sanitaire, une branche administrative ainsi que des comités et instances de gouvernance.
              </p>
          </div>
          <div><button><span>Conseil d’administration</span><b>Découvrir →</b></button><button><span>Organigramme
                      général</span><b>Explorer →</b></button><button><span>Mot du Directeur Général</span><b>Lire
                      →</b></button></div>
      </section>
      <aside class="who-sources"><b>Repères institutionnels</b><span>Loi-cadre n° 06-22 relative au système
              national de santé</span><span>Loi n° 08-22 relative à la création des Groupements Sanitaires
              Territoriaux</span><span>Décret n° 2.23.1054 pris pour l’application de la loi n°
              08-22</span><span>Organigramme du GST Souss-Massa et premier Conseil d’administration, 2026</span>
      </aside>
    `
  },
  {
    id: 'offre-de-soins',
    type: 'page',
    kicker: 'Réseau territorial',
    title: 'Offre de soins',
    excerpt: "Trois niveaux de soins complémentaires articulés pour garantir la continuité des parcours sur l'ensemble de la Région Souss-Massa.",
    image: '/hospital.png',
    content: `
      <div class="content-sections">
          <article id="essp">
              <i>01</i>
              <div>
                  <h2>Soins de proximité (Niveau primaire)</h2>
                  <p>Les soins de proximité constituent le premier niveau du parcours. Ils assurent la prévention, les soins courants, le suivi et l’orientation vers le niveau adapté.</p>
                  <ul>
                      <li><strong>Structures concernées :</strong> Établissements de soins de santé primaires (ESSP), établissements médico-sociaux (EMS) et centres de santé urbains et ruraux répartis dans les 6 territoires de la région.</li>
                      <li><strong>Rôle dans le parcours :</strong> La médecine de famille et les équipes de proximité favorisent une orientation pertinente, la continuité du suivi et un recours mieux coordonné aux soins spécialisés.</li>
                  </ul>
              </div>
          </article>
          <article id="hospitals">
              <i>02</i>
              <div>
                  <h2>Soins hospitaliers (Niveau secondaire)</h2>
                  <p>Le niveau hospitalier regroupe les espaces et districts sanitaires, les hôpitaux régionaux et provinciaux ainsi que les hôpitaux de proximité.</p>
                  <ul>
                      <li><strong>Missions :</strong> Prise en charge des urgences, hospitalisation, spécialités hospitalières et médico-techniques.</li>
                      <li><strong>Organisation interne :</strong> Coordination des structures de proximité et articulation des fonctions sanitaires, administratives et de pharmacie régionale.</li>
                  </ul>
              </div>
          </article>
          <article id="chu">
              <i>03</i>
              <div>
                  <h2>Soins hospitalo-universitaires (Niveau tertiaire)</h2>
                  <p>Le niveau hospitalo-universitaire assure les prises en charge spécialisées et hautement spécialisées, l’enseignement, la formation et la recherche.</p>
                  <ul>
                      <li><strong>Réseau cible :</strong> Hôpital Universitaire Général Mohammed VI d’Agadir, Hôpital Universitaire Mohammed VI Mère-Enfant, Hôpital Universitaire d’Oncologie d’Agadir et Hôpital Universitaire de Psychiatrie.</li>
                      <li><strong>Missions complémentaires :</strong> Formation des professionnels de santé, recherche clinique, innovation et coordination des filières de soins d'excellence.</li>
                  </ul>
              </div>
          </article>
      </div>
      <div class="legal-note" style="margin-top: 40px;">
          <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
              <b>Références institutionnelles</b>
              <span>Organigramme sanitaire du GST Souss-Massa · Ministère de la Santé et de la Protection Sociale, mai 2026.</span>
          </div>
      </div>
    `
  },
  {
    id: 'patients-proches',
    type: 'page',
    kicker: 'Votre parcours',
    title: 'Patients et proches',
    excerpt: "Être informé, accueilli et accompagné avant, pendant et après votre prise en charge dans les établissements du GST Souss-Massa.",
    image: '/gst-scene-3.png',
    content: `
      <div class="content-sections">
          <article id="consultations">
              <i>01</i>
              <div>
                  <h2>Consultations et examens</h2>
                  <p>La prise de rendez-vous permet de préparer votre consultation et de vous orienter vers le service adapté.</p>
                  <ul>
                      <li><strong>Documents à fournir :</strong> Pièce d’identité, carte de couverture médicale (AMO/CNSS), lettre d’orientation médicale, ordonnances et examens récents.</li>
                      <li><strong>Conseils :</strong> Préparez la liste de vos traitements habituels, allergies et antécédents avant votre venue.</li>
                  </ul>
              </div>
          </article>
          <article id="hospitalisation">
              <i>02</i>
              <div>
                  <h2>Préparer son hospitalisation</h2>
                  <p>L’admission est une étape essentielle pour garantir une prise en charge fluide, sécurisée et adaptée à votre situation.</p>
                  <ul>
                      <li><strong>Formalités :</strong> Présentez-vous au bureau des admissions et de la facturation avec votre certificat d'hospitalisation et vos documents d'assurance.</li>
                      <li><strong>Identité et sécurité :</strong> Le bracelet d’identification doit être conservé pendant toute la durée du séjour.</li>
                      <li><strong>Sortie et suivi :</strong> La sortie se prépare avec l’équipe soignante afin d’assurer la continuité du traitement et le relais avec votre médecin traitant.</li>
                  </ul>
              </div>
          </article>
          <article id="droits">
              <i>03</i>
              <div>
                  <h2>Droits et responsabilités du patient</h2>
                  <p>La prise en charge repose sur une relation de confiance, de respect mutuel et sur une information accessible au patient.</p>
                  <ul>
                      <li><strong>Droits :</strong> Accès équitable aux soins, information claire, respect de la dignité, confidentialité et possibilité d'exprimer des remarques.</li>
                      <li><strong>Responsabilités :</strong> Le patient et ses visiteurs contribuent à un environnement sûr en respectant le calme, l'hygiène et les horaires de visite.</li>
                  </ul>
              </div>
          </article>
          <article id="experience">
              <i>04</i>
              <div>
                  <h2>Satisfaction et expérience patient</h2>
                  <p>L’expérience des patients et de leurs proches contribue directement à l’amélioration continue des services du GST Souss-Massa.</p>
                  <ul>
                      <li>Les remarques et suggestions recueillies via nos questionnaires sont analysées confidentiellement par la commission de suivi de la qualité.</li>
                  </ul>
              </div>
          </article>
      </div>
      <div class="legal-note" style="margin-top: 40px;">
          <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
              <b>Références d'information usagers</b>
              <span>Charte Droits et responsabilités du patient · Livret d’accueil hospitalier fourni par le GST Souss-Massa · Décret n° 2.17.265 relatif aux remarques, propositions et réclamations des usagers.</span>
          </div>
      </div>
    `
  },
  {
    id: 'sante-publique',
    type: 'page',
    kicker: 'Prévenir et protéger',
    title: 'La santé publique au plus près des territoires',
    excerpt: "Actions coordonnées de prévention, programmes prioritaires, surveillance épidémiologique et sécurité sanitaire régionale.",
    image: '/prevention.png',
    content: `
      <div class="content-sections">
          <article id="prevention">
              <i>01</i>
              <div>
                  <h2>Prévention et promotion de la santé</h2>
                  <p>La prévention et la promotion de la santé visent à agir en amont de la maladie et à renforcer la capacité de chacun à protéger sa santé.</p>
                  <ul>
                      <li><strong>Domaines d'action :</strong> Vaccination, dépistage, nutrition, activité physique, santé mentale, santé reproductive et prévention des addictions.</li>
                      <li><strong>Information accessible :</strong> Les campagnes et conseils sont adaptés aux besoins des populations et relayés dans les 6 provinces de la région.</li>
                  </ul>
              </div>
          </article>
          <article id="programmes">
              <i>02</i>
              <div>
                  <h2>Programmes de santé publique</h2>
                  <p>Les programmes de santé publique organisent actions coordonnées autour des priorités sanitaires régionales et nationales.</p>
                  <ul>
                      <li><strong>Priorités :</strong> Santé de la mère et de l’enfant, santé scolaire et universitaire, maladies transmissibles et non transmissibles, accompagnement des personnes vulnérables.</li>
                      <li><strong>Pilotage par les résultats :</strong> Suivi de la performance à travers des objectifs précis et l’analyse continue des besoins du territoire.</li>
                  </ul>
              </div>
          </article>
          <article id="surveillance">
              <i>03</i>
              <div>
                  <h2>Surveillance et sécurité sanitaires</h2>
                  <p>La surveillance sanitaire permet de détecter, analyser et suivre les risques afin de protéger rapidement la population.</p>
                  <ul>
                      <li><strong>Dispositif régional :</strong> Surveillance épidémiologique, alertes sanitaires, contrôle sanitaire aux frontières et suivi des risques environnementaux.</li>
                      <li><strong>Vigilance sanitaire :</strong> Pharmacovigilance et matériovigilance pour assurer la sécurité des soins.</li>
                  </ul>
              </div>
          </article>
          <article id="mobilisation">
              <i>04</i>
              <div>
                  <h2>Mobilisation communautaire</h2>
                  <p>La mobilisation communautaire associe les citoyens, les associations, les collectivités et les professionnels aux actions de prévention.</p>
                  <ul>
                      <li><strong>Éducation pour la santé :</strong> Ressources simples, fiables et adaptées aux différents publics pour accompagner les actions sur le terrain.</li>
                  </ul>
              </div>
          </article>
      </div>
      <div class="legal-note" style="margin-top: 40px;">
          <svg viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
              <b>Attributions institutionnelles</b>
              <span>Direction Stratégie et Santé Publique · Direction des soins de santé primaires, prévention et promotion de la santé du GST Souss-Massa.</span>
          </div>
      </div>
    `
  },
  {
    id: 'espace-professionnel',
    type: 'page',
    kicker: 'Ressources humaines',
    title: 'Espace professionnel et médical',
    excerpt: "Rejoindre nos équipes, se former, innover et construire ensemble la santé publique de demain dans la Région Souss-Massa.",
    image: '/doctor-exam.png',
    content: `
      <div class="content-sections">
          <article id="carrieres">
              <i>01</i>
              <div>
                  <h2>Carrières et recrutements</h2>
                  <p>Le GST Souss-Massa offre des parcours professionnels variés au sein de ses établissements hospitaliers, centres de santé et directions administratives.</p>
                  <ul>
                      <li><strong>Métiers :</strong> Personnel médical, paramédical, administratif, technique et fonctions de pilotage.</li>
                      <li><strong>Concours et avis :</strong> Retrouvez toutes les offres d'emploi, avis de concours et appels à candidatures ouverts au niveau régional.</li>
                  </ul>
              </div>
          </article>
          <article id="formation">
              <i>02</i>
              <div>
                  <h2>Formation et développement professionnel</h2>
                  <p>L’actualisation des compétences et le développement continu sont au cœur de l’amélioration de la qualité des soins.</p>
                  <ul>
                      <li><strong>Formation continue :</strong> Programmes régionaux dédiés aux cadres de santé, médecins et personnels administratifs.</li>
                      <li><strong>Recherche et innovation :</strong> Soutien aux projets de recherche clinique, de santé publique et d'innovation organisationnelle.</li>
                  </ul>
              </div>
          </article>
      </div>
    `
  },
  {
    id: 'urgences',
    type: 'page',
    kicker: 'Aide Médicale Urgente',
    title: 'Urgences / SAMU',
    excerpt: 'Services d’urgence et SAMU Régional Souss-Massa 24h/24 et 7j/7.',
    image: '/hospital.png',
    content: `
      <div class="content-sections">
          <article id="samu">
              <i>01</i>
              <div>
                  <h2>SAMU Régional & Urgences</h2>
                  <p>Le Service d’Aide Médicale Urgente (SAMU) assure la régulation médicale des urgences et l'orientation vers le centre hospitalier adapté.</p>
                  <ul>
                      <li><strong>Numéro d'urgence :</strong> Contactez le SAMU pour toute détresse vitale.</li>
                      <li><strong>Services d'urgence hospitaliers :</strong> Présents dans les centres hospitaliers régionaux et provinciaux de la région.</li>
                  </ul>
              </div>
          </article>
      </div>
    `
  },
  {
    id: 'rendez-vous',
    type: 'page',
    kicker: 'Préparer ma venue',
    title: 'Prendre rendez-vous',
    excerpt: 'Consulter un spécialiste ou effectuer vos examens de santé dans le réseau GST Souss-Massa.',
    image: '/prevention.png',
    content: `
      <div class="content-sections">
          <article id="rdv-info">
              <i>01</i>
              <div>
                  <h2>Modalités de rendez-vous</h2>
                  <p>Pour planifier vos consultations externes et examens spécialisés, préparez votre lettre d'orientation et votre pièce d'identité.</p>
              </div>
          </article>
      </div>
    `
  },
  {
    id: 'centre-decoute',
    type: 'page',
    kicker: 'Information et orientation',
    title: 'Centre d’écoute et d’orientation',
    excerpt: 'Une équipe à votre écoute pour vous informer, vous guider et recueillir vos remarques.',
    image: '/gst-scene-3.png',
    content: `
      <div class="content-sections">
          <article id="contact-info">
              <i>01</i>
              <div>
                  <h2>Nous contacter</h2>
                  <p>Le centre d'écoute réponds à vos questions concernant l'orientation dans les soins, les droits du patient et les démarches administratives.</p>
              </div>
          </article>
      </div>
    `
  }
];

async function seed() {
  for (const page of pages) {
    const { error } = await supabase.from('posts').upsert({
      ...page,
      createdAt: new Date().toISOString()
    });
    if (error) {
      console.error('Error migrating', page.id, error);
    } else {
      console.log('Successfully migrated', page.id);
    }
  }
}

seed();
