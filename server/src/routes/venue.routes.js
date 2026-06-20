const router = require('express').Router();
const controller = require('../controllers/venue.controller');
const { requireAuth } = require('../middleware/auth');
const { requireRole, requireVenueAccess } = require('../middleware/rbac');
const { asyncHandler } = require('../utils/asyncHandler');

router.get('/', requireAuth, asyncHandler(controller.list));
router.get('/:venueId', requireAuth, asyncHandler(controller.get));
router.post('/', requireAuth, requireRole('admin'), asyncHandler(controller.create));
router.patch(
  '/:venueId',
  requireAuth,
  requireRole('restaurant_owner', 'admin'),
  asyncHandler(requireVenueAccess),
  asyncHandler(controller.update)
);

module.exports = router;
