import Link from 'next/link';

export default function SideRail() {
  return (
    <aside className="side-rail" aria-label="Accès rapides">
      <Link href="/urgences" style={{textDecoration: 'none', display: 'contents'}}>
        <button className="samu" aria-label="Urgences et SAMU">
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
      </Link>
      <Link href="/rendez-vous" style={{textDecoration: 'none', display: 'contents'}}>
        <button className="rdv" aria-label="Prendre rendez-vous">
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
      </Link>
      <Link href="/centre-decoute" style={{textDecoration: 'none', display: 'contents'}}>
        <button className="ecoute" aria-label="Centre d’écoute">
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
      </Link>
    </aside>
  );
}
