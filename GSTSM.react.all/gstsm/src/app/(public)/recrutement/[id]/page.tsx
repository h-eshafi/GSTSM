import Link from 'next/link';

export default async function RecrutementDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
  return (
    <main style={{ backgroundColor: '#f9f9f9', paddingBottom: '4rem' }}>
      {/* Hero Header matching screenshot */}
      <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--blue) 100%)', padding: '4rem 2rem', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
            Concours de recrutement: Médecin de premier grade
          </h1>
          <div style={{ display: 'flex', gap: '1rem', opacity: 0.9 }}>
            <span>Accueil</span> &gt; <span>Recrutement</span> &gt; <span>Médecin</span>
          </div>
        </div>
        <div style={{ background: 'white', padding: '1rem', borderRadius: '8px' }}>
          <img src="/gst-logo.png" alt="Logo" style={{ height: '80px' }} />
        </div>
      </section>

      {/* Main Content Layout */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginTop: '-2rem' }}>
        
        {/* Left Column (Main Info) */}
        <div style={{ background: 'white', borderRadius: '8px', padding: '2rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: 'var(--navy)', borderBottom: '2px solid var(--blue)', paddingBottom: '1rem', marginBottom: '2rem' }}>
            Informations sur le concours
          </h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', fontSize: '1.1rem' }}>
            <div>
              <small style={{ color: '#666', display: 'block' }}>Spécialité :</small>
              <b>Médecine Générale</b>
            </div>
            <div>
              <small style={{ color: '#666', display: 'block' }}>Grade :</small>
              <b>Médecin de premier grade</b>
            </div>
            <div>
              <small style={{ color: '#666', display: 'block' }}>Nombre de postes :</small>
              <b>10</b>
            </div>
            <div>
              <small style={{ color: '#666', display: 'block' }}>Type de recrutement :</small>
              <b>Statutaire</b>
            </div>
          </div>
        </div>

        {/* Right Column (Sidebar Details) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div style={{ background: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: 'var(--navy)', marginBottom: '1rem' }}>Détails de l'annonce</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.95rem' }}>
              <div>
                <small style={{ color: '#666', display: 'block' }}>Entité :</small>
                <b>DR Santé Souss-Massa</b>
              </div>
              <div>
                <small style={{ color: '#666', display: 'block' }}>Délai de candidature :</small>
                <b style={{ color: 'var(--teal)' }}>15 Septembre 2026 - 16:00</b>
              </div>
              <div>
                <small style={{ color: '#666', display: 'block' }}>Date d'examen :</small>
                <b>6 Octobre 2026</b>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--navy)', color: 'white', borderRadius: '8px', padding: '1.5rem', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '1rem' }}>Documents</h3>
            <button style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '4px', width: '100%', fontWeight: 'bold', cursor: 'pointer' }}>
              📄 Télécharger l'avis (PDF)
            </button>
          </div>
          
        </div>
      </section>
    </main>
  );
}
