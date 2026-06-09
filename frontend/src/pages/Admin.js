import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const statusColor = { pending:"badge-blue", approved:"badge-green", rejected:"badge-red", completed:"badge-cyan" };

export default function Admin({ setPage }) {
  const { user, headers, api, showToast } = useAuth();
  const [tab, setTab] = useState("overview");
  const [stats, setStats] = useState({});
  const [students, setStudents] = useState([]);
  const [applications, setApplications] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [certForm, setCertForm] = useState({ studentId:"", studentName:"", internshipTitle:"", domain:"", duration:"" });
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    if (user?.role !== "admin") { setPage("home"); return; }
    loadAll();
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [s,st,ap,ce] = await Promise.all([
        fetch(`${api}/api/admin/stats`,{headers}).then(r=>r.json()),
        fetch(`${api}/api/admin/students`,{headers}).then(r=>r.json()),
        fetch(`${api}/api/applications`,{headers}).then(r=>r.json()),
        fetch(`${api}/api/certificates`,{headers}).then(r=>r.json()),
      ]);
      setStats(s||{}); setStudents(Array.isArray(st)?st:[]); setApplications(Array.isArray(ap)?ap:[]); setCertificates(Array.isArray(ce)?ce:[]);
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  const approveApp = async (id, status) => {
    await fetch(`${api}/api/applications/${id}/status`,{method:"PUT",headers,body:JSON.stringify({status})});
    showToast(`Application ${status}! ✅`); loadAll();
  };

  const approveStudent = async (id) => {
    await fetch(`${api}/api/admin/students/${id}/approve`,{method:"PUT",headers});
    showToast("Student approved! ✅"); loadAll();
  };

  const generateCert = async () => {
    if (!certForm.studentId||!certForm.studentName||!certForm.internshipTitle) return showToast("Fill all fields","error");
    setGenerating(true);
    try {
      const res = await fetch(`${api}/api/certificates/generate`,{method:"POST",headers,body:JSON.stringify(certForm)});
      const data = await res.json();
      if (!res.ok) return showToast(data.message,"error");
      showToast(`Certificate generated! ID: ${data.certificateId} 🏆`);
      setCertForm({studentId:"",studentName:"",internshipTitle:"",domain:"",duration:""});
      loadAll();
    } catch { showToast("Error","error"); }
    finally { setGenerating(false); }
  };

  const TABS = [["overview","📊","Overview"],["students","👨‍🎓","Students"],["applications","📋","Applications"],["certificates","🏆","Certificates"],["generate","✨","Generate Cert"]];

  const tdStyle = { padding:"14px 16px", fontSize:14, borderBottom:"1px solid rgba(59,130,246,0.08)", verticalAlign:"middle" };
  const thStyle = { padding:"14px 16px", textAlign:"left", fontSize:12, fontWeight:700, color:"var(--gray)", textTransform:"uppercase", letterSpacing:"0.06em", borderBottom:"1px solid var(--border)" };

  if (loading) return <div className="page-loading"><div className="spinner"/></div>;

  return (
    <div style={{ display:"flex", minHeight:"100vh" }}>
      {/* Sidebar */}
      <div style={{ width:240, minHeight:"100vh", background:"rgba(10,14,26,0.98)", borderRight:"1px solid var(--border)", padding:"24px 16px", display:"flex", flexDirection:"column", gap:6, position:"fixed", top:0, bottom:0, left:0, zIndex:200, backdropFilter:"blur(20px)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 8px 20px", borderBottom:"1px solid var(--border)", marginBottom:8 }}>
          <img src="/logo.png" alt="FS" style={{ width:36, height:36, objectFit:"contain" }}/>
          <div>
            <div style={{ fontFamily:"'Outfit',sans-serif", fontWeight:800, fontSize:16 }}>
              <span style={{color:"#93c5fd"}}>Future</span><span style={{color:"var(--blue3)"}}>Sprint</span>
            </div>
            <div style={{ fontSize:10, color:"var(--gray)" }}>Admin Panel</div>
          </div>
        </div>
        {TABS.map(([id,ic,label]) => (
          <button key={id} onClick={()=>setTab(id)} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, background:tab===id?"rgba(37,99,235,0.2)":"transparent", border:"none", color:tab===id?"var(--blue3)":"rgba(255,255,255,0.6)", fontSize:14, fontWeight:tab===id?600:500, cursor:"pointer", transition:"all 0.2s", textAlign:"left" }}>
            <span>{ic}</span>{label}
          </button>
        ))}
        <button onClick={()=>setPage("home")} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 14px", borderRadius:10, background:"transparent", border:"none", color:"#fca5a5", fontSize:14, fontWeight:500, cursor:"pointer", marginTop:"auto" }}>← Back to Site</button>
      </div>

      {/* Main */}
      <div style={{ marginLeft:240, flex:1, padding:"40px 32px" }}>

        {/* OVERVIEW */}
        {tab==="overview" && (
          <div>
            <h1 className="grad-text2" style={{fontSize:28,fontWeight:800,marginBottom:28}}>Admin Overview</h1>
            <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:20}}>
              {[["👨‍🎓","Total Students",stats.students||0,"#3b82f6"],["📋","Applications",stats.applications||0,"#8b5cf6"],["⏳","Pending",stats.pending||0,"#f59e0b"],["✅","Approved",stats.approved||0,"#10b981"],["🏆","Certificates",stats.certificates||0,"#06b6d4"],["💼","Programs",stats.internships||0,"#ef4444"]].map(([ic,l,v,c])=>(
                <div key={l} className="glass-card" style={{padding:28,textAlign:"center"}}>
                  <div style={{fontSize:32,marginBottom:8}}>{ic}</div>
                  <div style={{fontFamily:"'Outfit',sans-serif",fontSize:36,fontWeight:900,color:c}}>{v}</div>
                  <div style={{fontSize:13,color:"var(--gray)"}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STUDENTS */}
        {tab==="students" && (
          <div>
            <h1 className="grad-text2" style={{fontSize:28,fontWeight:800,marginBottom:24}}>Students ({students.length})</h1>
            <div className="glass-card" style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr><th style={thStyle}>Name</th><th style={thStyle}>Email</th><th style={thStyle}>College</th><th style={thStyle}>Course</th><th style={thStyle}>Status</th><th style={thStyle}>Action</th></tr></thead>
                <tbody>
                  {students.map(s=>(
                    <tr key={s._id} style={{}}>
                      <td style={tdStyle}><b>{s.name}</b></td>
                      <td style={{...tdStyle,color:"var(--gray)",fontSize:13}}>{s.email}</td>
                      <td style={{...tdStyle,fontSize:13}}>{s.college||"-"}</td>
                      <td style={{...tdStyle,fontSize:13}}>{s.course||"-"}</td>
                      <td style={tdStyle}><span className={`badge ${s.isApproved?"badge-green":"badge-blue"}`}>{s.isApproved?"Active":"Pending"}</span></td>
                      <td style={tdStyle}>{!s.isApproved ? <button className="btn btn-primary btn-sm" onClick={()=>approveStudent(s._id)}>Approve</button> : <span style={{color:"#6ee7b7",fontSize:13}}>✅ Active</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* APPLICATIONS */}
        {tab==="applications" && (
          <div>
            <h1 className="grad-text2" style={{fontSize:28,fontWeight:800,marginBottom:24}}>Applications ({applications.length})</h1>
            <div className="glass-card" style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr><th style={thStyle}>Student</th><th style={thStyle}>Program</th><th style={thStyle}>Status</th><th style={thStyle}>Date</th><th style={thStyle}>Actions</th></tr></thead>
                <tbody>
                  {applications.map(a=>(
                    <tr key={a._id}>
                      <td style={tdStyle}><b>{a.student?.name}</b><div style={{fontSize:12,color:"var(--gray)"}}>{a.student?.email}</div></td>
                      <td style={tdStyle}><b>{a.internship?.title}</b><div style={{fontSize:12,color:"var(--gray)"}}>{a.internship?.domain}</div></td>
                      <td style={tdStyle}><span className={`badge ${statusColor[a.status]}`}>{a.status?.toUpperCase()}</span></td>
                      <td style={{...tdStyle,fontSize:13,color:"var(--gray)"}}>{new Date(a.appliedAt).toLocaleDateString("en-IN")}</td>
                      <td style={tdStyle}>
                        {a.status==="pending" ? (
                          <div style={{display:"flex",gap:6}}>
                            <button className="btn btn-sm" style={{background:"rgba(16,185,129,0.2)",color:"#6ee7b7",border:"1px solid rgba(16,185,129,0.3)"}} onClick={()=>approveApp(a._id,"approved")}>✅</button>
                            <button className="btn btn-sm" style={{background:"rgba(239,68,68,0.2)",color:"#fca5a5",border:"1px solid rgba(239,68,68,0.3)"}} onClick={()=>approveApp(a._id,"rejected")}>❌</button>
                          </div>
                        ) : <span style={{fontSize:13,color:"var(--gray)"}}>—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* CERTIFICATES */}
        {tab==="certificates" && (
          <div>
            <h1 className="grad-text2" style={{fontSize:28,fontWeight:800,marginBottom:24}}>Certificates ({certificates.length})</h1>
            <div className="glass-card" style={{overflowX:"auto"}}>
              <table style={{width:"100%",borderCollapse:"collapse"}}>
                <thead><tr><th style={thStyle}>Certificate ID</th><th style={thStyle}>Student</th><th style={thStyle}>Program</th><th style={thStyle}>Domain</th><th style={thStyle}>Issue Date</th><th style={thStyle}>Status</th></tr></thead>
                <tbody>
                  {certificates.map(c=>(
                    <tr key={c._id}>
                      <td style={tdStyle}><b style={{color:"#60a5fa"}}>{c.certificateId}</b></td>
                      <td style={tdStyle}>{c.studentName}</td>
                      <td style={{...tdStyle,fontSize:13}}>{c.internshipTitle}</td>
                      <td style={tdStyle}><span className="badge badge-cyan">{c.domain}</span></td>
                      <td style={{...tdStyle,fontSize:13,color:"var(--gray)"}}>{new Date(c.issueDate).toLocaleDateString("en-IN")}</td>
                      <td style={tdStyle}><span className={`badge ${c.isValid?"badge-green":"badge-red"}`}>{c.isValid?"Valid":"Revoked"}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* GENERATE CERT */}
        {tab==="generate" && (
          <div>
            <h1 className="grad-text2" style={{fontSize:28,fontWeight:800,marginBottom:24}}>Generate Certificate</h1>
            <div className="glass-card" style={{padding:36,maxWidth:700}}>
              <p style={{color:"var(--gray)",marginBottom:24,fontSize:14}}>Fill in the details to generate a verified certificate with unique ID and QR code.</p>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 20px"}}>
                <div className="form-group"><label>Student ID (MongoDB _id)</label><input className="input" placeholder="Paste student's _id" value={certForm.studentId} onChange={e=>setCertForm(f=>({...f,studentId:e.target.value}))}/></div>
                <div className="form-group"><label>Student Name</label><input className="input" placeholder="Full name on certificate" value={certForm.studentName} onChange={e=>setCertForm(f=>({...f,studentName:e.target.value}))}/></div>
                <div className="form-group"><label>Internship Title</label><input className="input" placeholder="e.g. Web Development" value={certForm.internshipTitle} onChange={e=>setCertForm(f=>({...f,internshipTitle:e.target.value}))}/></div>
                <div className="form-group"><label>Domain</label>
                  <select className="input" value={certForm.domain} onChange={e=>setCertForm(f=>({...f,domain:e.target.value}))}>
                    <option value="">Select Domain</option>
                    {["Web Development","Python Programming","AI / ML","Data Science","Cybersecurity","Java Development","Full Stack Development"].map(d=><option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group"><label>Duration</label><input className="input" placeholder="e.g. 8 Weeks" value={certForm.duration} onChange={e=>setCertForm(f=>({...f,duration:e.target.value}))}/></div>
              </div>
              <button className="btn btn-primary btn-lg" onClick={generateCert} disabled={generating} style={{marginTop:8}}>
                {generating ? "Generating..." : "Generate Certificate 🏆"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
