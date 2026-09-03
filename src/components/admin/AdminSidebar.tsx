import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

interface Post {
  id: string;
  title: string;
  type: string;
}

export default function AdminSidebar() {
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data } = await supabase.from('posts').select('id, title, type');
      if (data) setPosts(data);
    }
    fetchPosts();
  }, []);

  const pages = posts.filter(p => p.type === 'page');
  const actualites = posts.filter(p => p.type === 'actualite');
  const evenements = posts.filter(p => p.type === 'evenement');

  const toggleAccordion = (accordion: string) => {
    if (openAccordion === accordion) {
      setOpenAccordion(null);
    } else {
      setOpenAccordion(accordion);
    }
  };

  const isActive = (path: string) => location.pathname === path;
  const isEditingType = (type: string) => {
    if (!location.pathname.startsWith('/admin/edit/')) return false;
    const currentId = location.pathname.split('/').pop();
    const currentPost = posts.find(p => p.id === currentId);
    return currentPost?.type === type;
  };

  // Open the correct accordion by default if we're editing a specific type
  useEffect(() => {
    if (isEditingType('page')) setOpenAccordion('pages');
    else if (isEditingType('actualite')) setOpenAccordion('actualites');
    else if (isEditingType('evenement')) setOpenAccordion('evenements');
  }, [location.pathname, posts]);

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

        {/* Accordion: Pages Principales */}
        <div className="admin-accordion">
          <button 
            className={`admin-nav-item ${(openAccordion === 'pages' || isEditingType('page')) ? 'active' : ''}`}
            onClick={() => toggleAccordion('pages')}
          >
            <span>📄 Pages ({pages.length})</span>
            <span className={`admin-accordion-caret ${openAccordion === 'pages' ? 'open' : ''}`}>▼</span>
          </button>
          {openAccordion === 'pages' && (
            <div className="admin-accordion-content">
              {pages.map(page => (
                <Link 
                  key={page.id} 
                  to={`/admin/edit/${page.id}`} 
                  className={`admin-sub-nav-item ${isActive(`/admin/edit/${page.id}`) ? 'active' : ''}`}
                >
                  {page.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Accordion: Actualités */}
        <div className="admin-accordion">
          <button 
            className={`admin-nav-item ${(openAccordion === 'actualites' || isEditingType('actualite')) ? 'active' : ''}`}
            onClick={() => toggleAccordion('actualites')}
          >
            <span>📰 Actualités ({actualites.length})</span>
            <span className={`admin-accordion-caret ${openAccordion === 'actualites' ? 'open' : ''}`}>▼</span>
          </button>
          {openAccordion === 'actualites' && (
            <div className="admin-accordion-content">
              {actualites.map(actu => (
                <Link 
                  key={actu.id} 
                  to={`/admin/edit/${actu.id}`} 
                  className={`admin-sub-nav-item ${isActive(`/admin/edit/${actu.id}`) ? 'active' : ''}`}
                >
                  {actu.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Accordion: Événements */}
        <div className="admin-accordion">
          <button 
            className={`admin-nav-item ${(openAccordion === 'evenements' || isEditingType('evenement')) ? 'active' : ''}`}
            onClick={() => toggleAccordion('evenements')}
          >
            <span>📅 Événements ({evenements.length})</span>
            <span className={`admin-accordion-caret ${openAccordion === 'evenements' ? 'open' : ''}`}>▼</span>
          </button>
          {openAccordion === 'evenements' && (
            <div className="admin-accordion-content">
              {evenements.map(evt => (
                <Link 
                  key={evt.id} 
                  to={`/admin/edit/${evt.id}`} 
                  className={`admin-sub-nav-item ${isActive(`/admin/edit/${evt.id}`) ? 'active' : ''}`}
                >
                  {evt.title}
                </Link>
              ))}
            </div>
          )}
        </div>
        
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
