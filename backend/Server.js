require('dotenv').config(); // This should be at the top
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// A simple test route
app.get('/', (req, res) => {
  res.send('Room & Food Finder Backend API is running!');
});

// Use the API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/listings', require('./routes/listings'));
app.use('/api/users', require('./routes/users')); // This line is now included

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
