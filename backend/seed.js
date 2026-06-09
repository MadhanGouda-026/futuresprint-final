require('dns').setServers(['8.8.8.8', '8.8.4.4']);
const mongoose = require("mongoose");
const User = require("./models/User");
const Internship = require("./models/Internship");
require("dotenv").config();

const internships = [
  { title:"Web Development", domain:"Web Development", description:"Build modern websites & web apps using HTML, CSS, JavaScript, React and Node.js.", duration:"8 Weeks", skills:["HTML/CSS","JavaScript","React","Node.js"], mode:"remote", seats:50, color:"#3b82f6", image:"🌐" },
  { title:"Python Programming", domain:"Python Programming", description:"Master Python from basics to advanced. Cover data structures, OOP and automation.", duration:"6 Weeks", skills:["Python","OOP","File I/O","Automation"], mode:"remote", seats:50, color:"#f59e0b", image:"🐍" },
  { title:"AI / ML", domain:"AI / ML", description:"Explore Artificial Intelligence and Machine Learning with hands-on real-world projects.", duration:"10 Weeks", skills:["Python","Scikit-learn","TensorFlow","Neural Networks"], mode:"remote", seats:30, color:"#8b5cf6", image:"🤖" },
  { title:"Data Science", domain:"Data Science", description:"Analyze real datasets, build insights and create visualizations using Python tools.", duration:"8 Weeks", skills:["Python","Pandas","NumPy","Matplotlib"], mode:"remote", seats:40, color:"#06b6d4", image:"📊" },
  { title:"Cybersecurity", domain:"Cybersecurity", description:"Learn ethical hacking, network security, penetration testing and system protection.", duration:"8 Weeks", skills:["Linux","Networking","Ethical Hacking","Kali Linux"], mode:"remote", seats:30, color:"#ef4444", image:"🔐" },
  { title:"Java Development", domain:"Java Development", description:"Build robust enterprise applications with Core Java, OOP concepts and Spring Boot.", duration:"8 Weeks", skills:["Core Java","OOP","Spring Boot","MySQL"], mode:"remote", seats:40, color:"#f97316", image:"☕" },
  { title:"Full Stack Development", domain:"Full Stack Development", description:"Master both frontend and backend. Build complete web applications end-to-end.", duration:"12 Weeks", skills:["React","Node.js","MongoDB","REST APIs"], mode:"remote", seats:30, color:"#10b981", image:"⚡" },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected");
    await Internship.deleteMany();
    await User.deleteMany();
    await Internship.insertMany(internships);
    console.log("✅ 7 internship programs seeded");
    await User.create({ name:"Admin User", email:"admin@futuresprint.com", password:"admin123", role:"admin", isApproved:true });
    await User.create({ name:"Test Student", email:"student@futuresprint.com", password:"student123", college:"Demo College", course:"B.Tech CSE", year:"3rd Year", isApproved:true });
    console.log("✅ Users seeded");
    console.log("\n👑 Admin: admin@futuresprint.com / admin123");
    console.log("🎓 Student: student@futuresprint.com / student123\n");
    process.exit(0);
  } catch(err) { console.error("❌", err.message); process.exit(1); }
}
seed();
