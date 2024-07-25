"use client"
import { useState, useEffect } from 'react';

export default function QuestionsPage() {
    const [exams, setExams] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [chapters, setChapters] = useState([]);
    const [selectedExam, setSelectedExam] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');
    const [selectedChapter, setSelectedChapter] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchExams();
    }, []);

    useEffect(() => {
        if (selectedExam) {
            fetchSubjects(selectedExam);
        }
    }, [selectedExam]);

    const fetchExams = async () => {
        try {
            const response = await fetch('/api/exams');
            const exams = await response.json();
            setExams(exams);
        } catch (error) {
            console.error('Error fetching exams:', error);
        }
    };

    const fetchSubjects = async (examId) => {
        try {
            const response = await fetch(`/api/subjects?examId=${examId}`);
            const subjects = await response.json();
            setSubjects(subjects);
        } catch (error) {
            console.error('Error fetching subjects:', error);
        }
    };

    const fetchQuestions = async () => {
        try {
            const response = await fetch(`/api/questions?subjectId=${selectedSubject}`);
            const questions = await response.json();
            setQuestions(questions);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    const handleUploadQuestion = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/questions', {body: JSON.stringify({
                subjectId: selectedSubject,
                text: questionText
            }), method: 'POST'
            });
            setQuestionText('');
            fetchQuestions();
        } catch (error) {
            console.error('Error uploading question:', error);
        }
    };

    return (
        <div>
            <h1>Questions</h1>

            <form onSubmit={handleUploadQuestion}>
                <div>
                    <label htmlFor="exam">Select Exam</label>
                    <select id="exam" value={selectedExam} onChange={(e) => setSelectedExam(e.target.value)}>
                        <option value="">Select Exam</option>
                        {Array.isArray(exams) && exams?.map((exam) => (
                            <option key={exam.id} value={exam.id}>{exam.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="subject">Select Subject</label>
                    <select id="subject" value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
                        <option value="">Select Subject</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="question">Question Text</label>
                    <input
                        id="question"
                        type="text"
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                    />
                </div>

                <button type="submit">Upload Question</button>
            </form>

            <h2>Questions List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Question Text</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => (
                        <tr key={question.id}>
                            <td>{question.text}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
