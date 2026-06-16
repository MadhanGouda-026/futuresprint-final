import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const APPLY_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdhXU2eln0OXNoUgQMA9GO3D2hvR9NVi6y76U_O3U4C_qQsig/viewform?usp=dialog";

const AuthWrap = ({ children }) => (
  <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"100px 24px 40px",position:"relative",overflow:"hidden",animation:"fadeUp 0.4s ease"}}>
    <div style={{position:"fixed",width:500,height:500,background:"#2563eb",borderRadius:"50%",filter:"blur(80px)",opacity:0.15,top:-200,left:-200,zIndex:0,pointerEvents:"none"}}/>
    <div style={{position:"fixed",width:400,height:400,background:"#06b6d4",borderRadius:"50%",filter:"blur(80px)",opacity:0.12,bottom:-100,right:-100,zIndex:0,pointerEvents:"none"}}/>
    {children}
  </div>
);

export function Login({ setPage }) {
  const { login, showToast, api } = useAuth();
  const [form, setForm] = useState({ email:"", password:"" });
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) return showToast("Fill all fields","error");
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/auth/login`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data = await res.json();
      if (!res.ok) return showToast(data.message,"error");
      login(data);
      showToast(`Welcome back, ${data.name}! 🚀`);
      setPage(data.role==="admin"?"admin":"dashboard");
    } catch { showToast("Server error","error"); }
    finally { setLoading(false); }
  };

  return (
    <AuthWrap>
      <div className="glass-card" style={{width:"100%",maxWidth:440,padding:40,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <img src="/logo.png" alt="FS" style={{width:42,height:42,objectFit:"contain"}}/>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:800}}><span style={{color:"#93c5fd"}}>Future</span><span style={{color:"var(--blue3)"}}>Sprint</span></span>
        </div>
        <h2 style={{fontSize:26,fontWeight:800,marginBottom:4}}>Welcome Back!</h2>
        <p style={{color:"var(--gray)",fontSize:14,marginBottom:20}}>Login to your account</p>
        <div style={{background:"rgba(37,99,235,0.12)",border:"1px solid rgba(59,130,246,0.25)",borderRadius:10,padding:"12px 16px",fontSize:12,color:"#93c5fd",marginBottom:20,lineHeight:1.8}}>
         
        </div>
        <div className="form-group"><label>Email</label><input className="input" type="email" placeholder="you@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
        <div className="form-group"><label>Password</label><input className="input" type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))} onKeyDown={e=>e.key==="Enter"&&submit()}/></div>
        <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",marginBottom:16}} onClick={submit} disabled={loading}>{loading?"Logging in...":"Login 🚀"}</button>
        <p style={{textAlign:"center",fontSize:14,color:"var(--gray)"}}>New here? <button style={{background:"none",border:"none",color:"var(--blue3)",fontWeight:600,cursor:"pointer",fontSize:14}} onClick={()=>setPage("register")}>Create Account</button></p>
        <p style={{textAlign:"center",fontSize:14,color:"var(--gray)",marginTop:8}}>Want to apply? <button style={{background:"none",border:"none",color:"#fbbf24",fontWeight:600,cursor:"pointer",fontSize:14}} onClick={()=>window.open(APPLY_URL,"_blank")}>Click here 🚀</button></p>
      </div>
    </AuthWrap>
  );
}

export function Register({ setPage }) {
  const { login, showToast, api } = useAuth();
  const [form, setForm] = useState({name:"",email:"",password:"",phone:"",college:"",course:"",year:""});
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    if (!form.name||!form.email||!form.password) return showToast("Fill required fields","error");
    setLoading(true);
    try {
      const res = await fetch(`${api}/api/auth/register`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
      const data = await res.json();
      if (!res.ok) return showToast(data.message,"error");
      login(data);
      showToast(`Welcome to FutureSprint, ${data.name}! 🎉`);
      setPage("dashboard");
    } catch { showToast("Server error","error"); }
    finally { setLoading(false); }
  };

  return (
    <AuthWrap>
      <div className="glass-card" style={{width:"100%",maxWidth:680,padding:40,position:"relative",zIndex:1}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
          <img src="/logo.png" alt="FS" style={{width:42,height:42,objectFit:"contain"}}/>
          <span style={{fontFamily:"'Outfit',sans-serif",fontSize:18,fontWeight:800}}><span style={{color:"#93c5fd"}}>Future</span><span style={{color:"var(--blue3)"}}>Sprint</span></span>
        </div>
        <h2 style={{fontSize:26,fontWeight:800,marginBottom:4}}>Create Your Account</h2>
        <p style={{color:"var(--gray)",fontSize:14,marginBottom:24}}>Join FutureSprint and start your internship journey</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 16px"}}>
          <div className="form-group"><label>Full Name *</label><input className="input" placeholder="Priya Sharma" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))}/></div>
          <div className="form-group"><label>Email *</label><input className="input" type="email" placeholder="priya@example.com" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/></div>
          <div className="form-group"><label>Password *</label><input className="input" type="password" placeholder="Min 6 characters" value={form.password} onChange={e=>setForm(f=>({...f,password:e.target.value}))}/></div>
          <div className="form-group"><label>Phone</label><input className="input" placeholder="+91 98765 43210" value={form.phone} onChange={e=>setForm(f=>({...f,phone:e.target.value}))}/></div>
          <div className="form-group"><label>College</label><input className="input" placeholder="Your College Name" value={form.college} onChange={e=>setForm(f=>({...f,college:e.target.value}))}/></div>
          <div className="form-group"><label>Course</label><input className="input" placeholder="B.Tech CSE" value={form.course} onChange={e=>setForm(f=>({...f,course:e.target.value}))}/></div>
          <div className="form-group"><label>Year</label>
            <select className="input" value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))}>
              <option value="">Select Year</option>
              {["1st Year","2nd Year","3rd Year","4th Year","Graduated"].map(y=><option key={y} value={y}>{y}</option>)}
            </select>
          </div>
        </div>
        <button className="btn btn-primary" style={{width:"100%",justifyContent:"center",marginBottom:16}} onClick={submit} disabled={loading}>{loading?"Creating Account...":"Create Account 🚀"}</button>
        <p style={{textAlign:"center",fontSize:14,color:"var(--gray)"}}>Already have an account? <button style={{background:"none",border:"none",color:"var(--blue3)",fontWeight:600,cursor:"pointer",fontSize:14}} onClick={()=>setPage("login")}>Login</button></p>
      </div>
    </AuthWrap>
  );
}
