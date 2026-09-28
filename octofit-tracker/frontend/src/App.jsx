import { Routes, Route, NavLink } from 'react-router-dom';

function HomePage() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm border-0 rounded-4 p-4">
            <div className="d-flex align-items-center mb-3">
              <img
                src="/docs/octofitapp-small.png"
                alt="Octofit app logo"
                className="me-3"
                style={{ width: '56px', height: '56px', objectFit: 'cover' }}
              />
              <div>
                <p className="text-uppercase text-muted mb-1">Workout tracker</p>
                <h1 className="display-6 mb-0">Octofit Tracker</h1>
              </div>
            </div>

            <p className="lead text-secondary">
              Track workouts, build stronger habits, and stay motivated with your
              team through leaderboards, goals, and personalized progress insights.
            </p>

            <div className="d-flex flex-wrap gap-2 mt-4">
              <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill px-3 py-2">
                User profiles
              </span>
              <span className="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-2">
                Activity tracking
              </span>
              <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-3 py-2">
                Leaderboards
              </span>
              <span className="badge bg-info-subtle text-info-emphasis rounded-pill px-3 py-2">
                Team management
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LeaderboardPage() {
  return (
    <div className="container py-5">
      <h2 className="mb-4">Leaderboard</h2>
      <div className="list-group">
        {[
          ['Ava', 980],
          ['Noah', 945],
          ['Mila', 920],
          ['Leo', 890],
        ].map(([name, score], index) => (
          <div key={name} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <span className="badge bg-dark me-3">#{index + 1}</span>
              {name}
            </div>
            <strong>{score} pts</strong>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-bold">Octofit</span>
          <div className="navbar-nav ms-auto">
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} />
      </Routes>
    </>
  );
}

export default App;
