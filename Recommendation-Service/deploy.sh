#!/bin/bash

# Deployment script for Recommendation Microservice
# Usage: ./deploy.sh [dev|prod]

set -e

ENVIRONMENT=${1:-dev}

echo "🚀 Deploying Recommendation Microservice in $ENVIRONMENT mode..."

# Create model_data directory if it doesn't exist
mkdir -p ./model_data

if [ "$ENVIRONMENT" = "prod" ]; then
    echo "📦 Building and starting production containers..."
    
    # Check if .env file exists for production
    if [ ! -f .env ]; then
        echo "❌ .env file not found! Please create it with your production database credentials."
        exit 1
    fi
    
    # Build and start production containers
    docker-compose -f docker-compose.prod.yml down
    docker-compose -f docker-compose.prod.yml build --no-cache
    docker-compose -f docker-compose.prod.yml up -d
    
    echo "✅ Production deployment complete!"
    echo "🔍 Check logs with: docker-compose -f docker-compose.prod.yml logs -f"
    
elif [ "$ENVIRONMENT" = "dev" ]; then
    echo "🛠️  Building and starting development containers..."
    
    # Build and start development containers
    docker-compose down
    docker-compose build --no-cache
    docker-compose up -d
    
    echo "✅ Development deployment complete!"
    echo "🔍 Check logs with: docker-compose logs -f"
    
else
    echo "❌ Invalid environment. Use 'dev' or 'prod'"
    exit 1
fi

# Wait a moment for containers to start
sleep 5

# Health check
echo "🏥 Performing health check..."
if curl -f http://localhost:8000/recommendations/1 >/dev/null 2>&1; then
    echo "✅ Service is healthy and responding!"
else
    echo "⚠️  Service may still be starting up. Check logs for details."
fi

echo "🌐 API is available at: http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""
echo "🔧 Useful commands:"
echo "  View logs: docker-compose logs -f"
echo "  Stop services: docker-compose down"
echo "  Restart services: docker-compose restart"