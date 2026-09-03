import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path: string, tabParam?: string) => {
    if (path === '/admin') {
      const search = new URLSearchParams(location.search);
      const currentTab = search.get('tab') || 'overview';
      if (tabParam) return location.pathname === '/admin' && currentTab === tabParam;
      return location.pathname === '/admin' && currentTab === 'overview';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-icon">G</div>
        <div className="admin-brand-text">
          <h2>GST Souss-Massa</h2>
          <span>ADMIN DASHBOARD</span>
        </div>
      </div>

      <nav className="admin-nav">
        <Link 
          to="/admin" 
          className={`admin-nav-item ${isActive('/admin', 'overview') ? 'active' : ''}`}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Dashboard</span>
          <span style={{ fontSize: '15px' }}>🏠</span>
        </Link>

        <Link 
          to="/admin?tab=general" 
          className={`admin-nav-item ${isActive('/admin', 'general') ? 'active' : ''}`}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Pages Générales</span>
          <span style={{ fontSize: '15px' }}>📄</span>
        </Link>

        <Link 
          to="/admin?tab=pages" 
          className={`admin-nav-item ${isActive('/admin', 'pages') || isActive('/admin/edit') ? 'active' : ''}`}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Pages par Rubrique</span>
          <span style={{ fontSize: '15px' }}>📚</span>
        </Link>

        <Link 
          to="/admin?tab=actualites" 
          className={`admin-nav-item ${isActive('/admin', 'actualites') ? 'active' : ''}`}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Actualités & Médias</span>
          <span style={{ fontSize: '15px' }}>📰</span>
        </Link>

        <Link 
          to="/admin?tab=evenements" 
          className={`admin-nav-item ${isActive('/admin', 'evenements') ? 'active' : ''}`}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Événements & Agenda</span>
          <span style={{ fontSize: '15px' }}>📅</span>
        </Link>

        <div className="admin-nav-divider"></div>

        <Link 
          to="/admin/menus" 
          className={`admin-nav-item ${isActive('/admin/menus') ? 'active' : ''}`}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Gestion des Menus</span>
          <span style={{ fontSize: '15px' }}>🗺️</span>
        </Link>

        <Link 
          to="/admin/settings" 
          className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Paramètres & Profil</span>
          <span style={{ fontSize: '15px' }}>⚙️</span>
        </Link>

        <Link 
          to="/" 
          className="admin-nav-item" 
          style={{ marginTop: 'auto' }}
        >
          <span style={{ fontWeight: '600', fontSize: '13.5px' }}>Voir le Site Public</span>
          <span style={{ fontSize: '15px' }}>🌐</span>
        </Link>
      </nav>
    </aside>
  );
}
