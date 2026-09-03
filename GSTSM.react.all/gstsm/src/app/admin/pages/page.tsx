import Link from 'next/link';
import fs from 'fs';
import path from 'path';
import './../admin.css';

async function getPosts() {
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        return [];
    }
}

export default async function AdminPagesList() {
    const posts = await getPosts();

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 className="admin-heading" style={{ marginBottom: 0 }}>Pages & Articles (CMS)</h1>
                <Link href="/admin/pages/new" className="admin-btn admin-btn-primary" style={{ textDecoration: 'none' }}>
                    + Ajouter une page
                </Link>
            </div>

            <div className="admin-card" style={{ padding: 0 }}>
                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Titre</th>
                            <th>Type</th>
                            <th>Date</th>
                            <th style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.map((post: any) => (
                            <tr key={post.id}>
                                <td>
                                    <div style={{ fontWeight: '600', color: '#0f172a' }}>{post.title}</div>
                                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                                        /{post.type === 'page' ? 'pages' : (post.type + 's')}/{post.id}
                                    </div>
                                </td>
                                <td>
                                    <span style={{ 
                                        background: post.type === 'actualite' ? '#dbeafe' : post.type === 'page' ? '#f3e8ff' : '#fce7f3', 
                                        color: post.type === 'actualite' ? '#1e40af' : post.type === 'page' ? '#7e22ce' : '#be185d', 
                                        padding: '4px 8px', 
                                        borderRadius: '4px', 
                                        fontSize: '12px', 
                                        fontWeight: '600',
                                        textTransform: 'uppercase'
                                    }}>
                                        {post.type}
                                    </span>
                                </td>
                                <td style={{ color: '#64748b', fontSize: '14px' }}>
                                    {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                                </td>
                                <td style={{ textAlign: 'right' }}>
                                    <Link href={`/admin/pages/${post.id}`}>
                                        <button className="admin-btn admin-btn-secondary" style={{ padding: '4px 10px', fontSize: '13px', marginRight: '8px' }}>Éditer</button>
                                    </Link>
                                    <Link href={`/${post.type === 'page' ? 'pages' : (post.type + 's')}/${post.id}`} target="_blank">
                                        <button className="admin-btn" style={{ padding: '4px 10px', fontSize: '13px', border: '1px solid #e2e8f0', background: 'transparent' }}>Voir</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
