import React from "react";
import "./Programs.css";

const PROGRAMS = [
  { icon:"🌐", title:"Web Development", domain:"Web Development", desc:"Build modern websites & web apps using HTML, CSS, JavaScript, React and Node.js.", duration:"8 Weeks", skills:["HTML/CSS","JavaScript","React","Node.js"], color:"#3b82f6" },
  { icon:"🐍", title:"Python Programming", domain:"Python Programming", desc:"Master Python from basics to advanced. Cover OOP, data structures and automation.", duration:"6 Weeks", skills:["Python Basics","OOP","File I/O","Automation"], color:"#f59e0b" },
  { icon:"🤖", title:"AI / ML", domain:"AI / ML", desc:"Explore AI and Machine Learning with hands-on projects using real datasets.", duration:"10 Weeks", skills:["Python","Scikit-learn","TensorFlow","Neural Nets"], color:"#8b5cf6" },
  { icon:"📊", title:"Data Science", domain:"Data Science", desc:"Analyze real datasets, build insights and create visualizations.", duration:"8 Weeks", skills:["Python","Pandas","NumPy","Matplotlib"], color:"#06b6d4" },
  { icon:"🔐", title:"Cybersecurity", domain:"Cybersecurity", desc:"Learn ethical hacking, network security and penetration testing.", duration:"8 Weeks", skills:["Linux","Networking","Ethical Hacking","Kali Linux"], color:"#ef4444" },
  { icon:"☕", title:"Java Development", domain:"Java Development", desc:"Build robust enterprise applications with Core Java and Spring Boot.", duration:"8 Weeks", skills:["Core Java","OOP","Spring Boot","MySQL"], color:"#f97316" },
  { icon:"⚡", title:"Full Stack Development", domain:"Full Stack Development", desc:"Master both frontend and backend. Build complete web apps end-to-end.", duration:"12 Weeks", skills:["React","Node.js","MongoDB","REST APIs"], color:"#10b981" },
];

const APPLY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdhXU2eln0OXNoUgQMA9GO3D2hvR9NVi6y76U_O3U4C_qQsig/viewform?usp=dialog";

export default function Programs() {
  return (
    <div className="programs-page">
      <div className="prog-hero">
        <h1>Internship <span className="grad-text">Programs</span></h1>
        <p>7 in-demand tech domains · 100% Free · No management fee</p>
        <div className="prog-badges">
          <span className="badge badge-cyan">✅ Free Internship</span>
          <span className="badge badge-green">🌐 100% Remote</span>
          <span className="badge badge-blue">🏆 Certificate</span>
        </div>
      </div>

      <div className="section">
        <div className="prog-grid">
          {PROGRAMS.map(p => (
            <div key={p.title} className="prog-card glass-card" style={{"--acc":p.color}}>
              <div className="prog-top" style={{background:`${p.color}15`}}>
                <span className="prog-emoji" style={{filter:`drop-shadow(0 0 14px ${p.color})`}}>{p.icon}</span>
                <span className="badge" style={{background:`${p.color}22`,color:p.color,border:`1px solid ${p.color}44`}}>{p.duration}</span>
              </div>
              <div className="prog-body">
                <h3 style={{color:p.color}}>{p.title}</h3>
                <p>{p.desc}</p>
                <div className="prog-skills">
                  {p.skills.map(s => <span key={s} className="skill-chip">{s}</span>)}
                </div>
                <div className="prog-meta-list">
                  <div className="pml-item"><span>💰</span><span style={{color:"#6ee7b7",fontWeight:600}}>Free Internship</span></div>
                  <div className="pml-item"><span>🏆</span><span style={{color:"#fbbf24",fontWeight:600}}>Certificate </span></div>
                  <div className="pml-item"><span>🌐</span><span style={{color:"#93c5fd",fontWeight:600}}>100% Remote</span></div>
                </div>
                <button className="prog-apply-btn" style={{background:p.color,boxShadow:`0 4px 18px ${p.color}55`}}
                  onClick={() => window.open(APPLY_URL,"_blank")}>
                  Apply Now — Free! 🚀
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cert-box glass-card">
          <div className="cert-box-icon">🏆</div>
          <div>
            <h3>Verified Certificate <span style={{color:"#fbbf24"}}></span></h3>
            <p>After completing your internship, get a professionally designed, QR-verified certificate with a unique Certificate ID. Employers can verify it online instantly.</p>
            <div style={{display:"flex",gap:10,marginTop:14,flexWrap:"wrap"}}>
              <span className="badge badge-cyan">🔍 QR Verified</span>
              <span className="badge badge-green">🆔 Unique Certificate ID</span>
              <span className="badge badge-blue">📥 Instant Download</span>
              <span className="badge badge-blue">✅ Employer Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
