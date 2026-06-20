const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { env } = require('../config/env');
const User = require('../models/User');
const RefreshToken = require('../models/RefreshToken');
const VenueStaff = require('../models/VenueStaff');
const { httpError } = require('../utils/errors');

const ACCESS_TTL = '15m';
const REFRESH_TTL_MS = 30 * 24 * 60 * 60 * 1000;

async function buildClaims(user) {
  const memberships = await VenueStaff.find({ userId: user._id }).select('venueId').lean();
  return {
    sub: user._id.toString(),
    role: user.role,
    venueIds: memberships.map((membership) => membership.venueId.toString())
  };
}

async function issueTokens(user, familyId = crypto.randomUUID()) {
  const claims = await buildClaims(user);
  const accessToken = jwt.sign(claims, env.JWT_ACCESS_SECRET, { expiresIn: ACCESS_TTL });
  const refreshToken = crypto.randomBytes(48).toString('hex');
  const tokenHash = await bcrypt.hash(refreshToken, 10);

  await RefreshToken.create({
    userId: user._id,
    tokenHash,
    familyId,
    expiresAt: new Date(Date.now() + REFRESH_TTL_MS)
  });

  return { accessToken, refreshToken, user: claims };
}

async function signup({ email, password, name }) {
  const passwordHash = await bcrypt.hash(password, 12);
  const user = await User.create({ email, passwordHash, name, role: 'member' });
  return issueTokens(user);
}

async function login({ email, password }) {
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw httpError(401, 'invalid_credentials');

  const matches = await bcrypt.compare(password, user.passwordHash);
  if (!matches) throw httpError(401, 'invalid_credentials');

  return issueTokens(user);
}

module.exports = { signup, login };
