import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../admin.css';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'site'>('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Mock data for the UI
  const [profile, setProfile] = useState({
    name: 'Administrateur Principal',
    email: 'admin@gst-soussmassa.ma',
    role: 'Super Admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+GST&background=0284C7&color=fff&size=128'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-icon">G</div>
          <div className="admin-brand-text">
            <h2>Admin GST</h2>
            <span>CMS Souss-Massa</span>
          </div>
        </div>

        <nav className="admin-nav">
          <Link to="/admin" className="admin-nav-item">
            📊 Tableau de Bord
          </Link>
          <Link to="/admin" className="admin-nav-item">
            📄 Pages Principales
          </Link>
          <div className="admin-nav-divider"></div>
          <Link to="/admin/settings" className="admin-nav-item active">
            ⚙️ Paramètres & Profil
          </Link>
          <Link to="/" className="admin-nav-item" style={{ marginTop: 'auto' }}>
            🌐 Voir le Site Public
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main-container">
        <header className="admin-topbar">
          <h1 className="admin-topbar-title">Paramètres & Profil</h1>
          <div className="admin-user-pill">
            <img src={profile.avatar} alt="Admin" style={{ width: '24px', height: '24px', borderRadius: '50%' }} />
            {profile.name}
          </div>
        </header>

        <main className="admin-content">
          <div className="admin-card" style={{ display: 'flex', minHeight: '600px' }}>
            
            {/* Settings Sidebar */}
            <div style={{ width: '250px', borderRight: '1px solid var(--admin-border)', padding: '24px', backgroundColor: '#F8FAFC' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button 
                  className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  style={{ color: activeTab === 'profile' ? '#0284C7' : '#64748B', backgroundColor: activeTab === 'profile' ? '#E0F2FE' : 'transparent' }}
                >
                  👤 Profil Public
                </button>
                <button 
                  className={`admin-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                  onClick={() => setActiveTab('security')}
                  style={{ color: activeTab === 'security' ? '#0284C7' : '#64748B', backgroundColor: activeTab === 'security' ? '#E0F2FE' : 'transparent' }}
                >
                  🔒 Sécurité & Connexion
                </button>
                <button 
                  className={`admin-nav-item ${activeTab === 'site' ? 'active' : ''}`}
                  onClick={() => setActiveTab('site')}
                  style={{ color: activeTab === 'site' ? '#0284C7' : '#64748B', backgroundColor: activeTab === 'site' ? '#E0F2FE' : 'transparent' }}
                >
                  🌍 Paramètres du Site
                </button>
              </div>
            </div>

            {/* Settings Form */}
            <div style={{ flex: 1, padding: '40px 48px' }}>
              {saved && (
                <div style={{ background: '#D1FAE5', color: '#065F46', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontWeight: '500', border: '1px solid #A7F3D0' }}>
                  ✅ Vos paramètres ont été enregistrés avec succès.
                </div>
              )}

              <form onSubmit={handleSave}>
                {activeTab === 'profile' && (
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', marginTop: 0 }}>Profil Administrateur</h2>
                    
                    <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '32px' }}>
                      <img src={profile.avatar} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', border: '2px solid #E2E8F0' }} />
                      <div>
                        <button type="button" className="admin-btn admin-btn-secondary" style={{ marginBottom: '8px' }}>Changer la photo</button>
                        <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>JPG, GIF ou PNG. Taille maximale 1MB.</p>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                      <div className="editor-meta-group">
                        <label>Nom Complet</label>
                        <input type="text" className="admin-input" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                      </div>
                      <div className="editor-meta-group">
                        <label>Rôle</label>
                        <input type="text" className="admin-input" value={profile.role} disabled style={{ backgroundColor: '#F1F5F9' }} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'security' && (
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', marginTop: 0 }}>Sécurité & Connexion</h2>
                    
                    <div className="editor-meta-group" style={{ marginBottom: '24px' }}>
                      <label>Adresse E-mail de connexion</label>
                      <input type="email" className="admin-input" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                    </div>

                    <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px', marginTop: '32px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Changer le mot de passe</h3>
                    
                    <div className="editor-meta-group" style={{ marginBottom: '16px' }}>
                      <label>Mot de passe actuel</label>
                      <input type="password" className="admin-input" placeholder="••••••••" />
                    </div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                      <div className="editor-meta-group">
                        <label>Nouveau mot de passe</label>
                        <input type="password" className="admin-input" placeholder="••••••••" />
                      </div>
                      <div className="editor-meta-group">
                        <label>Confirmer le nouveau mot de passe</label>
                        <input type="password" className="admin-input" placeholder="••••••••" />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'site' && (
                  <div>
                    <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', marginTop: 0 }}>Paramètres Globaux du Site</h2>
                    
                    <div className="editor-meta-group" style={{ marginBottom: '24px' }}>
                      <label>Nom du Site</label>
                      <input type="text" className="admin-input" defaultValue="Groupement Sanitaire Territorial de la Région Souss-Massa" />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                      <div className="editor-meta-group">
                        <label>Numéro SAMU</label>
                        <input type="text" className="admin-input" defaultValue="141" />
                      </div>
                      <div className="editor-meta-group">
                        <label>E-mail de Contact Public</label>
                        <input type="email" className="admin-input" defaultValue="contact@gst-soussmassa.ma" />
                      </div>
                    </div>

                    <div className="editor-meta-group" style={{ marginBottom: '24px' }}>
                      <label>Adresse Principale</label>
                      <textarea className="admin-input" style={{ minHeight: '80px', resize: 'vertical' }} defaultValue="Boulevard Hassan II, Agadir, Maroc" />
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px', backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: '8px' }}>
                      <input type="checkbox" id="maintenance" style={{ width: '18px', height: '18px' }} />
                      <label htmlFor="maintenance" style={{ fontSize: '14px', fontWeight: '600', color: '#B45309', cursor: 'pointer' }}>Activer le mode maintenance (Site hors ligne)</label>
                    </div>
                  </div>
                )}

                <div style={{ marginTop: '40px', paddingTop: '24px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                    {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
