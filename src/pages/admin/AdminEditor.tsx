import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
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

  useEffect(() => {
    if (formData.type === 'page' && !isNew) {
      setIsHtmlMode(true);
    }
  }, [formData.type, isNew]);

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
            ← Tableau de Bord
          </Link>
          <div className="admin-nav-divider"></div>
          <Link to="/" className="admin-nav-item" style={{ marginTop: 'auto' }}>
            🌐 Voir le Site Public
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="admin-main-container">
        <header className="admin-topbar">
          <h1 className="admin-topbar-title">{isNew ? '✍️ Nouveau Contenu' : `✏️ Édition: ${formData.title}`}</h1>
          <button className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin')}>
            ← Annuler et Retourner
          </button>
        </header>

        <main className="admin-content-area">
          {error && (
            <div style={{ background: '#fef2f2', color: '#dc2626', padding: '15px', borderRadius: '10px', marginBottom: '20px', fontWeight: '600' }}>
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSave} className="admin-card">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label className="admin-label">Slug (URL ID)</label>
                <input 
                  type="text" 
                  name="id" 
                  className="admin-input" 
                  value={formData.id} 
                  onChange={handleChange} 
                  disabled={!isNew}
                  required 
                  placeholder="ex: qui-sommes-nous"
                />
              </div>
              <div>
                <label className="admin-label">Type de Contenu</label>
                <select name="type" className="admin-input" value={formData.type} onChange={handleChange}>
                  <option value="page">Page Principale</option>
                  <option value="actualite">Actualité / Communiqué</option>
                  <option value="evenement">Événement Agenda</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="admin-label">Titre Principal</label>
              <input 
                type="text" 
                name="title" 
                className="admin-input" 
                style={{ fontSize: '18px', fontWeight: 'bold' }}
                value={formData.title} 
                onChange={handleChange} 
                required 
                placeholder="Saisissez le titre de la page..."
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div>
                <label className="admin-label">Sur-titre (Kicker / Catégorie)</label>
                <input 
                  type="text" 
                  name="kicker" 
                  className="admin-input" 
                  value={formData.kicker || ''} 
                  onChange={handleChange} 
                  placeholder="ex: Le GST Souss-Massa"
                />
              </div>
              <div>
                <label className="admin-label">Image de couverture (URL ou chemin)</label>
                <input 
                  type="text" 
                  name="image" 
                  className="admin-input" 
                  value={formData.image || ''} 
                  onChange={handleChange} 
                  placeholder="ex: /hospital.png ou https://..."
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label className="admin-label">Résumé (Excerpt)</label>
              <textarea 
                name="excerpt" 
                className="admin-input" 
                style={{ minHeight: '80px', resize: 'vertical' }}
                value={formData.excerpt || ''} 
                onChange={handleChange} 
                placeholder="Brève description..."
              />
            </div>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <label className="admin-label" style={{ marginBottom: 0 }}>Corps du Contenu HTML</label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', color: '#475569' }}>
                  <input 
                    type="checkbox" 
                    checked={isHtmlMode}
                    onChange={(e) => setIsHtmlMode(e.target.checked)}
                    style={{ width: '16px', height: '16px' }}
                  />
                  Mode Code HTML Avancé (Conserve la mise en page originale)
                </label>
              </div>
              
              <div style={{ background: 'white' }}>
                {isHtmlMode ? (
                  <textarea 
                    className="admin-input"
                    style={{ 
                      minHeight: '420px', 
                      fontFamily: 'monospace', 
                      fontSize: '13px', 
                      lineHeight: '1.5',
                      padding: '15px',
                      backgroundColor: '#1e293b',
                      color: '#e2e8f0',
                      resize: 'vertical'
                    }}
                    value={formData.content || ''}
                    onChange={handleTextareaChange}
                    placeholder="<!-- Collez ou éditez le code HTML ici -->"
                  />
                ) : (
                  <ReactQuill 
                    theme="snow" 
                    value={formData.content || ''} 
                    onChange={handleContentChange} 
                    style={{ height: '350px', marginBottom: '50px' }}
                    modules={{
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{'list': 'ordered'}, {'list': 'bullet'}],
                        ['link', 'image', 'video'],
                        ['clean']
                      ],
                    }}
                  />
                )}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
              <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                {saving ? 'Enregistrement...' : '💾 Publier / Enregistrer'}
              </button>
              <button type="button" className="admin-btn admin-btn-secondary" onClick={() => navigate('/admin')}>
                Annuler
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
