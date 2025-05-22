import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function TakeTest() {
  const { testId } = useParams();

  const [test, setTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchTest() {
      setLoading(true);
      setError('');
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/api/student/my-tests/${testId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTest(response.data);
        setAnswers({});
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load test.');
      } finally {
        setLoading(false);
      }
    }
    fetchTest();
  }, [testId]);

  const handleOptionChange = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const handleSubmit = async () => {
    if (!test || !Array.isArray(test.questions)) return;

    if (Object.keys(answers).length !== test.questions.length) {
      alert('Please answer all questions before submitting.');
      return;
    }

    const formattedAnswers = test.questions.map(q => ({
      questionId: q._id,
      selectedOption: answers[q._id],
    }));

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      await axios.post(
        `/api/student/submit/${testId}`,
        { answers: formattedAnswers },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Test submitted successfully!');
      setAnswers({});  // Optionally clear answers after submission
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit test.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-6">Loading test...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!test) return <div className="p-6">No test found.</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{test.title}</h1>

      <div className="space-y-6">
        {(test.questions || []).map((q, idx) => (
          <div key={q._id} className="bg-white p-4 rounded shadow">
            <p className="font-semibold mb-2">
              {idx + 1}. {q.text}
            </p>
            <div className="space-y-1">
              {q.options.map((opt, i) => (
                <label key={i} className="block cursor-pointer">
                  <input
                    type="radio"
                    name={q._id}
                    value={opt}
                    checked={answers[q._id] === opt}
                    onChange={() => handleOptionChange(q._id, opt)}
                    className="mr-2"
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className={`mt-6 px-6 py-2 rounded text-white ${
          submitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {submitting ? 'Submitting...' : 'Submit Test'}
      </button>
    </div>
  );
}
