import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from 'recharts';
import { FaChartBar, FaClipboardList } from 'react-icons/fa';

export default function ViewResults() {
  const { token } = useAuth();
  const [tests, setTests] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState('');
  const [results, setResults] = useState([]);
  const [testName, setTestName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedTestId]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/tests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) setTests(Array.isArray(data) ? data : data.tests);
        else setError('Failed to fetch tests');
      } catch (err) {
        setError('Error fetching tests');
      }
    };
    fetchTests();
  }, [token]);

  useEffect(() => {
    if (!selectedTestId) return;
    const fetchResults = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`http://localhost:5000/api/admin/results/${selectedTestId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setResults(Array.isArray(data) ? data : data.results || []);
          setTestName(data.testName || 'Selected Test');
        } else {
          setError(data.message || 'Failed to fetch results');
        }
      } catch (err) {
        setError('Server error while fetching results');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, [selectedTestId, token]);

  const avgScore = results.length
    ? (results.reduce((sum, r) => sum + r.score, 0) / results.length).toFixed(2)
    : 0;
  const maxScore = results.length
    ? Math.max(...results.map((r) => r.score))
    : 0;

  const chartData = results.map((r) => ({
    name: r.studentId?.name || 'Unknown',
    score: r.score,
  }));

  const indexOfLast = currentPage * resultsPerPage;
  const indexOfFirst = indexOfLast - resultsPerPage;
  const currentResults = results.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  return (
    <div className="p-6 max-w-6xl mx-auto text-gray-800 animate-fadeIn">
      <h1 className="text-4xl font-extrabold flex items-center gap-2 mb-10 text-indigo-700">
        <FaClipboardList className="text-indigo-500" /> View Test Results
      </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Test:</label>
        <select
          value={selectedTestId}
          onChange={(e) => setSelectedTestId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-indigo-500 transition duration-300"
        >
          <option value="">-- Choose a test --</option>
          {tests.map((test) => (
            <option key={test._id} value={test._id}>
              {test.name || test.title || 'Untitled Test'}
            </option>
          ))}
        </select>
      </div>

      {loading && <p className="text-indigo-600 animate-pulse">Loading results...</p>}
      {error && <p className="text-red-600 animate-shake">{error}</p>}

      {!loading && !error && (
        <>
          {!selectedTestId ? (
            // 📌 Placeholder when no test is selected
            <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500 animate-fadeIn">
              <FaClipboardList className="text-6xl text-indigo-300 mb-4 animate-pulse" />
              <h2 className="text-2xl font-semibold text-indigo-700 mb-2">No Test Selected</h2>
              <p className="text-sm max-w-md">
                Please select a test from the dropdown above to view results, statistics, and performance charts.
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              {/* Summary Cards */}
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 my-8">
                <div className="bg-gradient-to-r from-indigo-100 to-indigo-200 p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
                  <h3 className="text-sm text-gray-600 mb-1">Total Submissions</h3>
                  <p className="text-2xl font-bold text-indigo-700">{results.length}</p>
                </div>
                <div className="bg-gradient-to-r from-green-100 to-green-200 p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
                  <h3 className="text-sm text-gray-600 mb-1">Average Score</h3>
                  <p className="text-2xl font-bold text-green-700">{avgScore}</p>
                </div>
                <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-5 rounded-xl shadow hover:shadow-lg transition duration-300">
                  <h3 className="text-sm text-gray-600 mb-1">Highest Score</h3>
                  <p className="text-2xl font-bold text-purple-700">{maxScore}</p>
                </div>
              </div>

              {/* Chart Section */}
              <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300 mb-12">
                <h2 className="text-xl font-bold flex items-center gap-2 mb-4 text-purple-700">
                  <FaChartBar className="text-purple-600" /> Score Distribution
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="score" fill="#6366F1" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Table */}
              <div className="overflow-x-auto rounded-xl shadow border border-gray-200 bg-white">
                <table className="w-full text-sm text-left">
                  <thead className="bg-indigo-100 text-indigo-700 uppercase text-xs font-semibold">
                    <tr>
                      <th className="px-6 py-4">Student Name</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Score</th>
                      <th className="px-6 py-4">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {currentResults.map((r, i) => (
                      <tr
                        key={r._id}
                        className={`${
                          i % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                        } hover:bg-indigo-50 transition duration-200`}
                      >
                        <td className="px-6 py-4 font-medium text-gray-800">{r.studentId?.name || 'N/A'}</td>
                        <td className="px-6 py-4">{r.studentId?.email || 'N/A'}</td>
                        <td className="px-6 py-4 text-indigo-700 font-semibold">{r.score}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(r.createdAt || r.date).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
                  <button
                    className="px-4 py-2 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded disabled:opacity-50 transition"
                    onClick={() => setCurrentPage((p) => p - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    className="px-4 py-2 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-800 rounded disabled:opacity-50 transition"
                    onClick={() => setCurrentPage((p) => p + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600 mt-4">No results found for this test.</p>
          )}
        </>
      )}

      {/* Animation style */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out both;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.5s ease;
        }
      `}</style>
    </div>
  );
}
