# Frontend Kubernetes Deployment

This directory contains Kubernetes deployment configurations for the SportsCenter frontend service.

## Files

- `frontend-deployment.yaml` - Frontend deployment configuration
- `frontend-service.yaml` - Frontend service configuration
- `deploy.sh` - Deployment script for easy management

## Prerequisites

1. **Kubernetes cluster** - Ensure you have access to a Kubernetes cluster
2. **kubectl** - Kubernetes command-line tool installed and configured
3. **kubeconfig** - Valid kubeconfig file with cluster access
4. **Docker image** - The following image must be available:
   - `meriembouricha/sportscenter-frontend:latest`

## Deployment Methods

### Method 1: Using Jenkins Pipeline (Recommended)

The Jenkins pipeline automatically deploys to Kubernetes after successful Docker image build and push.

**Frontend Pipeline:**
- Triggers on push to `prod` branch
- Builds Angular application
- Creates Docker image
- Pushes to Docker Hub
- Deploys to Kubernetes using `k8s-config` credential

### Method 2: Manual Deployment

#### Using the deployment script:

```bash
cd sportscenter-frontend
./k8s/deploy.sh
```

#### Using kubectl directly:

```bash
cd sportscenter-frontend
kubectl apply -f k8s/frontend-deployment.yaml
kubectl apply -f k8s/frontend-service.yaml
```

## Service Configuration

### Frontend Service
- **Image:** `meriembouricha/sportscenter-frontend:latest`
- **Port:** 80
- **Replicas:** 2
- **Service Type:** LoadBalancer
- **Health Checks:** HTTP GET on root path

## Resource Requirements

### Frontend
- **CPU Request:** 100m
- **Memory Request:** 256Mi
- **CPU Limit:** 250m
- **Memory Limit:** 512Mi

## Monitoring and Troubleshooting

### Check deployment status:
```bash
kubectl get deployments frontend-deployment
kubectl get services frontend-service
kubectl get pods -l app=frontend
```

### Check logs:
```bash
kubectl logs -l app=frontend
```

### Check service endpoints:
```bash
kubectl get services frontend-service
kubectl describe service frontend-service
```

## Rolling Updates

To update the frontend:

1. **Via Jenkins:** Push new code to `prod` branch - Jenkins will automatically build and deploy
2. **Manual:** Update the image tag and apply:
   ```bash
   kubectl set image deployment/frontend-deployment frontend=meriembouricha/sportscenter-frontend:new-tag
   ```

## Cleanup

To remove the frontend deployment:

```bash
kubectl delete -f k8s/frontend-deployment.yaml
kubectl delete -f k8s/frontend-service.yaml
```
