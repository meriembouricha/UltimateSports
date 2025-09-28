# Environment Variables Configuration

This document describes the required environment variables for the UltimateSports application.

## Database Configuration

The application uses a MySQL database. The following environment variables must be set:

- `SPRING_DATASOURCE_URL`: Database connection URL (default: jdbc:mysql://159.89.6.184:3306/sportscenter?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true)
- `SPRING_DATASOURCE_USERNAME`: Database username (default: sportscenteruser)
- `SPRING_DATASOURCE_PASSWORD`: Database password (default: YourStrongPassword123!)

## Redis Configuration

- `SPRING_REDIS_HOST`: Redis host (default: 167.71.45.125)
- `SPRING_REDIS_PORT`: Redis port (default: 6379)
- `REDIS_PASSWORD`: Redis password (default: empty)

## Mail Configuration (Gmail SMTP)

- `MAIL_HOST`: SMTP host (default: smtp.gmail.com)
- `MAIL_PORT`: SMTP port (default: 587)
- `MAIL_USERNAME`: Gmail username (default: complaints.sportscenter@gmail.com)
- `MAIL_PASSWORD`: Gmail app password (REQUIRED)

## JWT Configuration

- `JWT_SECRET`: JWT signing secret (default: provided)
- `JWT_EXPIRATION`: JWT expiration time in milliseconds (default: 86400000)

## Stripe Configuration

- `STRIPE_SECRET_KEY`: Stripe API secret key (REQUIRED)

## Jenkins Configuration

For Jenkins CI/CD, the following credentials must be configured:

- `db-password`: Database password credential
- `gmail-password`: Gmail app password credential
- `stripe-secret-key`: Stripe secret key credential
- `sonar-token`: SonarQube authentication token
- `github-pat`: GitHub personal access token
- `dockerhub-cred`: Docker Hub credentials
- `nexus-creds`: Nexus repository credentials

## Local Development

For local development, create a `.env` file in the backend directory with:

```env
SPRING_DATASOURCE_PASSWORD=your_database_password_here
MAIL_PASSWORD=your_gmail_app_password_here
STRIPE_SECRET_KEY=your_stripe_secret_key_here
JWT_SECRET=your_jwt_secret_here
```

Or run the setup script:
```bash
cd backend
./setup-env.sh
```

## Security Note

Never commit sensitive information like passwords or API keys to version control. Always use environment variables or secure credential management systems.
