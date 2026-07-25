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

// POST send OTP code to email
router.post('/contact/send-otp', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Email address is required' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Generate random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    tempOTPs[email] = {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes expiration
    };

    const transporter = getMailTransporter();
    if (!transporter) {
      // Offline fallback: log to backend console
      console.log(`[DEMO MODE] OTP for ${email}: ${otp}`);
      return res.status(200).json({ 
        message: 'OTP verification code generated!', 
        demo: true,
        code: otp // Return the code in response only during demo mode to help testing
      });
    }

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Portfolio Verification Code',
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0c0e14; color: #f8f9fa; border-radius: 10px; max-width: 500px;">
          <h2 style="color: #00f2fe; border-bottom: 1px solid #1f2833; padding-bottom: 10px;">Verification Code</h2>
          <p>You requested a message verification code for Rudra Sankar's Portfolio website.</p>
          <div style="background: rgba(0,242,254,0.1); border: 1px solid #00f2fe; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: 800; letter-spacing: 4px; color: #00f2fe;">${otp}</span>
          </div>
          <p style="color: #94a3b8; font-size: 12px;">This code is valid for 5 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Verification OTP sent to your email address!' });
  } catch (err) {
    console.error('Nodemailer OTP Error:', err);
    res.status(500).json({ message: 'Failed to deliver OTP: ' + err.message });
  }
});

// POST verify OTP and save/forward contact message
router.post('/contact', async (req, res) => {
  try {
    const { name, email, message, otp } = req.body;
    
    if (!name || !email || !message || !otp) {
      return res.status(400).json({ message: 'All fields including the OTP code are required.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please enter a valid email address.' });
    }

    // Verify OTP Code
    const storedRecord = tempOTPs[email];
    if (!storedRecord) {
      return res.status(400).json({ message: 'No OTP record found. Please send a new code.' });
    }
    if (storedRecord.expiresAt < Date.now()) {
      delete tempOTPs[email];
      return res.status(400).json({ message: 'OTP code has expired. Please request a new one.' });
    }
    if (storedRecord.otp !== otp.trim()) {
      return res.status(400).json({ message: 'Incorrect OTP code. Please check your inbox and try again.' });
    }

    // OTP Verified successfully, clear it
    delete tempOTPs[email];

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
        from: process.env.EMAIL_USER,
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

    res.status(201).json({ message: 'Verification successful! Message sent.' });
  } catch (err) {
    console.error('Submit Contact Error:', err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
