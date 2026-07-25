const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Contact = require('../models/Contact');

// Seed projects list based on Rudra's resume and provided links
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
  }
];

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    if (!req.isMongoConnected) {
      console.log('MongoDB offline. Serving projects from local seed memory.');
      return res.json(seedProjects);
    }
    
    let projects = await Project.find();
    
    // Prune legacy clone projects if they exist
    if (projects.some(p => p.category === 'clones')) {
      console.log('Legacy clones detected in database. Pruning...');
      await Project.deleteMany({ category: 'clones' });
      projects = await Project.find();
    }
    
    // Sync URL updates if MongoDB has outdated/missing project URLs
    if (projects.length > 0) {
      const needsSync = projects.some(p => {
        if (p.title.includes("LifeOnLine") && (!p.liveUrl || p.githubUrl.includes("rudrasankarg$"))) return true;
        if (p.title.includes("HackForge") && !p.liveUrl) return true;
        if (p.title.includes("NexaBank") && !p.liveUrl) return true;
        if (p.title.includes("Heart") && p.liveUrl !== "https://heart-guard-ecs.vercel.app/") return true;
        return false;
      });
      
      if (needsSync) {
        console.log('Database project URLs out of sync. Syncing with new links...');
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

// POST contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    if (!req.isMongoConnected) {
      console.log('MongoDB offline. Message received in memory:', { name, email, message });
      return res.status(201).json({ message: 'Message received (Running in offline demo mode)!' });
    }
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
