import Link from 'next/link';

export default function Page() {
  return (
    <main>
      <section className="hero-home">
        <div className="hero-copy">
          <h1>Votre santé,<br/>notre territoire</h1>
          <p>Le Groupement Sanitaire Territorial de la Région Souss-Massa vous accompagne à chaque étape de votre parcours de soins.</p>
          <div className="brand-dots"><i></i><i></i><i></i><i></i></div>
        </div>
        <div className="hero-photo">
          <video autoPlay muted loop playsInline poster="/gst-hero.png">
            <source src="/gst-hero-film-v2.mp4" type="video/mp4"/>
          </video>
        </div>
      </section>

      <section className="about-gst">
        <div className="about-logo"><img src="/gst-logo.png" alt="Logo du GST Souss-Massa"/></div>
        <div className="about-copy">
          <span className="section-kicker">Qui sommes-nous ?</span>
          <h2>Un établissement public régional au service de la santé</h2>
          <p>Créé conformément à la loi n° 08-22, le Groupement Sanitaire Territorial de la Région Souss-Massa est un établissement public doté de la personnalité morale et de l’autonomie financière. Il regroupe les établissements publics de santé de son ressort territorial et met en œuvre la politique de l’État en matière de santé à l’échelle régionale.</p>
          <Link href="/le-gst"><button>Découvrir le GST Souss-Massa <b>→</b></button></Link>
        </div>
      </section>

      <section className="dashboard">
        <div className="updates">
          <div className="block-heading">
            <h2>Actualités et événements</h2>
            <Link href="/actualites"><button>Voir toutes les actualités ›</button></Link>
          </div>
          <div className="news-cards">
            <Link href="/actualites/ouverture-hospitaliere" style={{textDecoration: 'none', display: 'contents'}}>
              <button style={{cursor: 'pointer'}}>
                <div className="news-image hospital"><span>COMMUNIQUÉ</span></div>
                <small>Actualité régionale</small>
                <b>Ouverture et développement de l’offre hospitalière régionale</b><strong>›</strong>
              </button>
            </Link>
            <Link href="/actualites/vaccination-prevention" style={{textDecoration: 'none', display: 'contents'}}>
              <button style={{cursor: 'pointer'}}>
                <div className="news-image vaccine"><span>SANTÉ PUBLIQUE</span></div>
                <small>Actualité régionale</small>
                <b>Campagne régionale de vaccination et de prévention</b><strong>›</strong>
              </button>
            </Link>
            <Link href="/actualites/rencontres-sante" style={{textDecoration: 'none', display: 'contents'}}>
              <button style={{cursor: 'pointer'}}>
                <div className="news-image event"><span>ÉVÉNEMENT</span></div>
                <small>Actualité régionale</small>
                <b>Rencontres régionales de la santé Souss-Massa</b><strong>›</strong>
              </button>
            </Link>
          </div>
        </div>
        <aside className="numbers">
          <h2>Chiffres clés</h2>
          <div><i>▥</i><b>—</b><span>Établissements de santé</span></div>
          <div><i>♙</i><b>—</b><span>Professionnels de santé</span></div>
          <div><i>⌘</i><b>—</b><span>Population couverte</span></div>
          <div><i>♧</i><b>—</b><span>Services et spécialités</span></div>
          <small>Données officielles à renseigner après validation.</small>
        </aside>
      </section>

      <section className="quickbar">
        <Link href="/urgences"><button><i>♨</i><span>Urgences / SAMU</span><b>›</b></button></Link>
        <Link href="/rendez-vous"><button><i>▣</i><span>Prendre rendez-vous</span><b>›</b></button></Link>
        <Link href="/centre-decoute"><button><i>☎</i><span>Contactez-nous</span><b>›</b></button></Link>
      </section>

      <section className="editorial-news">
        <div className="news-left">
          <div className="news-heading">
            <div>
              <span className="section-kicker">La vie du GST Souss-Massa</span>
              <h2>Actualités</h2>
            </div>
            <Link href="/actualites"><button>Voir toutes les actualités →</button></Link>
          </div>
          <div className="large-news">
            <Link href="/actualites/ouverture-hospitaliere" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
              <article style={{cursor: 'pointer'}}>
                <div className="news-visual"><img src="hospital.png" alt=""/><b>Communiqué</b></div>
                <small>Actualité régionale</small>
                <h3>Ouverture et développement de l’offre hospitalière régionale</h3>
                <button aria-label="Lire : Ouverture et développement de l’offre hospitalière régionale">›</button>
              </article>
            </Link>
            <Link href="/actualites/vaccination-prevention" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
              <article style={{cursor: 'pointer'}}>
                <div className="news-visual"><img src="/prevention.png" alt=""/><b>Santé publique</b></div>
                <small>Actualité régionale</small>
                <h3>Campagne régionale de vaccination et de prévention</h3>
                <button aria-label="Lire : Campagne régionale de vaccination et de prévention">›</button>
              </article>
            </Link>
            <Link href="/actualites/rencontres-sante" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
              <article style={{cursor: 'pointer'}}>
                <div className="news-visual"><img src="/event.png" alt=""/><b>Événement</b></div>
                <small>Actualité régionale</small>
                <h3>Rencontres régionales de la santé Souss-Massa</h3>
                <button aria-label="Lire : Rencontres régionales de la santé Souss-Massa">›</button>
              </article>
            </Link>
            <Link href="/actualites/formation-continue" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
              <article style={{cursor: 'pointer'}}>
                <div className="news-visual"><img src="/gst-scene-2.png" alt=""/><b>Professionnels</b></div>
                <small>Ressources humaines</small>
                <h3>Formation continue des équipes de santé</h3>
                <button aria-label="Lire : Formation continue des équipes de santé">›</button>
              </article>
            </Link>
            <Link href="/actualites/renforcement-accueil" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
              <article style={{cursor: 'pointer'}}>
                <div className="news-visual"><img src="/gst-scene-3.png" alt=""/><b>Proximité</b></div>
                <small>Parcours de soins</small>
                <h3>Renforcement de l’accueil dans les structures de proximité</h3>
                <button aria-label="Lire : Renforcement de l’accueil dans les structures de proximité">›</button>
              </article>
            </Link>
            <Link href="/actualites/offre-coordonnee" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
              <article style={{cursor: 'pointer'}}>
                <div className="news-visual"><img src="/gst-hero.png" alt=""/><b>Institutionnel</b></div>
                <small>Transformation régionale</small>
                <h3>Une offre de soins coordonnée au service du territoire</h3>
                <button aria-label="Lire : Une offre de soins coordonnée au service du territoire">›</button>
              </article>
            </Link>
          </div>
        </div>
        <aside className="events-right">
          <span className="section-kicker">Agenda régional</span>
          <h2>Les prochains événements</h2>
          <Link href="/evenements/journee-sensibilisation" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
            <article style={{cursor: 'pointer'}}>
              <time><b>08</b><small>OCT.</small></time>
              <div>
                <span>Événement</span>
                <h3>Journée régionale de sensibilisation</h3>
                <p>⌖ Grand public · Agadir</p>
                <button>Voir l’événement →</button>
              </div>
            </article>
          </Link>
          <Link href="/evenements/rencontre-professionnels" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
            <article style={{cursor: 'pointer'}}>
              <time><b>21</b><small>OCT.</small></time>
              <div>
                <span>Événement</span>
                <h3>Rencontre des professionnels de santé</h3>
                <p>⌖ Professionnels · Souss-Massa</p>
                <button>Voir l’événement →</button>
              </div>
            </article>
          </Link>
          <Link href="/evenements/forum-prevention" style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
            <article style={{cursor: 'pointer'}}>
              <time><b>05</b><small>NOV.</small></time>
              <div>
                <span>Événement</span>
                <h3>Forum territorial de la prévention</h3>
                <p>⌖ Institutionnel · Taroudant</p>
                <button>Voir l’événement →</button>
              </div>
            </article>
          </Link>
        </aside>
      </section>

      <section className="patient-visitor">
        <div className="patient-copy">
          <span>Votre parcours, simplement</span>
          <h2>Une santé accessible, humaine et coordonnée</h2>
          <p>Le GST Souss-Massa accompagne les patients et leurs proches avant, pendant et après la prise en charge, tout en soutenant la recherche qui améliore les pratiques et les parcours de soins.</p>
          <Link href="/patients-proches"><button>Découvrir nos engagements <b>→</b></button></Link>
        </div>
        <aside className="journey-card">
          <h3>Patients et proches</h3>
          <Link href="/patients-proches"><button>Consultations et examens<b>↗</b></button></Link>
          <Link href="/patients-proches"><button>Hospitalisation<b>↗</b></button></Link>
          <Link href="/patients-proches"><button>Droits et qualité des soins<b>↗</b></button></Link>
          <img src="/prevention.png" alt="Accompagnement d’une patiente dans un établissement de santé"/>
        </aside>
        <aside className="research-card">
          <div className="research-visual">
            <img src="/gst-scene-2.png" alt="Professionnels de santé réunis autour d’un projet de recherche"/>
            <span>Science &amp; territoire</span>
          </div>
          <h3>Recherche &amp; innovation</h3>
          <Link href="/espace-professionnel#research"><button>Actualités de la recherche<b>↗</b></button></Link>
          <Link href="/espace-professionnel#research"><button>Études et publications récentes<b>↗</b></button></Link>
          <Link href="/espace-professionnel#research"><button>Appels à projets et coopérations<b>↗</b></button></Link>
        </aside>
      </section>

      <section className="useful-summary">
        <div>
          <i>⌖</i>
          <span><b>Un territoire, trois niveaux de soins</b><small>Proximité, hospitalier et hospitalo-universitaire</small></span>
        </div>
        <Link href="/offre-de-soins"><button>Je cherche des soins près de chez moi <b>→</b></button></Link>
        <Link href="/centre-decoute"><button>J’ai besoin d’une orientation rapide <b>→</b></button></Link>
      </section>

      {/* Note: The territory-map is interactive and is left as is. A React component should handle it instead of site-interactive.js if it causes issues. */}
      <section className="territory-map">
        <div className="map-heading">
          <span className="section-kicker">L’offre de soins dans votre territoire</span>
          <h2>Explorez le réseau de santé Souss-Massa</h2>
          <p>Choisissez une préfecture ou une province pour découvrir les principales structures qui organisent son parcours de soins.</p>
        </div>
        <div className="map-shell">
          <aside>
            <span className="map-label">Carte territoriale interactive</span>
            <h3>Préfectures et provinces</h3>
            <button className="active"><span>Agadir</span><b>✓</b></button>
            <button className=""><span>Inezgane</span><b>→</b></button>
            <button className=""><span>Chtouka Aït Baha</span><b>→</b></button>
            <button className=""><span>Taroudant</span><b>→</b></button>
            <button className=""><span>Tiznit</span><b>→</b></button>
            <button className=""><span>Tata</span><b>→</b></button>
          </aside>
          <div className="regional-map">
            <div className="live-map">
              <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-9.85%2C30.20%2C-9.25%2C30.65&amp;layer=mapnik&amp;marker=30.4278%2C-9.5981" title="Carte géographique de Agadir, Région Souss-Massa" loading="lazy"></iframe>
              <span>Carte interactive · OpenStreetMap</span>
            </div>
            <div className="territory-detail">
              <span>Territoire sélectionné</span>
              <h3>Agadir</h3>
              <p>Hôpitaux universitaires Mohammed VI et Hôpital régional Hassan II</p>
              <div>
                <button>Soins de proximité</button>
                <button>Voir les établissements →</button>
              </div>
            </div>
          </div>
        </div>
        <small className="map-note">Présentation territoriale de démonstration. Les coordonnées, structures et fiches détaillées seront publiées après validation officielle.</small>
      </section>

      <section className="gst-stats" aria-labelledby="gst-stats-title">
        <h2 id="gst-stats-title">Le GST de la Région Souss-Massa en chiffres</h2>
        <div>
          <article><b>6</b><span>Districts sanitaires</span></article>
          <article><b>320</b><span>Établissements de soins de santé primaires</span></article>
          <article><b>4</b><span>Hôpitaux universitaires</span></article>
          <article><b>3</b><span>Niveaux de soins</span></article>
        </div>
      </section>
    </main>
  );
}
