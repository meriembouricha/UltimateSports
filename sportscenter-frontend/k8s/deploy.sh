#!/bin/bash

# Kubernetes deployment script for SportsCenter Frontend
# This script deploys the frontend service to Kubernetes

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

# Function to deploy frontend service
deploy_frontend() {
    local deployment_file="k8s/frontend-deployment.yaml"
    local service_file="k8s/frontend-service.yaml"
    
    if [ ! -f "$deployment_file" ] || [ ! -f "$service_file" ]; then
        print_error "Deployment files not found for frontend"
        exit 1
    fi
    
    print_status "Deploying frontend to Kubernetes..."
    
    # Apply deployment
    kubectl apply -f "$deployment_file"
    print_status "Applied frontend deployment"
    
    # Apply service
    kubectl apply -f "$service_file"
    print_status "Applied frontend service"
    
    # Wait for deployment to be ready
    print_status "Waiting for frontend deployment to be ready..."
    kubectl rollout status deployment/frontend-deployment --timeout=300s
    
    # Get service information
    print_status "Frontend service status:"
    kubectl get services frontend-service
    
    # Get deployment status
    print_status "Frontend deployment status:"
    kubectl get deployments frontend-deployment
    
    # Get pods status
    print_status "Frontend pods status:"
    kubectl get pods -l app=frontend
    
    print_status "Frontend deployment completed successfully!"
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
    
    # Deploy frontend
    deploy_frontend
}

# Run main function
main "$@"
