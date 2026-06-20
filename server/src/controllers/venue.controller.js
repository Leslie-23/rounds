const Venue = require('../models/Venue');

async function list(req, res) {
  const venues = await Venue.find({ status: 'approved' }).sort({ createdAt: -1 }).limit(50);
  res.json({ venues });
}

async function get(req, res) {
  const venue = await Venue.findById(req.params.venueId);
  if (!venue) return res.status(404).json({ error: 'venue_not_found' });
  return res.json({ venue });
}

async function create(req, res) {
  const venue = await Venue.create(req.body);
  res.status(201).json({ venue });
}

async function update(req, res) {
  const venue = await Venue.findByIdAndUpdate(req.params.venueId, req.body, { new: true });
  if (!venue) return res.status(404).json({ error: 'venue_not_found' });
  return res.json({ venue });
}

module.exports = { list, get, create, update };
