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
          <div className="admin-nav-item-left">
            <span>🏠</span>
            <span>Dashboard</span>
          </div>
        </Link>

        <Link 
          to="/admin?tab=general" 
          className={`admin-nav-item ${isActive('/admin', 'general') ? 'active' : ''}`}
        >
          <div className="admin-nav-item-left">
            <span>📄</span>
            <span>Pages Générales</span>
          </div>
        </Link>

        <Link 
          to="/admin?tab=pages" 
          className={`admin-nav-item ${isActive('/admin', 'pages') || isActive('/admin/edit') ? 'active' : ''}`}
        >
          <div className="admin-nav-item-left">
            <span>📚</span>
            <span>Pages par Rubrique</span>
          </div>
        </Link>

        <Link 
          to="/admin?tab=actualites" 
          className={`admin-nav-item ${isActive('/admin', 'actualites') ? 'active' : ''}`}
        >
          <div className="admin-nav-item-left">
            <span>📰</span>
            <span>Actualités & Médias</span>
          </div>
        </Link>

        <Link 
          to="/admin?tab=evenements" 
          className={`admin-nav-item ${isActive('/admin', 'evenements') ? 'active' : ''}`}
        >
          <div className="admin-nav-item-left">
            <span>📅</span>
            <span>Événements & Agenda</span>
          </div>
        </Link>

        <div className="admin-nav-divider"></div>

        <Link 
          to="/admin/settings" 
          className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
        >
          <div className="admin-nav-item-left">
            <span>⚙️</span>
            <span>Paramètres & Profil</span>
          </div>
        </Link>

        <Link 
          to="/" 
          className="admin-nav-item" 
          style={{ marginTop: 'auto' }}
        >
          <div className="admin-nav-item-left">
            <span>🌐</span>
            <span>Voir le Site Public</span>
          </div>
        </Link>
      </nav>
    </aside>
  );
}
