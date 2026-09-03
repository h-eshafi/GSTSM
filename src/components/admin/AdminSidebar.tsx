import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="admin-brand-icon">G</div>
        <div className="admin-brand-text">
          <h2>Admin GST</h2>
          <span>CMS Souss-Massa</span>
        </div>
      </div>

      <nav className="admin-nav" style={{ overflowY: 'auto' }}>
        <Link 
          to="/admin" 
          className={`admin-nav-item ${isActive('/admin') ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          📊 Tableau de Bord
        </Link>
        <Link 
          to="/admin?tab=pages" 
          className={`admin-nav-item ${isActive('/admin/edit') ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          📄 Pages Principales
        </Link>
        
        <div className="admin-nav-divider"></div>
        
        <Link 
          to="/admin/settings" 
          className={`admin-nav-item ${isActive('/admin/settings') ? 'active' : ''}`}
          style={{ textDecoration: 'none' }}
        >
          ⚙️ Paramètres & Profil
        </Link>
        <Link to="/" className="admin-nav-item" style={{ marginTop: 'auto', textDecoration: 'none' }}>
          🌐 Voir le Site Public →
        </Link>
      </nav>
    </aside>
  );
}
