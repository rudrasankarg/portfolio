const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true }, // fullstack, ai-iot, clones
  description: { type: String, required: true },
  year: { type: String, required: true },
  bulletPoints: [{ type: String }],
  techStack: [{ type: String }],
  githubUrl: { type: String },
  liveUrl: { type: String }
});

module.exports = mongoose.model('Project', ProjectSchema);
