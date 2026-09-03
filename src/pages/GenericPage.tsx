import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

export default function GenericPage({ explicitSlug }: { explicitSlug?: string }) {
  const params = useParams<{ slug: string }>();
  const slug = explicitSlug || params.slug;
  const [pageData, setPageData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPage() {
      if (!slug) return;
      setLoading(true);
      setPageData(null); // Clear previous page data
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', slug)
        .single();
        
      if (data) {
        setPageData(data);
      } else {
        console.error('Error fetching page:', error);
      }
      
      setLoading(false);
    }
    fetchPage();
  }, [slug]);

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Chargement en cours...</div>;
  }

  if (!pageData) {
    return <div style={{ padding: '100px', textAlign: 'center' }}>Page introuvable.</div>;
  }

  return (
    <main>
      <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
      <div style={{ marginTop: '30px', paddingBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <Link to="/"><button className="content-back">← Retour à l’accueil</button></Link>
      </div>
    </main>
  );
}
