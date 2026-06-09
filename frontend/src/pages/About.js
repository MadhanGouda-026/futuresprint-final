// About.js
import React from "react";
export default function About({ setPage }) {
  return (
    <div style={{paddingTop:80,animation:"fadeUp 0.4s ease"}}>
      <div style={{background:"linear-gradient(135deg,#000000da,hsla(0, 0%, 4%, 0.89))",borderBottom:"1px solid var(--border)",padding:"60px 24px",textAlign:"center"}}>
        <h1 style={{fontSize:"clamp(32px,5vw,52px)",fontWeight:900,marginBottom:8}}>About <span className="grad-text">FutureSprint</span></h1>
        <p style={{color:"var(--gray)",fontSize:16}}>Empowering students to launch their tech careers</p>
      </div>
      <div className="section">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,marginBottom:60}}>
          <div>
            <h2 className="grad-text2" style={{fontSize:28,fontWeight:800,marginBottom:16}}>Our Mission</h2>
            <p style={{color:"rgba(255,255,255,0.7)",lineHeight:1.8,fontSize:15,marginBottom:16}}>FutureSprint bridges the gap between college education and industry requirements. We provide free, high-quality internships to students across India.</p>
            <p style={{color:"rgba(255,255,255,0.7)",lineHeight:1.8,fontSize:15}}>Our internships are <strong style={{color:"#6ee7b7"}}>completely free</strong> — you only pay <strong style={{color:"#fbbf24"}}>₹99</strong> for your verified certificate after successful completion.</p>
          </div>
          <div className="glass-card" style={{padding:28,display:"flex",flexDirection:"column",gap:20}}>
            {[["🎯","Our Goal","Make quality internships accessible to every student in India"],["💡","Our Approach","Real projects, expert guidance, verified certificates"],["🌍","Our Reach","Students from 500+ colleges across India"]].map(([ic,t,d])=>(
              <div key={t} style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                <span style={{fontSize:26,flexShrink:0}}>{ic}</span>
                <div><b style={{display:"block",fontSize:15,marginBottom:4}}>{t}</b><p style={{fontSize:13,color:"var(--gray)",margin:0}}>{d}</p></div>
              </div>
            ))}
          </div>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginBottom:60}}>
          {[["💸","Free for Everyone","No registration fees. 100% free internships.","#10b981"],["🏆","Quality First","Real projects that build your portfolio.","#f59e0b"],["🔐","Verified Certs","Unique IDs and QR codes for instant verification.","#3b82f6"],["🚀","Career Ready","Industry-relevant skills for the real world.","#8b5cf6"]].map(([ic,t,d,c])=>(
            <div key={t} className="glass-card" style={{padding:24,textAlign:"center"}}>
              <span style={{fontSize:32}}>{ic}</span>
              <h3 style={{color:c,margin:"12px 0 6px",fontSize:16}}>{t}</h3>
              <p style={{fontSize:13,color:"var(--gray)"}}>{d}</p>
            </div>
          ))}
        </div>
        <div className="glass-card" style={{padding:40,display:"grid",gridTemplateColumns:"1fr 1fr",gap:40,alignItems:"center"}}>
          <div>
            <h2 className="grad-text2" style={{fontSize:26,fontWeight:800,marginBottom:12}}>Certificate at ₹99</h2>
            <p style={{color:"var(--gray)",fontSize:14,lineHeight:1.7,marginBottom:16}}>After completing your internship, get a professionally designed, QR-verified certificate for just ₹99.</p>
            <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
              {["Unique Certificate ID","QR Code for instant verification","Employer-friendly format","Verifiable online","Digital + printable"].map(f=>(
                <li key={f} style={{fontSize:14,color:"rgba(255,255,255,0.8)",display:"flex",gap:8}}><span style={{color:"#6ee7b7"}}>✓</span>{f}</li>
              ))}
            </ul>
            <button className="btn btn-primary" style={{marginTop:20}} onClick={()=>setPage("verify")}>Verify a Certificate →</button>
          </div>
          <div className="glass-card" style={{padding:32,textAlign:"center",border:"1px solid rgba(59,130,246,0.3)"}}>
            <img src="/logo.png" alt="FS" style={{width:56,height:56,objectFit:"contain",marginBottom:12}}/>
            <div style={{fontSize:10,letterSpacing:"0.15em",color:"var(--gray)",textTransform:"uppercase",marginBottom:14}}>Certificate of Completion</div>
            <div style={{fontSize:20,fontFamily:"'Outfit',sans-serif",fontWeight:800,marginBottom:4}}>Priya Sharma</div>
            <div style={{fontSize:13,color:"var(--gray)",marginBottom:14}}>has successfully completed</div>
            <div style={{fontSize:16,fontWeight:700,color:"#60a5fa",marginBottom:20}}>Web Development Internship</div>
            <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--gray)",borderTop:"1px solid var(--border)",paddingTop:14}}>
              <span>ID: FS-A1B2C3D4</span><span>🔷 QR Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
