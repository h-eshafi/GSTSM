import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const jobs = await prisma.jobOffer.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch job offers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, department, grade, specialty, employmentType, positions, applicationDeadline, examDate, pdfAttachmentUrl, description, status } = body;

    const newJob = await prisma.jobOffer.create({
      data: {
        title,
        department,
        grade,
        specialty,
        employmentType,
        positions: parseInt(positions),
        applicationDeadline: new Date(applicationDeadline),
        examDate: new Date(examDate),
        pdfAttachmentUrl,
        description,
        status,
      }
    });
    
    return NextResponse.json(newJob, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create job offer' }, { status: 500 });
  }
}
