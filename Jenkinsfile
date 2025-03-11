pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.0-noble' }}
    stages {
        stage('Run Playwright Tests') {
            steps {
                sh 'npx playwright test'  
            }
        }

        stage('Publish Simple Report') {
            steps {
                script {
                    archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true
                }
            }
        }
    }}