pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/basamabhi2212/Hamsika-Travels.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                if [ -f package.json ]; then
                    echo "Node project detected"
                    npm install
                else
                    echo "No package.json found — skipping"
                fi
                '''
            }
        }

        stage('Run Application') {
            steps {
                sh '''
                echo "Running Hamsika Travels App"

                # If Node.js server file exists:
                if [ -f server.js ]; then
                    node server.js
                fi

                # If it's only frontend (HTML/CSS/JS), no server needed
                echo "Build completed"
                '''
            }
        }
    }
}
