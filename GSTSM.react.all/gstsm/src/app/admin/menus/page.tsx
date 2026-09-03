'use client';

import { useState, useEffect } from 'react';

export default function AdminMenuEditor() {
    const [menus, setMenus] = useState<any>(null);
    const [activeMenuKey, setActiveMenuKey] = useState<string>('gst');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch('/api/admin/menus')
            .then(res => res.json())
            .then(data => setMenus(data));
    }, []);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch('/api/admin/menus', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(menus)
            });
            if (res.ok) alert('Menus mis à jour avec succès !');
            else alert('Erreur lors de la sauvegarde.');
        } catch(e) {
            alert('Erreur de connexion.');
        } finally {
            setIsSaving(false);
        }
    };

    if (!menus) return <div style={{ padding: '40px' }}>Chargement...</div>;

    const activeMenu = menus[activeMenuKey];

    const menuNames: Record<string, string> = {
        'gst': 'Le GST Souss-Massa',
        'patients': 'Patients et proches',
        'offre': 'Offre de soins',
        'sante': 'Santé publique',
        'espace': 'Espace professionnel',
        'actu': 'Actualités et médias'
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 className="admin-heading" style={{ marginBottom: 0 }}>Gestion des Menus</h1>
                <button 
                    onClick={handleSave}
                    disabled={isSaving}
                    className="admin-btn admin-btn-primary"
                >
                    {isSaving ? 'Sauvegarde...' : 'Enregistrer les menus'}
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '30px' }}>
                {/* Menu Selection Sidebar */}
                <div className="admin-card" style={{ padding: 0, overflow: 'hidden', alignSelf: 'start' }}>
                    <div style={{ background: '#f8fafc', padding: '15px', borderBottom: '1px solid #cbd5e1', fontWeight: 'bold' }}>
                        Sélectionner un menu
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        {Object.keys(menuNames).map(key => (
                            <button
                                key={key}
                                onClick={() => setActiveMenuKey(key)}
                                style={{ 
                                    padding: '15px', 
                                    textAlign: 'left', 
                                    background: activeMenuKey === key ? '#eff6ff' : 'white',
                                    color: activeMenuKey === key ? '#1d4ed8' : '#334155',
                                    border: 'none',
                                    borderBottom: '1px solid #f1f5f9',
                                    cursor: 'pointer',
                                    fontWeight: activeMenuKey === key ? 'bold' : 'normal'
                                }}
                            >
                                {menuNames[key]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Editor Area */}
                <div className="admin-card">
                    <h2 style={{ marginTop: 0, marginBottom: '20px', color: '#0f172a' }}>Structure de : {menuNames[activeMenuKey]}</h2>
                    
                    {activeMenu.columns && activeMenu.columns.map((col: any, colIdx: number) => (
                        <div key={colIdx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
                                <input 
                                    type="text" 
                                    value={col.title}
                                    onChange={(e) => {
                                        const newMenus = {...menus};
                                        newMenus[activeMenuKey].columns[colIdx].title = e.target.value;
                                        setMenus(newMenus);
                                    }}
                                    style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: 'bold' }}
                                />
                            </div>
                            
                            <div style={{ paddingLeft: '20px' }}>
                                {col.links.map((link: any, linkIdx: number) => (
                                    <div key={linkIdx} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'center' }}>
                                        <span style={{ color: '#94a3b8' }}>↳</span>
                                        <input 
                                            type="text" 
                                            value={link.label}
                                            onChange={(e) => {
                                                const newMenus = {...menus};
                                                newMenus[activeMenuKey].columns[colIdx].links[linkIdx].label = e.target.value;
                                                setMenus(newMenus);
                                            }}
                                            style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                                        />
                                        <input 
                                            type="text" 
                                            value={link.href}
                                            onChange={(e) => {
                                                const newMenus = {...menus};
                                                newMenus[activeMenuKey].columns[colIdx].links[linkIdx].href = e.target.value;
                                                setMenus(newMenus);
                                            }}
                                            style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'monospace', color: '#64748b' }}
                                        />
                                        <button onClick={() => {
                                            const newMenus = {...menus};
                                            newMenus[activeMenuKey].columns[colIdx].links.splice(linkIdx, 1);
                                            setMenus(newMenus);
                                        }} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '8px 12px', borderRadius: '4px', cursor: 'pointer' }}>X</button>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newMenus = {...menus};
                                    newMenus[activeMenuKey].columns[colIdx].links.push({ label: 'Nouveau lien', href: '#' });
                                    setMenus(newMenus);
                                }} style={{ marginTop: '10px', background: 'white', color: '#3b82f6', border: '1px dashed #93c5fd', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>
                                    + Ajouter un lien
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    {/* Basic representation of preview groups for Public Health menu */}
                    {activeMenu.previewGroups && activeMenu.previewGroups.map((group: any, idx: number) => (
                         <div key={idx} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '20px' }}>
                             <input 
                                 type="text" 
                                 value={group.title}
                                 onChange={(e) => {
                                     const newMenus = {...menus};
                                     newMenus[activeMenuKey].previewGroups[idx].title = e.target.value;
                                     setMenus(newMenus);
                                 }}
                                 style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: 'bold', marginBottom: '10px' }}
                             />
                             <textarea 
                                 value={group.desc}
                                 onChange={(e) => {
                                     const newMenus = {...menus};
                                     newMenus[activeMenuKey].previewGroups[idx].desc = e.target.value;
                                     setMenus(newMenus);
                                 }}
                                 style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '10px', boxSizing: 'border-box' }}
                             />
                              <input 
                                 type="text" 
                                 value={group.href}
                                 onChange={(e) => {
                                     const newMenus = {...menus};
                                     newMenus[activeMenuKey].previewGroups[idx].href = e.target.value;
                                     setMenus(newMenus);
                                 }}
                                 style={{ width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontFamily: 'monospace', color: '#64748b', boxSizing: 'border-box' }}
                             />
                         </div>
                    ))}

                    <div style={{ marginTop: '30px', padding: '20px', borderTop: '2px solid #e2e8f0' }}>
                        <h3 style={{ marginTop: 0 }}>Image mise en avant du menu</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                             <input 
                                type="text" 
                                value={activeMenu.art?.title || ''}
                                onChange={(e) => {
                                    const newMenus = {...menus};
                                    if(!newMenus[activeMenuKey].art) newMenus[activeMenuKey].art = {};
                                    newMenus[activeMenuKey].art.title = e.target.value;
                                    setMenus(newMenus);
                                }}
                                placeholder="Titre de l'image"
                                style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                            />
                            <input 
                                type="text" 
                                value={activeMenu.art?.img || ''}
                                onChange={(e) => {
                                    const newMenus = {...menus};
                                    if(!newMenus[activeMenuKey].art) newMenus[activeMenuKey].art = {};
                                    newMenus[activeMenuKey].art.img = e.target.value;
                                    setMenus(newMenus);
                                }}
                                placeholder="nom-image.png"
                                style={{ flex: 1, padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
