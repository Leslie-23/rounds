const redemptionService = require('../services/redemption.service');

async function initiate(req, res) {
  const result = await redemptionService.initiateRedemption({
    userId: req.user.sub,
    venueId: req.body.venueId,
    gpsDistanceMeters: req.body.gpsDistanceMeters
  });
  res.status(201).json(result);
}

async function confirm(req, res) {
  const result = await redemptionService.confirmRedemption({
    redemptionId: req.params.redemptionId,
    scannedToken: req.body.scannedToken,
    pin: req.body.pin,
    staffId: req.user.sub,
    staffRole: req.user.role
  });
  res.json({ redemption: result });
}

module.exports = { initiate, confirm };
