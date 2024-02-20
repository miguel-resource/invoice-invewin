pipeline {
    agent none
    environment {
        AWS_ACCESS_KEY_ID = credentials('karimnot-docker-deploy-aws-key')
        AWS_SECRET_ACCESS_KEY = credentials('karimnot-docker-deploy-aws-secret-key')
        DEST_SRV_USER = credentials('facturasinvewin-dest-user')
        DEST_SRV_HOST = credentials('facturasinvewin-dest-host')
        DEST_SRV_APP_FRONT_DIR = credentials('facturasinvewin-app-front-dir')
    }
    stages {
        stage('Frontend build'){
            agent {
                docker {
                    image 'leonlipe/21.2.0-alpine3.18-rsync-aws:1.0.0'
                    args '-u root --privileged'
                }
            }
            stages {
                stage('Front: build project') {
                    steps {
                        dir("web") {
                            sh "yarn"
                            sh "yarn build"
                        }
                    }
                }
            }
        }
        stage('Frontend deploy push image'){
            when {
                branch "main"
            }
            stages {
                stage('Front: build docker and push') {
                    steps {
                        dir("web") {
                            sh "docker build -t invewinapi:latest ."
                            sh "aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 917991404885.dkr.ecr.us-west-2.amazonaws.com"
                            sh "docker tag invewinapi:latest 917991404885.dkr.ecr.us-west-2.amazonaws.com/invewinapi-repo:latest"
                            sh "docker push 917991404885.dkr.ecr.us-west-2.amazonaws.com/invewinapi-repo:latest"
                        }
                    }
                }
            }
        }
        stage('Frontend deploy deploy service'){
            when {
                branch "main"
            }
            agent {
                docker {
                    image 'leonlipe/node-16.13.2-alpine3.15-rsync:1.0.2'
                    args '-u root --privileged'
                }
            }
            stages {
                stage('Front: ssh into server and deploy') {
                    steps {
                        sh 'mkdir -p ~/.ssh'
                        sh 'echo "StrictHostKeyChecking no" >>  ~/.ssh/config'
                        withCredentials([sshUserPrivateKey(credentialsId: "app05-karimnot-prod1", keyFileVariable: 'keyfile')]) {
                            dir("web") {
                                sh 'ssh $DEST_SRV_USER@$DEST_SRV_HOST "cd $DEST_SRV_APP_FRONT_DIR"'
                            }
                        }
                    }
                }
            }
        }
        stage('Backend build'){
            agent {
                docker {
                    image 'leonlipe/21.2.0-alpine3.18-rsync-aws:1.0.0'
                    args '-u root --privileged'
                }
            }
            stages {
                stage('Back: build project') {
                    steps {
                        dir("server") {
                            sh "yarn"
                        }
                    }
                }
            }
        }
    }
}

