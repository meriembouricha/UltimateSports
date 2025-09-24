# Use a base image that might be available locally
FROM ubuntu:20.04

# Install Java 17 and Maven
RUN apt-get update && \
    apt-get install -y openjdk-17-jdk maven && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy the entire project
COPY . .

# Build the application
RUN mvn clean package -DskipTests

# Copy the built JAR
RUN cp target/*.jar app.jar

# Expose app port
EXPOSE 8080

# Run the app
CMD ["java", "-jar", "app.jar"]
