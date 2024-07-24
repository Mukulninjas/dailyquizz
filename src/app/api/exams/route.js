import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const exams = await prisma.exam.findMany();
    return NextResponse.json(exams);
  } catch (error) {
    return NextResponse.error(new Error('Error fetching exams'));
  }
}

export async function POST(request) {
  const { name, parent, child } = await request.json();

  try {
    const exam = await prisma.exam.create({
      data: {
        name,
        parent: parent ? parseInt(parent) : null,
        child
      },
    });
    return NextResponse.json(exam, { status: 201 });
  } catch (error) {
    return NextResponse.error(new Error('Error creating exam'));
  }
}