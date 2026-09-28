import { Routes, Route, NavLink } from 'react-router-dom';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

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
              <span className="badge bg-primary-subtle text-primary-emphasis rounded-pill px-3 py-2">User profiles</span>
              <span className="badge bg-success-subtle text-success-emphasis rounded-pill px-3 py-2">Activity tracking</span>
              <span className="badge bg-warning-subtle text-warning-emphasis rounded-pill px-3 py-2">Leaderboards</span>
              <span className="badge bg-info-subtle text-info-emphasis rounded-pill px-3 py-2">Team management</span>
            </div>
          </div>
        </div>
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
            <NavLink className="nav-link" to="/users">Users</NavLink>
            <NavLink className="nav-link" to="/teams">Teams</NavLink>
            <NavLink className="nav-link" to="/activities">Activities</NavLink>
            <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
            <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </>
  );
}

export default App;
