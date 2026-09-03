export default function AdminDashboard() {
  return (
    <div>
      <h1 className="admin-heading">
        Tableau de bord
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <h3 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Actualités</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>12</p>
        </div>
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <h3 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Total Événements</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>4</p>
        </div>
        <div className="admin-card" style={{ marginBottom: 0 }}>
          <h3 style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Offres d'emploi actives</h3>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#0f172a' }}>2</p>
        </div>
      </div>

      <div className="admin-card">
        <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#0f172a', marginBottom: '1rem' }}>Bienvenue sur le panneau d'administration</h2>
        <p style={{ color: '#475569', lineHeight: 1.6 }}>
          Ce tableau de bord vous permet de gérer l'ensemble des contenus dynamiques du site internet du 
          Groupement Sanitaire Territorial de la Région Souss-Massa. Utilisez le menu de navigation à gauche 
          pour accéder aux différentes sections (Actualités, Événements, Paramètres, etc.).
        </p>
      </div>
    </div>
  );
}
