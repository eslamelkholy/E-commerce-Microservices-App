pipeline {
  agent any

  tools {nodejs "Nodejs"}
  
  stages {
    stage('Test Pipeline') {
      steps {
        echo 'Starting Continous Integration Pipleline...'
        sh './jenkins/scripts/test.sh'
      }
    }
    stage('Deploy Pipeline') { 
      steps {
        echo 'Start Deploy Services'
        sh './jenkins/scripts/deploy.sh' 
      }
    }
  }
}

