const router = require('express').Router();
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');

// @route   POST /api/listings
// @desc    Create a new listing
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description, price, location, imageUrl, listingType } = req.body;
  
  try {
    // CORRECTED: Access the user ID from req.user.id
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      imageUrl,
      listingType,
      vendor: req.user.id, 
    });

    const listing = await newListing.save();
    res.json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/listings
// @desc    Get all listings
// @access  Public
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().populate('vendor', 'name').sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/listings/my-listings
// @desc    Get all listings for the logged-in user
// @access  Private
router.get('/my-listings', auth, async (req, res) => {
  try {
    // CORRECTED: Access the user ID from req.user.id
    const listings = await Listing.find({ vendor: req.user.id }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/listings/:id
// @desc    Get a single listing by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate('vendor', 'name');
    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    res.json(listing);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/listings/:id
// @desc    Update a listing
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, price, imageUrl, listingType } = req.body;

  try {
    let listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    // CORRECTED: Access the user ID from req.user.id
    if (listing.vendor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: { title, description, price, imageUrl, listingType } },
      { new: true }
    );

    res.json(listing);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE /api/listings/:id
// @desc    Delete a listing
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ msg: 'Listing not found' });
    }
    // CORRECTED: Access the user ID from req.user.id
    if (listing.vendor.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Listing.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Listing removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
