import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Verify() {
  const { api } = useAuth();
  const [certId, setCertId] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const verify = async () => {
    if (!certId.trim()) return;
    setLoading(true); setResult(null); setError("");
    try {
      const res = await fetch(`${api}/api/certificates/verify/${certId.trim()}`);
      const data = await res.json();
      if (!res.ok || !data.valid) setError("❌ Certificate not found or invalid.");
      else setResult(data.certificate);
    } catch { setError("❌ Could not connect to server."); }
    finally { setLoading(false); }
  };

  return (
    <div style={{paddingTop:80,animation:"fadeUp 0.4s ease"}}>
      <div style={{background:"linear-gradient(135deg,rgba(30,58,138,0.4),rgba(6,182,212,0.1))",borderBottom:"1px solid var(--border)",padding:"60px 24px",textAlign:"center"}}>
        <h1 style={{fontSize:"clamp(32px,5vw,52px)",fontWeight:900,marginBottom:8}}>Verify <span className="grad-text">Certificate</span></h1>
        <p style={{color:"var(--gray)",fontSize:16}}>Enter a Certificate ID to verify its authenticity</p>
      </div>
      <div className="section" style={{display:"flex",justifyContent:"center"}}>
        <div className="glass-card" style={{maxWidth:680,width:"100%",padding:48,textAlign:"center"}}>
          <div style={{fontSize:56,marginBottom:16,animation:"float 3s ease-in-out infinite"}}>🔍</div>
          <h2 style={{fontSize:24,fontWeight:800,marginBottom:8}}>Certificate Verification</h2>
          <p style={{color:"var(--gray)",fontSize:14,marginBottom:28}}>Enter the Certificate ID (e.g. FS-A1B2C3D4)</p>
          <div style={{display:"flex",gap:12,marginBottom:24,flexWrap:"wrap"}}>
            <input className="input" placeholder="Enter Certificate ID" value={certId}
              onChange={e=>setCertId(e.target.value)} onKeyDown={e=>e.key==="Enter"&&verify()}
              style={{fontSize:15,padding:"14px 20px",flex:1}}/>
            <button className="btn btn-primary btn-lg" onClick={verify} disabled={loading||!certId.trim()}>
              {loading ? <><div className="spinner" style={{width:18,height:18}}/> Verifying...</> : "Verify 🔍"}
            </button>
          </div>
          {error && (
            <div style={{background:"rgba(239,68,68,0.1)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:12,padding:28,textAlign:"center"}}>
              <span style={{fontSize:48}}>❌</span>
              <h3 style={{color:"#fca5a5",margin:"12px 0 6px",fontSize:18}}>Invalid Certificate</h3>
              <p style={{color:"var(--gray)",fontSize:14}}>{error}</p>
            </div>
          )}
          {result && (
            <div className="glass-card" style={{padding:28,textAlign:"left",border:"1px solid rgba(16,185,129,0.3)"}}>
              <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:20,paddingBottom:16,borderBottom:"1px solid var(--border)"}}>
                <span style={{fontSize:44}}>✅</span>
                <div><h3 style={{color:"#6ee7b7",fontSize:18,marginBottom:4}}>Valid Certificate</h3><p style={{fontSize:13,color:"var(--gray)"}}>Authentic and verified by FutureSprint</p></div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:20}}>
                {[["👤 Student",result.studentName],["💼 Program",result.internshipTitle],["🎯 Domain",result.domain],["⏱️ Duration",result.duration],["📅 Issue Date",new Date(result.issueDate).toLocaleDateString("en-IN",{day:"numeric",month:"long",year:"numeric"})],["🆔 Certificate ID",result.certificateId]].map(([l,v])=>(
                  <div key={l} style={{background:"rgba(30,58,138,0.2)",border:"1px solid var(--border)",borderRadius:10,padding:"12px 14px"}}>
                    <div style={{fontSize:12,color:"var(--gray)",marginBottom:4}}>{l}</div>
                    <div style={{fontSize:14,fontWeight:600,color:l.includes("ID")?"#60a5fa":"#fff"}}>{v}</div>
                  </div>
                ))}
              </div>
              {result.qrCode && <div style={{textAlign:"center"}}><img src={result.qrCode} alt="QR" style={{width:110,height:110,borderRadius:8}}/><div style={{fontSize:12,color:"var(--gray)",marginTop:6}}>Scan to verify</div></div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
