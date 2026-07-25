const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Contact = require('../models/Contact');

// Seed projects list based on Rudra's resume
const seedProjects = [
  {
    title: "LifeOnLine – AI Emergency Healthcare",
    category: "fullstack",
    description: "An AI-powered emergency healthcare portal delivering rapid medical assistance and patient triaging.",
    year: "2026",
    bulletPoints: [
      "Integrated SOS alerts, GPS tracking, and secure WebRTC video consultation.",
      "Embedded Gemini AI triage severity scoring and smart doctor matching.",
      "Includes Finance Guard to warn users against predatory emergency medical loans."
    ],
    techStack: ["React Native", "Next.js", "Express.js", "Gemini AI", "WebRTC", "Firebase"],
    githubUrl: "https://github.com/rudrasankarg"
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
    githubUrl: "https://github.com/rudrasankarg"
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
    githubUrl: "https://github.com/rudrasankarg"
  },
  {
    title: "Heart Abnormality Detection System",
    category: "ai-iot",
    description: "A portable low-cost ECG monitoring setup transmitting diagnostic parameters over Bluetooth/Wi-Fi.",
    year: "2025",
    bulletPoints: [
      "Designed ECG acquisition circuits using Arduino UNO and AD8232 heart sensor.",
      "Implemented a TensorFlow Lite model analyzing 5 core PQRST beats.",
      "Published detailed findings in STAPS Journal."
    ],
    techStack: ["Arduino", "Python", "MATLAB", "React", "TFLite", "Express.js"],
    liveUrl: "https://drive.google.com/file/d/1ZQLLqvIugWzZLVaY16ZUDjCt7QS5AyzN/view"
  },
  {
    title: "Amazon Home Page Clone",
    category: "clones",
    description: "A detailed replication of the Amazon storefront interface, replicating standard retail grids and layouts.",
    year: "2025",
    bulletPoints: [
      "Styled using modular pure CSS grid structures mirroring 6 interface blocks.",
      "Utilized vanilla JS transitions for responsive drop-down navigation."
    ],
    techStack: ["HTML", "CSS", "JavaScript"],
    githubUrl: "https://github.com/rudrasankarg"
  },
  {
    title: "YouTube Desktop Interface Clone",
    category: "clones",
    description: "Recreation of the YouTube desktop homepage feed with pixel-perfect accuracy.",
    year: "2025",
    bulletPoints: [
      "Recreated sidebar drawers, search bar design, and fluid thumbnail layout.",
      "Attained 95% visual resemblance using structured HTML5 semantic modules."
    ],
    techStack: ["HTML5", "CSS3"],
    githubUrl: "https://github.com/rudrasankarg"
  }
];

// GET all projects
router.get('/projects', async (req, res) => {
  try {
    let projects = await Project.find();
    if (projects.length === 0) {
      // Seed initial data if empty
      await Project.insertMany(seedProjects);
      projects = await Project.find();
    }
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
