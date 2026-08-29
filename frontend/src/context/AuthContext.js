import { createContext, useContext, useState, useEffect, useCallback } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const { data } = await API.get("/auth/me");
      if (data.success && data.admin) {
        setAdmin(data.admin);
      }
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (email, password) => {
    const { data } = await API.post("/auth/login", { email, password });
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    setAdmin(data.admin);
    return data;
  };

  const logout = async () => {
    try {
      await API.post("/auth/logout");
    } catch {}
    localStorage.removeItem("token");
    setAdmin(null);
    window.location.href = "/admin/login";
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
