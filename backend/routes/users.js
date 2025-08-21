const router = require('express').Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET /api/users/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', auth, async (req, res) => {
  try {
    // Find user by ID from the token, but exclude the password field
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;