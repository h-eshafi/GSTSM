import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import megaMenuDataRaw from '../../data/menus.json';

interface Post {
  id: string;
  type: string;
  title: string;
  kicker: string;
  image?: string;
  createdAt: string;
}

const megaMenuData: Record<string, any> = megaMenuDataRaw;

const categoryNames: Record<string, string> = {
  all: 'Toutes les rubriques',
  gst: 'Le GST Souss-Massa',
  patients: 'Patients et Proches',
  offre: 'Offre de Soins',
  sante: 'Santé Publique',
  espace: 'Espace Professionnel',
  actu: 'Actualités et Médias',
  general: 'Pages Générales'
};

export default function AdminDashboard() {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'overview';
  
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRubrique, setSelectedRubrique] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase.from('posts').select('id, type, title, kicker, image, createdAt').order('createdAt', { ascending: false });
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

  // Known slugs map for categories
  const getKnownCategory = (slug: string): string => {
    let matchedCat = 'general';
    Object.entries(megaMenuData).forEach(([catKey, catData]) => {
      if (catData.columns) {
        catData.columns.forEach((col: any) => {
          col.links.forEach((link: any) => {
            const s = link.href.split('/').pop().replace('.html', '');
            if (s === slug) matchedCat = catKey;
          });
        });
      }
      if (catData.previewGroups) {
        catData.previewGroups.forEach((group: any) => {
          const s = group.href.split('/').pop().replace('.html', '');
          if (s === slug) matchedCat = catKey;
        });
      }
    });
    return matchedCat;
  };

  // Filter for Search & Category
  const filteredPosts = posts.filter(post => {
    const matchesSearch = !searchTerm || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      post.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeTab === 'general') {
      const cat = getKnownCategory(post.id);
      return post.type === 'page' && cat === 'general';
    }

    if (activeTab === 'pages') {
      if (post.type !== 'page') return false;
      if (selectedRubrique === 'all') return true;
      const cat = getKnownCategory(post.id);
      return cat === selectedRubrique;
    }

    if (activeTab === 'actualites') return post.type === 'actualite';
    if (activeTab === 'evenements') return post.type === 'evenement';

    return true;
  });

  const renderTableRows = (items: Post[]) => {
    if (loading) {
      return Array.from({ length: 5 }).map((_, idx) => (
        <tr key={idx} style={{ opacity: 0.7 }}>
          <td style={{ width: '40px' }}><div style={{ width: '16px', height: '16px', borderRadius: '4px', background: '#E2E8F0' }}></div></td>
          <td>
            <div className="page-thumb-cell">
              <div className="page-thumb" style={{ background: '#E2E8F0' }}></div>
              <div>
                <div style={{ width: '180px', height: '14px', borderRadius: '4px', background: '#E2E8F0', marginBottom: '6px' }}></div>
                <div style={{ width: '120px', height: '10px', borderRadius: '4px', background: '#F1F5F9' }}></div>
              </div>
            </div>
          </td>
          <td><div style={{ width: '110px', height: '22px', borderRadius: '100px', background: '#E2E8F0' }}></div></td>
          <td><div style={{ width: '80px', height: '14px', borderRadius: '4px', background: '#E2E8F0' }}></div></td>
          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}><div style={{ width: '140px', height: '28px', borderRadius: '6px', background: '#E2E8F0', marginLeft: 'auto' }}></div></td>
        </tr>
      ));
    }

    if (items.length === 0) {
      return (
        <tr>
          <td colSpan={5} style={{ textAlign: 'center', padding: '36px', color: '#64748B' }}>
            Aucune page trouvée dans cette rubrique.
          </td>
        </tr>
      );
    }

    return items.map((post) => {
      const catKey = getKnownCategory(post.id);
      const catLabel = categoryNames[catKey] || 'Page Générale';
      const pageImg = post.image || '/gst-scene-2.png';

      return (
        <tr key={post.id}>
          <td style={{ width: '40px' }}>
            <input type="checkbox" style={{ borderRadius: '4px', cursor: 'pointer' }} />
          </td>
          <td>
            <div className="page-thumb-cell">
              <div className="page-thumb">
                <img src={pageImg} alt={post.title} onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
                <span>📄</span>
              </div>
              <div>
                <div style={{ fontWeight: '600', color: '#0F172A', fontSize: '14px' }}>{post.title}</div>
                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                  URL: /pages/{post.id} • {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                </div>
              </div>
            </div>
          </td>
          <td>
            <span className="rubrique-badge">
              <span>📌</span>
              <span>{catLabel}</span>
            </span>
          </td>
          <td>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '600', color: '#10B981' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10B981' }}></span>
              En ligne ✓
            </span>
          </td>
          <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
            <a 
              href={`/pages/${post.id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="admin-btn admin-btn-secondary" 
              style={{ marginRight: '6px', textDecoration: 'none' }}
              title="Voir la page publique"
            >
              👁️ Voir
            </a>
            <Link to={`/admin/edit/${post.id}`}>
              <button className="admin-btn admin-btn-secondary" style={{ marginRight: '6px' }}>
                ✏️ Éditer
              </button>
            </Link>
            <button 
              className="admin-btn admin-btn-danger" 
              onClick={() => handleDelete(post.id)}
            >
              🗑️ Supprimer
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="admin-main-container">
      {/* Storeep Topbar Header */}
      <header className="admin-topbar">
        <div className="admin-search-wrapper">
          <span className="admin-search-icon">🔍</span>
          <input 
            type="text" 
            className="admin-topbar-search" 
            placeholder="Rechercher une page, un article, un slug..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="admin-search-kbd">Ctrl K</span>
        </div>

        <div className="admin-topbar-actions">
          <button className="admin-icon-btn" title="Mode Sombre">🌙</button>
          <button className="admin-icon-btn" title="Marketplace">🔲</button>
          <button className="admin-icon-btn" title="Notifications">🔔</button>
          <div className="admin-avatar-btn" title="Profil Administrateur">AD</div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="admin-content">
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <>
            {/* Storeep Gradient Banner */}
            <div className="storeep-banner">
              <span className="storeep-banner-badge">SPRING 2026 • GST SOUSS-MASSA</span>
              <h2>GST Souss-Massa administration centralisée</h2>
              <p>
                Gérez l'ensemble des rubriques du portail régional de santé, administrez les contenus
                et mettez à jour les publications en toute simplicité.
              </p>
              <Link to="/" className="storeep-banner-btn">
                <span>Voir le site public</span>
                <span>→</span>
              </Link>
            </div>

            {/* KPI Cards Row */}
            <div className="admin-kpi-grid">
              <div className="admin-kpi-card">
                <div className="admin-kpi-icon-pill">👁️</div>
                <div className="admin-kpi-info">
                  <h4>Visiteurs ce mois-ci</h4>
                  <p>12 450</p>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon-pill">📄</div>
                <div className="admin-kpi-info">
                  <h4>Pages Publiées</h4>
                  <p>{pageCount}</p>
                </div>
              </div>

              <div className="admin-kpi-card">
                <div className="admin-kpi-icon-pill">📰</div>
                <div className="admin-kpi-info">
                  <h4>Articles & Événements</h4>
                  <p>{newsCount + eventCount}</p>
                </div>
              </div>
            </div>

            {/* Recent Pages Table */}
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>Derniers Contenus Mis à Jour</h3>
                <Link to="/admin/new" className="admin-btn admin-btn-primary">
                  + Nouvelle Page
                </Link>
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}></th>
                      <th>Page / Titre</th>
                      <th>Rubrique</th>
                      <th>Statut</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableRows(posts.slice(0, 8))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* PAGES VIEW (Storeep Style Dropdown Select & Table) */}
        {(activeTab === 'pages' || activeTab === 'general') && (
          <>
            <div className="pages-header-section">
              <div className="pages-header-title">
                <h1>{activeTab === 'general' ? 'Pages Générales' : 'Pages Principales'}</h1>
                <p>Vos pages, vos règles. Filtrez par rubrique navigation, éditez et gérez.</p>
              </div>

              <div className="pages-filter-actions">
                {activeTab === 'pages' && (
                  <div className="storeep-dropdown-btn">
                    <span>Filter:</span>
                    <select 
                      className="storeep-dropdown-select"
                      value={selectedRubrique}
                      onChange={(e) => setSelectedRubrique(e.target.value)}
                    >
                      {Object.entries(categoryNames).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                  </div>
                )}

                <Link to="/admin/new" className="storeep-secondary-btn" style={{ textDecoration: 'none' }}>
                  <span>+ Créer une page</span>
                </Link>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <h3>
                  <span>📦</span>
                  <span>Liste des Pages ({filteredPosts.length})</span>
                </h3>
                <span style={{ fontSize: '18px', color: '#64748B', cursor: 'pointer' }}>⚙️</span>
              </div>

              <div className="admin-search-bar">
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Rechercher une page par titre ou slug URL..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}></th>
                      <th>Page</th>
                      <th>Rubrique Nav Bar</th>
                      <th>Statut</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableRows(filteredPosts)}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {/* ACTUALITES & EVENEMENTS VIEWS */}
        {(activeTab === 'actualites' || activeTab === 'evenements') && (
          <>
            <div className="pages-header-section">
              <div className="pages-header-title">
                <h1>{activeTab === 'actualites' ? 'Actualités & Médias' : 'Événements & Agenda'}</h1>
                <p>Gérez les articles, communiqués de presse et l'agenda des événements régionaux.</p>
              </div>

              <div className="pages-filter-actions">
                <Link to="/admin/new" className="storeep-dropdown-btn" style={{ textDecoration: 'none' }}>
                  <span>+ Créer un contenu</span>
                </Link>
              </div>
            </div>

            <div className="admin-card">
              <div className="admin-card-header">
                <h3>
                  <span>📰</span>
                  <span>{activeTab === 'actualites' ? 'Articles d\'Actualités' : 'Événements'}</span>
                </h3>
              </div>

              <div className="admin-search-bar">
                <input 
                  type="text" 
                  className="admin-input" 
                  placeholder="Rechercher par titre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="admin-table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th style={{ width: '40px' }}></th>
                      <th>Titre & URL</th>
                      <th>Catégorie</th>
                      <th>Statut</th>
                      <th style={{ textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {renderTableRows(filteredPosts)}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
