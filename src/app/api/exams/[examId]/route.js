import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(request, {params}) {
    const {examId} = params;
    const { name, parent, child } = await request.json();
  
    try {
      const exam = await prisma.exam.update({
        where: {
            id: parseInt(examId)
        },
        data: {
          name,
          parent: parent ? parseInt(parent) : null,
          child
        },
      });
      return NextResponse.json(exam, { status: 200 });
    } catch (error) {
      return NextResponse.error(new Error('Error updating exam'));
    }
}

export async function DELETE(request, { params }) {
  const { examId } = params;

  try {
    if (!examId || isNaN(parseInt(examId))) {
      return NextResponse.json({ error: 'Invalid exam ID' }, { status: 400 });
    }

    const exam = await prisma.exam.delete({
      where: {
        id: parseInt(examId),
      },
    });
    return NextResponse.json(exam, { status: 200 });
  } catch (error) {
    return NextResponse.error(new Error('Error deleting exam'));
  }
}