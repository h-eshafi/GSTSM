'use client';
import { useState } from 'react';

export default function SmtpSettings() {
  const [smtp, setSmtp] = useState({
    host: 'smtp.gmail.com',
    port: '587',
    username: 'contact@gst-souss-massa.ma',
    password: '',
    senderEmail: 'noreply@gst-souss-massa.ma',
    senderName: 'GST Souss-Massa'
  });

  const handleSave = () => {
    // API call to save settings
    alert('Paramètres SMTP enregistrés avec succès.');
  };

  return (
    <div>
      <h1 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '2rem' }}>
        Paramètres du Site (SMTP & Réseaux Sociaux)
      </h1>
      
      <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', maxWidth: '800px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1.5rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem' }}>
          Configuration Email (SMTP)
        </h2>
        <p style={{ color: '#64748b', marginBottom: '2rem', fontSize: '0.95rem' }}>
          Ces paramètres sont utilisés pour envoyer les notifications système et les confirmations via les formulaires de contact.
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Serveur SMTP (Host)</label>
            <input 
              type="text" 
              value={smtp.host}
              onChange={(e) => setSmtp({ ...smtp, host: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Port</label>
            <input 
              type="text" 
              value={smtp.port}
              onChange={(e) => setSmtp({ ...smtp, port: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Nom d'utilisateur</label>
            <input 
              type="text" 
              value={smtp.username}
              onChange={(e) => setSmtp({ ...smtp, username: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Mot de passe / App Password</label>
            <input 
              type="password" 
              value={smtp.password}
              onChange={(e) => setSmtp({ ...smtp, password: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Email de l'expéditeur</label>
            <input 
              type="email" 
              value={smtp.senderEmail}
              onChange={(e) => setSmtp({ ...smtp, senderEmail: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', color: '#334155' }}>Nom de l'expéditeur</label>
            <input 
              type="text" 
              value={smtp.senderName}
              onChange={(e) => setSmtp({ ...smtp, senderName: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button style={{ background: '#f1f5f9', color: '#334155', padding: '0.75rem 1.5rem', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Tester la connexion
          </button>
          <button onClick={handleSave} style={{ background: 'var(--blue)', color: 'white', padding: '0.75rem 2rem', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Enregistrer les paramètres
          </button>
        </div>
      </div>
    </div>
  );
}
