# Club Control

Football club system: a React + Vite client on port 5173 and an Express + MongoDB + Socket.io server on port 5000.

Repository: https://github.com/greninja-op/CLUB_CONTROL.git

## Routes

Public pages: `/`, `/squad`, `/players/:id`, `/match/:id`.

`/login` opens the panel for the signed-in role: `/admin`, `/manager`, `/coach`, or `/player`. The login form accepts an email or a full name.

- **Admin:** users, player archive reinstate, club settings and logo, system logs
- **Manager:** fixtures, read-only contracts, documents, inventory, finance
- **Coach:** tactics, training, injuries, fines, leave approval, performance
- **Player:** dashboard, calendar, leave requests

Health check: `GET /api/health`.

## Requirements

- Node.js 18 or newer
- MongoDB running locally

## Environment

`server/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/football-club
JWT_SECRET=change-me
PORT=5000
CLIENT_URL=http://localhost:5173
```

`JWT_EXPIRY` is optional. The default is `8h`.

`client/.env`:

```env
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## Run

```bash
cd server
npm install
npm start
```

```bash
cd client
npm install
npm run dev
```

Open http://localhost:5173.

Run `npm test` in `server` and in `client`.

## Seed

In `server`, `npm run seed` creates one admin from `ADMIN_EMAIL` and `ADMIN_PASSWORD`. It leaves existing data in place.

`npm run seed:demo` in `server` resets users, then creates:

- admin@club.com
- manager@club.com
- coach@club.com
- player@club.com

Password for each account: `password123`.
