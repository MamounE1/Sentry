# Sentry Frontend

React + TypeScript dashboard for tracking manually-entered stock holdings against the Sentry backend API.

## Stack
- Vite
- React + TypeScript
- Tailwind CSS v4
- Recharts

## Features
- Dashboard: total portfolio value, holding count, total shares, and a quantity-per-stock bar chart
- Add Stock modal
- Remove Holding modal — reduce a holding's share count or remove it entirely
- Light/dark theme toggle (persisted to `localStorage`)

## Development

```
npm install
npm run dev
```

The dev server proxies `/api` requests to `http://localhost:8080` (see `vite.config.ts`), so run the [backend](../backend) alongside it.

## Build

```
npm run build
```
