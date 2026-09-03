import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSocialLinks, type SocialLinks } from '../pages/admin/AdminSettings';

export default function Footer() {
  const [social, setSocial] = useState<SocialLinks>(getSocialLinks());

  useEffect(() => {
    const handleUpdate = () => {
      setSocial(getSocialLinks());
    };
    window.addEventListener('gst_social_updated', handleUpdate);
    return () => window.removeEventListener('gst_social_updated', handleUpdate);
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-useful">
        <Link to="/offre-de-soins" style={{textDecoration: 'none', display: 'block'}}>
          <button style={{width: '100%', pointerEvents: 'none'}}>
            <span>01</span>
            <div>
              <b>Choisir le bon niveau de soins</b>
              <small>Proximité, hospitalier ou universitaire</small>
            </div>
            <strong>↗</strong>
          </button>
        </Link>
        <Link to="/patients-proches" style={{textDecoration: 'none', display: 'block'}}>
          <button style={{width: '100%', pointerEvents: 'none'}}>
            <span>02</span>
            <div>
              <b>Connaître mes droits</b>
              <small>Droits, qualité et sécurité des soins</small>
            </div>
            <strong>↗</strong>
          </button>
        </Link>
        <Link to="/actualites" style={{textDecoration: 'none', display: 'block'}}>
          <button style={{width: '100%', pointerEvents: 'none'}}>
            <span>03</span>
            <div>
              <b>Suivre la vie du GST</b>
              <small>Actualités, campagnes et agenda régional</small>
            </div>
            <strong>↗</strong>
          </button>
        </Link>
        <Link to="/centre-decoute" style={{textDecoration: 'none', display: 'block'}}>
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
          <Link to="/patients-proches"><button>Consultations et examens</button></Link>
          <Link to="/patients-proches"><button>Hospitalisation</button></Link>
          <Link to="/patients-proches"><button>Droits et qualité des soins</button></Link>
          <Link to="/patients-proches"><button>Prévention et santé publique</button></Link>
        </div>
        <div>
          <b>Le GST vous informe</b>
          <Link to="/actualites"><button>Actualités</button></Link>
          <Link to="/actualites#events"><button>Agenda régional</button></Link>
          <Link to="/actualites#press"><button>Communiqués de presse</button></Link>
          <Link to="/actualites#faq"><button>Questions fréquentes</button></Link>
        </div>
        <div>
          <b>Professionnels</b>
          <Link to="/espace-professionnel"><button>Recrutement et carrière</button></Link>
          <Link to="/espace-professionnel"><button>Fournisseurs et prestataires</button></Link>
          <Link to="/espace-professionnel"><button>Recherche et innovation</button></Link>
          <Link to="/espace-professionnel"><button>Appels à projets</button></Link>
        </div>
        <div>
          <b>Informations</b>
          <Link to="/le-gst"><button>Plan du site</button></Link>
          <Link to="/le-gst"><button>Mentions légales</button></Link>
          <Link to="/le-gst"><button>Protection des données</button></Link>
          <Link to="/le-gst"><button>Accessibilité</button></Link>
        </div>
      </div>
      <div className="footer-signature">
        <p>© 2026 Groupement Sanitaire Territorial de la Région Souss-Massa</p>
        <div>
          <span>Information institutionnelle en français</span>
          <span className="footer-dot"></span>
          <a href={social.facebook} target="_blank" rel="noopener noreferrer"><button>Facebook</button></a>
          <a href={social.instagram} target="_blank" rel="noopener noreferrer"><button>Instagram</button></a>
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer"><button>LinkedIn</button></a>
          <a href={social.youtube} target="_blank" rel="noopener noreferrer"><button>YouTube</button></a>
        </div>
      </div>
    </footer>
  );
}
