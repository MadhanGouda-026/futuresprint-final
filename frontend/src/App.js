import React, { useState } from "react";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Programs from "./pages/Programs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Verify from "./pages/Verify";
import { Login, Register } from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Admin from "./pages/Admin";

function AppContent() {
  const [page, setPage] = useState("home");

  const renderPage = () => {
    switch(page) {
      case "home":      return <Home setPage={setPage} />;
      case "programs":  return <Programs setPage={setPage} />;
      case "about":     return <About setPage={setPage} />;
      case "contact":   return <Contact setPage={setPage} />;
      case "verify":    return <Verify setPage={setPage} />;
      case "login":     return <Login setPage={setPage} />;
      case "register":  return <Register setPage={setPage} />;
      case "dashboard": return <Dashboard setPage={setPage} />;
      case "admin":     return <Admin setPage={setPage} />;
      default:          return <Home setPage={setPage} />;
    }
  };

  return (
    <div>
      {page !== "admin" && <Navbar page={page} setPage={setPage} />}
      {renderPage()}
    </div>
  );
}

export default function App() {
  return <AuthProvider><AppContent /></AuthProvider>;
}
