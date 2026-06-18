import React, { useState, useEffect } from "react";
import "./Navbar.css";

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <button className="nav-logo" onClick={() => setPage("home")}>
          <img src="/logo.png" alt="FutureSprint" className="logo-img" />
          <div className="logo-text-wrap">
            <span className="logo-name"><span className="logo-f">Future</span><span className="logo-s">Sprint</span></span>
            <span className="logo-tag">Sprint Towards Your Future</span>
          </div>
        </button>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {[["home","Home"],["programs","Programs"],["about","About"],["verify","Verify Cert"],["contact","Contact"]].map(([id,label]) => (
            <button key={id} className={`nav-link ${page===id?"active":""}`} onClick={() => { setPage(id); setMenuOpen(false); }}>{label}</button>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="btn btn-primary btn-sm"
            onClick={() =>
              window.open(
                "https://docs.google.com/forms/d/e/1FAIpQLSdhXU2eln0OXNoUgQMA9GO3D2hvR9NVi6y76U_O3U4C_qQsig/viewform?usp=dialog",
                "_blank"
              )
            }
          >
            Apply Now 🚀
          </button>
        </div>
        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}><span/><span/><span/></button>
      </div>
    </nav>
  );
}
