const router = require('express').Router();
const controller = require('../controllers/auth.controller');
const { asyncHandler } = require('../utils/asyncHandler');

router.post('/signup', asyncHandler(controller.signup));
router.post('/login', asyncHandler(controller.login));

module.exports = router;
