import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function PUT(request, {params}) {
    const {subjectId} = params;
    const { subjectName, examId } = await request.json();
  
    try {
      const subject = await prisma.subject.update({
        where: {
            id: parseInt(subjectId)
        },
        data: {
          name : subjectName,
          examId: parseInt(examId)
        },
      });
      return NextResponse.json(subject, { status: 200 });
    } catch (error) {
      console.log(error);
      return NextResponse.error(new Error('Error updating subject'));
    }
}

export async function DELETE(request, { params }) {
  const { subjectId } = params;

  try {
    if (!subjectId || isNaN(parseInt(subjectId))) {
      return NextResponse.json({ error: 'Invalid subject ID' }, { status: 400 });
    }

    const subject = await prisma.subject.delete({
      where: {
        id: parseInt(subjectId),
      },
    });
    return NextResponse.json(subject, { status: 200 });
  } catch (error) {
    return NextResponse.error(new Error('Error deleting subject'));
  }
}