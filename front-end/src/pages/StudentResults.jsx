import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function StudentResults() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await axios.get('/api/student/my-results');
        setResults(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchResults();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Results</h1>
      <div className="space-y-4">
        {results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          results.map((r) => (
            <div key={r._id} className="bg-white p-4 rounded shadow">
              <h2 className="text-lg font-semibold">{r.testId.title}</h2>
              <p>Score: {r.score}</p>
              <p>Date: {new Date(r.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
