pipeline {
    agent {
        label 'NetChill'
    }
    environment {
        PROJECT_PATH = '/projet/NetChill.V1/'
        TAG = ''
        PASSWORD = credentials('identifiant sudo')
    
    }
    stages {
        stage('Build') {
            steps {
                dir(PROJECT_PATH) {
                    script {
                        echo 'Building the project...'

                        echo 'Get the latest tag'
                        sh 'git checkout main'

                        echo 'Delete old tags and pull the new one'
                        sh 'git tag -l | xargs -n 1 git tag -d'
                        sh 'git pull --tags'
                        TAG = sh(script: 'git describe --tags `git rev-list --tags --max-count=1`', returnStdout: true).trim()
                        sh "git checkout $TAG"

                        echo 'Building the back'
                        sh 'mvn package'
                        withCredentials([usernamePassword(
                            credentialsId: '1', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh 'echo ${PASSWORD} | sudo -S rm -rf netchill-1.0.0'
                            sh 'echo ${PASSWORD} | sudo -S unzip target/netchill-1.0.0-dist.zip'
                        }
                    }
                }
            }
        }

        stage('Build the front') {
            steps {
                dir("${PROJECT_PATH}/webapp") {
                    echo 'Building the frontend'
                    sh 'yarn build'
                }
            }
        }

        stage('Test') {
            steps {
                dir(PROJECT_PATH) {
                    echo 'Running tests...'
                }
            }
        }

        stage('Deploy') {
            steps {
                dir(PROJECT_PATH) {
                    script {
                        def frontEndPath = '/var/www/html/test'
                        def backEndPath = '/opt/app/netchill/test/'
                        echo 'Deploying the application...'

                        echo 'Replace previous backend build by the new one'
                        withCredentials([usernamePassword(
                            credentialsId: '1', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                            sh 'echo ${PASSWORD} | sudo -S rm -rf /opt/app/netchill/test/*'
                            sh "echo ${PASSWORD} | sudo -S mv /projet/NetChill.V1/netchill-1.0.0/lib/* ${backEndPath}"

                            echo 'Replace previous frontend build by the new one'
                            sh "echo ${PASSWORD} | sudo -S rm -rf ${frontEndPath}/assets"
                            sh "echo ${PASSWORD} | sudo -S rm -rf ${frontEndPath}/build"
                            sh "echo ${PASSWORD} | sudo -S rm -rf ${frontEndPath}/index.html"
                            sh "echo ${PASSWORD} | sudo -S mv /projet/NetChill.V1/webapp/build ${frontEndPath}"
                            sh "echo ${PASSWORD} | sudo -S mv ${frontEndPath}/build/assets ${frontEndPath}"
                            sh "echo ${PASSWORD} | sudo -S mv ${frontEndPath}/build/index.html ${frontEndPath}"
                        }
                    }
                }
            }
        }
    }
}
