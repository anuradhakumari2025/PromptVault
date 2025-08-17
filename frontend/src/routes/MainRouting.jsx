import { Routes, Route, Navigate } from "react-router-dom";
import { useData } from "../context/DataContext";

import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import CommunityPrompts from "../pages/CommunityPrompts/CommunityPrompts";
import MyPrompts from "../pages/MyPrompts/MyPrompts";
import AddPrompt from "../pages/AddPrompt/AddPrompt";
import Register from "../pages/Register/Register";
import Sidebar from "../components/Sidebar/Sidebar";
import Settings from "../components/Settings/Settings";

function PrivateRoute({ children }) {
  const { user,loading } = useData();
  if (loading) {
    // return spinner/placeholder while hydrating
    return <div>Loading...</div>;
  }
  return user ? children : <Navigate to="/login" />;
}

function Layout() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myprompts" element={<MyPrompts />} />
          <Route path="/community" element={<CommunityPrompts />} />
          <Route path="/addprompt" element={<AddPrompt />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

function MainRouting() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Layout />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default MainRouting;
