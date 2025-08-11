const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  userType: { // 'student' or 'vendor'
    type: String,
    required: true,
  },
  // You can add more fields here, like a profile picture, etc.
});

const User = mongoose.model('User', userSchema);
module.exports = User;