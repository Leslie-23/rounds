require('dotenv').config();

const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { env } = require('../config/env');
const User = require('../models/User');
const Venue = require('../models/Venue');
const VenueStaff = require('../models/VenueStaff');
const Redemption = require('../models/Redemption');
const RefreshToken = require('../models/RefreshToken');
const { getWeekPeriodKey } = require('../utils/period');

const venues = [
  {
    name: 'Lowlight Bar',
    category: 'cocktail_bar',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b',
    address: '18 Kettle Lane, Soho',
    location: { type: 'Point', coordinates: [-0.1367, 51.5136] },
    offer: { type: 'drink', description: 'One house spritz or zero-proof highball before 9pm' },
    redemptionRules: {
      perVenuePerPeriod: 1,
      periodType: 'week',
      blackoutWindows: [{ dayOfWeek: 5, startTime: '21:00', endTime: '23:59' }]
    },
    status: 'approved'
  },
  {
    name: 'Koya Room',
    category: 'sushi',
    imageUrl: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c',
    address: '7 Brewer Street, Soho',
    location: { type: 'Point', coordinates: [-0.1339, 51.5115] },
    offer: { type: 'appetizer', description: 'Warm edamame with yuzu salt for the table' },
    redemptionRules: { perVenuePerPeriod: 1, periodType: 'week', blackoutWindows: [] },
    status: 'approved'
  },
  {
    name: 'Afterglow Listening Lounge',
    category: 'listening_lounge',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819',
    address: '44 Curtain Road, Shoreditch',
    location: { type: 'Point', coordinates: [-0.0801, 51.5256] },
    offer: { type: 'tasting', description: 'A sommelier-picked tasting pour from the nightly board' },
    redemptionRules: {
      perVenuePerPeriod: 1,
      periodType: 'week',
      blackoutWindows: [{ dayOfWeek: 6, startTime: '20:00', endTime: '23:59' }]
    },
    status: 'approved'
  },
  {
    name: 'Marlow Hearth',
    category: 'wine_bar',
    imageUrl: 'https://images.unsplash.com/photo-1559339352-11d035aa65de',
    address: '92 Redchurch Street, Shoreditch',
    location: { type: 'Point', coordinates: [-0.0732, 51.5249] },
    offer: { type: 'dessert', description: 'Burnt honey panna cotta with any paid drink' },
    redemptionRules: { perVenuePerPeriod: 1, periodType: 'week', blackoutWindows: [] },
    status: 'approved'
  },
  {
    name: 'The Green Tile',
    category: 'aperitivo_bar',
    imageUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34',
    address: '3 Exmouth Market, Clerkenwell',
    location: { type: 'Point', coordinates: [-0.1092, 51.5252] },
    offer: { type: 'appetizer', description: 'Olive, almond, and crisp panelle plate' },
    redemptionRules: { perVenuePerPeriod: 1, periodType: 'week', blackoutWindows: [] },
    status: 'approved'
  },
  {
    name: 'Room 27',
    category: 'cocktail_bar',
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187',
    address: '27 Greek Street, Soho',
    location: { type: 'Point', coordinates: [-0.1316, 51.5131] },
    offer: { type: 'drink', description: 'Bartender choice mini martini or seasonal shrub' },
    redemptionRules: {
      perVenuePerPeriod: 1,
      periodType: 'week',
      blackoutWindows: [{ dayOfWeek: 4, startTime: '22:00', endTime: '23:59' }]
    },
    status: 'approved'
  },
  {
    name: 'Nori & Night',
    category: 'sushi',
    imageUrl: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252',
    address: '61 Dean Street, Soho',
    location: { type: 'Point', coordinates: [-0.1324, 51.5134] },
    offer: { type: 'tasting', description: 'Two-piece chef nigiri tasting after check-in' },
    redemptionRules: { perVenuePerPeriod: 1, periodType: 'week', blackoutWindows: [] },
    status: 'pending'
  },
  {
    name: 'Candle Room',
    category: 'cocktail_bar',
    imageUrl: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20',
    address: '12 Frith Street, Soho',
    location: { type: 'Point', coordinates: [-0.1318, 51.5136] },
    offer: { type: 'drink', description: 'One low-ABV candlelight cordial' },
    redemptionRules: { perVenuePerPeriod: 1, periodType: 'week', blackoutWindows: [] },
    status: 'paused'
  }
];

const users = [
  {
    email: 'member@round.local',
    name: 'Maya Cole',
    role: 'member',
    subscription: {
      tier: 'standard',
      status: 'active',
      stripeCustomerId: 'cus_seed_member',
      stripeSubscriptionId: 'sub_seed_standard',
      currentPeriodEnd: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      weeklyVisitLimit: 5
    }
  },
  {
    email: 'premium@round.local',
    name: 'Theo Grant',
    role: 'member',
    subscription: {
      tier: 'premium',
      status: 'active',
      stripeCustomerId: 'cus_seed_premium',
      stripeSubscriptionId: 'sub_seed_premium',
      currentPeriodEnd: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
      weeklyVisitLimit: 10
    }
  },
  {
    email: 'staff@round.local',
    name: 'Iris Shah',
    role: 'restaurant_staff',
    subscription: { status: 'canceled', weeklyVisitLimit: 0 }
  },
  {
    email: 'owner@round.local',
    name: 'Julian Park',
    role: 'restaurant_owner',
    subscription: { status: 'canceled', weeklyVisitLimit: 0 }
  },
  {
    email: 'admin@round.local',
    name: 'Nadia Brooks',
    role: 'admin',
    subscription: { status: 'canceled', weeklyVisitLimit: 0 }
  }
];

async function main() {
  await mongoose.connect(env.MONGODB_URI);

  await Promise.all([
    RefreshToken.deleteMany({}),
    Redemption.deleteMany({}),
    VenueStaff.deleteMany({}),
    Venue.deleteMany({}),
    User.deleteMany({})
  ]);

  const passwordHash = await bcrypt.hash('Password123!', 12);
  const createdUsers = await User.insertMany(
    users.map((user) => ({ ...user, passwordHash })),
    { ordered: true }
  );

  const createdVenues = await Venue.insertMany(venues, { ordered: true });
  const byEmail = Object.fromEntries(createdUsers.map((user) => [user.email, user]));
  const byName = Object.fromEntries(createdVenues.map((venue) => [venue.name, venue]));

  await VenueStaff.insertMany([
    { userId: byEmail['staff@round.local']._id, venueId: byName['Lowlight Bar']._id, staffRole: 'staff' },
    { userId: byEmail['staff@round.local']._id, venueId: byName['Room 27']._id, staffRole: 'staff' },
    { userId: byEmail['owner@round.local']._id, venueId: byName['Lowlight Bar']._id, staffRole: 'owner' },
    { userId: byEmail['owner@round.local']._id, venueId: byName['Koya Room']._id, staffRole: 'owner' },
    { userId: byEmail['owner@round.local']._id, venueId: byName['Room 27']._id, staffRole: 'owner' }
  ]);

  const periodKey = getWeekPeriodKey();
  await Redemption.insertMany([
    {
      userId: byEmail['member@round.local']._id,
      venueId: byName['Lowlight Bar']._id,
      offerSnapshot: byName['Lowlight Bar'].offer,
      status: 'confirmed',
      redeemedByStaffId: byEmail['staff@round.local']._id,
      periodKey,
      expiresAt: new Date(Date.now() + 60 * 1000),
      fraudSignals: { gpsDistanceMeters: 18 }
    },
    {
      userId: byEmail['member@round.local']._id,
      venueId: byName['Koya Room']._id,
      offerSnapshot: byName['Koya Room'].offer,
      status: 'confirmed',
      redeemedByStaffId: byEmail['owner@round.local']._id,
      periodKey,
      expiresAt: new Date(Date.now() + 60 * 1000),
      fraudSignals: { gpsDistanceMeters: 24 }
    },
    {
      userId: byEmail['premium@round.local']._id,
      venueId: byName['Afterglow Listening Lounge']._id,
      offerSnapshot: byName['Afterglow Listening Lounge'].offer,
      status: 'initiated',
      periodKey,
      expiresAt: new Date(Date.now() + 90 * 1000),
      fraudSignals: { gpsDistanceMeters: 42 }
    }
  ]);

  console.log('Seeded Round local database');
  console.log(`Mongo: ${env.MONGODB_URI}`);
  console.log('Password for all seed users: Password123!');
  console.table({
    member: 'member@round.local',
    premium: 'premium@round.local',
    staff: 'staff@round.local',
    owner: 'owner@round.local',
    admin: 'admin@round.local'
  });

  await mongoose.disconnect();
}

main().catch(async (error) => {
  console.error(error);
  await mongoose.disconnect();
  process.exit(1);
});
