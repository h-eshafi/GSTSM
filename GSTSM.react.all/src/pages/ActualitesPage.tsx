import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCachedPosts } from '../lib/postsCache';

export default function ActualitesPage() {
  const [actualites, setActualites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadActualites() {
      const posts = await getCachedPosts();
      const newsItems = posts.filter(p => p.type === 'actualite' || p.type === 'evenement');
      if (newsItems.length > 0) {
        setActualites(newsItems);
        setLoading(false);
      }
      const fresh = await getCachedPosts(true);
      const freshNews = fresh.filter(p => p.type === 'actualite' || p.type === 'evenement');
      setActualites(freshNews);
      setLoading(false);
    }
    loadActualites();
  }, []);

  return (
    <main>
      <section className="content-hero">
        <div>
          <span>L'essentiel de l'information</span>
          <h1>Actualités et Événements</h1>
          <p>Toute l'actualité du Groupement Sanitaire Territorial de la Région Souss-Massa et l'agenda des événements.</p>
        </div>
      </section>

      <div className="rich-content" style={{ padding: '40px 3vw', maxWidth: '1200px', margin: '0 auto' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Chargement en cours...</div>
        ) : actualites.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '50px' }}>Aucune actualité disponible pour le moment.</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
            {actualites.map((post) => (
              <div key={post.id} style={{ 
                background: 'white', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ height: '200px', overflow: 'hidden', backgroundColor: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img 
                    src={
                      !post.image ? '/event.png' :
                      (post.image.startsWith('data:') || post.image.startsWith('http://') || post.image.startsWith('https://'))
                        ? post.image 
                        : (post.image.startsWith('/') ? post.image : `/${post.image}`)
                    } 
                    alt={post.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ 
                    background: post.type === 'actualite' ? '#dbeafe' : '#fce7f3', 
                    color: post.type === 'actualite' ? '#1e40af' : '#be185d', 
                    padding: '4px 8px', 
                    borderRadius: '4px', 
                    fontSize: '12px', 
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    display: 'inline-block',
                    marginBottom: '10px',
                    alignSelf: 'flex-start'
                  }}>
                    {post.type}
                  </span>
                  <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#0f172a' }}>{post.title}</h3>
                  {post.excerpt && <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px', flex: 1 }}>{post.excerpt}</p>}
                  
                  <Link to={`/pages/${post.id}`} style={{ 
                    color: '#0284c7', 
                    textDecoration: 'none', 
                    fontWeight: '600', 
                    fontSize: '14px',
                    display: 'inline-block'
                  }}>
                    Lire la suite →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
