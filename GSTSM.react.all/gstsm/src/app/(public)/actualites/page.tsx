import Link from 'next/link';
import fs from 'fs';
import path from 'path';

async function getPosts() {
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        return [];
    }
}

export default async function ActualitesPage() {
    const allPosts = await getPosts();
    const actualites = allPosts.filter((p: any) => p.type === 'actualite');
    const evenements = allPosts.filter((p: any) => p.type === 'evenement');

    return (
        <main>
            <section className="content-hero">
                <div>
                    <span>Information & Presse</span>
                    <h1>Actualités et Médias du GST Souss-Massa</h1>
                    <p>Suivez les dernières réalisations, les communiqués officiels et l'agenda des événements régionaux de santé.</p>
                </div>
                <img src="/event.png" alt="Événements et actualités GST Souss-Massa" />
            </section>

            <div className="rich-content">
                <div className="editorial-news" style={{ padding: '0', marginBottom: '40px' }}>
                    <div className="news-left">
                        <div className="news-heading">
                            <div><span className="section-kicker">La vie du GST Souss-Massa</span><h2>Toutes les actualités</h2></div>
                        </div>
                        <div className="large-news">
                            {actualites.map((post: any) => (
                                <Link href={`/actualites/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                                    <article style={{ cursor: 'pointer' }}>
                                        <div className="news-visual">
                                            <img src={`/${post.image}`} alt={post.title} />
                                            <b>Communiqué</b>
                                        </div>
                                        <small>{post.kicker}</small>
                                        <h3>{post.title}</h3>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <aside className="events-right">
                        <span className="section-kicker">Agenda régional</span>
                        <h2>Les prochains événements</h2>
                        {evenements.map((event: any) => {
                            const dateMatch = event.kicker.match(/([0-9]+)\s*([a-zA-Z\u00C0-\u017F]+)/);
                            const day = dateMatch ? dateMatch[1] : '01';
                            const month = dateMatch ? dateMatch[2].substring(0, 4).toUpperCase() : 'JAN';
                            
                            return (
                                <Link href={`/evenements/${event.id}`} key={event.id} style={{ textDecoration: 'none', color: 'inherit', display: 'contents' }}>
                                    <article style={{ cursor: 'pointer' }}>
                                        <time><b>{day}</b><small>{month}.</small></time>
                                        <div>
                                            <span>Événement</span>
                                            <h3>{event.title}</h3>
                                            <p>{event.excerpt.substring(0, 30)}...</p>
                                        </div>
                                    </article>
                                </Link>
                            );
                        })}
                    </aside>
                </div>

                <div style={{ marginTop: '40px' }}>
                    <Link href="/"><button className="content-back">← Retour à l’accueil</button></Link>
                </div>
            </div>
        </main>
    );
}
