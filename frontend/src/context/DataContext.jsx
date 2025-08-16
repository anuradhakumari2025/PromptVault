import { createContext, useContext, useState } from "react";

// 1. Context create karo
const DataContext = createContext();

// 2. Provider component banao
export const DataProvider = ({ children }) => {
  const backendUrl = "http://localhost:3000/api/prompts";
  const [user, setUser] = useState(null);

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  return (
    <DataContext.Provider value={{ backendUrl, user, login, logout }}>
      {children}
    </DataContext.Provider>
  );
};

// 3. Custom hook for easy use
export const useData = () => useContext(DataContext);
