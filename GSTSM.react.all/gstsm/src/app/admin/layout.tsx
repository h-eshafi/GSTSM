import Link from 'next/link';
import './admin.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar - Fixed Position */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>GST Souss-Massa</h2>
          <small style={{ color: '#94a3b8' }}>Administration</small>
        </div>
        
        <nav className="admin-sidebar-nav">
          <Link href="/admin">
            📊 Tableau de bord
          </Link>
          <Link href="/admin/actualites">
            📰 Actualités
          </Link>
          <Link href="/admin/evenements">
            📅 Événements
          </Link>
          <Link href="/admin/recrutement">
            💼 Recrutement
          </Link>
          <Link href="/admin/menus">
            🗂️ Éditeur de Menu
          </Link>
          <Link href="/admin/settings">
            ⚙️ Paramètres
          </Link>
        </nav>
        
        <div style={{ padding: '1rem', marginTop: 'auto' }}>
          <Link href="/" style={{ padding: '0.75rem 1rem', borderRadius: '8px', color: '#94a3b8', textDecoration: 'none', display: 'block', border: '1px solid #334155', textAlign: 'center', transition: 'all 0.2s', fontSize: '0.9rem' }}>
            ← Retour au site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Topbar - Sticky Position */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ fontSize: '0.9rem', color: '#64748b' }}>Connecté en tant que</span>
            <strong style={{ color: '#0f172a', backgroundColor: '#e2e8f0', padding: '0.3rem 0.8rem', borderRadius: '20px', fontSize: '0.85rem' }}>Administrateur</strong>
          </div>
        </header>

        {/* Page Content */}
        <div className="admin-content">
          {children}
        </div>
      </main>
    </div>
  );
}
