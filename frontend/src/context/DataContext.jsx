import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// 1. Context create karo
const DataContext = createContext();

// 2. Provider component banao
export const DataProvider = ({ children }) => {
  const backendUrl = "http://localhost:3000/api";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
        setLoading(false);

  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // keep in sync
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <DataContext.Provider value={{ backendUrl, user, login, logout, navigate,loading }}>
      {children}
    </DataContext.Provider>
  );
};

// 3. Custom hook for easy use
export const useData = () => useContext(DataContext);
