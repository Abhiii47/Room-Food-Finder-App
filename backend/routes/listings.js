const router = require('express').Router();
const Listing = require('../models/Listing');

// @route   POST /api/listings
// @desc    Create a new listing
// @access  Private (Vendor only)
router.post('/', async (req, res) => {
  const { title, description, price, location, images, listingType } = req.body;
  
  // In a real scenario, we'd get the vendor ID from the JWT
  const vendorId = '60c72b2f9b1e8c001f8e1a3c'; // Placeholder vendor ID

  try {
    const newListing = new Listing({
      title,
      description,
      price,
      location,
      images,
      listingType,
      vendor: vendorId,
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
    const listings = await Listing.find().populate('vendor', 'name');
    res.json(listings);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;