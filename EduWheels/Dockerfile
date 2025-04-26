# Build stage
FROM openjdk:17-jdk-slim AS build

WORKDIR /app

# Copy all necessary files
COPY pom.xml mvnw ./
COPY .mvn .mvn
COPY src src

# Make mvnw executable
RUN chmod +x mvnw

# Build the app
RUN ./mvnw clean package -DskipTests

# Final stage
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the jar file from the build stage
COPY --from=build /app/target/*.jar app.jar

# Expose the port
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
