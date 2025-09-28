# Backend Kubernetes Deployment

This directory contains Kubernetes deployment configurations for the SportsCenter backend service.

## Files

- `backend-deployment.yaml` - Backend deployment configuration
- `backend-service.yaml` - Backend service configuration
- `deploy.sh` - Deployment script for easy management

## Prerequisites

1. **Kubernetes cluster** - Ensure you have access to a Kubernetes cluster
2. **kubectl** - Kubernetes command-line tool installed and configured
3. **kubeconfig** - Valid kubeconfig file with cluster access
4. **Docker image** - The following image must be available:
   - `meriembouricha/sportscenter-backend:latest`

## Deployment Methods

### Method 1: Using Jenkins Pipeline (Recommended)

The Jenkins pipeline automatically deploys to Kubernetes after successful Docker image build and push.

**Backend Pipeline:**
- Triggers on push to `prod` branch
- Builds Spring Boot application
- Creates Docker image
- Pushes to Docker Hub
- Deploys to Kubernetes using `k8s-config` credential

### Method 2: Manual Deployment

#### Using the deployment script:

```bash
cd backend
./k8s/deploy.sh
```

#### Using kubectl directly:

```bash
cd backend
kubectl apply -f k8s/backend-deployment.yaml
kubectl apply -f k8s/backend-service.yaml
```

## Service Configuration

### Backend Service
- **Image:** `meriembouricha/sportscenter-backend:latest`
- **Port:** 8080
- **Replicas:** 2
- **Service Type:** LoadBalancer
- **Health Checks:** Spring Boot Actuator endpoints

## Resource Requirements

### Backend
- **CPU Request:** 250m
- **Memory Request:** 512Mi
- **CPU Limit:** 500m
- **Memory Limit:** 1Gi

## Monitoring and Troubleshooting

### Check deployment status:
```bash
kubectl get deployments backend-deployment
kubectl get services backend-service
kubectl get pods -l app=backend
```

### Check logs:
```bash
kubectl logs -l app=backend
```

### Check service endpoints:
```bash
kubectl get services backend-service
kubectl describe service backend-service
```

## Rolling Updates

To update the backend:

1. **Via Jenkins:** Push new code to `prod` branch - Jenkins will automatically build and deploy
2. **Manual:** Update the image tag and apply:
   ```bash
   kubectl set image deployment/backend-deployment backend=meriembouricha/sportscenter-backend:new-tag
   ```

## Cleanup

To remove the backend deployment:

```bash
kubectl delete -f k8s/backend-deployment.yaml
kubectl delete -f k8s/backend-service.yaml
```
