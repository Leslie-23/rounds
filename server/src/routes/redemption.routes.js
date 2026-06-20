const router = require('express').Router();
const controller = require('../controllers/redemption.controller');
const { requireAuth } = require('../middleware/auth');
const { requireRole } = require('../middleware/rbac');
const { asyncHandler } = require('../utils/asyncHandler');

router.post('/initiate', requireAuth, requireRole('member'), asyncHandler(controller.initiate));
router.post(
  '/:redemptionId/confirm',
  requireAuth,
  requireRole('restaurant_staff', 'restaurant_owner', 'admin'),
  asyncHandler(controller.confirm)
);

module.exports = router;
