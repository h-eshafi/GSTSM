import { useState } from 'react';
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
    avatar: 'https://ui-avatars.com/api/?name=Admin+GST&background=2563EB&color=fff&size=128'
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
    <div className="admin-main-container">
      {/* Topbar Header */}
      <header className="admin-topbar">
        <div className="admin-search-wrapper">
          <span className="admin-search-icon">🔍</span>
          <input 
            type="text" 
            className="admin-topbar-search" 
            placeholder="Paramètres système & profil..." 
            disabled
          />
        </div>

        <div className="admin-topbar-actions">
          <button className="admin-icon-btn" title="Mode Sombre">🌙</button>
          <button className="admin-icon-btn" title="Notifications">🔔</button>
          <div className="admin-avatar-btn" title="Profil Administrateur">AD</div>
        </div>
      </header>

      <main className="admin-content">
        <div className="pages-header-section" style={{ marginBottom: '24px' }}>
          <div className="pages-header-title">
            <h1>Paramètres & Profil</h1>
            <p>Gérez vos identifiants administrateur, votre mot de passe et les paramètres globaux du site.</p>
          </div>
        </div>

        <div className="admin-card" style={{ display: 'flex', minHeight: '560px' }}>
          
          {/* Settings Sidebar */}
          <div style={{ width: '240px', borderRight: '1px solid var(--admin-border)', padding: '24px 16px', backgroundColor: '#FAFAF9' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span>👤</span>
                <span>Profil Public</span>
              </button>
              <button 
                className={`admin-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <span>🔒</span>
                <span>Sécurité & Connexion</span>
              </button>
              <button 
                className={`admin-nav-item ${activeTab === 'site' ? 'active' : ''}`}
                onClick={() => setActiveTab('site')}
              >
                <span>🌍</span>
                <span>Paramètres du Site</span>
              </button>
            </div>
          </div>

          {/* Settings Form */}
          <div style={{ flex: 1, padding: '36px 40px' }}>
            {saved && (
              <div style={{ background: '#D1FAE5', color: '#065F46', padding: '14px 18px', borderRadius: '10px', marginBottom: '24px', fontWeight: '600', border: '1px solid #A7F3D0', fontSize: '13px' }}>
                ✅ Vos paramètres ont été enregistrés avec succès.
              </div>
            )}

            <form onSubmit={handleSave}>
              {activeTab === 'profile' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: 0 }}>Profil Administrateur</h2>
                  
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '28px' }}>
                    <img src={profile.avatar} alt="Avatar" style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #E2E8F0' }} />
                    <div>
                      <button type="button" className="admin-btn admin-btn-secondary" style={{ marginBottom: '6px' }}>Changer la photo</button>
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Formats JPG, GIF ou PNG. Taille max 1MB.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
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
                  <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: 0 }}>Sécurité & Connexion</h2>
                  
                  <div className="editor-meta-group" style={{ marginBottom: '20px' }}>
                    <label>Adresse E-mail de connexion</label>
                    <input type="email" className="admin-input" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', marginTop: '28px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Changer le mot de passe</h3>
                  
                  <div className="editor-meta-group" style={{ marginBottom: '16px' }}>
                    <label>Mot de passe actuel</label>
                    <input type="password" className="admin-input" placeholder="••••••••" />
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
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
                  <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: 0 }}>Paramètres Globaux du Site</h2>
                  
                  <div className="editor-meta-group" style={{ marginBottom: '20px' }}>
                    <label>Nom du Portal</label>
                    <input type="text" className="admin-input" defaultValue="Groupement Sanitaire Territorial de la Région Souss-Massa" />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className="editor-meta-group">
                      <label>Numéro d'Urgence SAMU</label>
                      <input type="text" className="admin-input" defaultValue="141" />
                    </div>
                    <div className="editor-meta-group">
                      <label>E-mail de Contact Public</label>
                      <input type="email" className="admin-input" defaultValue="contact@gst-soussmassa.ma" />
                    </div>
                  </div>

                  <div className="editor-meta-group" style={{ marginBottom: '20px' }}>
                    <label>Adresse du Siège Régional</label>
                    <textarea className="admin-input" style={{ minHeight: '70px', resize: 'vertical' }} defaultValue="Boulevard Hassan II, Agadir, Maroc" />
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', backgroundColor: '#FFFBEB', border: '1px solid #FEF3C7', borderRadius: '8px' }}>
                    <input type="checkbox" id="maintenance" style={{ width: '16px', height: '16px' }} />
                    <label htmlFor="maintenance" style={{ fontSize: '13px', fontWeight: '600', color: '#B45309', cursor: 'pointer' }}>Activer le mode maintenance (Site hors ligne)</label>
                  </div>
                </div>
              )}

              <div style={{ marginTop: '36px', paddingTop: '20px', borderTop: '1px solid #E2E8F0', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Enregistrement...' : 'Enregistrer les modifications'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
