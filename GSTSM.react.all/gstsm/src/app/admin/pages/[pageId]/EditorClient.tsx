'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <div style={{ padding: '20px', textAlign: 'center' }}>Chargement de l'éditeur...</div>
});

export default function EditorClient({ initialData, isNew }: { initialData: any, isNew: boolean }) {
    const router = useRouter();
    const [formData, setFormData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const response = await fetch('/api/admin/posts', {
                method: isNew ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Sauvegardé avec succès !');
                router.push('/admin/pages');
            } else {
                alert('Erreur lors de la sauvegarde.');
            }
        } catch (e) {
            alert('Erreur de connexion.');
        } finally {
            setIsSaving(false);
        }
    };

    const modules = {
        toolbar: [
            [{ 'header': [2, 3, 4, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 className="admin-heading">{isNew ? 'Nouvelle Page / Article' : 'Éditer'}</h1>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => router.push('/admin/pages')}
                        className="admin-btn admin-btn-secondary"
                    >
                        Annuler
                    </button>
                    <button 
                        onClick={handleSave}
                        disabled={isSaving}
                        className="admin-btn admin-btn-primary"
                    >
                        {isSaving ? 'Sauvegarde...' : (isNew ? 'Publier' : 'Mettre à jour')}
                    </button>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
                {/* Main Editor Area */}
                <div>
                    <input 
                        type="text" 
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        placeholder="Ajouter un titre"
                        style={{ width: '100%', fontSize: '2em', fontWeight: 'bold', border: 'none', outline: 'none', marginBottom: '20px', padding: '10px 0', borderBottom: '1px solid #e2e8f0', background: 'transparent' }}
                    />
                    
                    <div className="admin-card" style={{ padding: '0', overflow: 'hidden' }}>
                        <ReactQuill 
                            theme="snow"
                            value={formData.content}
                            onChange={(content) => setFormData({...formData, content})}
                            modules={modules}
                            style={{ height: '400px', border: 'none' }}
                            className="quill-editor-custom"
                        />
                        {/* Custom CSS for Quill inside the component */}
                        <style jsx global>{`
                            .quill-editor-custom .ql-toolbar {
                                border: none;
                                border-bottom: 1px solid #e2e8f0;
                                background: #f8fafc;
                                padding: 12px;
                            }
                            .quill-editor-custom .ql-container {
                                border: none;
                                font-family: inherit;
                                font-size: 16px;
                            }
                            .quill-editor-custom .ql-editor {
                                padding: 20px;
                            }
                        `}</style>
                    </div>
                </div>

                {/* Sidebar (Meta boxes) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {isNew && (
                        <div className="admin-card">
                            <h3 style={{ marginTop: 0, fontSize: '16px', color: '#334155' }}>Identifiant (Slug)</h3>
                            <input 
                                type="text"
                                value={formData.id}
                                onChange={(e) => setFormData({...formData, id: e.target.value})}
                                placeholder="mon-super-article"
                                style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', boxSizing: 'border-box' }}
                            />
                        </div>
                    )}
                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, fontSize: '16px', color: '#334155' }}>Type de contenu</h3>
                        <select 
                            value={formData.type}
                            onChange={(e) => setFormData({...formData, type: e.target.value})}
                            style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px' }}
                        >
                            <option value="actualite">Actualité</option>
                            <option value="evenement">Événement</option>
                            <option value="page">Page Standard</option>
                        </select>
                    </div>

                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, fontSize: '16px', color: '#334155' }}>Surtitre (Kicker)</h3>
                        <input 
                            type="text"
                            value={formData.kicker}
                            onChange={(e) => setFormData({...formData, kicker: e.target.value})}
                            placeholder="Ex: Événement · Actualité régionale"
                            style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', boxSizing: 'border-box' }}
                        />
                    </div>

                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, fontSize: '16px', color: '#334155' }}>Extrait</h3>
                        <textarea 
                            value={formData.excerpt}
                            onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                            placeholder="Court résumé de l'article"
                            style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', boxSizing: 'border-box', minHeight: '80px', resize: 'vertical' }}
                        ></textarea>
                    </div>

                    <div className="admin-card">
                        <h3 style={{ marginTop: 0, fontSize: '16px', color: '#334155' }}>Image mise en avant</h3>
                        <input 
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({...formData, image: e.target.value})}
                            placeholder="nom-image.png"
                            style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '4px', boxSizing: 'border-box' }}
                        />
                        {formData.image && (
                            <div style={{ marginTop: '10px', width: '100%', height: '120px', backgroundImage: `url(/${formData.image})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '4px' }}></div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
