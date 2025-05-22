import React, { useEffect, useState } from 'react';

export default function AdminViewResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/auth/users');
        if (!res.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await res.json();
        setUsers(data.users || []); // Adjust depending on your API response structure
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Server error');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading users...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Registered Users</h1>
      {users.length === 0 ? (
        <p className="text-center text-gray-600">No users found.</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-green-200">
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Email</th>
              <th className="border border-gray-300 p-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ _id, name, email, role }) => (
              <tr key={_id} className="hover:bg-green-50">
                <td className="border border-gray-300 p-2">{name}</td>
                <td className="border border-gray-300 p-2">{email}</td>
                <td className="border border-gray-300 p-2 capitalize">{role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
