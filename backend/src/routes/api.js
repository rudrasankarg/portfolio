const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const Project = require('../models/Project');
const Contact = require('../models/Contact');

// Temporary in-memory OTP storage
const tempOTPs = {};

// Seed projects list
const seedProjects = [
  {
    title: "LifeOnLine – AI Emergency Healthcare",
    category: "fullstack",
    description: "An AI-powered emergency healthcare platform integrating SOS alerts, real-time location tracking, symptom analysis, and secure video consultation.",
    year: "2026",
    bulletPoints: [
      "Integrated SOS alerts, GPS tracking, and secure WebRTC video consultation.",
      "Embedded Gemini AI triage severity scoring and smart doctor matching.",
      "Includes Finance Guard to warn users against predatory emergency medical loans."
    ],
    techStack: ["React Native", "Next.js", "Express.js", "Gemini AI", "WebRTC", "Firebase"],
    githubUrl: "https://github.com/rudrasankarg/Lifeonline-Production",
    liveUrl: "https://lifeonline-web.vercel.app/login"
  },
  {
    title: "HackForge – Hackathon Platform",
    category: "fullstack",
    description: "A collaborative portal facilitating seamless team formation, project brainstorming, and hackathon registration.",
    year: "2026",
    bulletPoints: [
      "Implemented secure JWT authentication and RESTful user profile APIs.",
      "Integrated Google Gemini AI for smart project concept and idea generation.",
      "Responsive glassmorphic UI built in React & tailwind CSS, deployed on Render."
    ],
    techStack: ["React", "Node.js", "MongoDB", "Gemini AI", "JWT", "Tailwind CSS"],
    githubUrl: "https://github.com/rudrasankarg/HackForge",
    liveUrl: "https://hackforge-4s9q.onrender.com/"
  },
  {
    title: "NexaBank – Banking Web Application",
    category: "fullstack",
    description: "A full-stack banking platform replication featuring secure user dashboard and financial logs.",
    year: "2026",
    bulletPoints: [
      "Engineered components with Next.js and TypeScript, increasing state reliability.",
      "Deployed the architecture on Vercel with smooth interactive transaction UI."
    ],
    techStack: ["Next.js", "TypeScript", "JavaScript", "CSS", "Vercel"],
    githubUrl: "https://github.com/rudrasankarg/nexabank-complete",
    liveUrl: "https://nexabank-complete.vercel.app/"
  },
  {
    title: "HeartGuard – Heart Abnormality Detection",
    category: "ai-iot",
    description: "A portable low-cost ECG monitoring setup transmitting diagnostic parameters over Bluetooth/Wi-Fi and classifying waveforms.",
    year: "2025",
    bulletPoints: [
      "Designed ECG acquisition circuits using Arduino UNO and AD8232 heart sensor.",
      "Implemented a TensorFlow Lite model analyzing 5 core PQRST beats.",
      "Published detailed findings in STAPS Journal."
    ],
    techStack: ["Arduino", "Python", "MATLAB", "React", "TFLite", "Express.js"],
    githubUrl: "https://github.com/rudrasankarg/Heart-Abnormality-Detector",
    liveUrl: "https://heart-guard-ecs.vercel.app/"
  },
  {
    title: "YouTube Clone",
    category: "clones",
    description: "A full-featured clone of the YouTube web application platform, displaying responsive video feeds and custom streaming panels.",
    year: "2025",
    bulletPoints: [
      "Built interface using React, replicating navigation, styling and grid display.",
      "Integrated with public feeds, allowing real-time video simulation.",
      "Optimized load times and layout boundaries with clean state management."
    ],
    techStack: ["React", "HTML", "CSS", "JavaScript", "Netlify"],
    githubUrl: "https://github.com/rudrasankarg/youtube-clone",
    liveUrl: "https://firstcloneyoutube.netlify.app/"
  },
  {
    title: "Amazon Clone",
    category: "clones",
    description: "A comprehensive clone of the Amazon e-commerce platform, implementing checkout features and database logs.",
    year: "2025",
    bulletPoints: [
      "Designed frontend layout with product displays, filter tabs, and responsive checkout page.",
      "Implemented full cart state system with item adding, subtraction, and total price calculation.",
      "Deployed the static pages on Vercel with smooth transitions and layout states."
    ],
    techStack: ["React", "Next.js", "CSS", "Vercel", "JavaScript"],
    githubUrl: "https://github.com/rudrasankarg/amazon-clone",
    liveUrl: "https://amazon-project-f6euv3axk-rudrasankargs-projects.vercel.app/"
  }
];

// Helper to configure Nodemailer transporter dynamically
const getMailTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;
  
  if (!user || !pass || pass === 'your-gmail-app-password') {
    return null; // Not configured yet
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: { user, pass }
  });
};

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    if (!req.isMongoConnected) {
      console.log('MongoDB offline. Serving projects from local seed memory.');
      return res.json(seedProjects);
    }
    
    let projects = await Project.find();
    
    // Force sync if no clones are present in database but seedProjects has clones
    const hasClonesInSeed = seedProjects.some(p => p.category === 'clones');
    const hasClonesInDb = projects.some(p => p.category === 'clones');
    if (projects.length > 0 && hasClonesInSeed && !hasClonesInDb) {
      console.log('Database missing clones category. Clearing and re-seeding...');
      await Project.deleteMany({});
      projects = [];
    }

    
    // Sync URL updates or additions if MongoDB is out of sync
    if (projects.length > 0) {
      const needsSync = projects.length !== seedProjects.length || projects.some(p => {
        if (p.title.includes("LifeOnLine") && (!p.liveUrl || p.githubUrl.includes("rudrasankarg$"))) return true;
        if (p.title.includes("HackForge") && !p.liveUrl) return true;
        if (p.title.includes("NexaBank") && (p.category !== "fullstack" || !p.liveUrl)) return true;
        if (p.title.includes("Heart") && p.liveUrl !== "https://heart-guard-ecs.vercel.app/") return true;
        return false;
      });
      
      if (needsSync) {
        console.log('Database projects out of sync. Syncing with seed list...');
        await Project.deleteMany({});
        projects = [];
      }
    }
    
    if (projects.length === 0) {
      // Seed initial data if empty
      await Project.insertMany(seedProjects);
      projects = await Project.find();
    }
    res.json(projects);
  } catch (err) {
    console.log('Query failed. Falling back to local seed memory:', err.message);
    res.json(seedProjects);
  }
});

// POST save and forward contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Save to Database (if mongo is connected)
    if (req.isMongoConnected) {
      const newContact = new Contact({ name, email, message });
      await newContact.save();
    } else {
      console.log('MongoDB offline. Saved message in server console logs:', { name, email, message });
    }

    // Forward message to Rudra's personal inbox
    const transporter = getMailTransporter();
    if (transporter) {
      const forwardMailOptions = {
        from: '"Portfolio Inbox" <' + process.env.EMAIL_USER + '>',
        to: 'rudrasankarg@gmail.com', // Target email
        replyTo: email, // Reply directly to the sender
        subject: `[Portfolio Inbox] Message from ${name}`,
        html: `
          <div style="font-family: sans-serif; padding: 20px; border-radius: 10px; background-color: #0c0e14; color: #f8f9fa; max-width: 600px;">
            <h2 style="color: #8a2be2; border-bottom: 1px solid #1f2833; padding-bottom: 10px;">New Portfolio Message</h2>
            <p><strong>Sender Name:</strong> ${name}</p>
            <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #00f2fe; text-decoration: none;">${email}</a></p>
            <div style="background-color: #141823; border: 1px solid rgba(255,255,255,0.08); padding: 15px; border-radius: 8px; margin-top: 15px; line-height: 1.6;">
              <p style="margin: 0; color: #e2e8f0;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color: #64748b; font-size: 11px; margin-top: 20px;">Delivered via automated mail dispatcher.</p>
          </div>
        `
      };
      await transporter.sendMail(forwardMailOptions);
    } else {
      console.log('[DEMO MODE] Forwarding message to rudrasankarg@gmail.com skipped (No App Password).');
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Submit Contact Error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
