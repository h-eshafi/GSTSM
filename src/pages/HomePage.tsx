import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const territoryData = {
    'Agadir': {
        desc: 'Hôpitaux universitaires Mohammed VI et Hôpital régional Hassan II',
        bbox: '-9.85,30.20,-9.25,30.65',
        marker: '30.4278,-9.5981'
    },
    'Inezgane': {
        desc: 'Hôpital provincial d’Inezgane et structures de proximité',
        bbox: '-9.60,30.30,-9.40,30.45',
        marker: '30.3556,-9.5383'
    },
    'Chtouka Aït Baha': {
        desc: 'Hôpital de Biougra et réseau de soins primaires',
        bbox: '-9.45,30.00,-9.00,30.30',
        marker: '30.2144,-9.3708'
    },
    'Taroudant': {
        desc: 'Hôpital Mokhtar Soussi et réseau d’établissements de Taroudant',
        bbox: '-9.00,30.30,-8.70,30.60',
        marker: '30.4703,-8.8770'
    },
    'Tiznit': {
        desc: 'Hôpital Hassan Ier et centres de santé de Tiznit',
        bbox: '-9.80,29.60,-9.60,29.80',
        marker: '29.6974,-9.7316'
    },
    'Tata': {
        desc: 'Hôpital provincial de Tata et offre de soins de proximité',
        bbox: '-8.10,29.60,-7.80,29.80',
        marker: '29.7431,-7.9745'
    }
};

export default function HomePage() {
  const [activeProvince, setActiveProvince] = useState<keyof typeof territoryData>('Agadir');
  const [actualites, setActualites] = useState<any[]>([]);
  const [evenements, setEvenements] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch latest 6 actualites
      const { data: actData } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'actualite')
        .order('createdAt', { ascending: false })
        .limit(6);
      
      if (actData) setActualites(actData);

      // Fetch latest 3 events
      const { data: evtData } = await supabase
        .from('posts')
        .select('*')
        .eq('type', 'evenement')
        .order('createdAt', { ascending: false })
        .limit(3);
      
      if (evtData) setEvenements(evtData);
    }
    fetchData();
  }, []);

  const activeMapData = territoryData[activeProvince];

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
          <Link to="/le-gst"><button>Découvrir le GST Souss-Massa <b>→</b></button></Link>
        </div>
      </section>

      <section className="dashboard">
        <div className="updates">
          <div className="block-heading">
            <h2>Actualités et événements</h2>
            <Link to="/actualites"><button>Voir toutes les actualités ›</button></Link>
          </div>
          <div className="news-cards">
            {actualites.slice(0, 3).map((post) => (
              <Link key={post.id} to={`/pages/${post.id}`} style={{textDecoration: 'none', display: 'contents'}}>
                <button style={{cursor: 'pointer'}}>
                  <div className="news-image hospital"><span>{post.kicker || 'COMMUNIQUÉ'}</span></div>
                  <small>Actualité régionale</small>
                  <b>{post.title}</b><strong>›</strong>
                </button>
              </Link>
            ))}
            {actualites.length === 0 && (
              <p style={{padding: '20px', color: '#64748b'}}>Aucune actualité trouvée. Allez dans le dashboard pour en ajouter.</p>
            )}
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
        <Link to="/urgences"><button><i>♨</i><span>Urgences / SAMU</span><b>›</b></button></Link>
        <Link to="/rendez-vous"><button><i>▣</i><span>Prendre rendez-vous</span><b>›</b></button></Link>
        <Link to="/centre-decoute"><button><i>☎</i><span>Contactez-nous</span><b>›</b></button></Link>
      </section>

      <section className="editorial-news">
        <div className="news-left">
          <div className="news-heading">
            <div>
              <span className="section-kicker">La vie du GST Souss-Massa</span>
              <h2>Actualités</h2>
            </div>
            <Link to="/actualites"><button>Voir toutes les actualités →</button></Link>
          </div>
          <div className="large-news">
            {actualites.map((post) => (
              <Link key={post.id} to={`/pages/${post.id}`} style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
                <article style={{cursor: 'pointer'}}>
                  <div className="news-visual">
                    {post.image && <img src={post.image.startsWith('/') ? post.image : `/${post.image}`} alt=""/>}
                    <b>{post.kicker || 'Actualité'}</b>
                  </div>
                  <small>Actualité régionale</small>
                  <h3>{post.title}</h3>
                  <button aria-label={`Lire : ${post.title}`}>›</button>
                </article>
              </Link>
            ))}
          </div>
        </div>
        <aside className="events-right">
          <span className="section-kicker">Agenda régional</span>
          <h2>Les prochains événements</h2>
          {evenements.map((evt) => (
            <Link key={evt.id} to={`/pages/${evt.id}`} style={{textDecoration: 'none', color: 'inherit', display: 'contents'}}>
              <article style={{cursor: 'pointer'}}>
                <time><b>{evt.title.substring(0, 2) /* Fake date formatting for demo */}</b><small>OCT.</small></time>
                <div>
                  <span>Événement</span>
                  <h3>{evt.title}</h3>
                  <p>⌖ {evt.location || 'Souss-Massa'}</p>
                  <button>Voir l’événement →</button>
                </div>
              </article>
            </Link>
          ))}
          {evenements.length === 0 && (
            <p style={{padding: '20px', color: '#64748b'}}>Aucun événement prévu.</p>
          )}
        </aside>
      </section>

      <section className="patient-visitor">
        <div className="patient-copy">
          <span>Votre parcours, simplement</span>
          <h2>Une santé accessible, humaine et coordonnée</h2>
          <p>Le GST Souss-Massa accompagne les patients et leurs proches avant, pendant et après la prise en charge, tout en soutenant la recherche qui améliore les pratiques et les parcours de soins.</p>
          <Link to="/patients-proches"><button>Découvrir nos engagements <b>→</b></button></Link>
        </div>
        <aside className="journey-card">
          <h3>Patients et proches</h3>
          <Link to="/patients-proches"><button>Consultations et examens<b>↗</b></button></Link>
          <Link to="/patients-proches"><button>Hospitalisation<b>↗</b></button></Link>
          <Link to="/patients-proches"><button>Droits et qualité des soins<b>↗</b></button></Link>
          <img src="/prevention.png" alt="Accompagnement d’une patiente dans un établissement de santé"/>
        </aside>
        <aside className="research-card">
          <div className="research-visual">
            <img src="/gst-scene-2.png" alt="Professionnels de santé réunis autour d’un projet de recherche"/>
            <span>Science &amp; territoire</span>
          </div>
          <h3>Recherche &amp; innovation</h3>
          <Link to="/espace-professionnel"><button>Actualités de la recherche<b>↗</b></button></Link>
          <Link to="/espace-professionnel"><button>Études et publications récentes<b>↗</b></button></Link>
          <Link to="/espace-professionnel"><button>Appels à projets et coopérations<b>↗</b></button></Link>
        </aside>
      </section>

      <section className="useful-summary">
        <div>
          <i>⌖</i>
          <span><b>Un territoire, trois niveaux de soins</b><small>Proximité, hospitalier et hospitalo-universitaire</small></span>
        </div>
        <Link to="/offre-de-soins"><button>Je cherche des soins près de chez moi <b>→</b></button></Link>
        <Link to="/centre-decoute"><button>J’ai besoin d’une orientation rapide <b>→</b></button></Link>
      </section>

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
            {Object.keys(territoryData).map((province) => (
              <button 
                key={province}
                className={activeProvince === province ? "active" : ""}
                onClick={() => setActiveProvince(province as keyof typeof territoryData)}
              >
                <span>{province}</span><b>{activeProvince === province ? '✓' : '→'}</b>
              </button>
            ))}
          </aside>
          <div className="regional-map">
            <div className="live-map">
              <iframe 
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(activeMapData.bbox)}&layer=mapnik&marker=${encodeURIComponent(activeMapData.marker)}`} 
                title={`Carte géographique de ${activeProvince}, Région Souss-Massa`} 
                loading="lazy"
              ></iframe>
              <span>Carte interactive · OpenStreetMap</span>
            </div>
            <div className="territory-detail">
              <span>Territoire sélectionné</span>
              <h3>{activeProvince}</h3>
              <p>{activeMapData.desc}</p>
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
