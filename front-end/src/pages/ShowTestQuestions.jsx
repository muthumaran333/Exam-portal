import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShowTestQuestions() {
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitMessage, setSubmitMessage] = useState('');
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const timerRef = useRef(null);

  // Fetch test on mount
  useEffect(() => {
    if (!testId) return;

    async function fetchTest() {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/student/my-tests/${testId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const testData = response.data;
        setTest(testData);
        setTimeLeft(testData.duration * 60); // convert minutes to seconds
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load test.');
      } finally {
        setLoading(false);
      }
    }

    fetchTest();
  }, [testId]);

  // Timer logic (separated and stable)
  useEffect(() => {
    if (!test || isSubmitted) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true); // auto submit
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, [test, isSubmitted]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleOptionChange = (questionId, selectedOption) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: selectedOption,
    }));
  };

  const handleSubmit = useCallback(async (auto = false) => {
    if (isSubmitted) return;

    clearInterval(timerRef.current);
    setIsSubmitted(true);

    const token = localStorage.getItem('token');
    const answers = Object.entries(selectedAnswers).map(([questionId, selectedOption]) => ({
      questionId,
      selectedOption,
    }));

    try {
      const response = await axios.post(
        `http://localhost:5000/api/student/submit/${testId}`,
        { answers },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSubmitMessage(
        response.data.message || (auto ? 'Time is up! Test auto-submitted.' : 'Test submitted successfully.')
      );
      setScore(response.data.result?.score);
      setShowResultModal(true);
    } catch (err) {
      setSubmitMessage(err.response?.data?.error || 'Submission failed.');
    }
  }, [isSubmitted, selectedAnswers, testId]);

  if (loading) return <div className="text-center mt-10 text-lg text-gray-600">Loading questions...</div>;
  if (error) return <div className="text-center mt-10 text-red-600 text-lg">{error}</div>;
  if (!test) return <div className="text-center mt-10 text-gray-500">No test found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-blue-700">{test.title}</h2>
        {timeLeft !== null && (
          <div className="text-lg font-mono bg-white border border-gray-300 px-4 py-2 rounded shadow-sm text-red-600">
            ⏱ Time Left: {formatTime(timeLeft)}
          </div>
        )}
      </div>

      <div className="space-y-6">
        {test.questions.map((q, index) => (
          <div key={q._id} className="bg-white rounded-xl shadow-md p-5 border-l-4 border-blue-500">
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              {index + 1}. {q.text}
            </h4>
            <div className="space-y-3">
              {q.options.map((option, i) => (
                <label
                  key={i}
                  className={`flex items-center space-x-3 text-gray-700 cursor-pointer hover:bg-gray-100 px-3 py-2 rounded-md ${
                    selectedAnswers[q._id] === option ? 'bg-blue-100' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name={`question-${q._id}`}
                    value={option}
                    checked={selectedAnswers[q._id] === option}
                    onChange={() => handleOptionChange(q._id, option)}
                    className="accent-blue-600"
                    disabled={isSubmitted}
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => handleSubmit(false)}
          disabled={isSubmitted}
          className={`px-6 py-2 rounded-lg transition text-white ${
            isSubmitted ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          Submit Test
        </button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showResultModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-xl relative"
            >
              {score === test.questions.length ? (
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="text-green-600 text-5xl mb-4 font-extrabold animate-bounce"
                >
                  🎉 Perfect Score!
                </motion.div>
              ) : (
                <div className="text-blue-700 text-3xl font-semibold mb-2">Test Submitted</div>
              )}
              <p className="text-lg text-gray-800">{submitMessage}</p>
              <p className="mt-2 text-lg font-semibold text-gray-900">
                Your Score: {score} / {test.questions.length}
              </p>
              <button
                className="mt-6 px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                onClick={() => setShowResultModal(false)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
