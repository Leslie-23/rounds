const mongoose = require('mongoose');

const venueStaffSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  staffRole: { type: String, enum: ['staff', 'owner'], required: true }
}, { timestamps: true });

venueStaffSchema.index({ userId: 1, venueId: 1 }, { unique: true });

module.exports = mongoose.model('VenueStaff', venueStaffSchema);
