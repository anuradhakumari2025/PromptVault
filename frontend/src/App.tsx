import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Community from "./pages/Community";

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="p-4 bg-slate-950 shadow flex items-center gap-6">
        <Link to="/">
          <h2 className="font-semibold text-white text-xl"> PromptVault</h2>
        </Link>
        <Link to="/community">
          <h2 className="text-lg text-gray-300"> Community</h2>
        </Link>
      </nav>
      <main className="p-6 ">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/community" element={<Community />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
