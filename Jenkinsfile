pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.50.0-noble' }
            
            }


    stages {


        stage('installer les dependances ') {
            steps {
                sh 'npm ci'  
            }}

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