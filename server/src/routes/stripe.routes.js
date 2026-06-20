const router = require('express').Router();
const express = require('express');
const controller = require('../controllers/stripe.controller');
const { asyncHandler } = require('../utils/asyncHandler');

router.post('/', express.raw({ type: 'application/json' }), asyncHandler(controller.webhook));

module.exports = router;
