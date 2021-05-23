pipeline {
  agent any

  tools {nodejs "Nodejs"}
  
  stages {
    stage('Cloning Git') {
      steps {
        git 'https://github.com/eslamelkholy/Microservices-Boilerplate'
      }
    }
    stage('Test Pipeline') {
      steps {
        echo 'Starting Continous Integration Pipleline...'
        sh "chmod +x -R ${env.WORKSPACE}"
        sh './jenkins/scripts/test.sh'
      }
    }
    stage('Deploy Pipeline') { 
      steps {
        echo 'Start Deploy Services'
        sh "chmod +x -R ${env.WORKSPACE}"
        sh './jenkins/scripts/deploy.sh' 
      }
    }
  }
}

