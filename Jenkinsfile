pipeline {
    agent any

    // AGREGAMOS ESTO: Configura el disparador automático
    triggers {
        // Revisa cambios en GitHub cada minuto
        pollSCM '* * * * *' 
    }

    environment {
        DOCKER_IMAGE = 'matydocker1/frontend:latest'
        DOCKER_CREDS = 'docker-hub-credentials'
        DOCKER_BUILDKIT = '0'
        KEYCLOAK_URL = 'http://localhost:9090/'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Maty-git/FrontendTingeso.git'
            }
        }
        
        stage('Build Docker Image') {
            steps {
                script {
                    echo "--> Construyendo imagen de Frontend con variables..."
                    sh """
                        docker build --no-cache \
                        --build-arg VITE_KEYCLOAK_URL=${KEYCLOAK_URL} \
                        --build-arg VITE_REALM=ToolRent-realm \
                        --build-arg VITE_CLIENT_ID=toolrent-frontend \
                        -t ${DOCKER_IMAGE} .
                    """
                }
            }
        }
        stage('Push to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDS, usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh "docker login -u $USER -p $PASS"
                        sh "docker push ${DOCKER_IMAGE}"
                    }
                }
            }
        }
        stage('Deploy Local') {
            steps {
                script {
                    dir('deploy') { 
                        echo "--> Desplegando Contenedores..."
                        sh "docker compose up -d --no-deps --build --force-recreate frontend1 frontend2 frontend3 nginx-frontend"
                        sh "docker restart nginx-frontend"
                    }
                    sh "docker image prune -f"
                }
            }
        }
    }
}
