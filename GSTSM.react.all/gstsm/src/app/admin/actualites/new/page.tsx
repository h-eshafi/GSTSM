'use client';
import { useState } from 'react';
import Link from 'next/link';
import WysiwygEditor from '@/components/WysiwygEditor';

export default function NewActualite() {
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Actualité régionale',
    content: '',
    status: 'DRAFT'
  });

  const handleSave = async () => {
    try {
      const res = await fetch('/api/actualites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if(res.ok) {
        alert('Actualité créée avec succès !');
        window.location.href = '/admin/actualites';
      } else {
        alert('Erreur lors de la création.');
      }
    } catch(e) {
      alert('Erreur réseau.');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <Link href="/admin/actualites" style={{ color: '#64748b', textDecoration: 'none', marginBottom: '0.5rem', display: 'inline-block' }}>
            ← Retour aux actualités
          </Link>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a' }}>
            Ajouter une Actualité
          </h1>
        </div>
        <button onClick={handleSave} style={{ background: 'var(--blue)', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Publier
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '2rem' }}>
        
        {/* Main Content Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <input 
              type="text" 
              placeholder="Saisissez le titre ici"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
              style={{ width: '100%', padding: '1rem', border: 'none', borderBottom: '2px solid #e2e8f0', fontSize: '1.5rem', outline: 'none', marginBottom: '1.5rem' }}
            />
            
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>
              Contenu de l'article (Éditeur Avancé)
            </label>
            <WysiwygEditor 
              id="actualite-content"
              value={formData.content}
              onChange={(val) => setFormData({ ...formData, content: val })}
            />
          </div>
        </div>

        {/* Sidebar Settings */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.5rem' }}>Paramètres</h3>
            
            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155' }}>Statut</label>
            <select 
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '1rem' }}
            >
              <option value="DRAFT">Brouillon</option>
              <option value="PUBLISHED">Publié</option>
            </select>

            <label style={{ display: 'block', marginBottom: '0.5rem', color: '#334155' }}>Catégorie</label>
            <select 
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '1rem' }}
            >
              <option value="Actualité régionale">Actualité régionale</option>
              <option value="Santé publique">Santé publique</option>
              <option value="Communiqué">Communiqué</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
