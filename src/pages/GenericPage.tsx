import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPostByIdSync, fetchFullPost } from '../lib/postsCache';

export default function GenericPage({ explicitSlug }: { explicitSlug?: string }) {
  const params = useParams<{ slug: string }>();
  const slug = explicitSlug || params.slug;
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPage() {
      if (!slug) return;

      const cached = getPostByIdSync(slug);
      if (cached && cached.content) {
        setPageData(cached);
        setLoading(false);
      }

      const fullPost = await fetchFullPost(slug);
      if (fullPost) {
        setPageData(fullPost);
      }
      setLoading(false);
    }
    loadPage();
  }, [slug]);

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Chargement en cours...</div>;
  }

  if (!pageData) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Page introuvable.</div>;
  }

  // Ensure trailing slash on BASE_URL is handled without resulting in double slashes (e.g. src="//assets...")
  const rawBase = import.meta.env.BASE_URL || '/';
  const cleanBase = rawBase.endsWith('/') ? rawBase.slice(0, -1) : rawBase;

  const processedContent = (pageData.content || '')
    .replace(/src="\//g, `src="${cleanBase}/`)
    .replace(/href="\//g, `href="${cleanBase}/`);

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: processedContent }} />
      <div style={{ marginTop: '30px', paddingBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <Link to="/"><button className="content-back">← Retour à l’accueil</button></Link>
      </div>
    </main>
  );
}
