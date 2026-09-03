import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-useful">
        <Link href="/offre-de-soins" style={{textDecoration: 'none', display: 'block'}}>
          <button style={{width: '100%', pointerEvents: 'none'}}>
            <span>01</span>
            <div>
              <b>Choisir le bon niveau de soins</b>
              <small>Proximité, hospitalier ou universitaire</small>
            </div>
            <strong>↗</strong>
          </button>
        </Link>
        <Link href="/patients-proches" style={{textDecoration: 'none', display: 'block'}}>
          <button style={{width: '100%', pointerEvents: 'none'}}>
            <span>02</span>
            <div>
              <b>Connaître mes droits</b>
              <small>Droits, qualité et sécurité des soins</small>
            </div>
            <strong>↗</strong>
          </button>
        </Link>
        <Link href="/actualites" style={{textDecoration: 'none', display: 'block'}}>
          <button style={{width: '100%', pointerEvents: 'none'}}>
            <span>03</span>
            <div>
              <b>Suivre la vie du GST</b>
              <small>Actualités, campagnes et agenda régional</small>
            </div>
            <strong>↗</strong>
          </button>
        </Link>
        <Link href="/centre-decoute" style={{textDecoration: 'none', display: 'block'}}>
          <button style={{width: '100%', pointerEvents: 'none'}}>
            <span>04</span>
            <div>
              <b>Contacter le GST</b>
              <small>Accéder aux contacts institutionnels</small>
            </div>
            <strong>↗</strong>
          </button>
        </Link>
      </div>
      <div className="footer-links">
        <div>
          <b>Votre parcours</b>
          <Link href="/patients-proches"><button>Consultations et examens</button></Link>
          <Link href="/patients-proches"><button>Hospitalisation</button></Link>
          <Link href="/patients-proches"><button>Droits et qualité des soins</button></Link>
          <Link href="/patients-proches"><button>Prévention et santé publique</button></Link>
        </div>
        <div>
          <b>Le GST vous informe</b>
          <Link href="/actualites"><button>Actualités</button></Link>
          <Link href="/actualites#events"><button>Agenda régional</button></Link>
          <Link href="/actualites#press"><button>Communiqués de presse</button></Link>
          <Link href="/actualites#faq"><button>Questions fréquentes</button></Link>
        </div>
        <div>
          <b>Professionnels</b>
          <Link href="/espace-professionnel"><button>Recrutement et carrière</button></Link>
          <Link href="/espace-professionnel"><button>Fournisseurs et prestataires</button></Link>
          <Link href="/espace-professionnel"><button>Recherche et innovation</button></Link>
          <Link href="/espace-professionnel"><button>Appels à projets</button></Link>
        </div>
        <div>
          <b>Informations</b>
          <Link href="/le-gst"><button>Plan du site</button></Link>
          <Link href="/le-gst"><button>Mentions légales</button></Link>
          <Link href="/le-gst"><button>Protection des données</button></Link>
          <Link href="/le-gst"><button>Accessibilité</button></Link>
        </div>
      </div>
      <div className="footer-signature">
        <p>© 2026 Groupement Sanitaire Territorial de la Région Souss-Massa</p>
        <div>
          <span>Information institutionnelle en français</span>
          <span className="footer-dot"></span>
          <button>Facebook</button>
          <button>Instagram</button>
          <button>LinkedIn</button>
          <button>YouTube</button>
        </div>
      </div>
    </footer>
  );
}
