import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const APPLY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdhXU2eln0OXNoUgQMA9GO3D2hvR9NVi6y76U_O3U4C_qQsig/viewform?usp=dialog";
const statusColor = { pending:"badge-blue", approved:"badge-green", rejected:"badge-red", completed:"badge-cyan" };
const statusIcon = { pending:"⏳", approved:"✅", rejected:"❌", completed:"🏆" };

export default function Dashboard({ setPage }) {
  const { user, headers, api } = useAuth();
  const [apps, setApps] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch(`${api}/api/applications/my`,{headers}).then(r=>r.json()),
      fetch(`${api}/api/certificates/my`,{headers}).then(r=>r.json()),
    ]).then(([a,c]) => { setApps(Array.isArray(a)?a:[]); setCerts(Array.isArray(c)?c:[]); setLoading(false); })
    .catch(()=>setLoading(false));
  },[]);

  if (loading) return <div className="page-loading"><div className="spinner"/></div>;

  return (
    <div style={{paddingTop:80,animation:"fadeUp 0.4s ease"}}>
      <div style={{background:"linear-gradient(135deg,rgba(30,58,138,0.5),rgba(6,182,212,0.15))",padding:"40px 24px",borderBottom:"1px solid var(--border)",display:"flex",alignItems:"center",justifyContent:"space-between",gap:20,flexWrap:"wrap"}}>
        <div style={{display:"flex",alignItems:"center",gap:16}}>
          <div style={{width:60,height:60,background:"var(--grad-btn)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26,fontWeight:700,color:"#fff",boxShadow:"0 0 20px var(--glow)"}}>{user?.name[0]}</div>
          <div>
            <h1 style={{fontSize:24,fontWeight:800,marginBottom:4}}>Welcome, <span className="grad-text">{user?.name?.split(" ")[0]}!</span></h1>
            <p style={{color:"var(--gray)",fontSize:13}}>{user?.college} · {user?.course} · {user?.year}</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={()=>window.open(APPLY_URL,"_blank")}>Apply for Internship 🚀</button>
      </div>

      <div style={{maxWidth:1100,margin:"0 auto",padding:"32px 24px"}}>
        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16,marginBottom:32}}>
          {[["📋",apps.length,"Applications","#3b82f6"],["✅",apps.filter(a=>a.status==="approved").length,"Approved","#10b981"],["🏆",certs.length,"Certificates","#f59e0b"],["⏳",apps.filter(a=>a.status==="pending").length,"Pending","#8b5cf6"]].map(([ic,v,l,c])=>(
            <div key={l} className="glass-card" style={{padding:24,textAlign:"center"}}>
              <div style={{fontSize:28,marginBottom:8}}>{ic}</div>
              <div style={{fontFamily:"'Outfit',sans-serif",fontSize:32,fontWeight:900,color:c,marginBottom:4}}>{v}</div>
              <div style={{fontSize:13,color:"var(--gray)"}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Applications */}
        <h2 className="grad-text2" style={{fontSize:22,fontWeight:800,marginBottom:16}}>My Applications</h2>
        {apps.length === 0 ? (
          <div className="glass-card" style={{padding:48,textAlign:"center"}}>
            <div style={{fontSize:48,marginBottom:12}}>📋</div>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:6}}>No Applications Yet</h3>
            <p style={{color:"var(--gray)",marginBottom:20,fontSize:14}}>Apply for a free internship to get started!</p>
            <button className="btn btn-primary" onClick={()=>window.open(APPLY_URL,"_blank")}>Apply Now 🚀</button>
          </div>
        ) : (
          <div style={{display:"flex",flexDirection:"column",gap:14,marginBottom:40}}>
            {apps.map(app => (
              <div key={app._id} className="glass-card" style={{padding:"20px 24px"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
                  <div>
                    <h3 style={{fontSize:17,fontWeight:700,marginBottom:2}}>{app.internship?.title || "Internship"}</h3>
                    <p style={{color:"var(--gray)",fontSize:13}}>{app.internship?.domain}</p>
                  </div>
                  <span className={`badge ${statusColor[app.status]}`}>{statusIcon[app.status]} {app.status?.toUpperCase()}</span>
                </div>
                <div style={{display:"flex",gap:16,fontSize:12,color:"var(--gray)",flexWrap:"wrap"}}>
                  <span>📅 Applied: {new Date(app.appliedAt).toLocaleDateString("en-IN")}</span>
                  {app.internship?.duration && <span>⏱️ {app.internship.duration}</span>}
                </div>
                {app.status==="completed" && <div style={{background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:8,padding:"10px 14px",fontSize:13,color:"#6ee7b7",fontWeight:600,marginTop:10}}>🏆 Completed! Certificate issued.</div>}
              </div>
            ))}
          </div>
        )}

        {/* Certificates */}
        {certs.length > 0 && (
          <>
            <h2 className="grad-text2" style={{fontSize:22,fontWeight:800,marginBottom:16}}>My Certificates</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
              {certs.map(cert => (
                <div key={cert._id} className="glass-card" style={{padding:24}}>
                  <div style={{display:"flex",alignItems:"center",gap:10,paddingBottom:14,borderBottom:"1px solid var(--border)",marginBottom:12}}>
                    <img src="/logo.png" alt="FS" style={{width:36,height:36,objectFit:"contain"}}/>
                    <div><div style={{fontSize:10,color:"var(--gray)",letterSpacing:"0.1em",textTransform:"uppercase"}}>Certificate of Completion</div><div style={{fontWeight:700,color:"#60a5fa",fontSize:13}}>{cert.certificateId}</div></div>
                  </div>
                  <h3 style={{fontSize:16,fontWeight:700,marginBottom:4}}>{cert.studentName}</h3>
                  <p style={{color:"var(--gray)",fontSize:13,marginBottom:10}}>{cert.internshipTitle}</p>
                  <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
                    <span className="badge badge-cyan">{cert.domain}</span>
                    <span className="badge badge-blue">{cert.duration}</span>
                  </div>
                  {cert.qrCode && <img src={cert.qrCode} alt="QR" style={{width:72,height:72,borderRadius:6,marginBottom:10}}/>}
                  <button className="btn btn-outline btn-sm" style={{width:"100%",justifyContent:"center"}} onClick={()=>setPage("verify")}>Verify →</button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
