// Base URL for the backend API.
// - Local dev: leave VITE_API_URL unset so requests hit the Vite proxy (/api -> localhost:8080).
// - Production: set VITE_API_URL to your deployed backend origin, no trailing slash,
//   e.g. https://sentry-backend.onrender.com
export const API_BASE = import.meta.env.VITE_API_URL ?? ''
