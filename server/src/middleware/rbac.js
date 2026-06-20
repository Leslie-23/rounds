const VenueStaff = require('../models/VenueStaff');

const requireRole = (...allowed) => (req, res, next) => {
  if (!allowed.includes(req.user.role)) {
    return res.status(403).json({ error: 'forbidden' });
  }
  return next();
};

async function requireVenueAccess(req, res, next) {
  const venueId = req.params.venueId || req.body.venueId;
  if (req.user.role === 'admin') return next();
  if (!venueId) return res.status(400).json({ error: 'venue_required' });

  const staff = await VenueStaff.exists({ userId: req.user.sub, venueId });
  if (!staff) return res.status(403).json({ error: 'forbidden' });
  return next();
}

module.exports = { requireRole, requireVenueAccess };
