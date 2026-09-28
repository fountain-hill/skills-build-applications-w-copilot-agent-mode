import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getLeaderboardUrl = () => `${getApiBaseUrl()}/api/leaderboard/`;

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(getLeaderboardUrl());
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }

        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setEntries(payload);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <div className="container py-4">Loading leaderboard...</div>;
  if (error) return <div className="container py-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      <div className="list-group">
        {entries.map((entry) => (
          <div key={entry._id || entry.user?._id || entry.rank} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-dark me-3">#{entry.rank || 1}</span>
              {entry.user?.name || 'User'}
            </div>
            <strong>{entry.score || 0} pts</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
