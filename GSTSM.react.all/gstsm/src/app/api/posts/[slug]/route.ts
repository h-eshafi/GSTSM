import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const dataPath = path.join(process.cwd(), 'src/data/posts.json');
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        const posts = JSON.parse(fileContents);
        const post = posts.find((p: any) => p.id === slug);
        
        if (!post) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }
        
        return NextResponse.json(post);
    } catch (e) {
        return NextResponse.json({ error: 'Failed to read posts' }, { status: 500 });
    }
}
