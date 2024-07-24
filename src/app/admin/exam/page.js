"use client";
import { useState, useEffect } from 'react';

export default function ExamCreateForm() {
    const [exams, setExams] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editExamId, setEditExamId] = useState(null);
    const [formData, setFormData] = useState({
        examName: '',
        parentExam: '',
        childExam: false
    });

    async function fetchExams() {
        const data = await fetch('/api/exams');
        const exams = await data.json();
        setExams(exams);
    }


    useEffect(() => {
        const loadExams = async () => {
            await fetchExams();
        };
        loadExams();
    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            name: formData.examName,
            parent: formData.parentExam ? parseInt(formData.parentExam) : null,
            child: formData.childExam,
        };
        if (isEditMode && editExamId) {
            await fetch(`/api/exams/${editExamId}`, { method: 'PUT', body: JSON.stringify(data) });
            setIsEditMode(false);
            setEditExamId(null);
        } else {
            await fetch('/api/exams', { method: 'POST', body: JSON.stringify(data) });
        }
        setFormData({ examName: '', parentExam: '', childExam: false });
        await fetchExams();
    }

    async function handleDelete(examId) {
        await fetch(`/api/exams/${examId}`, { method: 'DELETE' });
        await fetchExams();
    }

    function handleEdit(exam) {
        setFormData({
            examName: exam.name,
            parentExam: exam.parent ? exam.parent.id.toString() : '',
            childExam: exam.child,
        });
        setIsEditMode(true);
        setEditExamId(exam.id);
    }

    return (
        <div className='min-h-screen w-full bg-slate-800'>
            <div className='max-w-sm mx-auto py-2'>
                <h1 className='text-xl text-center'>{isEditMode ? 'Edit Exam' : 'Create Exam'}</h1>
                <form className='space-y-2' onSubmit={handleSubmit}>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="examName">Exam Name: </label>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            type="text"
                            id="examName"
                            name="examName"
                            value={formData.examName}
                            onChange={(e) => setFormData({ ...formData, examName: e.target.value })}
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="parentExam">Parent Exam: </label>
                        <select
                            id="parentExam"
                            name="parentExam"
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                            value={formData.parentExam}
                            onChange={(e) => setFormData({ ...formData, parentExam: e.target.value })}
                        >
                            <option value="">None</option>
                            {exams.map((exam) => (
                                <option key={exam.id} value={exam.id}>{exam.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            id="childExam"
                            name="childExam"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            checked={formData.childExam}
                            onChange={(e) => setFormData({ ...formData, childExam: e.target.checked })}
                        />
                        <label className='ms-2 text-sm font-medium text-gray-900 dark:text-gray-300' htmlFor="childExam">Does child exam exist ?</label>
                    </div>
                    <button className='w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' type="submit">Submit</button>
                </form>
            </div>
            <div>

                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Exam name
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Parent Exam
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    isChild
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
                            {exams.map((exam) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={exam.id}>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{exam.name}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{exam.parent ? exam.parent.name : 'None'}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{exam.child ? 'Yes' : 'No'}</td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={() => handleEdit(exam)}>Edit</button>
                                    </td>
                                    <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        <button className='font-medium text-blue-600 dark:text-blue-500 hover:underline' onClick={() => handleDelete(exam.id)}>Delete</button>
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

            </div>
        </div>
    );
}
