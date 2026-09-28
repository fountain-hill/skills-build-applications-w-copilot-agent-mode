import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const workoutsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : 'http://localhost:8000/api/workouts/';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch(workoutsUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch workouts');
        }

        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setWorkouts(payload);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  if (loading) return <div className="container py-4">Loading workouts...</div>;
  if (error) return <div className="container py-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2>Workouts</h2>
      <div className="list-group">
        {workouts.map((workout) => (
          <div key={workout._id || workout.name} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{workout.name}</strong>
              <span className="badge bg-warning text-dark">{workout.difficulty || 'Moderate'}</span>
            </div>
            <div className="text-muted mt-2">{workout.category} • {workout.durationMinutes || 0} min</div>
            <div className="small mt-2">{workout.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Workouts;
