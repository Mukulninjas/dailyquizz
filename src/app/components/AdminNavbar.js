import Link from 'next/link';

export default function AdminNavbar() {
  return (
    <nav className='bg-slate-950'>
      <ul className='flex space-x-3 p-2'>
        <li><Link href="/admin/exam">Exams</Link></li>
        <li><Link href="/admin/subject">Subjects</Link></li>
        <li><Link href="/admin/chapter">Chapters</Link></li>
        <li><Link href="/admin/question">Questions</Link></li>
      </ul>
    </nav>
  );
}
