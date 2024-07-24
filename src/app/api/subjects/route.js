import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const examId = parseInt(searchParams.get('examId'), 10);
  console.log("ExamId: ", examId);

  if (isNaN(examId)) {
    return NextResponse.json({ error: 'Invalid exam ID' }, { status: 400 });
  }

  try {
    const subjects = await prisma.subject.findMany({ where: { examId } });
    return NextResponse.json(subjects, { status: 200 });
  } catch (error) {
    console.error('Error fetching subjects', error);
    return NextResponse.json({ error: 'Error fetching subjects' }, { status: 500 });
  }
}


export async function POST(request) {
  const { examId, subjectName } = await request.json();
  try {

    if (!examId || !subjectName) {
        return NextResponse.json({ error: 'Exam ID and Subject Name are required' }, { status: 400 });
      }
    const subject = await prisma.subject.create({
      data: {
        name: subjectName,
        examId: parseInt(examId)
      },
    });
    return NextResponse.json({subject}, { status: 201 });
  } catch (error) {
    console.error('Error creating Subject:', error);
    return NextResponse.json({ error: 'Error creating Subject' }, { status: 500 });
  }
}