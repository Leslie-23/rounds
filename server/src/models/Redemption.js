const mongoose = require('mongoose');

const redemptionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  venueId: { type: mongoose.Schema.Types.ObjectId, ref: 'Venue', required: true },
  offerSnapshot: mongoose.Schema.Types.Mixed,
  status: {
    type: String,
    enum: ['initiated', 'confirmed', 'expired', 'void'],
    default: 'initiated'
  },
  qrTokenHash: String,
  pinHash: String,
  expiresAt: { type: Date, required: true },
  redeemedByStaffId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  periodKey: { type: String, required: true },
  fraudSignals: {
    gpsDistanceMeters: Number
  }
}, { timestamps: true });

redemptionSchema.index(
  { userId: 1, venueId: 1, periodKey: 1 },
  { unique: true, partialFilterExpression: { status: { $in: ['initiated', 'confirmed'] } } }
);

module.exports = mongoose.model('Redemption', redemptionSchema);
