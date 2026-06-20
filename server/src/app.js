const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { env } = require('./config/env');
const authRoutes = require('./routes/auth.routes');
const venueRoutes = require('./routes/venue.routes');
const redemptionRoutes = require('./routes/redemption.routes');
const stripeRoutes = require('./routes/stripe.routes');

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: env.CLIENT_ORIGIN, credentials: true }));
  app.use(rateLimit({ windowMs: 60 * 1000, limit: 120 }));

  app.use('/webhooks/stripe', stripeRoutes);
  app.use(express.json());

  app.get('/health', (_req, res) => res.json({ ok: true }));
  app.use('/auth', authRoutes);
  app.use('/venues', venueRoutes);
  app.use('/redemptions', redemptionRoutes);

  app.use((err, _req, res, _next) => {
    console.error(err);
    res.status(err.status || 500).json({ error: err.code || 'internal_error' });
  });

  return app;
}

module.exports = { createApp };
