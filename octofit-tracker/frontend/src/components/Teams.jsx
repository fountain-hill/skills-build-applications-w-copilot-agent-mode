import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const teamsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await fetch(teamsUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch teams');
        }

        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setTeams(payload);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  if (loading) return <div className="container py-4">Loading teams...</div>;
  if (error) return <div className="container py-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2>Teams</h2>
      <div className="list-group">
        {teams.map((team) => (
          <div key={team._id || team.name} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{team.name}</strong>
              <span className="badge bg-success">{team.members?.length || 0} members</span>
            </div>
            <div className="text-muted mt-2">{team.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teams;
