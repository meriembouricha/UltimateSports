pipeline {
    agent any

    environment {
        SONARQUBE_SCANNER_HOME = tool 'SonarScanner'
        SONARQUBE_TOKEN = credentials('sonarqube-token')
        IMAGE_NAME = "sports-center-frontend"
        VERSION = "latest"
        NEXUS_REGISTRY = "localhost:5003"
        ACR_REGISTRY = "sportscenteracr6388.azurecr.io"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build App') {
            steps {
                sh 'npm run build --prod'
            }
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh """
                        ${SONARQUBE_SCANNER_HOME}/bin/sonar-scanner \
                        -Dsonar.projectKey=frontend \
                        -Dsonar.sources=src \
                        -Dsonar.host.url=http://localhost:9000 \
                        -Dsonar.login=${SONARQUBE_TOKEN}
                    """
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${IMAGE_NAME}:${VERSION} ."
            }
        }

        stage('Push to Nexus') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'nexus-docker', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh """
                        docker login ${NEXUS_REGISTRY} -u $USER -p $PASS
                        docker tag ${IMAGE_NAME}:${VERSION} ${NEXUS_REGISTRY}/${IMAGE_NAME}:${VERSION}
                        docker push ${NEXUS_REGISTRY}/${IMAGE_NAME}:${VERSION}
                    """
                }
            }
        }


        stage('Push to ACR') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'acr-credentials', usernameVariable: 'ACR_USER', passwordVariable: 'ACR_PASS')]) {
                    sh """
                        docker login ${ACR_REGISTRY} -u $ACR_USER -p $ACR_PASS
                        docker tag ${IMAGE_NAME}:${VERSION} ${ACR_REGISTRY}/${IMAGE_NAME}:${VERSION}
                        docker push ${ACR_REGISTRY}/${IMAGE_NAME}:${VERSION}
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
    }
}
