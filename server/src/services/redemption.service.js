const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { env } = require('../config/env');
const Redemption = require('../models/Redemption');
const User = require('../models/User');
const Venue = require('../models/Venue');
const VenueStaff = require('../models/VenueStaff');
const { getWeekPeriodKey } = require('../utils/period');
const { httpError } = require('../utils/errors');

const REDEMPTION_TTL_SECONDS = 90;

async function initiateRedemption({ userId, venueId, gpsDistanceMeters }) {
  const user = await User.findById(userId).lean();
  if (!user || user.subscription?.status !== 'active') {
    throw httpError(402, 'subscription_required');
  }

  const venue = await Venue.findOne({ _id: venueId, status: 'approved' }).lean();
  if (!venue) throw httpError(404, 'venue_not_found');

  const periodKey = getWeekPeriodKey();
  const usedThisPeriod = await Redemption.countDocuments({
    userId,
    periodKey,
    status: { $in: ['initiated', 'confirmed'] }
  });

  if (usedThisPeriod >= user.subscription.weeklyVisitLimit) {
    throw httpError(409, 'weekly_limit_reached');
  }

  const expiresAt = new Date(Date.now() + REDEMPTION_TTL_SECONDS * 1000);
  const rawPin = String(crypto.randomInt(1000, 10000));
  const pinHash = await bcrypt.hash(rawPin, 10);

  let redemption;
  try {
    redemption = await Redemption.create({
      userId,
      venueId,
      offerSnapshot: venue.offer,
      status: 'initiated',
      pinHash,
      expiresAt,
      periodKey,
      fraudSignals: { gpsDistanceMeters }
    });
  } catch (error) {
    if (error.code === 11000) throw httpError(409, 'already_redeemed');
    throw error;
  }

  const qrPayload = jwt.sign(
    { redemptionId: redemption._id.toString(), venueId: venue._id.toString() },
    env.JWT_ACCESS_SECRET,
    { expiresIn: REDEMPTION_TTL_SECONDS }
  );

  return { redemptionId: redemption._id, qrPayload, pin: rawPin, expiresIn: REDEMPTION_TTL_SECONDS };
}

async function confirmRedemption({ redemptionId, scannedToken, pin, staffId, staffRole }) {
  const redemption = await Redemption.findById(redemptionId);
  if (!redemption) throw httpError(404, 'redemption_not_found');
  if (redemption.status !== 'initiated') throw httpError(409, 'redemption_not_open');
  if (redemption.expiresAt < new Date()) throw httpError(410, 'redemption_expired');

  if (staffRole !== 'admin') {
    const hasVenueAccess = await VenueStaff.exists({ userId: staffId, venueId: redemption.venueId });
    if (!hasVenueAccess) throw httpError(403, 'forbidden');
  }

  if (scannedToken) {
    const payload = jwt.verify(scannedToken, env.JWT_ACCESS_SECRET);
    if (payload.redemptionId !== redemptionId) throw httpError(401, 'invalid_redemption_token');
  } else if (pin) {
    const matches = await bcrypt.compare(pin, redemption.pinHash);
    if (!matches) throw httpError(401, 'invalid_pin');
  } else {
    throw httpError(400, 'confirmation_code_required');
  }

  const confirmed = await Redemption.findOneAndUpdate(
    { _id: redemptionId, status: 'initiated', expiresAt: { $gte: new Date() } },
    { status: 'confirmed', redeemedByStaffId: staffId },
    { new: true }
  );

  if (!confirmed) throw httpError(409, 'redemption_not_open');
  return confirmed;
}

module.exports = { initiateRedemption, confirmRedemption };
