const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    address: String,
    latitude: Number,
    longitude: Number,
  },
  images: [String],
  listingType: { // 'room' or 'food'
    type: String,
    required: true,
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;