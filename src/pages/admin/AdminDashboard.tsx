import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import megaMenuDataRaw from '../../data/menus.json';

interface Post {
  id: string;
  type: string;
  title: string;
  kicker: string;
  createdAt: string;
}

const megaMenuData: Record<string, any> = megaMenuDataRaw;

const categoryNames: Record<string, string> = {
  gst: 'Le GST Souss-Massa',
  patients: 'Patients et Proches',
  offre: 'Offre de Soins',
  sante: 'Santé Publique',
  espace: 'Espace Professionnel',
  actu: 'Actualités et Médias',
  autres: 'Autres Pages (Non classées)'
};

export default function AdminDashboard() {
  const [searchParams] = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'overview';
  
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('id, type, title, kicker, createdAt').order('createdAt', { ascending: false });
      if (data) setPosts(data);
      if (error) console.error('Error fetching posts:', error);
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer la page ${id} ?`)) {
      await supabase.from('posts').delete().eq('id', id);
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  // Pre-calculate counts
  const pageCount = posts.filter(p => p.type === 'page').length;
  const newsCount = posts.filter(p => p.type === 'actualite').length;
  const eventCount = posts.filter(p => p.type === 'evenement').length;

  // Filter for Search
  const searchFilter = (post: Post) => {
    if (!searchTerm) return true;
    return post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
           post.id.toLowerCase().includes(searchTerm.toLowerCase());
  };

  // Group pages by Menu Categories
  const getCategorizedPages = () => {
    const categorized: Record<string, Post[]> = {
      gst: [], patients: [], offre: [], sante: [], espace: [], actu: [], autres: []
    };

    // Extract all known slugs from menus.json
    const knownSlugs = new Map<string, string>(); // slug -> category
    Object.entries(megaMenuData).forEach(([catKey, catData]) => {
      if (catData.columns) {
        catData.columns.forEach((col: any) => {
          col.links.forEach((link: any) => {
            const slug = link.href.split('/').pop().replace('.html', '');
            knownSlugs.set(slug, catKey);
          });
        });
      }
      if (catData.previewGroups) {
        catData.previewGroups.forEach((group: any) => {
          const slug = group.href.split('/').pop().replace('.html', '');
          knownSlugs.set(slug, catKey);
        });
      }
    });

    // Group the pages
    posts.filter(p => p.type === 'page').filter(searchFilter).forEach(post => {
      const cat = knownSlugs.get(post.id);
      if (cat && categorized[cat]) {
        categorized[cat].push(post);
      } else {
        categorized.autres.push(post);
      }
    });

    return categorized;
  };

  const renderTableRows = (items: Post[]) => {
    if (items.length === 0) return <tr><td colSpan={4} style={{ textAlign: 'center', padding: '30px' }}>Aucun élément trouvé.</td></tr>;
    return items.map((post) => (
      <tr key={post.id}>
        <td>
          <div style={{ fontWeight: '600', color: '#0f172a', fontSize: '15px' }}>{post.title}</div>
          <div style={{ fontSize: '13px', color: '#64748b', marginTop: '3px' }}>
            URL: /pages/{post.id}
          </div>
        </td>
        <td>
          <span className={`type-badge badge-${post.type}`}>
            {post.kicker || post.type}
          </span>
        </td>
        <td style={{ color: '#64748b', fontSize: '13px' }}>
          {new Date(post.createdAt).toLocaleDateString('fr-FR')}
        </td>
        <td style={{ textAlign: 'right' }}>
          <Link to={`/admin/edit/${post.id}`}>
            <button className="admin-btn admin-btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', marginRight: '8px' }}>
              ✏️ Éditer
            </button>
          </Link>
          <button 
            className="admin-btn admin-btn-danger" 
            style={{ padding: '6px 12px', fontSize: '13px' }}
            onClick={() => handleDelete(post.id)}
          >
            🗑️ Supprimer
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <>
      <div className="admin-main-container">
        <header className="admin-topbar">
          <h1 className="admin-topbar-title">
            {activeTab === 'overview' && '📊 Tableau de Bord Overview'}
            {activeTab === 'pages' && '📄 Pages & Sections du Site'}
            {activeTab === 'actualites' && '📰 Actualités & Communiqués'}
            {activeTab === 'evenements' && '📅 Événements & Agenda Régional'}
          </h1>
          <div className="admin-user-pill">
            <span className="admin-user-dot"></span>
            <span>Administrateur Connecté</span>
          </div>
        </header>

        <main className="admin-content">
          {/* KPI Metrics Summary Row */}
          {activeTab === 'overview' && (
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card" onClick={() => setActiveTab('pages')} style={{ cursor: 'pointer' }}>
                <div className="admin-kpi-info">
                  <h4>Pages Principales</h4>
                  <p>{pageCount}</p>
                </div>
                <div className="admin-kpi-icon kpi-purple">📄</div>
              </div>

              <div className="admin-kpi-card" onClick={() => setActiveTab('actualites')} style={{ cursor: 'pointer' }}>
                <div className="admin-kpi-info">
                  <h4>Actualités</h4>
                  <p>{newsCount}</p>
                </div>
                <div className="admin-kpi-icon kpi-blue">📰</div>
              </div>

              <div className="admin-kpi-card" onClick={() => setActiveTab('evenements')} style={{ cursor: 'pointer' }}>
                <div className="admin-kpi-info">
                  <h4>Événements</h4>
                  <p>{eventCount}</p>
                </div>
                <div className="admin-kpi-icon kpi-pink">📅</div>
              </div>
            </div>
          )}

          {/* PAGES TAB - CATEGORIZED INTO 6 SECTIONS */}
          {activeTab === 'pages' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>Architecture du Site (50+ Pages)</h3>
                <Link to="/admin/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
                  + Créer une page
                </Link>
              </div>

              <div className="admin-search-bar">
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Rechercher par titre ou identifiant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="admin-table-wrapper" style={{ padding: '24px', backgroundColor: '#F8FAFC' }}>
                {loading ? (
                  <div style={{ textAlign: 'center', padding: '30px' }}>Chargement depuis Supabase...</div>
                ) : (
                  Object.entries(getCategorizedPages()).map(([catKey, catPages]) => {
                    if (catPages.length === 0) return null;
                    const isOpen = openAccordion === catKey;
                    
                    return (
                      <div key={catKey} style={{ marginBottom: '16px', backgroundColor: 'white', border: '1px solid var(--admin-border)', borderRadius: '8px', overflow: 'hidden' }}>
                        <button 
                          onClick={() => setOpenAccordion(isOpen ? null : catKey)}
                          style={{ width: '100%', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: isOpen ? '#F1F5F9' : 'white', border: 'none', cursor: 'pointer', textAlign: 'left' }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <span style={{ fontSize: '18px' }}>📁</span>
                            <h4 style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: 'var(--admin-text-main)' }}>
                              {categoryNames[catKey] || 'Section'}
                            </h4>
                            <span style={{ backgroundColor: '#E2E8F0', padding: '2px 8px', borderRadius: '100px', fontSize: '12px', color: '#475569', fontWeight: '600' }}>
                              {catPages.length}
                            </span>
                          </div>
                          <span style={{ transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', fontSize: '12px', color: '#64748B' }}>▼</span>
                        </button>
                        
                        {isOpen && (
                          <div style={{ borderTop: '1px solid var(--admin-border)' }}>
                            <table className="admin-table">
                              <thead>
                                <tr>
                                  <th>Titre & URL Slug</th>
                                  <th>Catégorie (Sur-titre)</th>
                                  <th>Date</th>
                                  <th style={{ textAlign: 'right' }}>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {renderTableRows(catPages)}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* ACTUALITES & EVENEMENTS TABS */}
          {(activeTab === 'actualites' || activeTab === 'evenements') && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>
                  {activeTab === 'actualites' && 'Articles & Actualités'}
                  {activeTab === 'evenements' && 'Événements de l\'Agenda'}
                </h3>
                <Link to="/admin/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
                  + Créer un nouveau contenu
                </Link>
              </div>

              <div className="admin-search-bar">
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Rechercher par titre ou identifiant..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Titre & URL Slug</th>
                      <th>Catégorie</th>
                      <th>Date</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: '30px' }}>Chargement depuis Supabase...</td></tr>
                    ) : (
                      renderTableRows(posts.filter(p => p.type === activeTab).filter(searchFilter))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>
    </>
  );
}
