const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, trim: true },
  role: {
    type: String,
    enum: ['member', 'restaurant_staff', 'restaurant_owner', 'admin'],
    default: 'member',
    required: true
  },
  subscription: {
    tier: { type: String, enum: ['standard', 'premium'] },
    status: { type: String, enum: ['active', 'past_due', 'canceled'], default: 'canceled' },
    stripeCustomerId: String,
    stripeSubscriptionId: String,
    currentPeriodEnd: Date,
    weeklyVisitLimit: { type: Number, default: 5 }
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
