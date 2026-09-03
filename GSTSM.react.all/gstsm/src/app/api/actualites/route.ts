import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const actualites = await prisma.actualite.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(actualites);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch actualites' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, category, content, featuredImage, status } = body;

    const newActualite = await prisma.actualite.create({
      data: {
        title,
        slug,
        category,
        content,
        featuredImage,
        status,
        publishedAt: status === 'PUBLISHED' ? new Date() : null,
      }
    });
    
    return NextResponse.json(newActualite, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create actualite' }, { status: 500 });
  }
}
