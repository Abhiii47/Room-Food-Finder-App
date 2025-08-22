import mongoose from 'mongoose';

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  listingType: {
    type: String,
    required: true,
    enum: ['room', 'food']
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
