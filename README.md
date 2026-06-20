# Round

Restaurant membership club MVP. One Expo app serves members, restaurant staff, restaurant owners, and admins through role-based routes. The API uses Express, MongoDB, Stripe, and JWT.

## Workspace

```text
server/    Express + MongoDB API
client/    Expo React Native app
docs/
  design-doc.md
```

## Quick Start

Install dependencies after Node.js is available:

```bash
npm install
```

Copy environment files:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Run both apps:

```bash
npm run dev
```

## Design Reference

The product and engineering design guide lives in `docs/design-doc.md`.
