import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import WysiwygEditor from '../../components/WysiwygEditor';
import { supabase } from '../../lib/supabase';
import '../../admin.css';

export default function AdminEditor() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = !id;

  const [formData, setFormData] = useState({
    id: '',
    type: 'page',
    title: '',
    kicker: '',
    excerpt: '',
    image: '',
    content: ''
  });
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [isHtmlMode, setIsHtmlMode] = useState(false);

  // Removed forced HTML mode to default to TinyMCE visual editor

  useEffect(() => {
    if (!isNew && id) {
      async function fetchPost() {
        const { data, error } = await supabase.from('posts').select('*').eq('id', id).single();
        if (data) setFormData(data);
        if (error) setError('Échec du chargement du contenu');
        setLoading(false);
      }
      fetchPost();
    }
  }, [id, isNew]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (content: string) => {
    setFormData({ ...formData, content });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({ ...formData, content: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    if (!formData.id || !formData.title) {
      setError('L\'identifiant URL (Slug) et le titre sont requis.');
      setSaving(false);
      return;
    }

    const { error: upsertError } = await supabase.from('posts').upsert({
      id: formData.id,
      type: formData.type,
      title: formData.title,
      kicker: formData.kicker || null,
      excerpt: formData.excerpt || null,
      image: formData.image || null,
      content: formData.content || null,
      ...(isNew && { createdAt: new Date().toISOString() })
    });

    setSaving(false);
    if (upsertError) {
      setError(upsertError.message);
    } else {
      navigate('/admin');
    }
  };

  if (loading) return <div style={{ padding: '50px', textAlign: 'center' }}>Chargement de l'éditeur...</div>;

  return (
    <div className="editor-layout">
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
            ← Retour au Tableau de Bord
          </Link>
          <div className="admin-nav-divider"></div>
          <Link to="/" className="admin-nav-item" style={{ marginTop: 'auto' }}>
            🌐 Voir le Site Public
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="editor-main">
        {error && (
          <div style={{ background: '#FEF2F2', color: '#DC2626', padding: '16px', borderRadius: '12px', marginBottom: '24px', fontWeight: '500', border: '1px solid #FECACA' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSave} className="editor-panel">
          <div className="editor-meta-grid">
            <div className="editor-meta-group">
              <label>Slug (URL ID)</label>
              <input 
                type="text" 
                name="id" 
                value={formData.id} 
                onChange={handleChange} 
                disabled={!isNew}
                required 
                placeholder="ex: qui-sommes-nous"
              />
            </div>
            <div className="editor-meta-group">
              <label>Type de Contenu</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="page">Page Principale</option>
                <option value="actualite">Actualité / Communiqué</option>
                <option value="evenement">Événement Agenda</option>
              </select>
            </div>
            <div className="editor-meta-group">
              <label>Sur-titre (Catégorie)</label>
              <input 
                type="text" 
                name="kicker" 
                value={formData.kicker || ''} 
                onChange={handleChange} 
                placeholder="ex: Le GST Souss-Massa"
              />
            </div>
            <div className="editor-meta-group">
              <label>Image de couverture (URL)</label>
              <input 
                type="text" 
                name="image" 
                value={formData.image || ''} 
                onChange={handleChange} 
                placeholder="ex: /hospital.png"
              />
            </div>
          </div>

          <div style={{ padding: '32px' }}>
            <input 
              type="text" 
              name="title" 
              className="editor-title-input" 
              value={formData.title} 
              onChange={handleChange} 
              required 
              placeholder="Saisissez le titre de la page..."
            />

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#64748b', marginBottom: '8px' }}>Résumé (Excerpt)</label>
              <textarea 
                name="excerpt" 
                style={{ width: '100%', minHeight: '80px', padding: '12px', border: '1px solid #E2E8F0', borderRadius: '8px', fontSize: '14px', boxSizing: 'border-box' }}
                value={formData.excerpt || ''} 
                onChange={handleChange} 
                placeholder="Brève description pour les listes..."
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>Contenu Principal</label>
                {formData.type === 'page' && (
                  <button 
                    type="button" 
                    className="admin-btn admin-btn-secondary" 
                    onClick={() => setIsHtmlMode(!isHtmlMode)}
                    style={{ padding: '6px 12px', fontSize: '12px' }}
                  >
                    {isHtmlMode ? 'Passer à l\'Éditeur Visuel (TinyMCE)' : 'Passer à l\'Éditeur Code (HTML)'}
                  </button>
                )}
              </div>
              
              {isHtmlMode ? (
                <textarea 
                  value={formData.content || ''} 
                  onChange={handleTextareaChange}
                  style={{ width: '100%', height: '500px', padding: '16px', fontFamily: 'monospace', fontSize: '13px', border: '1px solid #E2E8F0', borderRadius: '8px', backgroundColor: '#1E293B', color: '#F8FAFC', boxSizing: 'border-box' }}
                  placeholder="<h2>Votre code HTML ici...</h2>"
                />
              ) : (
                <div style={{ border: '1px solid #E2E8F0', borderRadius: '8px', overflow: 'hidden' }}>
                  <WysiwygEditor 
                    id={`editor-${id || 'new'}`}
                    value={formData.content || ''} 
                    onChange={handleContentChange} 
                  />
                </div>
              )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px', paddingTop: '24px', borderTop: '1px solid #E2E8F0' }}>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin')}>
                Annuler
              </button>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Enregistrement...' : 'Enregistrer le Contenu'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
