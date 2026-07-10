# Sentry

Sentry is a portfolio tracking platform for investors, pairing a Java/Spring Boot REST API with a cloud-hosted PostgreSQL database and a React dashboard. It's being built toward a full product: users will log in, browse available stocks pulled from a live market data API, and curate their own dashboard of holdings to track.

## Key Features
- **REST API** for managing stock assets (create, read, update, delete), built on a clean Service-Repository architecture.
- **User Accounts** — email/password signup and login secured with JWT authentication; each user's portfolio (holdings, dashboard) is private to their account.
- **Portfolio Dashboard** — add and remove holdings, view total portfolio value, holding count, and total shares, and see quantity per stock in a bar chart.
- **Cloud-Native Persistence** with a managed PostgreSQL database for reliable, scalable storage.

## Tech Stack
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** PostgreSQL (Supabase-hosted)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts

## Roadmap
- Live stock data and stock browsing via a third-party market API
- Public deployment
