import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../admin.css';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('gstsm@gmail.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('gstsm@gmail.com');
  const [resetSent, setResetSent] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Default admin validation
    if (email.trim().toLowerCase() === 'gstsm@gmail.com' && password === 'Admin2026$') {
      localStorage.setItem('gst_admin_authenticated', 'true');
      localStorage.setItem('gst_admin_email', email);
      navigate('/admin');
    } else {
      setError('Identifiants incorrects. Veuillez vérifier l\'adresse e-mail et le mot de passe.');
    }
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSent(true);
    setTimeout(() => {
      setResetSent(false);
      setShowForgotModal(false);
      alert(`Un code de réinitialisation sécurisé a été envoyé à ${resetEmail}.`);
    }, 2000);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8FAFC', padding: '20px' }}>
      <div style={{ width: '100%', maxWidth: '420px', backgroundColor: '#FFFFFF', borderRadius: '20px', border: '1px solid #E2E8F0', padding: '40px 36px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ width: '54px', height: '54px', borderRadius: '16px', background: 'linear-gradient(135deg, #2563EB, #7C3AED)', color: '#FFFFFF', fontSize: '24px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', boxShadow: '0 8px 18px rgba(37,99,235,0.3)' }}>
            G
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0', letterSpacing: '-0.02em' }}>
            GST Souss-Massa
          </h2>
          <p style={{ margin: 0, fontSize: '13px', color: '#64748B' }}>
            Portail d'Administration Centralisé
          </p>
        </div>

        {error && (
          <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', padding: '12px 14px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', fontWeight: '500' }}>
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', marginBottom: '8px' }}>
              Adresse E-mail Administrateur
            </label>
            <input 
              type="email" 
              className="admin-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="gstsm@gmail.com"
              style={{ width: '100%', padding: '12px', fontSize: '14px' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#64748B' }}>
                Mot de passe
              </label>
              <button 
                type="button" 
                onClick={() => setShowForgotModal(true)}
                style={{ background: 'none', border: 'none', color: '#2563EB', fontSize: '12px', fontWeight: '600', cursor: 'pointer', padding: 0 }}
              >
                Mot de passe oublié ?
              </button>
            </div>
            <input 
              type="password" 
              className="admin-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px', fontSize: '14px' }}
            />
          </div>

          <button 
            type="submit" 
            className="admin-btn admin-btn-primary" 
            style={{ width: '100%', padding: '12px', fontSize: '14px', borderRadius: '100px', fontWeight: '700', marginTop: '10px' }}
          >
            Se connecter au Dashboard
          </button>
        </form>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '20px' }}>
          <div style={{ width: '100%', maxWidth: '400px', backgroundColor: '#FFFFFF', borderRadius: '16px', padding: '32px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>
              Réinitialisation du mot de passe
            </h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748B', lineHeight: '1.5' }}>
              Saisissez votre e-mail d'administration. Vous recevrez un code de vérification pour créer un nouveau mot de passe.
            </p>

            <form onSubmit={handleResetPassword}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#64748B', marginBottom: '8px' }}>
                  E-mail de récupération
                </label>
                <input 
                  type="email" 
                  className="admin-input" 
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button 
                  type="button" 
                  className="admin-btn admin-btn-secondary" 
                  onClick={() => setShowForgotModal(false)}
                >
                  Annuler
                </button>
                <button 
                  type="submit" 
                  className="admin-btn admin-btn-primary" 
                  disabled={resetSent}
                >
                  {resetSent ? 'Envoi du code...' : 'Envoyer le Code'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
