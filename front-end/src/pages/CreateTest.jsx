import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth.js';

export default function CreateTest() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    duration: '',
    questionIds: [],
  });
  const [questions, setQuestions] = useState([]);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/questions', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setQuestions(data);
        else setMessage('Failed to load questions');
      } catch (err) {
        setMessage('Error loading questions');
      }
    };
    fetchQuestions();
  }, [token]);

  const handleCheckboxChange = (e, id) => {
    const isChecked = e.target.checked;
    setForm((prevForm) => {
      const updatedQuestionIds = isChecked
        ? [...prevForm.questionIds, id]
        : prevForm.questionIds.filter((qid) => qid !== id);
      return { ...prevForm, questionIds: updatedQuestionIds };
    });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = questions.map((q) => q._id);
      setForm((prevForm) => ({ ...prevForm, questionIds: allIds }));
    } else {
      setForm((prevForm) => ({ ...prevForm, questionIds: [] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.duration || form.questionIds.length === 0) {
      setMessage('Please provide title, duration, and select at least one question.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/admin/create-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Test created successfully');
        setForm({
          title: '',
          description: '',
          duration: '',
          questionIds: [],
        });
        setSearchTerm('');
      } else {
        setMessage(data.error || 'Failed to create test');
      }
    } catch (err) {
      setMessage('Server error while creating test');
    }
  };

  const allSelected = form.questionIds.length === questions.length;

  return (
    <div className="px-6 py-10 max-w-4xl mx-auto" data-aos="fade-up">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-extrabold text-blue-800 mb-6 tracking-tight">
          Create New Test
        </h2>

        {message && <p className="mb-4 text-red-600 font-medium">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-800 mb-1">Test Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="E.g., Final Term Test"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-800 mb-1">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={4}
              placeholder="Optional test description..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-800 mb-1">Duration (in minutes)</label>
            <input
              type="number"
              value={form.duration}
              onChange={(e) => setForm({ ...form, duration: e.target.value })}
              placeholder="E.g., 60"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-800 mb-2">Select Questions</label>

            <div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search questions..."
                className="w-full px-4 py-2 mb-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              />
            </div>

            <label className="flex items-center gap-2 mb-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={handleSelectAll}
              />
              <span className="text-sm font-medium text-gray-700">Select All</span>
            </label>

            <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-inner space-y-3">
              {questions.length > 0 ? (
                questions
                  .filter((q) =>
                    q.text?.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((q) => (
                    <div key={q._id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="mt-0.5"
                        checked={form.questionIds.includes(q._id)}
                        onChange={(e) => handleCheckboxChange(e, q._id)}
                      />
                      <label className="text-gray-700 cursor-pointer">
                        {q.text || 'Unnamed Question'}
                      </label>
                    </div>
                  ))
              ) : (
                <p className="text-sm text-gray-500">No questions available</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 rounded-lg shadow-md transition-transform active:scale-95"
          >
            Create Test
          </button>
        </form>
      </div>
    </div>
  );
}
