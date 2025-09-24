pipeline {
  agent any

  environment {
    DEFAULT_PREV_COMMIT = 'HEAD~1'
  }

  stages {
    stage('Checkout') {
      steps {
        git branch: 'prod', credentialsId: 'github-pat', url: 'https://github.com/meriembouricha/UltimateSports.git'
      }
    }

    stage('Detect Changes & Trigger') {
      steps {
        script {
          def previousCommit = env.GIT_PREVIOUS_SUCCESSFUL_COMMIT ?: sh(
            script: "git rev-parse ${env.DEFAULT_PREV_COMMIT}",
            returnStdout: true
          ).trim()

          def currentCommit = env.GIT_COMMIT ?: sh(
            script: "git rev-parse HEAD",
            returnStdout: true
          ).trim()

          echo "Comparing commits: ${previousCommit} → ${currentCommit}"

          def changes = sh(
            script: "git diff --name-only '${previousCommit}' '${currentCommit}'",
            returnStdout: true
          ).trim().readLines()

          def changedBackend = changes.any { it.startsWith("backend/") }
          def changedFrontend = changes.any { it.startsWith("sportscenter-frontend/") }

          if (changedBackend) {
            echo "Detected changes in backend"
            build job: "sportscenter-backend", wait: false
          }

          if (changedFrontend) {
            echo "Detected changes in sportscenter-frontend"
            build job: "sportscenter-frontend", wait: false
          }

          if (!changedBackend && !changedFrontend) {
            echo "No relevant changes detected. Skipping downstream builds."
          }
        }
      }
    }
  }
}
