import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const subjectId = parseInt(searchParams.get('subjectId'), 10);
    console.log("subjectId: ", subjectId);
  
    if (isNaN(subjectId)) {
      return NextResponse.json({ error: 'Invalid subjectId' }, { status: 400 });
    }
  
    try {
      const chapters = await prisma.chapter.findMany({ where: { subjectId } });
      return NextResponse.json(chapters, { status: 200 });
    } catch (error) {
      console.error('Error fetching chapters', error);
      return NextResponse.json({ error: 'Error fetching chapters' }, { status: 500 });
    }
  }

export async function POST(request) {
    const { subjectId, name } = await request.json();
    try {
  
      if (!subjectId || !name) {
          return NextResponse.json({ error: 'Subject ID and Chapter Name are required' }, { status: 400 });
        }
      const chapter = await prisma.chapter.create({
        data: {
          name: name,
          subjectId: parseInt(subjectId)
        },
      });
      return NextResponse.json({chapter}, { status: 201 });
    } catch (error) {
      console.error('Error creating chapter:', error);
      return NextResponse.json({ error: 'Error creating chapter' }, { status: 500 });
    }
}
