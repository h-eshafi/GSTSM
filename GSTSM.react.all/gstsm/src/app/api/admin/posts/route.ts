import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/posts.json');

function getPosts() {
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(fileContents);
    } catch (e) {
        return [];
    }
}

function savePosts(posts: any) {
    fs.writeFileSync(dataPath, JSON.stringify(posts, null, 2));
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const posts = getPosts();
        
        // Basic validation
        if (!body.id) {
            return NextResponse.json({ error: 'ID is required' }, { status: 400 });
        }

        // Check if exists
        if (posts.find((p: any) => p.id === body.id)) {
            return NextResponse.json({ error: 'Post with this ID already exists' }, { status: 400 });
        }

        const newPost = {
            ...body,
            createdAt: new Date().toISOString()
        };

        posts.push(newPost);
        savePosts(posts);

        return NextResponse.json({ success: true, post: newPost });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const body = await req.json();
        const posts = getPosts();
        
        const index = posts.findIndex((p: any) => p.id === body.id);
        
        if (index === -1) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        // Update post but keep createdAt
        posts[index] = {
            ...body,
            createdAt: posts[index].createdAt
        };

        savePosts(posts);

        return NextResponse.json({ success: true, post: posts[index] });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}
