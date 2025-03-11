pipeline {
    agent {
        docker {
            image 'mcr.microsoft.com/playwright:v1.51.0-noble'
        }
    }
    stages {
        stage('Installer les dépendances') {
            steps {
                sh 'npm ci'  
            }
        }

        stage('Exécuter les tests Playwright') {
            steps {
                sh 'npx playwright test --reporter=line,allureplaywright'
            }
        }

        stage('Publier le rapport JUnit') {
            steps {
                junit '**/results.xml' 
            }
        }
        stage('Publier le rapport HTML') {
            steps {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'playwright-report',
                    reportFiles: 'index.html',
                    reportName: 'Playwright Test Report'
                ])
            }
        }
    }
    post {
        always {
            allure includeProperties:
            false,
            jdk: '',
            results: [[path: './allure-results']]
        }
        
        failure {
            echo "Les tests ont échoué ! Vérifiez les rapports dans Jenkins."
        }
    }}

