# syntax=docker/dockerfile:1

# ---- Build stage: compile the Spring Boot app with the Maven wrapper ----
FROM eclipse-temurin:25-jdk AS build
WORKDIR /app

# Copy the Maven wrapper + build descriptor first (better layer caching)
COPY .mvn/ .mvn/
COPY mvnw pom.xml ./

# Normalize wrapper line endings (repo is authored on Windows) and make it executable
RUN sed -i 's/\r$//' mvnw && chmod +x mvnw

# Copy sources and build an executable jar (skip tests for a faster deploy)
COPY src ./src
RUN ./mvnw clean package -DskipTests -B

# ---- Run stage: slim JRE image that just runs the jar ----
FROM eclipse-temurin:25-jre
WORKDIR /app

COPY --from=build /app/target/*.jar app.jar

# Render provides the port to bind via the PORT env var (falls back to 8080 locally)
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java ${JAVA_OPTS} -jar app.jar --server.port=${PORT:-8080}"]
