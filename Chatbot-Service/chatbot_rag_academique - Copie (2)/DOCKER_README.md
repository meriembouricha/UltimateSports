# 🐳 Docker Setup Guide for RAG Chatbot

This guide explains how to build and run the RAG Chatbot using Docker.

## 📋 Prerequisites

- Docker installed on your system
- Docker Compose (usually comes with Docker Desktop)
- OpenAI API key

## 🚀 Quick Start

### 1. Set up environment variables

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file and add your OpenAI API key
nano .env  # or use your preferred editor
```

Add your OpenAI API key:
```env
OPENAI_API_KEY=sk-your-actual-openai-api-key-here
```

### 2. Ensure PDF documents are in place

Make sure your PDF documents are in the `data/` directory:
```bash
ls -la data/
# Should show your PDF files
```

### 3. Build and run with Docker Compose

```bash
# Build and start the application
docker-compose up --build

# Or run in detached mode (background)
docker-compose up --build -d
```

### 4. Access the application

- **API Documentation**: http://localhost:8000/docs
- **Health Check**: http://localhost:8000/docs
- **Chat Endpoint**: POST http://localhost:8000/ask

## 🔧 Docker Commands

### Building the image manually
```bash
docker build -t rag-chatbot .
```

### Running the container manually
```bash
docker run -d \
  --name rag-chatbot \
  -p 8000:8000 \
  -v $(pwd)/data:/app/data:ro \
  -e OPENAI_API_KEY=your_key_here \
  rag-chatbot
```

### Useful Docker commands
```bash
# View running containers
docker ps

# Check logs
docker-compose logs -f chatbot-rag

# Stop the application
docker-compose down

# Restart the application
docker-compose restart

# Remove everything (containers, networks, images)
docker-compose down --rmi all --volumes
```

## 🐛 Troubleshooting

### Container won't start
1. Check if port 8000 is available:
   ```bash
   lsof -i :8000  # On macOS/Linux
   netstat -an | findstr 8000  # On Windows
   ```

2. Check container logs:
   ```bash
   docker-compose logs chatbot-rag
   ```

### PDF documents not loading
1. Ensure PDF files are in the `data/` directory
2. Check file permissions:
   ```bash
   ls -la data/
   ```
3. Verify the volume mount in docker-compose.yml

### Environment variables not working
1. Ensure `.env` file exists and has correct format
2. Check if environment variables are loaded:
   ```bash
   docker-compose exec chatbot-rag env | grep OPENAI
   ```

## 🔧 Development Mode

For development with live code reloading:

1. Uncomment the volume mount in `docker-compose.yml`:
   ```yaml
   volumes:
     - ./data:/app/data:ro
     - .:/app  # Uncomment this line
   ```

2. Restart the container:
   ```bash
   docker-compose restart chatbot-rag
   ```

## 📊 Health Monitoring

The container includes a health check that verifies the API is responding:

```bash
# Check container health
docker ps

# Manual health check
curl -f http://localhost:8000/docs
```

## 🚀 Production Deployment

For production deployment, consider:

1. **Use specific image tags** instead of `latest`
2. **Set up reverse proxy** (uncomment nginx section in docker-compose.yml)
3. **Configure SSL/TLS certificates**
4. **Set up proper logging and monitoring**
5. **Use Docker secrets** for sensitive data
6. **Configure resource limits**

Example production docker-compose override:
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  chatbot-rag:
    deploy:
      resources:
        limits:
          memory: 2G
          cpus: '1.0'
        reservations:
          memory: 1G
          cpus: '0.5'
    restart: always
    environment:
      - FASTAPI_RELOAD=false
```

Run with:
```bash
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## 📝 API Usage Examples

Once the container is running, you can test the API:

```bash
# Ask a question
curl -X POST "http://localhost:8000/ask" \
  -H "Content-Type: application/json" \
  -d '{"question": "Comment créer un compte?"}'

# Set language
curl -X POST "http://localhost:8000/set_language" \
  -H "Content-Type: application/json" \
  -d '{"language": "en"}'
```