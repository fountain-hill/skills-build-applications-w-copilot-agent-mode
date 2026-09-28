import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev`;
  }

  return 'http://localhost:8000';
};

const getActivitiesUrl = () => `${getApiBaseUrl()}/api/activities/`;

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await fetch(getActivitiesUrl());
        if (!response.ok) {
          throw new Error('Failed to fetch activities');
        }

        const data = await response.json();
        const payload = Array.isArray(data) ? data : data.results || [];
        setActivities(payload);
      } catch (err) {
        setError(err.message || 'Something went wrong');
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) return <div className="container py-4">Loading activities...</div>;
  if (error) return <div className="container py-4 text-danger">Error: {error}</div>;

  return (
    <div className="container py-4">
      <h2>Activities</h2>
      <div className="list-group">
        {activities.map((activity) => (
          <div key={activity._id || activity.type} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <strong>{activity.type}</strong>
              <span className="badge bg-info text-dark">{activity.durationMinutes} min</span>
            </div>
            <div className="text-muted mt-2">Calories: {activity.caloriesBurned || 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Activities;
