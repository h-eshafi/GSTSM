import Link from 'next/link';

export default function RecrutementList() {
  return (
    <main>
      <section className="hero-home" style={{ minHeight: '30vh', background: 'var(--navy)' }}>
        <div className="hero-copy" style={{ padding: '6rem 4rem' }}>
          <h1>Offres d'emploi</h1>
          <p>Rejoignez le Groupement Sanitaire Territorial de la Région Souss-Massa.</p>
        </div>
      </section>

      <section className="editorial-news" style={{ padding: '4rem' }}>
        <div className="news-heading">
          <div>
            <span className="section-kicker">Concours et recrutement</span>
            <h2>Dernières opportunités</h2>
          </div>
        </div>

        <div className="large-news" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
          {/* Card Mockup matching emploi-public.ma style but our colors */}
          <article style={{ border: '1px solid #eaeaea', borderRadius: '8px', padding: '1.5rem', backgroundColor: '#fff', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ color: 'var(--blue)', fontWeight: 'bold' }}>DR Santé Souss-Massa</span>
              <img src="/gst-logo.png" alt="Logo" style={{ height: '40px' }} />
            </div>
            
            <h3 style={{ color: 'var(--navy)', fontSize: '1.25rem', marginBottom: '1rem' }}>
              Concours de recrutement de Médecin de premier grade
            </h3>
            
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ background: 'var(--blue)', color: 'white', padding: '4px 12px', borderRadius: '16px', fontSize: '0.8rem' }}>Annonce</span>
            </div>

            <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.9rem', color: '#555' }}>
              <div><i>💼</i> <b>Postes :</b> 10</div>
              <div><i>⏳</i> <b>Délai :</b> 15 Septembre 2026 - 16:00</div>
              <div><i>📅</i> <b>Examen :</b> 6 Octobre 2026</div>
            </div>

            <Link href="/recrutement/1" style={{ display: 'block', textAlign: 'center', background: 'var(--navy)', color: 'white', padding: '0.75rem', borderRadius: '4px', marginTop: '1.5rem', textDecoration: 'none', fontWeight: 'bold' }}>
              Voir les détails
            </Link>
          </article>
        </div>
      </section>
    </main>
  );
}
