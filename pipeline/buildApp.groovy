pipeline {
    agent {
        label 'NetChill'
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
                    sh 'tag=$(git describe --tags `git rev-list --tags --max-count=1`)'
                    sh "git switch $tag "
                    sh "git checkout $tag"

                    echo 'Building the backend'
                    sh 'mvn package'
                    sh 'unzip target/netchill-1.0.0-dist.zip'

                    echo 'Building the frontend'
                    sh 'cd webapp'
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
