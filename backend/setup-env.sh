#!/bin/bash

# Setup script for local development environment
# This script creates a .env file with the actual database credentials

echo "Setting up local development environment..."

# Create .env file
cat > .env << EOF
# Database Configuration
SPRING_DATASOURCE_URL=jdbc:mysql://sportscenterdb-do-user-24951870-0.g.db.ondigitalocean.com:25060/sportscenter?useSSL=true&serverTimezone=UTC&allowPublicKeyRetrieval=true
SPRING_DATASOURCE_USERNAME=doadmin
SPRING_DATASOURCE_PASSWORD=your_database_password_here

# Redis Configuration
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379
REDIS_PASSWORD=

# Stripe Configuration
STRIPE_SECRET_KEY=your_stripe_secret_key_here

# JWT Configuration (optional - already has defaults)
# JWT_SECRET=2f1d88b1c0b9dcb71c5f2d5be89801906fa2e4d84a3b19b47d3de4e154deeb71
# JWT_EXPIRATION=86400000
EOF

echo "✅ .env file created successfully!"
echo "⚠️  Remember to update STRIPE_SECRET_KEY with your actual Stripe key"
echo "🔒 The .env file is gitignored and will not be committed to the repository"
