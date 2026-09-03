import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'src/data/menus.json');

export async function GET() {
    try {
        const fileContents = fs.readFileSync(dataPath, 'utf8');
        return NextResponse.json(JSON.parse(fileContents));
    } catch (e) {
        return NextResponse.json({ error: 'Failed to read menus' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        fs.writeFileSync(dataPath, JSON.stringify(body, null, 2));
        return NextResponse.json({ success: true });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to update menus' }, { status: 500 });
    }
}
