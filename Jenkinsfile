pipeline {
  agent any

  tools {nodejs "Nodejs"}
  
  stages {
    stage('Test Pipeline') {
      steps {
        echo 'Starting Continous Integration Pipleline...'
        sh "chmod +x ./jenkins/scripts/test.sh"
        sh './jenkins/scripts/test.sh'
      }
    }
    stage('Deploy Pipeline') { 
      steps {
        echo 'Start Deploy Services'
        sh "chmod +x ./jenkins/scripts/deploy.sh"
        sh './jenkins/scripts/deploy.sh' 
      }
    }
  }
}