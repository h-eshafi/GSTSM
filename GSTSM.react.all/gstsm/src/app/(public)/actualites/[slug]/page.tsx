import { notFound } from 'next/navigation';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

async function getPost(slug: string) {
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        const posts = JSON.parse(fileContents);
        const post = posts.find((p: any) => p.id === slug && p.type === 'actualite');
        return post || null;
    } catch (e) {
        return null;
    }
}

export async function generateStaticParams() {
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        const posts = JSON.parse(fileContents);
        const actualites = posts.filter((p: any) => p.type === 'actualite');
        return actualites.map((post: any) => ({
            slug: post.id,
        }));
    } catch (e) {
        return [];
    }
}

export default async function ActualitePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getPost(slug);
    
    if (!post) {
        notFound();
    }

    return (
        <main>
            <section className="page-hero">
                <div>
                    <span>{post.kicker}</span>
                    <h1>{post.title}</h1>
                    <p>{post.excerpt}</p>
                </div>
                <div className="page-symbol" style={{ backgroundImage: `url(/${post.image})` }}></div>
            </section>

            <div className="rich-content">
                <div dangerouslySetInnerHTML={{ __html: post.content }} />
                
                <div style={{ marginTop: '30px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
