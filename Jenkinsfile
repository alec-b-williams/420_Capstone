pipeline {
     agent any
     stages {
        stage("Build") {
            steps {
                sh "sudo npm install"
                sh "sudo npm run build"
            }
        }
        stage("Deploy") {
            steps {
                sh "sudo rm -rf /var/www/420-frontend"
                sh "sudo cp -r ${WORKSPACE}/build/ /var/www/420-frontend/"
            }
        }
    }
}