const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const mongoose = require('mongoose');

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    // FIX: Validate the ObjectId before making the database call
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ msg: 'User not found' });
    }

    const user = await User.findById(req.params.id).select('name');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;