#!/bin/bash

# Kubernetes deployment script for SportsCenter Backend
# This script deploys the backend service to Kubernetes

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if kubectl is available
check_kubectl() {
    if ! command -v kubectl &> /dev/null; then
        print_error "kubectl is not installed or not in PATH"
        exit 1
    fi
    print_status "kubectl found: $(kubectl version --client --short)"
}

# Function to check cluster connection
check_cluster() {
    if ! kubectl cluster-info &> /dev/null; then
        print_error "Cannot connect to Kubernetes cluster"
        exit 1
    fi
    print_status "Connected to Kubernetes cluster"
}

# Function to deploy backend service
deploy_backend() {
    local deployment_file="k8s/backend-deployment.yaml"
    local service_file="k8s/backend-service.yaml"
    
    if [ ! -f "$deployment_file" ] || [ ! -f "$service_file" ]; then
        print_error "Deployment files not found for backend"
        exit 1
    fi
    
    print_status "Deploying backend to Kubernetes..."
    
    # Apply deployment
    kubectl apply -f "$deployment_file"
    print_status "Applied backend deployment"
    
    # Apply service
    kubectl apply -f "$service_file"
    print_status "Applied backend service"
    
    # Wait for deployment to be ready
    print_status "Waiting for backend deployment to be ready..."
    kubectl rollout status deployment/backend-deployment --timeout=300s
    
    # Get service information
    print_status "Backend service status:"
    kubectl get services backend-service
    
    # Get deployment status
    print_status "Backend deployment status:"
    kubectl get deployments backend-deployment
    
    # Get pods status
    print_status "Backend pods status:"
    kubectl get pods -l app=backend
    
    print_status "Backend deployment completed successfully!"
}

# Main script
main() {
    # Check if KUBECONFIG is set
    if [ -z "$KUBECONFIG" ]; then
        print_warning "KUBECONFIG environment variable is not set"
        print_warning "Make sure you have the kubeconfig file configured"
    fi
    
    # Check prerequisites
    check_kubectl
    check_cluster
    
    # Deploy backend
    deploy_backend
}

# Run main function
main "$@"
