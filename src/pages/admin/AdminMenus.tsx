import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { getMenuData, saveMenuData } from '../../lib/menuStore';
import '../../admin.css';

interface Post {
  id: string;
  title: string;
  type: string;
}

const categoryTitles: Record<string, string> = {
  gst: '1. Le GST Souss-Massa',
  patients: '2. Patients et Proches',
  offre: '3. Offre de Soins',
  sante: '4. Santé Publique',
  espace: '5. Espace Professionnel',
  actu: '6. Actualités et Médias'
};

export default function AdminMenus() {
  const [activeCategory, setActiveCategory] = useState<string>('gst');
  const [menus, setMenus] = useState<Record<string, any>>(getMenuData());
  const [selectedColumnIndex, setSelectedColumnIndex] = useState<number>(0);
  const [allPages, setAllPages] = useState<Post[]>([]);
  const [pageSearchTerm, setPageSearchTerm] = useState<string>('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function fetchPages() {
      const { data } = await supabase.from('posts').select('id, title, type').order('title', { ascending: true });
      if (data) setAllPages(data);
    }
    fetchPages();
  }, []);

  const currentCatData = menus[activeCategory] || {};
  const currentColumns = currentCatData.columns || [];

  // Filtered pages for picker (max 5)
  const filteredPages = allPages
    .filter(p => p.title.toLowerCase().includes(pageSearchTerm.toLowerCase()) || p.id.toLowerCase().includes(pageSearchTerm.toLowerCase()))
    .slice(0, 5);

  const handleSaveAll = () => {
    saveMenuData(menus);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleAddPageToColumn = (page: Post) => {
    if (!currentColumns[selectedColumnIndex]) return;

    const updated = JSON.parse(JSON.stringify(menus));
    const targetHref = `/pages/${page.id}`;
    
    // Check duplicate
    const existing = updated[activeCategory].columns[selectedColumnIndex].links.find((l: any) => l.href === targetHref);
    if (!existing) {
      updated[activeCategory].columns[selectedColumnIndex].links.push({
        label: page.title,
        href: targetHref
      });
      setMenus(updated);
    }
  };

  const handleRemoveLink = (colIndex: number, linkIndex: number) => {
    const updated = JSON.parse(JSON.stringify(menus));
    updated[activeCategory].columns[colIndex].links.splice(linkIndex, 1);
    setMenus(updated);
  };

  return (
    <div className="admin-main-container">
      {/* Topbar Header */}
      <header className="admin-topbar">
        <div className="admin-search-wrapper">
          <span className="admin-search-icon">🔍</span>
          <input 
            type="text" 
            className="admin-topbar-search" 
            placeholder="Gestionnaire de Menus Navbar..." 
            disabled
          />
        </div>

        <div className="admin-topbar-actions">
          <button 
            type="button" 
            className="storeep-dropdown-btn" 
            onClick={handleSaveAll}
            style={{ padding: '8px 18px', fontSize: '13px' }}
          >
            💾 Enregistrer la Structure
          </button>
          <div className="admin-avatar-btn" title="Profil Administrateur">AD</div>
        </div>
      </header>

      <main className="admin-content">
        <div className="pages-header-section" style={{ marginBottom: '24px' }}>
          <div className="pages-header-title">
            <h1>🗺️ Gestionnaire de Menus Navbar</h1>
            <p>Gérez les sous-menus déroulants, ajoutez vos pages existantes et enregistrez la structure du menu public.</p>
          </div>

          <div className="pages-filter-actions">
            <button 
              type="button" 
              className="storeep-dropdown-btn" 
              onClick={handleSaveAll}
            >
              💾 Enregistrer les Modifications
            </button>
          </div>
        </div>

        {saved && (
          <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px 18px', borderRadius: '10px', marginBottom: '24px', fontWeight: '600', border: '1px solid #A7F3D0', fontSize: '13px' }}>
            ✅ La structure du menu Navbar a été enregistrée avec succès.
          </div>
        )}

        <div className="admin-card" style={{ display: 'flex', minHeight: '600px' }}>
          {/* Category Tabs Sidebar */}
          <div style={{ width: '260px', borderRight: '1px solid var(--admin-border)', padding: '24px 16px', backgroundColor: '#FAFAF9' }}>
            <h4 style={{ margin: '0 0 16px 12px', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em', fontWeight: '700' }}>
              Rubriques Navbar Principales
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.entries(categoryTitles).map(([key, label]) => (
                <button
                  key={key}
                  className={`admin-nav-item ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(key);
                    setSelectedColumnIndex(0);
                  }}
                >
                  <span>📌</span>
                  <span style={{ fontSize: '13px' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Columns & Submenus Section */}
          <div style={{ flex: 1, padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #E2E8F0', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 4px 0' }}>
                  {categoryTitles[activeCategory]}
                </h2>
                <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
                  Sélectionnez un sous-menu déroulant pour organiser ses liens.
                </p>
              </div>
            </div>

            {currentColumns.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
                
                {/* Left: Dropdown Submenu Selector & Links List */}
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
                      Choisir le Sous-Menu Déroulant
                    </label>
                    <select 
                      className="admin-input" 
                      style={{ fontSize: '14px', fontWeight: '600', padding: '12px', borderColor: '#2563EB', background: '#EFF6FF', color: '#1D4ED8' }}
                      value={selectedColumnIndex}
                      onChange={(e) => setSelectedColumnIndex(Number(e.target.value))}
                    >
                      {currentColumns.map((col: any, idx: number) => (
                        <option key={idx} value={idx}>
                          📁 {col.title} ({col.links?.length || 0} liens)
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Active Submenu Container */}
                  {currentColumns[selectedColumnIndex] && (
                    <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0F172A', marginTop: 0, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>📂</span>
                        <span>{currentColumns[selectedColumnIndex].title}</span>
                      </h3>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        {currentColumns[selectedColumnIndex].links.length === 0 ? (
                          <div style={{ padding: '24px', textAlign: 'center', color: '#94A3B8', fontSize: '13px', background: '#F8FAFC', borderRadius: '8px', border: '1px dashed #CBD5E1' }}>
                            Aucun lien dans ce sous-menu. Utilisez le sélecteur de pages à droite pour en ajouter.
                          </div>
                        ) : (
                          currentColumns[selectedColumnIndex].links.map((link: any, linkIdx: number) => (
                            <div key={linkIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0', transition: 'all 0.15s' }}>
                              <div>
                                <div style={{ fontWeight: '600', color: '#0F172A', fontSize: '14px' }}>{link.label}</div>
                                <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{link.href}</div>
                              </div>
                              <button 
                                type="button"
                                className="admin-btn admin-btn-danger" 
                                style={{ padding: '6px 10px', fontSize: '12px' }}
                                onClick={() => handleRemoveLink(selectedColumnIndex, linkIdx)}
                                title="Supprimer du menu"
                              >
                                🗑️ Retirer
                              </button>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Searchable Page Picker (5 Max + Live Search Bar) */}
                <div style={{ background: '#FAFAF9', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px', height: 'fit-content' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>➕</span>
                    <span>Ajouter une Page Existante</span>
                  </h4>
                  <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#64748B' }}>
                    Recherchez parmi vos pages publiées pour l'ajouter au sous-menu sélectionné.
                  </p>

                  {/* Search Bar Input */}
                  <div style={{ marginBottom: '14px' }}>
                    <input 
                      type="text" 
                      className="admin-input" 
                      placeholder="🔎 Rechercher une page..."
                      value={pageSearchTerm}
                      onChange={(e) => setPageSearchTerm(e.target.value)}
                      style={{ fontSize: '13px', padding: '8px 12px' }}
                    />
                  </div>

                  {/* Results List (Showing 5 Max) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {filteredPages.length === 0 ? (
                      <div style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center', padding: '16px' }}>
                        Aucune page correspondante trouvée.
                      </div>
                    ) : (
                      filteredPages.map((page) => (
                        <div 
                          key={page.id}
                          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 12px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '13px' }}
                        >
                          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingRight: '8px' }}>
                            <div style={{ fontWeight: '600', color: '#0F172A', fontSize: '13px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{page.title}</div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>/{page.id}</div>
                          </div>
                          <button 
                            type="button"
                            className="admin-btn admin-btn-primary"
                            style={{ padding: '5px 10px', fontSize: '11px', flexShrink: 0 }}
                            onClick={() => handleAddPageToColumn(page)}
                          >
                            + Ajouter
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: '#64748B', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                Rubrique prévisualisation directe. Les sous-pages sont gérées depuis la section Pages Principales.
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
