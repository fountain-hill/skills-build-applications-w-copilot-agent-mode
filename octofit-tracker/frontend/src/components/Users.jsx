import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

const usersUrl = `${apiBaseUrl}/api/users/`;

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(usersUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setUsers(payload);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="container py-4">Loading users...</div>;
  if (error) return <div className="container py-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2>Users</h2>
      <div className="list-group">
        {users.map((user) => (
          <div key={user._id || user.email || user.name} className="list-group-item">
            <div className="d-flex justify-content-between">
              <strong>{user.name}</strong>
              <span className="badge bg-primary">{user.fitnessLevel || 'General'}</span>
            </div>
            <div className="text-muted">{user.email}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
