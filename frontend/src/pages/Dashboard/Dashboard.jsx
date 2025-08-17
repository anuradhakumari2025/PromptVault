import { useData } from "../../context/DataContext";
import "./Dashboard.css";

function Dashboard() {
  const { user, logout ,theme, toggleTheme} = useData();

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome, {user?.username || "User"} 👋</h1>
        <div className="header-actions">
          <button onClick={toggleTheme} className="theme-btn">
            {theme === "light" ? <i className="ri-moon-line"></i> : <i className="ri-sun-fill"></i>}
          </button>
          <button onClick={logout} className="logout-btn">
            Logout <i className="ri-logout-box-r-line"></i>
          </button>
        </div>
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
