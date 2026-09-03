import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const events = await prisma.evenement.findMany({
      orderBy: { eventDate: 'asc' }
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, slug, eventDate, location, audience, content, featuredImage, status } = body;

    const newEvent = await prisma.evenement.create({
      data: {
        title,
        slug,
        eventDate: new Date(eventDate),
        location,
        audience,
        content,
        featuredImage,
        status,
      }
    });
    
    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
