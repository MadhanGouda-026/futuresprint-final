import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import "./Home.css";

const DOMAINS = [
  { icon:"🌐", title:"Web Development", desc:"Build modern websites & web apps with React, Node.js", color:"#3b82f6" },
  { icon:"🐍", title:"Python Programming", desc:"Master Python from basics to advanced automation", color:"#f59e0b" },
  { icon:"🤖", title:"AI / ML", desc:"Explore Artificial Intelligence & Machine Learning", color:"#8b5cf6" },
  { icon:"📊", title:"Data Science", desc:"Analyze data and build powerful visualizations", color:"#06b6d4" },
  { icon:"🔐", title:"Cybersecurity", desc:"Learn ethical hacking & network security", color:"#ef4444" },
  { icon:"☕", title:"Java Development", desc:"Build robust apps with Java & Spring Boot", color:"#f97316" },
  { icon:"⚡", title:"Full Stack Development", desc:"Master both frontend & backend development", color:"#10b981" },
];

export default function Home({ setPage }) {
  const { api } = useAuth();
  const [particles] = useState(Array.from({ length: 25 }, (_, i) => ({
    id: i, x: Math.random() * 100, y: Math.random() * 100,
    size: Math.random() * 4 + 2, delay: Math.random() * 6, dur: Math.random() * 4 + 3,
  })));

  const openForm = () => window.open("https://docs.google.com/forms/d/e/1FAIpQLSdhXU2eln0OXNoUgQMA9GO3D2hvR9NVi6y76U_O3U4C_qQsig/viewform?usp=dialog","_blank");

  return (
    <div className="home">
      <div className="particles">
        {particles.map(p => <div key={p.id} className="particle" style={{ left:`${p.x}%`, top:`${p.y}%`, width:p.size, height:p.size, animationDelay:`${p.delay}s`, animationDuration:`${p.dur}s` }} />)}
      </div>

      {/* HERO */}
      <section className="hero">
        <div className="hero-glow" />
        <div className="hero-content">
          <div className="hero-badge">🎓 Free Internship · No any hidden fees</div>
          <h1 className="hero-title">
            <span className="grad-text2">Sprint Towards</span><br/>
            <span className="grad-text">Your Future</span>
          </h1>
          <p className="hero-sub">Join now and gaining real-world experience through free internships. Get a verified certificate and launch your career.</p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-lg glow-btn" onClick={openForm}>Apply Now — Free! 🚀</button>
            <button className="btn btn-outline btn-lg" onClick={() => setPage("programs")}>View Programs →</button>
          </div>
          <div className="hero-cert-note">🏆 Verified Certificate available<strong style={{color:"#fbbf24"}}></strong> after completion</div>
          <div className="hero-stats">
            {[["7","Programs"],["₹0","Management fee"],["100%","Remote"]].map(([v,l]) => (
              <div key={l} className="hstat"><div className="hstat-val grad-text">{v}</div><div className="hstat-label">{l}</div></div>
            ))}
          </div>
        </div>
        <div className="hero-3d">
          <div className="cube-wrap">
            <div className="cube">
              <div className="cube-face front">🚀</div>
              <div className="cube-face back">🏆</div>
              <div className="cube-face left">💻</div>
              <div className="cube-face right">🎓</div>
              <div className="cube-face top">⭐</div>
              <div className="cube-face bottom">🌟</div>
            </div>
          </div>
          <div className="float-card fc1 glass-card"><span>🏆</span><div><b>Certificate Issued!</b><br/><small>Priya S. · Web Dev</small></div></div>
          <div className="float-card fc2 glass-card"><span>✅</span><div><b>Application Approved!</b><br/><small>Ravi K. · Data Science</small></div></div>
          <div className="float-card fc3 glass-card"><span>🎉</span><div><b>Project Submitted!</b><br/><small>Ananya M. · AI/ML</small></div></div>
        </div>
      </section>

      {/* DOMAINS */}
      <section className="section">
        <div style={{textAlign:"center",marginBottom:48}}>
          <h2 className="section-title grad-text2">7 Internship Programs</h2>
          <p style={{color:"var(--gray)",marginTop:8}}>Free internship · 100% Remote · No Fee</p>
        </div>
        <div className="domains-grid">
          {DOMAINS.map(d => (
            <div key={d.title} className="domain-card glass-card" style={{"--acc":d.color}}>
              <div className="dc-top" style={{background:`${d.color}15`}}>
                <span className="dc-icon" style={{filter:`drop-shadow(0 0 12px ${d.color})`}}>{d.icon}</span>
              </div>
              <div className="dc-body">
                <h3 style={{color:d.color}}>{d.title}</h3>
                <p>{d.desc}</p>
                <div style={{display:"flex",gap:6,marginBottom:14,flexWrap:"wrap"}}>
                  <span className="badge badge-cyan">Free</span>
                  <span className="badge badge-green">Remote</span>
                  <span className="badge badge-blue">Completely Free</span>
                </div>
                <button className="dc-btn" style={{background:d.color,boxShadow:`0 4px 16px ${d.color}55`}} onClick={openForm}>Apply Now →</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-section">
        <div className="section">
          <div style={{textAlign:"center",marginBottom:48}}>
            <h2 className="section-title grad-text2">How It Works</h2>
            <p style={{color:"var(--gray)",marginTop:8}}>4 simple steps to get your certificate</p>
          </div>
          <div className="steps-row">
            {[
              {n:"01",icon:"📝",title:"Fill Application",desc:"Click Apply Now and fill the Google Form — takes 2 minutes"},
              {n:"02",icon:"✅",title:"Get Approved",desc:"Admin reviews and approves your application within 24hrs"},
              {n:"03",icon:"💻",title:"Complete Tasks",desc:"Work on assigned projects and submit your GitHub link"},
              {n:"04",icon:"🏆",title:"Get Certificate",desc:"Pay management fee ₹49 and download your QR-verified certificate"},
            ].map((s,i) => (
              <div key={s.n} className="step-item">
                <div className="step-num">{s.n}</div>
                <div className="step-icon-box glass-card">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                {i<3 && <div className="step-arrow">→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="section">
        <div style={{textAlign:"center",marginBottom:48}}>
          <h2 className="section-title grad-text2">Why FutureSprint?</h2>
        </div>
        <div className="grid-3">
          {[
            {icon:"💸",title:"100% Free",desc:"No fees. Apply, learn and grow completely free.",c:"#10b981"},
            {icon:"🏆",title:"No Management Fee",desc:"No any hidden fees after completion.",c:"#f59e0b"},
            {icon:"🌐",title:"100% Remote",desc:"Work from anywhere in India. No relocation needed.",c:"#3b82f6"},
            {icon:"💼",title:"Real Projects",desc:"Work on actual industry projects, not dummy assignments.",c:"#8b5cf6"},
            {icon:"🔍",title:"Verifiable ID",desc:"Each certificate has a unique ID that employers can verify.",c:"#06b6d4"},
            {icon:"🎯",title:"7 Domains",desc:"Choose from 7 in-demand tech domains.",c:"#ef4444"},
          ].map(f => (
            <div key={f.title} className="why-card glass-card">
              <div style={{fontSize:36,marginBottom:12}}>{f.icon}</div>
              <h3 style={{color:f.c,marginBottom:6}}>{f.title}</h3>
              <p style={{fontSize:13,color:"var(--gray)"}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-glow" />
        <h2 className="grad-text2">Ready to Sprint Into Your Future?</h2>
        <p>Free internship · 7 Domains · 100% Remote</p>
        <button className="btn btn-primary btn-lg glow-btn" onClick={openForm}>Apply Now — It's FREE! 🚀</button>
        <p style={{marginTop:14,fontSize:13,color:"#fbbf24"}}>Certificate available after completion</p>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/logo.png" alt="FutureSprint" style={{width:40,height:40,objectFit:"contain"}}/>
            <div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontWeight:800,fontSize:17}}><span style={{color:"#93c5fd"}}>Future</span><span style={{color:"var(--blue3)"}}>Sprint</span></div>
              <div style={{fontSize:10,color:"var(--gray)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Sprint Towards Your Future</div>
            </div>
          </div>
          <div style={{color:"var(--gray)",fontSize:13}}>© 2024 FutureSprint. All rights reserved.</div>
        </div>
      </footer>
    </div>
  );
}
