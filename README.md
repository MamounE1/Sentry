# Sentry

Sentry is a portfolio tracking platform for investors, pairing a Java/Spring Boot REST API with a cloud-hosted PostgreSQL database and a React dashboard. It's being built toward a full product: users will log in, browse available stocks pulled from a live market data API, and curate their own dashboard of holdings to track.

## Key Features
- **REST API** for managing stock assets (create, read, update, delete), built on a clean Service-Repository architecture.
- **Portfolio Dashboard** — add and remove holdings, view total portfolio value, holding count, and total shares, and see quantity per stock in a bar chart.
- **Cloud-Native Persistence** with a managed PostgreSQL database for reliable, scalable storage.
- **Deployable Backend** designed to run as a hosted, publicly accessible service.

## Tech Stack
- **Backend:** Java, Spring Boot, Spring Data JPA
- **Database:** PostgreSQL (Supabase-hosted)
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Recharts

## Getting Started

### Backend
```
cd backend
cp src/main/resources/application.yml.example src/main/resources/application.yaml  # fill in real DB credentials
# set the SENTRY_DB_PASSWORD environment variable
./mvnw spring-boot:run   # runs on http://localhost:8080
```

### Frontend
```
cd frontend
npm install
npm run dev   # runs on http://localhost:5173, proxies /api requests to the backend
```

## Roadmap
- Live stock data via a third-party market API
- User authentication and personal accounts
- Per-user dashboards for browsing stocks and tracking a personal portfolio
- Public deployment
