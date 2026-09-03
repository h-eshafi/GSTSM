import fs from 'fs';
import path from 'path';
import EditorClient from './EditorClient';
import { notFound } from 'next/navigation';

async function getPost(pageId: string) {
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        const posts = JSON.parse(fileContents);
        const post = posts.find((p: any) => p.id === pageId);
        return post || null;
    } catch (e) {
        return null;
    }
}

export default async function AdminPageEditor({ params }: { params: Promise<{ pageId: string }> }) {
    const { pageId } = await params;
    const post = await getPost(pageId);

    if (!post && pageId !== 'new') {
        notFound();
    }

    const initialData = post || {
        id: '',
        type: 'actualite',
        title: '',
        excerpt: '',
        kicker: '',
        image: '',
        content: ''
    };

    return (
        <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
            <EditorClient initialData={initialData} isNew={pageId === 'new'} />
        </div>
    );
}
