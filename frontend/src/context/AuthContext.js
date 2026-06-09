import React, { createContext, useContext, useState } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => { try { return JSON.parse(localStorage.getItem("fs_user")); } catch { return null; } });
  const [toast, setToast] = useState(null);
  const showToast = (msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); };
  const login = (u) => { setUser(u); localStorage.setItem("fs_user", JSON.stringify(u)); };
  const logout = () => { setUser(null); localStorage.removeItem("fs_user"); };
  const headers = { "Content-Type": "application/json", ...(user?.token ? { Authorization: `Bearer ${user.token}` } : {}) };
  const api = process.env.REACT_APP_API_URL || "";
  return (
    <AuthContext.Provider value={{ user, login, logout, headers, showToast, api }}>
      {children}
      {toast && <div className={`toast ${toast.type}`}>{toast.msg}</div>}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);
