import { useData } from "../../context/DataContext";
import "./Dashboard.css"
function Dashboard() {
  const { user, logout } = useData();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.username || "User"} 👋</h1>
        <button onClick={logout} className="logout-btn">
          Logout
        </button>
      </header>

      <section className="dashboard-content">
        <div className="card">
          <h2>Your Prompts</h2>
          <p>Manage and explore your saved prompts.</p>
        </div>
        <div className="card">
          <h2>Community</h2>
          <p>Check out trending prompts from other users.</p>
        </div>
        <div className="card">
          <h2>Settings</h2>
          <p>Update your profile and preferences.</p>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
