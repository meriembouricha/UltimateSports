# Environment Variables Configuration

This document describes the required environment variables for the UltimateSports application.

## Database Configuration

The application uses a DigitalOcean MySQL database. The following environment variables must be set:

- `SPRING_DATASOURCE_URL`: Database connection URL (default: jdbc:mysql://sportscenterdb-do-user-24951870-0.g.db.ondigitalocean.com:25060/sportscenter?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true)
- `SPRING_DATASOURCE_USERNAME`: Database username (default: doadmin)
- `SPRING_DATASOURCE_PASSWORD`: Database password (REQUIRED - no default value)

## Redis Configuration

- `SPRING_REDIS_HOST`: Redis host (default: localhost)
- `SPRING_REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PASSWORD`: Redis password (default: empty)

## Stripe Configuration

- `STRIPE_SECRET_KEY`: Stripe API secret key (REQUIRED)

## Jenkins Configuration

For Jenkins CI/CD, the following credentials must be configured:

- `db-password`: Database password credential
- `sonar-token`: SonarQube authentication token
- `github-pat`: GitHub personal access token
- `dockerhub-cred`: Docker Hub credentials
- `nexus-creds`: Nexus repository credentials

## Local Development

For local development, create a `.env` file in the backend directory with:

```env
SPRING_DATASOURCE_PASSWORD=your_database_password_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
```

## Security Note

Never commit sensitive information like passwords or API keys to version control. Always use environment variables or secure credential management systems.
