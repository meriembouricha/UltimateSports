#!/bin/bash

# Setup script for local development environment
# This script creates a .env file with the actual database credentials

echo "Setting up local development environment..."

# Create .env file
cat > .env << EOF
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://159.89.6.184:3306/sportscenter?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=sportscenteruser
SPRING_DATASOURCE_PASSWORD=YourStrongPassword123!

# Redis Configuration
SPRING_REDIS_HOST=139.59.150.186
SPRING_REDIS_PORT=6379
REDIS_PASSWORD=

# Mail Configuration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=complaints.sportscenter@gmail.com
MAIL_PASSWORD=your_gmail_app_password_here

# JWT Configuration
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRATION=86400000

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here
EOF

echo "✅ .env file created successfully!"
echo "⚠️  Remember to update STRIPE_SECRET_KEY with your actual Stripe key"
echo "🔒 The .env file is gitignored and will not be committed to the repository"
