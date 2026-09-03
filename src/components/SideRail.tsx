import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFloatingSettings, type FloatingSettings } from '../pages/admin/AdminSettings';

export default function SideRail() {
  const navigate = useNavigate();
  const [settings, setSettings] = useState<FloatingSettings>(getFloatingSettings());
  const [activeBtn, setActiveBtn] = useState<string | null>(null);

  useEffect(() => {
    const handleUpdate = () => setSettings(getFloatingSettings());
    window.addEventListener('gst_floating_updated', handleUpdate);
    return () => window.removeEventListener('gst_floating_updated', handleUpdate);
  }, []);

  if (!settings.enableSideRail) {
    return null;
  }

  const handleButtonClick = (btnKey: string, href: string) => {
    if (activeBtn === btnKey) {
      // Second click or click when expanded -> navigate to page
      setActiveBtn(null);
      navigate(href);
    } else {
      // First click -> expand button on touch/click
      setActiveBtn(btnKey);
    }
  };

  return (
    <aside className="side-rail" aria-label="Accès rapides">
      <button 
        className={`samu ${activeBtn === 'samu' ? 'active' : ''}`} 
        aria-label="Urgences et SAMU"
        onClick={() => handleButtonClick('samu', '/pages/urgences-et-aide-medicale-urgente')}
      >
        <i>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M7 18v-6a5 5 0 0 1 10 0v6M5 18h14M9 22h6M12 2v2M4.2 5.2l1.5 1.5M19.8 5.2l-1.5 1.5"></path>
          </svg>
        </i>
        <span>
          <b>Urgences / SAMU</b>
          <small>Aide médicale urgente</small>
        </span>
      </button>

      <button 
        className={`rdv ${activeBtn === 'rdv' ? 'active' : ''}`} 
        aria-label="Prendre rendez-vous"
        onClick={() => handleButtonClick('rdv', '/pages/prendre-rendez-vous')}
      >
        <i>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="3"></rect>
            <path d="M8 3v4M16 3v4M3 10h18M8 14h3M13 14h3M8 18h3"></path>
          </svg>
        </i>
        <span>
          <b>Rendez-vous</b>
          <small>Préparer ma venue</small>
        </span>
      </button>

      <button 
        className={`ecoute ${activeBtn === 'ecoute' ? 'active' : ''}`} 
        aria-label="Centre d’écoute"
        onClick={() => handleButtonClick('ecoute', '/pages/centre-decoute')}
      >
        <i>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 13v-1a8 8 0 0 1 16 0v1M4 13a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h2v-7H4ZM20 13a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-2v-7h2ZM18 20c-1 2-3 2-5 2"></path>
          </svg>
        </i>
        <span>
          <b>Centre d’écoute</b>
          <small>Information et orientation</small>
        </span>
      </button>
    </aside>
  );
}
