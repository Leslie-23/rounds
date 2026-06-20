const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function requireAuth(req, res, next) {
  const token = req.headers.authorization?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'unauthenticated' });

  try {
    req.user = jwt.verify(token, env.JWT_ACCESS_SECRET);
    return next();
  } catch {
    return res.status(401).json({ error: 'invalid_or_expired_token' });
  }
}

module.exports = { requireAuth };
