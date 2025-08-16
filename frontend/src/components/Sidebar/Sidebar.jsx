import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
// import { Menu, X } from "lucide-react";
import "./Sidebar.css"
const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "My Prompts", path: "/myprompts" },
    { name: "Community", path: "/community" },
    { name: "Add Prompt", path: "/addprompt" },
    { name: "Tags", path: "/tags" },
    { name: "Settings", path: "/settings" },
  ];

  return (
    <div className="sidebar-container">
      {/* Mobile Toggle Button */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        {open ? "X" :"Menu"}
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${open ? "open" : ""}`}>
        <h2 className="logo">PromptVault</h2>
        <nav className="nav-links">
          {links.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)}  className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>
              {link.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
