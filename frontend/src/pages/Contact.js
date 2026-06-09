import React, { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const submit = () => {
    if (!form.name || !form.email || !form.message) return;
    setSent(true); setForm({ name:"", email:"", message:"" });
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <div style={{paddingTop:80,animation:"fadeUp 0.4s ease"}}>
      <div style={{background:"linear-gradient(135deg,rgba(30,58,138,0.4),rgba(6,182,212,0.1))",borderBottom:"1px solid var(--border)",padding:"60px 24px",textAlign:"center"}}>
        <h1 style={{fontSize:"clamp(32px,5vw,52px)",fontWeight:900,marginBottom:8}}>Get In <span className="grad-text">Touch</span></h1>
        <p style={{color:"var(--gray)",fontSize:16}}>Have questions? We'd love to hear from you</p>
      </div>
      <div className="section">
        <div style={{display:"grid",gridTemplateColumns:"1fr 1.4fr",gap:32}}>
          <div>
            <h2 className="grad-text2" style={{fontSize:22,fontWeight:800,marginBottom:12}}>Contact Information</h2>
            <p style={{color:"var(--gray)",marginBottom:28,lineHeight:1.7,fontSize:14}}>Reach out for any queries about our programs, certificates, or anything else.</p>
            {[["📧","Email","futuresprint.official@gmail.com","#3b82f6"],["🌐","Website","www.futuresprint.com","#8b5cf6"],["📍","Location","India (Remote)","#f59e0b"]].map(([ic,l,v,c])=>(
              <div key={l} className="glass-card" style={{display:"flex",alignItems:"center",gap:14,padding:"14px 18px",marginBottom:10}}>
                <div style={{width:40,height:40,borderRadius:10,background:`${c}22`,color:c,display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{ic}</div>
                <div><div style={{fontSize:11,color:"var(--gray)",marginBottom:2}}>{l}</div><div style={{fontWeight:600}}>{v}</div></div>
              </div>
            ))}
            <div className="glass-card" style={{padding:20,marginTop:16}}>
              <h3 style={{fontSize:16,fontWeight:700,marginBottom:6}}>Ready to Apply?</h3>
              <p style={{fontSize:13,color:"var(--gray)",marginBottom:14}}>Apply directly via our Google Form</p>
              <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}}
                onClick={()=>window.open("https://docs.google.com/forms/d/e/1FAIpQLSdhXU2eln0OXNoUgQMA9GO3D2hvR9NVi6y76U_O3U4C_qQsig/viewform?usp=dialog","_blank")}>
                Apply Now 🚀
              </button>
            </div>
          </div>
          <div className="glass-card" style={{padding:32}}>
            <h2 className="grad-text2" style={{fontSize:22,fontWeight:800,marginBottom:20}}>Send a Message</h2>
            {sent && <div style={{background:"rgba(16,185,129,0.15)",border:"1px solid rgba(16,185,129,0.3)",borderRadius:10,padding:"12px 16px",fontSize:14,color:"#6ee7b7",marginBottom:20}}>✅ Message sent! We'll get back to you soon.</div>}
            <div className="form-group"><label>Full Name</label><input className="input" placeholder="Your name" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
            <div className="form-group"><label>Email</label><input className="input" type="email" placeholder="your@email.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
            <div className="form-group"><label>Message</label><textarea className="input" rows={5} placeholder="Your message..." value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))} style={{resize:"vertical"}}/></div>
            <button className="btn btn-primary" style={{width:"100%",justifyContent:"center"}} onClick={submit}>Send Message 📨</button>
          </div>
        </div>
      </div>
    </div>
  );
}
