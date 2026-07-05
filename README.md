# Sentry

A modern, cloud-connected backend application for tracking investment portfolios. Built with Java 22 and Spring Boot 3, this service provides a robust REST API for managing stock assets with real-time cloud persistence.

## Key Features
- **RESTful API:** Implements standardized GET and POST endpoints for portfolio management.
- **Cloud Database:** Integrated with **Supabase (PostgreSQL)** for reliable, distributed data storage.
- **Tiered Architecture:** Decoupled design using the **Service-Repository pattern** to ensure scalability and maintainability.
- **N-Tier Logic:** Separate layers for Web (Controller), Business Logic (Service), and Data Access (JPA).

##  Tech Stack
- **Language:** Java 22 (JDK 22)
- **Framework:** Spring Boot 3.5
- **Database:** PostgreSQL (Supabase)
- **ORM:** Hibernate / Spring Data JPA
- **Connection Management:** HikariCP & Transaction Pooling

## Future Roadmap
- **Alpha Vantage Integration:** Fetching real-time market prices automatically.
- **JWT Authentication:** Secure user accounts and private portfolios.
- **Frontend:** Building a React/TypeScript dashboard to visualize gains.
