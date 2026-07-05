# Sentry

A modern, cloud-connected application for tracking investment portfolios. Built with Java 21 and Spring Boot 3, the backend provides a robust REST API for managing stock assets with real-time cloud persistence.

## Project Structure
- **`backend/`** — Spring Boot API (Java 21, Maven). See `backend/pom.xml` and run via `backend/mvnw`.
- **`frontend/`** — Placeholder for the upcoming React/TypeScript dashboard.

### Backend setup
```
cd backend
cp src/main/resources/application.yml.example src/main/resources/application.yaml
# fill in your DB connection details, then set DB_PASSWORD in your environment
./mvnw spring-boot:run
```

## Key Features
- **RESTful API:** Implements standardized GET and POST endpoints for portfolio management.
- **Cloud Database:** Integrated with **Supabase (PostgreSQL)** for reliable, distributed data storage.
- **Tiered Architecture:** Decoupled design using the **Service-Repository pattern** to ensure scalability and maintainability.
- **N-Tier Logic:** Separate layers for Web (Controller), Business Logic (Service), and Data Access (JPA).

##  Tech Stack
- **Language:** Java 21 (JDK 21)
- **Framework:** Spring Boot 3.5
- **Database:** PostgreSQL (Supabase)
- **ORM:** Hibernate / Spring Data JPA
- **Connection Management:** HikariCP & Transaction Pooling

## Future Roadmap
- **Alpha Vantage Integration:** Fetching real-time market prices automatically.
- **JWT Authentication:** Secure user accounts and private portfolios.
- **Frontend:** Building a React/TypeScript dashboard to visualize gains.
