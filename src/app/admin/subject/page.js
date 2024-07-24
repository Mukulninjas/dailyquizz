"use client";
import { useState, useEffect } from 'react';

export default function AddSubjectForm() {
    const [exams, setExams] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [activeExam, setActiveExam] = useState('');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editSubjectId, setEditSubjectId] = useState('');
    const [formData, setFormData] = useState({
        subjectName: ''
    });

    async function fetchExams() {
        const data = await fetch('/api/exams');
        const exams = await data.json();
        setExams(exams);
    }

    async function fetchSubjects() {
        const data = await fetch(`/api/subjects?examId=${activeExam}`);
        const subjects = await data.json();
        setSubjects(subjects);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            subjectName: formData.subjectName,
            examId: activeExam
        };
        if (isEditMode && editSubjectId) {
            await fetch(`/api/subjects/${editSubjectId}`, { method: 'PUT', body: JSON.stringify(data) });
            setIsEditMode(false);
            setEditSubjectId(null);
        } else {
            await fetch('/api/subjects', { method: 'POST', body: JSON.stringify(data) });
        }
        setFormData({ subjectName: '' });
        await fetchExams();
    }

    function handleEdit(subject) {
        setIsEditMode(true);
        setEditSubjectId(subject.id);
        setFormData({ subjectName: subject.name });
    }

    async function handleDelete(subjectId) {
        await fetch(`/api/subjects/${subjectId}`, { method: 'DELETE' });
        await fetchExams();
    }

    useEffect(() => {
        const loadSubjects = async () => {
            await fetchSubjects();
        }
        activeExam && loadSubjects();
    }, [activeExam]);

    useEffect(() => {
        const loadExams = async () => {
            await fetchExams();
        };
        loadExams();
    }, []);

    return (
        <div className='min-h-screen w-full bg-slate-800'>
            <div className='max-w-sm mx-auto py-2'>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="parentExam">Select an Exam to continue: </label>
                    <select
                        disabled={editSubjectId}
                        id="parentExam"
                        name="parentExam"
                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                        value={activeExam}
                        onChange={(e) => setActiveExam(e.target.value)}
                    >
                        <option value="">None</option>
                        {exams.map((exam) => (
                            <option key={exam.id} value={exam.id}>{exam.name}</option>
                        ))}
                    </select>
                </div>
                {activeExam && <><h1 className='text-xl text-center'>{isEditMode ? 'Edit Subject' : 'Add Subject'}</h1>
                    <form className='space-y-2' onSubmit={handleSubmit}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="examName">Subject Name: </label>
                            <input
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                type="text"
                                id="subjectName"
                                name="subjectName"
                                value={formData.subjectName}
                                onChange={(e) => setFormData({ ...formData, subjectName: e.target.value })}
                                required
                            />
                        </div>
                        {editSubjectId && <div>
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="parentExam">Select an Exam to continue: </label>
                            <select
                                id="parentExam"
                                name="parentExam"
                                className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                                value={activeExam}
                                onChange={(e) => setActiveExam(e.target.value)}
                            >
                                <option value="">None</option>
                                {exams.map((exam) => (
                                    <option key={exam.id} value={exam.id}>{exam.name}</option>
                                ))}
                            </select>
                        </div>}
                        <button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Submit</button>
                    </form></>}
            </div>
            {activeExam && <div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Subject name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Edit
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Delete
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {subjects.map((subject) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={subject.id}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{subject.name}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={() => handleEdit(subject)}>Edit</button>
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={() => handleDelete(subject.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <nav class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4" aria-label="Table navigation">
                        <span class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of <span class="font-semibold text-gray-900 dark:text-white">1000</span></span>
                        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
                            <li>
                                <a href="#" class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Previous</a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">1</a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">2</a>
                            </li>
                            <li>
                                <a href="#" aria-current="page" class="flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white">3</a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">4</a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">5</a>
                            </li>
                            <li>
                                <a href="#" class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Next</a>
                            </li>
                        </ul>
                    </nav>
                </div>

            </div>}
        </div>
    );
}
