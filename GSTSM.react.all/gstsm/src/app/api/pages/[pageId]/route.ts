import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request, { params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params;
  try {
    const pageContent = await prisma.pageContent.findUnique({
      where: { pageId: pageId }
    });
    
    if (!pageContent) {
      return NextResponse.json({ data: '{}' }); // Return empty JSON string if not found
    }
    
    return NextResponse.json(pageContent);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch page content' }, { status: 500 });
  }
}

export async function POST(request: Request, { params }: { params: Promise<{ pageId: string }> }) {
  const { pageId } = await params;
  try {
    const body = await request.json();
    const { data } = body; // data should be a JSON string

    const updatedPage = await prisma.pageContent.upsert({
      where: { pageId: pageId },
      update: { data },
      create: { pageId: pageId, data }
    });
    
    return NextResponse.json(updatedPage);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update page content' }, { status: 500 });
  }
}
