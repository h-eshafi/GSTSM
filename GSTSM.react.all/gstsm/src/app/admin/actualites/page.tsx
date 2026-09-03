'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function AdminActualites() {
  const [actualites, setActualites] = useState([]);

  useEffect(() => {
    fetch('/api/actualites')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setActualites(data);
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 className="admin-heading" style={{ marginBottom: 0 }}>
          Gérer les Actualités
        </h1>
        <Link href="/admin/actualites/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
          + Ajouter une actualité
        </Link>
      </div>
      
      <div className="admin-card" style={{ padding: 0 }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Titre</th>
              <th>Catégorie</th>
              <th>Date de création</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {actualites.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>Aucune actualité trouvée.</td>
              </tr>
            ) : (
              actualites.map((act: any) => (
                <tr key={act.id}>
                  <td style={{ fontWeight: 'bold', color: '#0f172a' }}>{act.title}</td>
                  <td>{act.category}</td>
                  <td>{new Date(act.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span style={{ 
                      backgroundColor: act.status === 'PUBLISHED' ? '#dcfce7' : '#fef3c7', 
                      color: act.status === 'PUBLISHED' ? '#166534' : '#92400e',
                      padding: '0.25rem 0.75rem', 
                      borderRadius: '16px', 
                      fontSize: '0.85rem',
                      fontWeight: 'bold'
                    }}>
                      {act.status}
                    </span>
                  </td>
                  <td>
                    <button style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', marginRight: '1rem', fontWeight: 'bold' }}>Modifier</button>
                    <button style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>Supprimer</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
