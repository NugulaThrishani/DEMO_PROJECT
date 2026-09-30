# Petal & Crumb

A warm, responsive MERN pastry shop app with a Vite + React client and Express + MongoDB API.

## Requirements

- Node.js 18+
- MongoDB running locally, or a MongoDB connection string

## Run the API

```bash
cd server
npm install
# Update MONGO_URI in .env if needed
npm run seed
npm run dev
```

The API runs at `http://localhost:5000`.

## Run the client

In another terminal:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`.

## API

- `GET /api/pastries`
- `POST /api/orders` with `{ items: [{ pastry, qty }], total }`
- `GET /api/shops/nearby?lat=40.72&lng=-73.99`
- `GET /api/health`

The client uses browser geolocation to request nearby shops. If location access is denied, the menu and cart remain available.

## AWS deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for the GitHub Actions pipeline using ECR, App Runner, S3, and CloudFront.
