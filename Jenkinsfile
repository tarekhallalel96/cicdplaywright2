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
                sh 'npx playwright test --grep @contenu --reporter=junit,html' 
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
            archiveArtifacts artifacts: '**/results.xml', fingerprint: true // Archive le rapport XML
            archiveArtifacts artifacts: '**/playwright-report/**/*', allowEmptyArchive: true // Archive HTML
        }
        failure {
            echo "Les tests ont échoué ! Vérifiez les rapports dans Jenkins."
        }
    }
}
