import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';

async function getPageData(slug: string) {
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        const posts = JSON.parse(fileContents);
        return posts.find((p: any) => p.id === slug && p.type === 'page');
    } catch (e) {
        return null;
    }
}

export async function generateStaticParams() {
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        const posts = JSON.parse(fileContents);
        const pages = posts.filter((p: any) => p.type === 'page');
        return pages.map((page: any) => ({
            slug: page.id,
        }));
    } catch (e) {
        return [];
    }
}

export default async function GenericPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const pageData = await getPageData(slug);

    if (!pageData) {
        notFound();
    }

    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>{pageData.kicker || 'Le GST Souss-Massa'}</span>
                    <h1>{pageData.title}</h1>
                    {pageData.excerpt && <p>{pageData.excerpt}</p>}
                </div>
                {pageData.image && (
                    <img src={`/${pageData.image}`} alt={pageData.title} />
                )}
            </section>

            <div className="rich-content" style={{ padding: '40px 3vw', maxWidth: '1200px', margin: '0 auto' }}>
                <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
            </div>
        </main>
    );
}
