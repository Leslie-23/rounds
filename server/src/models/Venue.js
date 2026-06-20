const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  category: { type: String, required: true, trim: true },
  imageUrl: String,
  address: String,
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },
  offer: {
    type: { type: String, enum: ['drink', 'appetizer', 'dessert', 'tasting'], required: true },
    description: { type: String, required: true }
  },
  redemptionRules: {
    perVenuePerPeriod: { type: Number, default: 1 },
    periodType: { type: String, enum: ['week', 'month'], default: 'week' },
    blackoutWindows: [{ dayOfWeek: Number, startTime: String, endTime: String }]
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'paused'],
    default: 'pending'
  }
}, { timestamps: true });

venueSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Venue', venueSchema);
