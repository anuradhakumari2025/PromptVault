import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>PromptVault</h2>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/myprompts">My Prompts</Link>
      <Link to="/community">Community Prompts</Link>
      <Link to="/addprompt">Add Prompt</Link>
      <Link to="/tags">Tags</Link>
      <Link to="/settings">Settings</Link>
    </div>
  );
};

export default Sidebar;
