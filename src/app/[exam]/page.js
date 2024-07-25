import { notFound } from 'next/navigation';

const examData = {
  upsc: { title: 'UPSC Exam', description: 'UPSC Exam details...' },
  engineering: { title: 'Engineering Exam', description: 'Engineering Exam details...' },
  medical: { title: 'Medical Exam', description: 'Medical Exam details...' },
};

export default async function ExamPage({ params }) {
  const { exam } = params;
  const data = examData[exam];

  if (!data) {
    notFound();
  }

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
