import React, { useState } from 'react';
import useAuth from '../hooks/useAuth.js';

export default function CreateQuestion() {
  const [form, setForm] = useState({ text: '', options: ['', ''], correctAnswer: '' });
  const [message, setMessage] = useState('');
  const { token } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/admin/create-question', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(res.ok ? '✅ Question created successfully' : data.error);
  };

  const handleAddOption = () => {
    setForm((prevForm) => ({
      ...prevForm,
      options: [...prevForm.options, ''],
    }));
  };

  const handleRemoveOption = (index) => {
    setForm((prevForm) => ({
      ...prevForm,
      options: prevForm.options.filter((_, i) => i !== index),
    }));
  };

  return (
    <div
      className="p-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg"
      data-aos="fade-up"
    >
      <h2 className="text-2xl font-semibold text-blue-800 mb-6">Create Question</h2>

      {message && (
        <p
          className={`text-center mb-6 text-sm font-medium ${
            message.startsWith('✅') ? 'text-blue-600' : 'text-red-600'
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
          <input
            type="text"
            placeholder="Enter question"
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Options */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Options</label>
          {form.options.map((opt, i) => (
            <div key={i} className="flex items-center space-x-4 mb-4">
              <input
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => {
                  const updated = [...form.options];
                  updated[i] = e.target.value;
                  setForm({ ...form, options: updated });
                }}
                className="flex-1 p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                required
              />
              {form.options.length > 2 && (
                <button
                  type="button"
                  onClick={() => handleRemoveOption(i)}
                  className="text-red-600 hover:text-red-800 font-semibold text-xl select-none"
                  aria-label={`Remove option ${i + 1}`}
                >
                  −
                </button>
              )}
            </div>
          ))}

          {/* Add more options button */}
          <button
            type="button"
            onClick={handleAddOption}
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 transition"
          >
            + Add Option
          </button>
        </div>

        {/* Correct Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
          <input
            type="text"
            placeholder="Enter correct answer"
            value={form.correctAnswer}
            onChange={(e) => setForm({ ...form, correctAnswer: e.target.value })}
            className="mt-1 block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-6 rounded-md shadow-md transition-transform active:scale-95 font-semibold"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
