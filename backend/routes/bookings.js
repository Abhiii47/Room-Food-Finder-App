const router = require('express').Router();
const Booking = require('../models/Booking');
const Listing = require('../models/Listing');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   POST /api/bookings
// @desc    Create a new booking (students only)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'student') {
      return res.status(403).json({ msg: 'Only students can make bookings' });
    }

    const { listing, startDate, notes } = req.body;
    
    if (!listing || !startDate) {
      return res.status(400).json({ msg: 'Listing ID and start date are required' });
    }

    // Verify listing exists
    const listingDoc = await Listing.findById(listing).populate('vendor');
    if (!listingDoc) {
      return res.status(404).json({ msg: 'Listing not found' });
    }

    if (!listingDoc.availability) {
      return res.status(400).json({ msg: 'This listing is not available for booking' });
    }

    // Prevent students from booking their own listings
    if (listingDoc.vendor._id.toString() === req.user.id) {
      return res.status(400).json({ msg: 'You cannot book your own listing' });
    }

    // Check if student already has a pending/confirmed booking for this listing
    const existingBooking = await Booking.findOne({
      student: req.user.id,
      listing: listing,
      status: { $in: ['pending', 'confirmed'] }
    });

    if (existingBooking) {
      return res.status(400).json({ msg: 'You already have an active booking for this listing' });
    }

    // Validate start date
    const bookingStartDate = new Date(startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (bookingStartDate < today) {
      return res.status(400).json({ msg: 'Start date cannot be in the past' });
    }

    const newBooking = new Booking({
      student: req.user.id,
      vendor: listingDoc.vendor._id,
      listing: listing,
      startDate: bookingStartDate,
      notes: notes || '',
      totalAmount: listingDoc.price,
      status: 'pending'
    });

    const booking = await newBooking.save();
    
    // Populate the booking before returning
    const populatedBooking = await Booking.findById(booking._id)
      .populate('student', 'name email')
      .populate('vendor', 'name email')
      .populate('listing', 'title price listingType imageUrl');

    res.json({
      booking: populatedBooking,
      msg: 'Booking request sent successfully'
    });
  } catch (err) {
    console.error('Create booking error:', err.message);
    res.status(500).json({ msg: 'Server error while creating booking' });
  }
});

// @route   GET /api/bookings/my-bookings
// @desc    Get all bookings for the logged-in student
// @access  Private (students only)
router.get('/my-bookings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'student') {
      return res.status(403).json({ msg: 'Only students can view their bookings' });
    }

    const bookings = await Booking.find({ student: req.user.id })
      .populate('vendor', 'name email')
      .populate('listing', 'title price listingType imageUrl')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('Get my bookings error:', err.message);
    res.status(500).json({ msg: 'Server error while fetching bookings' });
  }
});

// @route   GET /api/bookings/vendor-bookings
// @desc    Get all bookings for the logged-in vendor's listings
// @access  Private (vendors only)
router.get('/vendor-bookings', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user.userType !== 'vendor') {
      return res.status(403).json({ msg: 'Only vendors can view bookings for their listings' });
    }

    const bookings = await Booking.find({ vendor: req.user.id })
      .populate('student', 'name email')
      .populate('listing', 'title price listingType imageUrl')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error('Get vendor bookings error:', err.message);
    res.status(500).json({ msg: 'Server error while fetching vendor bookings' });
  }
});

// @route   PUT /api/bookings/:id/status
// @desc    Update booking status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'confirmed', 'rejected', 'cancelled', 'completed'];
    
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ msg: 'Invalid status' });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const user = await User.findById(req.user.id);
    
    // Check permissions based on user type and desired status
    if (user.userType === 'student') {
      // Students can only cancel their own bookings
      if (booking.student.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not authorized' });
      }
      if (status !== 'cancelled') {
        return res.status(403).json({ msg: 'Students can only cancel bookings' });
      }
      if (booking.status === 'confirmed') {
        return res.status(400).json({ msg: 'Cannot cancel a confirmed booking. Please contact the vendor.' });
      }
    } else if (user.userType === 'vendor') {
      // Vendors can confirm/reject bookings for their listings
      if (booking.vendor.toString() !== req.user.id) {
        return res.status(403).json({ msg: 'Not authorized' });
      }
      if (!['confirmed', 'rejected', 'completed'].includes(status)) {
        return res.status(403).json({ msg: 'Invalid status for vendor' });
      }
    }

    const oldStatus = booking.status;
    booking.status = status;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('student', 'name email')
      .populate('vendor', 'name email')
      .populate('listing', 'title price listingType imageUrl');

    res.json({
      booking: updatedBooking,
      msg: `Booking ${status} successfully`
    });
  } catch (err) {
    console.error('Update booking status error:', err.message);
    res.status(500).json({ msg: 'Server error while updating booking status' });
  }
});

// @route   PUT /api/bookings/:id/cancel
// @desc    Cancel a booking (students only)
// @access  Private
router.put('/:id/cancel', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    const user = await User.findById(req.user.id);
    if (user.userType !== 'student' || booking.student.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to cancel this booking' });
    }

    if (booking.status === 'cancelled') {
      return res.status(400).json({ msg: 'Booking is already cancelled' });
    }

    if (booking.status === 'completed') {
      return res.status(400).json({ msg: 'Cannot cancel a completed booking' });
    }

    if (booking.status === 'confirmed') {
      return res.status(400).json({ msg: 'Cannot cancel a confirmed booking. Please contact the vendor directly.' });
    }

    booking.status = 'cancelled';
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate('student', 'name email')
      .populate('vendor', 'name email')
      .populate('listing', 'title price listingType imageUrl');

    res.json({ 
      msg: 'Booking cancelled successfully', 
      booking: updatedBooking 
    });
  } catch (err) {
    console.error('Cancel booking error:', err.message);
    res.status(500).json({ msg: 'Server error while cancelling booking' });
  }
});

// @route   GET /api/bookings/:id
// @desc    Get booking by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('student', 'name email')
      .populate('vendor', 'name email')
      .populate('listing', 'title price listingType imageUrl');

    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found' });
    }

    // Check if user has permission to view this booking
    if (booking.student._id.toString() !== req.user.id && 
        booking.vendor._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to view this booking' });
    }

    res.json(booking);
  } catch (err) {
    console.error('Get booking error:', err.message);
    res.status(500).json({ msg: 'Server error while fetching booking' });
  }
});

module.exports = router;