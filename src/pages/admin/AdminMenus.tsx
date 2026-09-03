import { useState } from 'react';
import megaMenuDataRaw from '../../data/menus.json';
import '../../admin.css';

const megaMenuData: Record<string, any> = megaMenuDataRaw;

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
  const [menus, setMenus] = useState<Record<string, any>>(megaMenuData);
  const [saved, setSaved] = useState(false);
  const [newLinkLabel, setNewLinkLabel] = useState('');
  const [newLinkHref, setNewLinkHref] = useState('');

  const currentCatData = menus[activeCategory] || {};

  const handleAddLink = (colIndex: number) => {
    if (!newLinkLabel || !newLinkHref) return;

    const updated = { ...menus };
    if (updated[activeCategory]?.columns?.[colIndex]) {
      updated[activeCategory].columns[colIndex].links.push({
        label: newLinkLabel,
        href: newLinkHref.startsWith('/') ? newLinkHref : `/pages/${newLinkHref}`
      });
      setMenus(updated);
      setNewLinkLabel('');
      setNewLinkHref('');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
  };

  const handleRemoveLink = (colIndex: number, linkIndex: number) => {
    const updated = { ...menus };
    if (updated[activeCategory]?.columns?.[colIndex]) {
      updated[activeCategory].columns[colIndex].links.splice(linkIndex, 1);
      setMenus(updated);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }
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
          <button className="admin-icon-btn" title="Notifications">🔔</button>
          <div className="admin-avatar-btn" title="Profil Administrateur">AD</div>
        </div>
      </header>

      <main className="admin-content">
        <div className="pages-header-section" style={{ marginBottom: '24px' }}>
          <div className="pages-header-title">
            <h1>🗺️ Gestionnaire de Menus Navbar</h1>
            <p>Organisez la structure de votre menu de navigation principal et gérez les liens par rubrique.</p>
          </div>
        </div>

        {saved && (
          <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px 18px', borderRadius: '10px', marginBottom: '24px', fontWeight: '600', border: '1px solid #A7F3D0', fontSize: '13px' }}>
            ✅ Structure du menu mise à jour avec succès.
          </div>
        )}

        <div className="admin-card" style={{ display: 'flex', minHeight: '580px' }}>
          {/* Category Tabs Sidebar */}
          <div style={{ width: '260px', borderRight: '1px solid var(--admin-border)', padding: '24px 16px', backgroundColor: '#FAFAF9' }}>
            <h4 style={{ margin: '0 0 16px 12px', fontSize: '11px', textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.05em' }}>Rubriques Navbar</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {Object.entries(categoryTitles).map(([key, label]) => (
                <button
                  key={key}
                  className={`admin-nav-item ${activeCategory === key ? 'active' : ''}`}
                  onClick={() => setActiveCategory(key)}
                >
                  <span>📌</span>
                  <span style={{ fontSize: '13px' }}>{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Menu Columns & Links List */}
          <div style={{ flex: 1, padding: '32px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '700', margin: '0 0 24px 0' }}>
              {categoryTitles[activeCategory]}
            </h2>

            {currentCatData.columns ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {currentCatData.columns.map((col: any, colIdx: number) => (
                  <div key={colIdx} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '20px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0F172A', marginTop: 0, marginBottom: '16px', borderBottom: '2px solid #E0F2FE', paddingBottom: '8px' }}>
                      {col.title}
                    </h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                      {col.links.map((link: any, linkIdx: number) => (
                        <div key={linkIdx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '13px' }}>
                          <div>
                            <div style={{ fontWeight: '600', color: '#0F172A' }}>{link.label}</div>
                            <div style={{ fontSize: '11px', color: '#64748B' }}>{link.href}</div>
                          </div>
                          <button 
                            className="admin-btn admin-btn-danger" 
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                            onClick={() => handleRemoveLink(colIdx, linkIdx)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add New Link Box */}
                    <div style={{ paddingTop: '16px', borderTop: '1px dashed #E2E8F0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <input 
                        type="text" 
                        className="admin-input" 
                        placeholder="Libellé du lien..." 
                        style={{ fontSize: '12px', padding: '6px 10px' }}
                        value={newLinkLabel}
                        onChange={(e) => setNewLinkLabel(e.target.value)}
                      />
                      <input 
                        type="text" 
                        className="admin-input" 
                        placeholder="URL / Slug (ex: /pages/ma-page)..." 
                        style={{ fontSize: '12px', padding: '6px 10px' }}
                        value={newLinkHref}
                        onChange={(e) => setNewLinkHref(e.target.value)}
                      />
                      <button 
                        type="button" 
                        className="admin-btn admin-btn-primary" 
                        style={{ fontSize: '12px', padding: '6px 12px', alignSelf: 'flex-start' }}
                        onClick={() => handleAddLink(colIdx)}
                      >
                        + Ajouter à la sous-rubrique
                      </button>
                    </div>
                  </div>
                ))}
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
