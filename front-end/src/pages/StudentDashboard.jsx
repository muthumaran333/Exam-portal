import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  FaClipboardList,
  FaCheckCircle,
  FaChartLine,
  FaTasks,
  FaTable,
} from "react-icons/fa";

export default function StudentDashboard() {
  const [tests, setTests] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 5;

  const totalPages = Math.ceil(results.length / resultsPerPage);
  const paginatedResults = results.slice(
    (currentPage - 1) * resultsPerPage,
    currentPage * resultsPerPage
  );

  useEffect(() => {
    AOS.init({ duration: 800 });

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        const [testsRes, resultsRes] = await Promise.all([
          axios.get("http://localhost:5000/api/student/my-tests", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:5000/api/student/my-results", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setTests(testsRes.data);
        setResults(resultsRes.data);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (iso) =>
    new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });

  const completedTests = results.map((r) => r.testId?._id || r.testId);
  const avgScore =
    results.length > 0
      ? (
          results.reduce((sum, r) => sum + (r.score || 0), 0) / results.length
        ).toFixed(1)
      : 0;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <motion.h1
        className="text-4xl font-extrabold text-center text-blue-800 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        🎓 Student Dashboard
      </motion.h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10"
        data-aos="fade-up"
      >
        {/* Total Tests */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl shadow-lg border border-blue-200 transition-all duration-300 ease-in-out flex items-center space-x-5 hover:shadow-xl"
        >
          <FaClipboardList className="text-5xl text-blue-600 drop-shadow-sm" />
          <div>
            <p className="text-sm text-gray-600">Total Tests</p>
            <h2 className="text-3xl font-semibold text-gray-900">{tests.length}</h2>
          </div>
        </motion.div>

        {/* Completed Tests */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-lg border border-green-200 transition-all duration-300 ease-in-out flex items-center space-x-5 hover:shadow-xl"
        >
          <FaCheckCircle className="text-5xl text-green-600 drop-shadow-sm" />
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <h2 className="text-3xl font-semibold text-gray-900">{completedTests.length}</h2>
          </div>
        </motion.div>

        {/* Average Score */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-2xl shadow-lg border border-purple-200 transition-all duration-300 ease-in-out flex items-center space-x-5 hover:shadow-xl"
        >
          <FaChartLine className="text-5xl text-purple-600 drop-shadow-sm" />
          <div>
            <p className="text-sm text-gray-600">Avg. Score</p>
            <h2 className="text-3xl font-semibold text-gray-900">{avgScore}%</h2>
          </div>
        </motion.div>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!loading && !error && (
        <>
          {/* Assigned Tests */}
          <section className="mb-12" data-aos="fade-up">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-3 flex items-center gap-2">
              <FaTasks className="text-blue-600 text-xl" />
              Assigned Tests
            </h2>

            {tests.length === 0 ? (
              <p className="text-gray-700 italic">No tests assigned yet.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {tests.map((test, index) => {
                  const result = results.find(
                    (r) => r.testId === test._id || r.testId?._id === test._id
                  );
                  const isCompleted = !!result;
                  const score = result?.score || 0;
                  const totalQuestions = test.questions?.length || 0;
                  const scorePercent = ((score / totalQuestions) * 100).toFixed(0);

                  return (
                    <motion.div
                      key={test._id}
                      className="bg-white border shadow-md rounded-2xl shadow-lg border border-blue-200 p-6 hover:shadow-xl transition duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {test.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Questions:</strong> {totalQuestions}
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        <strong>Duration:</strong> {test.duration} minutes
                      </p>
                      <p className="text-sm text-gray-600 mb-2">
                        <strong>Assigned on:</strong> {formatDate(test.createdAt)}
                      </p>

                      {isCompleted ? (
                        <>
                          <p className="text-sm font-medium text-green-700 mt-2">
                            ✅ Completed
                          </p>
                          <p className="text-sm text-purple-700 mb-2">
                            <strong>Score:</strong> {score} / {totalQuestions} ({scorePercent}%)
                          </p>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${scorePercent}%` }}
                            ></div>
                          </div>
                        </>
                      ) : (
                        <p className="text-yellow-600 mt-2 font-medium">
                          ⏳ Pending
                        </p>
                      )}

                      <div className="mt-4">
                        {!isCompleted ? (
                          <Link
                            to={`/student/take-test/${test._id}`}
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg transition-colors duration-200 shadow-sm"
                          >
                            Take Test
                          </Link>
                        ) : (
                          <span className="inline-block bg-gray-200 text-gray-600 font-semibold py-2 px-5 rounded-lg cursor-default">
                            Completed
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Progress Chart */}
          <section className="bg-white border rounded-xl p-6 shadow mb-10" data-aos="fade-up">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaChartLine className="text-purple-600" /> Progress Overview
            </h2>
            {results.length === 0 ? (
              <p className="text-gray-700">Progress chart will appear after you take tests.</p>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={results.map((r, i) => ({
                    name: r.testId?.title || `Test ${i + 1}`,
                    score: r.score,
                  }))}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </section>

          {/* Results Table */}
          <section className="mb-10" data-aos="fade-up">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2 flex items-center gap-2">
              <FaTable className="text-gray-600" /> My Results
            </h2>
            {results.length === 0 ? (
              <p className="text-gray-700">No results found.</p>
            ) : (
              <>
                <div className="overflow-x-auto rounded-xl shadow border border-gray-200">
                  <table className="min-w-full table-auto border border-gray-200 text-sm">
                    <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-semibold">
                      <tr>
                        <th className="px-4 py-3 border-b text-left">Test</th>
                        <th className="px-4 py-3 border-b text-left">Score</th>
                        <th className="px-4 py-3 border-b text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {paginatedResults.map((result) => (
                        <tr key={result._id} className="hover:bg-gray-50 transition duration-150">
                          <td className="px-4 py-2">{result.testId?.title || "Untitled"}</td>
                          <td className="px-4 py-2">{result.score}</td>
                          <td className="px-4 py-2">{formatDate(result.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between items-center mt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                      currentPage === 1
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    Previous
                  </button>
                  <span className="text-sm text-gray-700 font-medium">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                      currentPage === totalPages
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    Next
                  </button>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
