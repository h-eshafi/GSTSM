import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../admin.css';

export interface SocialLinks {
  facebook: string;
  instagram: string;
  linkedin: string;
  youtube: string;
}

export function getSocialLinks(): SocialLinks {
  const defaults: SocialLinks = {
    facebook: 'https://facebook.com/gst-soussmassa',
    instagram: 'https://instagram.com/gst-soussmassa',
    linkedin: 'https://linkedin.com/company/gst-soussmassa',
    youtube: 'https://youtube.com/@gst-soussmassa'
  };
  try {
    const saved = localStorage.getItem('gst_social_links');
    if (saved) return { ...defaults, ...JSON.parse(saved) };
  } catch (e) {
    console.error(e);
  }
  return defaults;
}

export default function AdminSettings() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'site'>('profile');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [profile, setProfile] = useState({
    name: 'Administrateur Principal',
    email: 'gstsm@gmail.com',
    role: 'Super Admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+GST&background=2563EB&color=fff&size=128'
  });

  const [smtp, setSmtp] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    user: 'gstsm@gmail.com',
    password: '',
    encryption: 'TLS'
  });

  const [social, setSocial] = useState<SocialLinks>(getSocialLinks());

  useEffect(() => {
    setSocial(getSocialLinks());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    localStorage.setItem('gst_social_links', JSON.stringify(social));
    localStorage.setItem('gst_admin_email', profile.email);
    window.dispatchEvent(new Event('gst_social_updated'));

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 600);
  };

  const handleLogout = () => {
    localStorage.removeItem('gst_admin_authenticated');
    navigate('/admin/login');
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
          <button type="button" className="admin-btn admin-btn-danger" onClick={handleLogout} style={{ padding: '6px 14px', fontSize: '12px' }}>
            Déconnexion 🚪
          </button>
          <div className="admin-avatar-btn" title="Profil Administrateur">AD</div>
        </div>
      </header>

      <main className="admin-content">
        <div className="pages-header-section" style={{ marginBottom: '24px' }}>
          <div className="pages-header-title">
            <h1>Paramètres & Profil</h1>
            <p>Gérez vos identifiants administrateur, vos serveurs SMTP et les liens de réseaux sociaux du footer.</p>
          </div>

          <div className="pages-filter-actions">
            <button type="button" className="admin-btn admin-btn-danger" onClick={handleLogout}>
              Déconnexion 🚪
            </button>
          </div>
        </div>

        <div className="admin-card" style={{ display: 'flex', minHeight: '560px' }}>
          
          {/* Settings Sidebar */}
          <div style={{ width: '240px', borderRight: '1px solid var(--admin-border)', padding: '24px 16px', backgroundColor: '#FAFAF9' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <button 
                type="button"
                className={`admin-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                <span>👤</span>
                <span>Profil & Réseaux</span>
              </button>
              <button 
                type="button"
                className={`admin-nav-item ${activeTab === 'security' ? 'active' : ''}`}
                onClick={() => setActiveTab('security')}
              >
                <span>🔒</span>
                <span>Sécurité & SMTP</span>
              </button>
              <button 
                type="button"
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
                  <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: 0 }}>Profil Administrateur & Réseaux Sociaux</h2>
                  
                  <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '28px' }}>
                    <img src={profile.avatar} alt="Avatar" style={{ width: '72px', height: '72px', borderRadius: '50%', border: '2px solid #E2E8F0' }} />
                    <div>
                      <button type="button" className="admin-btn admin-btn-secondary" style={{ marginBottom: '6px' }}>Changer la photo</button>
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748B' }}>Formats JPG, GIF ou PNG. Taille max 1MB.</p>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                    <div className="editor-meta-group">
                      <label>Nom Complet</label>
                      <input type="text" className="admin-input" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
                    </div>
                    <div className="editor-meta-group">
                      <label>Rôle</label>
                      <input type="text" className="admin-input" value={profile.role} disabled style={{ backgroundColor: '#F1F5F9' }} />
                    </div>
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px', color: '#0F172A' }}>
                    🌐 Liens des Réseaux Sociaux (Pied de Page / Footer)
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div className="editor-meta-group">
                      <label>Facebook URL</label>
                      <input type="text" className="admin-input" value={social.facebook} onChange={(e) => setSocial({...social, facebook: e.target.value})} placeholder="https://facebook.com/..." />
                    </div>
                    <div className="editor-meta-group">
                      <label>Instagram URL</label>
                      <input type="text" className="admin-input" value={social.instagram} onChange={(e) => setSocial({...social, instagram: e.target.value})} placeholder="https://instagram.com/..." />
                    </div>
                    <div className="editor-meta-group">
                      <label>LinkedIn URL</label>
                      <input type="text" className="admin-input" value={social.linkedin} onChange={(e) => setSocial({...social, linkedin: e.target.value})} placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="editor-meta-group">
                      <label>YouTube URL</label>
                      <input type="text" className="admin-input" value={social.youtube} onChange={(e) => setSocial({...social, youtube: e.target.value})} placeholder="https://youtube.com/@..." />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: 0 }}>Sécurité & Serveur SMTP</h2>
                  
                  <div className="editor-meta-group" style={{ marginBottom: '24px' }}>
                    <label>Adresse E-mail de connexion Administrateur</label>
                    <input type="email" className="admin-input" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
                  </div>

                  <h3 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '16px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
                    📧 Configuration Serveur E-mail SMTP (Envoi de Codes)
                  </h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px', marginBottom: '16px' }}>
                    <div className="editor-meta-group">
                      <label>Serveur SMTP (Host)</label>
                      <input type="text" className="admin-input" value={smtp.host} onChange={(e) => setSmtp({...smtp, host: e.target.value})} placeholder="smtp.gmail.com" />
                    </div>
                    <div className="editor-meta-group">
                      <label>Port SMTP</label>
                      <input type="text" className="admin-input" value={smtp.port} onChange={(e) => setSmtp({...smtp, port: e.target.value})} placeholder="587" />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px' }}>
                    <div className="editor-meta-group">
                      <label>Utilisateur SMTP / E-mail</label>
                      <input type="text" className="admin-input" value={smtp.user} onChange={(e) => setSmtp({...smtp, user: e.target.value})} placeholder="admin@gmail.com" />
                    </div>
                    <div className="editor-meta-group">
                      <label>Mot de passe SMTP / App Key</label>
                      <input type="password" className="admin-input" value={smtp.password} onChange={(e) => setSmtp({...smtp, password: e.target.value})} placeholder="••••••••••••" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'site' && (
                <div>
                  <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px', marginTop: 0 }}>Paramètres Globaux du Site</h2>
                  
                  <div className="editor-meta-group" style={{ marginBottom: '20px' }}>
                    <label>Nom du Portail</label>
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
