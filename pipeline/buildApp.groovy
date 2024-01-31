pipeline {
    agent {
        label 'NetChill'
    }
    environment {
        TAG = ''
    }
    stages {
        stage('Build') {
            steps {
                script {
                    echo 'Building the project...'
                    def projectPath = '/projet/NetChill.V1/'

                    echo 'Get the latest tag'
                    sh "cd ${projectPath}"
                    sh 'git checkout main'
                    sh 'git pull --tags'
                    TAG = sh(script: 'git describe --tags `git rev-list --tags --max-count=1`', returnStdout: true).trim()
                    sh "git checkout $TAG"

                    echo 'Building the backend'
                    sh 'mvn package'

                    echo 'Building the frontend'
                    sh "cd ${projectPath}/webapp"
                    sh 'yarn build'
                }
            }
        }

        stage('Test') {
            steps {
                echo 'Running tests...'
            }
        }

        stage('Deploy') {
            steps {
                script {
                    def frontEndPath = '/var/www/html/test'
                    def backEndPath = '/opt/app/netchill/test/'
                    echo 'Deploying the application...'

                    echo 'Replace previous backend build by the new one'
                    sh 'rm -rf /opt/app/netchill/test/*'
                    sh "mv /projet/NetChill.V1/netchill-1.0.0/lib/* ${backEndPath}"

                    echo 'Replace previous frontend build by the new one'
                    sh "rm -rf ${frontEndPath}/assets"
                    sh "rm -rf ${frontEndPath}/build"
                    sh "rm -rf ${frontEndPath}/index.html"
                    sh "mv /projet/NetChill.V1/webapp/build ${frontEndPath}"
                    sh "mv ${frontEndPath}/build/assets ${frontEndPath}"
                    sh "mv ${frontEndPath}/build/index.html ${frontEndPath}"
                }
            }
        }
    }
}
