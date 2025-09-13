const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxLength: 100
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1000
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  location: {
    address: {
      type: String,
      trim: true
    },
    latitude: {
      type: Number
    },
    longitude: {
      type: Number
    },
    city: {
      type: String,
      trim: true
    },
    state: {
      type: String,
      trim: true
    }
  },
  imageUrl: {
    type: String,
    trim: true
  },
  images: [String],
  listingType: { 
    type: String,
    required: true,
    enum: ['room', 'food']
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amenities: [String],
  availability: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
listingSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Index for efficient queries
listingSchema.index({ vendor: 1 });
listingSchema.index({ listingType: 1 });
listingSchema.index({ availability: 1 });
listingSchema.index({ createdAt: -1 });
listingSchema.index({ 'location.latitude': 1, 'location.longitude': 1 });

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;