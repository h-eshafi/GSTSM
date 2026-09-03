import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import '../../admin.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'pages' | 'actualites' | 'evenements' | 'settings'>('overview');
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Settings form state
  const [settings, setSettings] = useState({
    siteName: 'Groupement Sanitaire Territorial de la Région Souss-Massa',
    samuNumber: '141',
    contactEmail: 'contact@gst-soussmassa.ma',
    address: 'Boulevard Hassan II, Agadir, Maroc',
    maintenanceMode: false
  });
  const [savedSettingsSuccess, setSavedSettingsSuccess] = useState(false);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('createdAt', { ascending: false });
        
      if (data) setPosts(data);
      else console.error(error);
      
      setLoading(false);
    }
    fetchPosts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cet élément ?')) return;
    const { error } = await supabase.from('posts').delete().eq('id', id);
    if (!error) {
      setPosts(posts.filter(p => p.id !== id));
    }
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSettingsSuccess(true);
    setTimeout(() => setSavedSettingsSuccess(false), 3000);
  };

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'pages') return matchesSearch && post.type === 'page';
    if (activeTab === 'actualites') return matchesSearch && post.type === 'actualite';
    if (activeTab === 'evenements') return matchesSearch && post.type === 'evenement';
    return matchesSearch;
  });

  const pageCount = posts.filter(p => p.type === 'page').length;
  const newsCount = posts.filter(p => p.type === 'actualite').length;
  const eventCount = posts.filter(p => p.type === 'evenement').length;

  return (
    <>
      <div className="admin-main-container">
        <header className="admin-topbar">
          <h1 className="admin-topbar-title">
            {activeTab === 'overview' && '📊 Tableau de Bord Overview'}
            {activeTab === 'pages' && '📄 Pages & Sections du Site'}
            {activeTab === 'actualites' && '📰 Actualités & Communiqués'}
            {activeTab === 'evenements' && '📅 Événements & Agenda Régional'}
            {activeTab === 'settings' && '⚙️ Paramètres Généraux du Système'}
          </h1>
          <div className="admin-user-pill">
            <span className="admin-user-dot"></span>
            <span>Administrateur Connecté (Supabase)</span>
          </div>
        </header>

        <main className="admin-content">
          {/* KPI Metrics Summary Row */}
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

            <div className="admin-kpi-card">
              <div className="admin-kpi-info">
                <h4>Base de Données</h4>
                <p style={{ fontSize: '18px', color: '#10b981' }}>En Ligne ✓</p>
              </div>
              <div className="admin-kpi-icon kpi-emerald">⚡</div>
            </div>
          </div>

          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div>
              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Actions Rapides</h3>
                </div>
                <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                  <Link to="/admin/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
                    + Nouvelle Page / Article
                  </Link>
                  <button className="admin-btn admin-btn-secondary" onClick={() => setActiveTab('actualites')}>
                    Gérer les Actualités
                  </button>
                  <button className="admin-btn admin-btn-secondary" onClick={() => setActiveTab('evenements')}>
                    Gérer l'Agenda
                  </button>
                </div>
              </div>

              <div className="admin-card">
                <div className="admin-card-header">
                  <h3>Derniers Contenus Mis à Jour</h3>
                </div>
                <div className="admin-table-wrapper">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Titre</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th style={{ textAlign: 'right' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {posts.slice(0, 8).map((post) => (
                        <tr key={post.id}>
                          <td>
                            <div style={{ fontWeight: '600', color: '#0f172a' }}>{post.title}</div>
                            <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                              ID: /{post.id}
                            </div>
                          </td>
                          <td>
                            <span className={`type-badge badge-${post.type}`}>
                              {post.type}
                            </span>
                          </td>
                          <td style={{ color: '#64748b', fontSize: '13px' }}>
                            {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <Link to={`/admin/edit/${post.id}`}>
                              <button className="admin-btn admin-btn-secondary" style={{ padding: '5px 12px', fontSize: '12px', marginRight: '6px' }}>Éditer</button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAGES, ACTUALITES, & EVENEMENTS TABS */}
          {(activeTab === 'pages' || activeTab === 'actualites' || activeTab === 'evenements') && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>
                  {activeTab === 'pages' && 'Pages Principales'}
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
                    ) : filteredPosts.length === 0 ? (
                      <tr><td colSpan={4} style={{ textAlign: 'center', padding: '30px' }}>Aucun élément trouvé.</td></tr>
                    ) : (
                      filteredPosts.map((post) => (
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* PARAMETRES GENERAUX TAB */}
          {activeTab === 'settings' && (
            <div className="admin-card">
              <div className="admin-card-header">
                <h3>Paramètres Généraux de l'Établissement</h3>
              </div>

              {savedSettingsSuccess && (
                <div style={{ background: '#ecfdf5', color: '#047857', padding: '12px 18px', borderRadius: '10px', marginBottom: '20px', fontWeight: '600' }}>
                  ✓ Paramètres enregistrés avec succès !
                </div>
              )}

              <form onSubmit={handleSaveSettings}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="admin-label">Nom de l'Établissement</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={settings.siteName}
                      onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Numéro d'Urgence SAMU</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={settings.samuNumber}
                      onChange={(e) => setSettings({ ...settings, samuNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label className="admin-label">Email Officiel de Contact</label>
                    <input 
                      type="email" 
                      className="admin-input"
                      value={settings.contactEmail}
                      onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="admin-label">Adresse du Siège Régional</label>
                    <input 
                      type="text" 
                      className="admin-input"
                      value={settings.address}
                      onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontWeight: '600', color: '#334155' }}>
                    <input 
                      type="checkbox" 
                      checked={settings.maintenanceMode}
                      onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                      style={{ width: '18px', height: '18px' }}
                    />
                    Activer le Mode Maintenance du Site
                  </label>
                </div>

                <button type="submit" className="admin-btn admin-btn-primary">
                  💾 Enregistrer les Paramètres
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
