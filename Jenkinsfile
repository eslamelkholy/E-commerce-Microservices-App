pipeline {
  agent any

  tools {nodejs "Nodejs"}
  
  stages {
    stage('Test Pipeline') {
      steps {
        echo 'Starting Continous Integration Pipleline...'
        bash './jenkins/scripts/test.sh'
      }
    }
    stage('Deploy Pipeline') { 
      steps {
        echo 'Start Deploy Services'
        bash './jenkins/scripts/deploy.sh' 
      }
    }
  }
}

