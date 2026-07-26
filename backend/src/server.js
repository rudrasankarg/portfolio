const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio';

// Connection status tracker
let isMongoConnected = false;

// Middlewares
app.use(cors());
app.use(express.json());

// Pass DB connection status to requests
app.use((req, res, next) => {
  req.isMongoConnected = isMongoConnected;
  next();
});

// Routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Start Server only in non-vercel/non-production environments if needed, or always export
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// Connect to MongoDB in the background
mongoose.connect(mongoURI)
  .then(() => {
    console.log('MongoDB connected successfully');
    isMongoConnected = true;
  })
  .catch(err => {
    console.error('Database connection error (running with memory fallback):', err.message);
    isMongoConnected = false;
  });

module.exports = app;
