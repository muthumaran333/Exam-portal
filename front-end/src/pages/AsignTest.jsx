import React, { useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth.js';

export default function AssignTest() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [tests, setTests] = useState([]);
  const [form, setForm] = useState({ userId: '', testId: '' });
  const [message, setMessage] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingTests, setLoadingTests] = useState(false);

  useEffect(() => {
    if (!token) return;

    const fetchUsers = async () => {
      setLoadingUsers(true);
      try {
        const res = await fetch('http://localhost:5000/api/admin/users', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users || data || []);
        } else {
          setMessage(data.error || 'Failed to fetch users');
          setUsers([]);
        }
      } catch (err) {
        setMessage('Failed to fetch users.');
      } finally {
        setLoadingUsers(false);
      }
    };

    const fetchTests = async () => {
      setLoadingTests(true);
      try {
        const res = await fetch('http://localhost:5000/api/admin/tests', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (res.ok) {
          setTests(data.tests || data || []);
        } else {
          setMessage(data.error || 'Failed to fetch tests');
          setTests([]);
        }
      } catch (err) {
        setMessage('Failed to fetch tests.');
      } finally {
        setLoadingTests(false);
      }
    };

    fetchUsers();
    fetchTests();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!form.userId || !form.testId) {
      setMessage('Please select both user and test.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/admin/assign-test/${form.testId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ studentIds: [form.userId] }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('✅ Test assigned successfully');
        setForm({ userId: '', testId: '' });
      } else {
        setMessage(data.error || 'Failed to assign test');
      }
    } catch (err) {
      setMessage('An error occurred while assigning the test.');
    }
  };

  return (
    <div className="px-6 py-10 max-w-lg mx-auto" data-aos="fade-up">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Assign Test to Student</h2>

        {message && (
          <p className={`mb-4 text-sm font-medium ${message.startsWith('✅') ? 'text-blue-600' : 'text-red-600'}`}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-semibold text-gray-800 mb-1">Select Student</label>
            <select
              value={form.userId}
              onChange={(e) => setForm({ ...form, userId: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
              disabled={loadingUsers}
            >
              <option value="">-- Select User --</option>
              {users.length === 0 && !loadingUsers && <option disabled>No users found</option>}
              {users.map((user) => (
                <option key={user._id || user.id} value={user._id || user.id}>
                  {user.email || user.name || user._id}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-gray-800 mb-1">Select Test</label>
            <select
              value={form.testId}
              onChange={(e) => setForm({ ...form, testId: e.target.value })}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
              required
              disabled={loadingTests}
            >
              <option value="">-- Select Test --</option>
              {tests.length === 0 && !loadingTests && <option disabled>No tests found</option>}
              {tests.map((test) => (
                <option key={test._id || test.id} value={test._id || test.id}>
                  {test.title || test.name || test._id}
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg shadow-md transition-transform active:scale-95"
            disabled={loadingUsers || loadingTests}
          >
            Assign Test
          </button>
        </form>
      </div>
    </div>
  );
}
